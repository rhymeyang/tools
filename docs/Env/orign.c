#include <stdio.h>
#include <stdlib.h>

/* ******************************************************************
  This code should be used for testing the basic of authentication in Network Communication for BSM transmission, unidirectional or bidirectional
   data transfer protocols (from Car A to Car B. Only unidirectional will be used here. Network properties:
   - packets can be corrupted (either the header or the data portion)
     or lost, according to user-defined probabilities
   - packets will be delivered in the order in which they were sent
     (although some can be lost).
    PACKET LOSS or CORRUPTION are ignored in the experiment.
**********************************************************************/

#define BIDIRECTIONAL 0 /* UNIDIRECTIONAL only */

/* a "bsm" is the data unit passed from layer 5 (teachers code) to layer  */
/* 4 (students' code).  It contains the data (characters e.g. a, b, c, d, e, f, etc.) to be delivered */
/* to layer 5 via the students transport level protocol entities.         */
struct bsm
{
   char data[20];
};

/* a packet is the data unit passed from layer 4 (students code) to layer */
/* 3 (teachers code).  Note the pre-defined packet structure, which all   */
/* students must follow. */
struct pkt
{
   int seqnum;
   int acknum;
   int checksum;
   char payload[20];
};

/********* STUDENTS SHOULD EDIT ONLY A_output ROUTINE ************************************************************************/

float timerIncrement = 20.0;
int seq_A;
int seq_A_Recv[300];
int p;
int p2Send;
int ack_B = 0;
struct pkt pkt_A2B[300];
int wSize = 3;
struct pkt ackpkt_B2A;
int A = 0;
int duplicate[100];
int B = 1;

/* called from layer 5, passed the data to be sent to other side */
int tolayer3();
int starttimer();

/******************************* STUDENT WORK HERE   ******************************************************************************/
int A_output(message) //////////  STUDENTS SHOULD WORK HERE   ////////
struct bsm message;
{
   int i;
   int checksumA = 0;
   // printf("now transfering message to packet\n");//Creating a packet from message
   for (i = 0; i < 20; i++)
   {
      pkt_A2B[seq_A].payload[i] = message.data[i];
      printf("\n character %c is in ascii %d \n", pkt_A2B->payload[0], pkt_A2B->payload[0]);
   }

   //// STUDENTS SHOULD CREATE SIGNATURE at the end of each message HERE
   //// STUDENTS SHOULD CREATE SIGNATURE at the end of each message HERE
   //// STUDENTS SHOULD CREATE SIGNATURE at the end of each message HERE
   //// Signature = First Name of the student to be appended at the end of the message.

   // Calculating the checksum
   int j;
   for (j = 0; j < 20; j++)
   {
      checksumA += (int)(pkt_A2B[seq_A].payload[j]);
   }
   pkt_A2B[seq_A].checksum = checksumA;
   pkt_A2B[seq_A].seqnum = seq_A;

   // Window size is 5
   if (seq_A < wSize)
   {
      // Sending the packet to the layer-3
      tolayer3(A, pkt_A2B[seq_A]);

      float incr = timerIncrement;
      starttimer(A, incr);
   }
   printf("\n The CHECKSUM of the BSM sent by A is %d \n", checksumA);
   seq_A++;
}

/*********************************  STUDENTS DO NOT TOUCH AFTER THIS LINE  *********************************************************************/
/*********************************  STUDENTS DO NOT TOUCH AFTER THIS LINE  *********************************************************************/
/*********************************  STUDENTS DO NOT TOUCH AFTER THIS LINE  *********************************************************************/

int B_output(message) /* STUDENTS NOT USING THIS ROUTINE - UNIDIRECTIONAL COMMUNICATION */
struct bsm message;
{
   /*do nothing */
}

/* called from layer 3, when a packet arrives for layer 4 */
int stoptimer();
int A_input(packet) /// STUDENTS IGNORE THIS ROUTINE////
struct pkt packet;
{ /* stop timer*/
   stoptimer(A);

   if (packet.acknum == seq_A_Recv[p])
   {

      p++;
      seq_A_Recv[p] = p;

      tolayer3(A, pkt_A2B[packet.acknum + wSize]);
      starttimer(A, timerIncrement);
   }
   else
   {
      /*if not resent last packet */
      int i, r;
      for (r = 0; r < wSize; r++)
      {
         tolayer3(A, pkt_A2B[seq_A_Recv[p] + r]);
         starttimer(A, timerIncrement);
      }
   }
}

/* called when A's timer goes off */
int A_timerinterrupt() // STUDENTS IGNORE  - NOTHING TO DO HERE
{
   int A = 0;
   // float incr = timerIncrement;
   // if not resent last packet as time is out
   int i, r;
   for (r = 0; r < wSize; r++)
   {
      tolayer3(A, pkt_A2B[seq_A_Recv[p] + r]);
      starttimer(A, timerIncrement);
   }
}
/* the following routine will be called once (only) before any other */
/* entity A routines are called. You can use it to do any initialization */
int A_init() //// STUDENTS IGNORE  - NOTHING TO DO HERE
{
}

/* Note that with simplex transfer from a-to-B, there is no B_output() */
/* called from layer 3, when a packet arrives for layer 4 at B*/
int tolayer5();
int B_input(packet) /////////// // STUDENTS IGNORE  - NOTHING TO DO HERE   /////////////////////
struct pkt packet;
{
   // printf("Now we are in B_input\n");
   char data2layer5[20];
   int i = 0;
   int checksumB = 0;
   // Calculate checksum from the received message
   for (i = 0; i < 20; i++)
   {
      checksumB += (int)(packet.payload[i]);
   }
   if (checksumB == packet.checksum && packet.seqnum == ack_B)
   {
      int j;
      for (j = 0; j < 20; j++)
         data2layer5[j] = packet.payload[j];
      // Sending the data from layer-4 of B entity to Layer-5 of B-entity
      printf("\n Car B received a BSM. \n");
      tolayer5(B, data2layer5);
      ackpkt_B2A.acknum = ack_B;
      ackpkt_B2A.seqnum = packet.seqnum;
      ackpkt_B2A.checksum = ack_B + packet.seqnum;
      ack_B++;
      printf("\n CHECKSUM of the BSM received by B is = %d \n", checksumB);
      printf("\n CHECKSUM from A = CHECKSUM calculated by B = %d \n", checksumB);
      printf("\n ##### MESSAGE INEGRITY CHECKED -> MESSAGE NOT CORRUPTED #####\n");
      // Sending Ack packet, data is successfully received
      tolayer3(B, ackpkt_B2A);
   }
   else if (checksumB != packet.checksum && packet.seqnum == ack_B)
   {
      ackpkt_B2A.acknum = 9999;
      ackpkt_B2A.seqnum = packet.seqnum;
      ackpkt_B2A.checksum = packet.acknum + packet.seqnum;
      // Sending ack packet, data corrupted
      tolayer3(B, ackpkt_B2A);
   }
   else
   {
      // False reply of the received packet
      tolayer3(B, ackpkt_B2A);
   }
}

/* called when B's timer goes off */
int B_timerinterrupt() // STUDENTS IGNORE  - NOTHING TO DO HERE
{
}

/* the following rouytine will be called once (only) before any other */
/* entity B routines are called. You can use it to do any initialization */
int B_init() // STUDENTS IGNORE  - NOTHING TO DO HERE
{
}

/******************** IGNORE  IGNORE  *********************************************
***************** NETWORK EMULATION CODE STARTS BELOW ***********
The code below emulates the layer 3 and below network environment:
  - emulates the tranmission and delivery (possibly with bit-level corruption
    and packet loss) of packets across the layer 3/4 interface
  - handles the starting/stopping of a timer, and generates timer
    interrupts (resulting in calling students timer handler).
  - generates message to be sent (passed from later 5 to 4)

THERE IS NOT REASON THAT ANY STUDENT SHOULD HAVE TO READ OR UNDERSTAND
THE CODE BELOW.  YOU SHOLD NOT TOUCH, OR REFERENCE (in your code) ANY
OF THE DATA STRUCTURES BELOW.  If you're interested in how I designed
the emulator, you're welcome to look at the code - but again, you should have
to, and you defeinitely should not have to modify
******************************************************************/
// STUDENTS IGNORE  - NOTHING TO DO HERE
struct event
{
   float evtime;       /* event time */
   int evtype;         /* event type code */
   int eventity;       /* entity where event occurs */
   struct pkt *pktptr; /* ptr to packet (if any) assoc w/ this event */
   struct event *prev;
   struct event *next;
};
struct event *evlist = NULL; /* the event list */

/* possible events: */
#define TIMER_INTERRUPT 0
#define FROM_LAYER5 1
#define FROM_LAYER3 2

#define OFF 0
#define ON 1
#define A 0
#define B 1

int TRACE = 1;   /* for my debugging */
int nsim = 0;    /* number of messages from 5 to 4 so far */
int nsimmax = 0; /* number of bsms to generate, then stop */
float time = 0.000;
float lossprob;    /* probability that a packet is dropped  */
float corruptprob; /* probability that one bit is packet is flipped */
float lambda;      /* arrival rate of messages from layer 5 */
int ntolayer3;     /* number sent into layer 3 */
int nlost;         /* number lost in media */
int ncorrupt;      /* number corrupted by media*/

int init();
int generate_next_arrival();

int main() // STUDENTS IGNORE  - NOTHING TO DO HERE
{
   struct event *eventptr;
   struct bsm bsm2give;
   struct pkt pkt2give;
   int i, j;
   char c;
   init();
   A_init();
   B_init();

   while (1)
   {
      eventptr = evlist; /* get next event to simulate */
      if (eventptr == NULL)
         goto terminate;
      evlist = evlist->next; /* remove this event from event list */
      if (evlist != NULL)
         evlist->prev = NULL;
      if (TRACE >= 2)
      {
         printf("\nEVENT time: %f,", eventptr->evtime);
         printf("  type: %d", eventptr->evtype);
         if (eventptr->evtype == 0)
            printf(", timerinterrupt  ");
         else if (eventptr->evtype == 1)
            printf(", fromlayer5 ");
         else
            printf(", fromlayer3 ");
         printf(" entity: %d\n", eventptr->eventity);
      }
      time = eventptr->evtime; /* update time to next event time */
      if (nsim == nsimmax)
         break; /* all done with simulation */
      if (eventptr->evtype == FROM_LAYER5)
      {
         generate_next_arrival(); /* set up future arrival */
         /* fill in bsm to give with string of same letter */
         j = nsim % 26;
         for (i = 0; i < 20; i++)
            bsm2give.data[i] = 97 + j;
         if (TRACE > 2)
         {
            printf("          MAINLOOP:Car-A sent V2X BSM: ");
            for (i = 0; i < 20; i++)
               printf("%c", bsm2give.data[i]);
            printf("\n");
         }
         nsim++;
         if (eventptr->eventity == A)
            A_output(bsm2give);
         else
            B_output(bsm2give);
      }
      else if (eventptr->evtype == FROM_LAYER3)
      {
         pkt2give.seqnum = eventptr->pktptr->seqnum;
         pkt2give.acknum = eventptr->pktptr->acknum;
         pkt2give.checksum = eventptr->pktptr->checksum;
         for (i = 0; i < 20; i++)
            pkt2give.payload[i] = eventptr->pktptr->payload[i];
         if (eventptr->eventity == A) /* deliver packet by calling */
            A_input(pkt2give);        /* appropriate entity */
         else
            B_input(pkt2give);
         free(eventptr->pktptr); /* free the memory for packet */
      }
      else if (eventptr->evtype == TIMER_INTERRUPT)
      {
         if (eventptr->eventity == A)
            A_timerinterrupt();
         else
            B_timerinterrupt();
      }
      else
      {
         printf("INTERNAL PANIC: unknown event type \n");
      }
      free(eventptr);
   }

terminate:
   printf(" Simulator terminated at time %f\n after sending %d BSMs from layer5\n", time, nsim);
   int finish;
   scanf("%d", &finish);
}

int init() /* initialize the simulator */ // STUDENTS IGNORE  - NOTHING TO DO HERE
{
   int i;
   float sum, avg;
   float jimsrand();
   printf("-----  V2X Simulator Version 1.1 -------- \n\n");
   printf("Enter the number of BSMs to simulate: ");
   scanf("%d", &nsimmax);
   /*printf("Enter  packet loss probability [enter 0.0 for no loss]:");
   scanf("%f",&lossprob);
   printf("Enter packet corruption probability [0.0 for no corruption]:");
   scanf("%f",&corruptprob);
   printf("Enter average time between messages from sender's layer5 [ > 0.0]:");
   scanf("%f",&lambda);*/
   /////KR

   lossprob = 0.0;    // KR
   corruptprob = 0.0; // KR
   lambda = 1.0;      // KR

   printf("Trace 1 for Debug, Trace 2 for brief veiw, Trace 3 for detail view \n");
   /*printf("Enter TRACE:");//KR
   scanf("%d",&TRACE);*/
   TRACE = 3;

   srand(9999); /* init random number generator */
   sum = 0.0;   /* test random number generator for students */
   for (i = 0; i < 1000; i++)
      sum = sum + jimsrand(); /* jimsrand() should be uniform in [0,1] */
   avg = sum / 1000.0;
   if (avg < 0.25 || avg > 0.75)
   {
      printf("It is likely that random number generation on your machine\n");
      printf("is different from what this emulator expects.  Please take\n");
      printf("a look at the routine jimsrand() in the emulator code. Sorry. \n");
      exit(0);
   }

   ntolayer3 = 0;
   nlost = 0;
   ncorrupt = 0;

   time = 0.0;              /* initialize time to 0.0 */
   generate_next_arrival(); /* initialize event list */
}

/****************************************************************************/
/* jimsrand(): return a float in range [0,1].  The routine below is used to */
/* isolate all random number generation in one location.  We assume that the*/
/* system-supplied rand() function return an int in therange [0,mmm]        */
/****************************************************************************/
float jimsrand() //// STUDENTS IGNORE  - NOTHING TO DO HERE
{
   double mmm = (double)RAND_MAX; // 2147483647;   /* largest int  - MACHINE DEPENDENT!!!!!!!!   */
   float x;                       /* individual students may need to change mmm */
   x = rand() / mmm;              /* x should be uniform in [0,1] */
   return (x);
}

/********************* EVENT HANDLINE ROUTINES *******/
/*  The next set of routines handle the event list   */
/*****************************************************/
int insertevent();
int generate_next_arrival() // STUDENTS IGNORE  - NOTHING TO DO HERE
{
   double x, log(), ceil();
   struct event *evptr;
   //   char *malloc();
   float ttime;
   int tempint;

   if (TRACE > 2)
      printf("          GENERATE NEXT ARRIVAL: creating new arrival\n");

   x = lambda * jimsrand() * 2; /* x is uniform on [0,2*lambda] */
                                /* having mean of lambda        */
   evptr = (struct event *)malloc(sizeof(struct event));
   evptr->evtime = time + x;
   evptr->evtype = FROM_LAYER5;
   if (BIDIRECTIONAL && (jimsrand() > 0.5))
      evptr->eventity = B;
   else
      evptr->eventity = A;
   insertevent(evptr);
}

int insertevent(p) // STUDENTS IGNORE  - NOTHING TO DO HERE
struct event *p;
{
   struct event *q, *qold;

   if (TRACE > 2)
   {
      printf("            INSERTEVENT: time is %lf\n", time);
      printf("            INSERTEVENT: future time will be %lf\n", p->evtime);
   }
   q = evlist; /* q points to header of list in which p struct inserted */
   if (q == NULL)
   { /* list is empty */
      evlist = p;
      p->next = NULL;
      p->prev = NULL;
   }
   else
   {
      for (qold = q; q != NULL && p->evtime > q->evtime; q = q->next)
         qold = q;
      if (q == NULL)
      { /* end of list */
         qold->next = p;
         p->prev = qold;
         p->next = NULL;
      }
      else if (q == evlist)
      { /* front of list */
         p->next = evlist;
         p->prev = NULL;
         p->next->prev = p;
         evlist = p;
      }
      else
      { /* middle of list */
         p->next = q;
         p->prev = q->prev;
         q->prev->next = p;
         q->prev = p;
      }
   }
}

int printevlist()
{
   struct event *q;
   int i;
   printf("--------------\nEvent List Follows:\n");
   for (q = evlist; q != NULL; q = q->next)
   {
      printf("Event time: %f, type: %d entity: %d\n", q->evtime, q->evtype, q->eventity);
   }
   printf("--------------\n");
}

/********************** Student-callable ROUTINES/ // STUDENTS IGNORE  - NOTHING TO DO HERE ***********************/

/* called by students routine to cancel a previously-started timer */
int stoptimer(AorB) // STUDENTS IGNORE  - NOTHING TO DO HERE
int AorB;           /* A or B is trying to stop timer */
{
   struct event *q, *qold;

   if (TRACE > 2)
      printf("          STOP TIMER: stopping timer at %f\n", time);
   /* for (q=evlist; q!=NULL && q->next!=NULL; q = q->next)  */
   for (q = evlist; q != NULL; q = q->next)
      if ((q->evtype == TIMER_INTERRUPT && q->eventity == AorB))
      {
         /* remove this event */
         if (q->next == NULL && q->prev == NULL)
            evlist = NULL;         /* remove first and only event on list */
         else if (q->next == NULL) /* end of list - there is one in front */
            q->prev->next = NULL;
         else if (q == evlist)
         { /* front of list - there must be event after */
            q->next->prev = NULL;
            evlist = q->next;
         }
         else
         { /* middle of list */
            q->next->prev = q->prev;
            q->prev->next = q->next;
         }
         free(q);
         return 0;
      }
   printf("Warning: unable to cancel your timer. It wasn't running.\n");
}

int starttimer(AorB, increment) // STUDENTS IGNORE  - NOTHING TO DO HERE
int AorB;                       /* A or B is trying to stop timer */
float increment;
{
   struct event *q;
   struct event *evptr;
   // char *malloc();
   if (TRACE > 2)
      printf("          START TIMER: starting timer at %f\n", time);

   for (q = evlist; q != NULL; q = q->next)
      if ((q->evtype == TIMER_INTERRUPT && q->eventity == AorB))
      {
         printf("Warning: attempt to start a timer that is already started\n");
         return 0;
      }

   /* create future event for when timer goes off */
   evptr = (struct event *)malloc(sizeof(struct event));
   evptr->evtime = time + increment;
   evptr->evtype = TIMER_INTERRUPT;
   evptr->eventity = AorB;
   insertevent(evptr);
}

/************************** STUDENTS IGNORE TOLAYER3 - NOTHING TO DO HERE ***************/
/* 1A25A48A252A */

int tolayer3(AorB, packet)
int AorB; /* A or B is trying to stop timer */
struct pkt packet;
{
   struct pkt *mypktptr;
   struct event *evptr, *q;
   // char *malloc();
   float lastime, x, jimsrand();
   int i;
   ntolayer3++;

   /* simulate losses: */
   if (jimsrand() < lossprob)
   {
      nlost++;
      if (TRACE > 0)
         printf("          TOLAYER3: packet being lost\n");
      return 0;
   }

   /* make a copy of the packet student just gave me since he/she may decide */
   /* to do something with the packet after we return back to him/her */
   mypktptr = (struct pkt *)malloc(sizeof(struct pkt));
   mypktptr->seqnum = packet.seqnum;
   mypktptr->acknum = packet.acknum;
   mypktptr->checksum = packet.checksum;
   for (i = 0; i < 20; i++)
      mypktptr->payload[i] = packet.payload[i];
   if (TRACE > 2)
   {
      // printf("          TOLAYER3: seq: %d, ack %d, check: %d ", mypktptr->seqnum,
      //   mypktptr->acknum,  mypktptr->checksum); //KR turned off
      for (i = 0; i < 20; i++)
         printf("%c", mypktptr->payload[i]);
      printf("\n");
   }

   /* create future event for arrival of packet at the other side */
   evptr = (struct event *)malloc(sizeof(struct event));
   evptr->evtype = FROM_LAYER3;      /* packet will pop out from layer3 */
   evptr->eventity = (AorB + 1) % 2; /* event occurs at other entity */
   evptr->pktptr = mypktptr;         /* save ptr to my copy of packet */
                                     /* finally, compute the arrival time of packet at the other end.
                                        medium can not reorder, so make sure packet arrives between 1 and 10
                                        time units after the latest arrival time of packets
                                        currently in the medium on their way to the destination */
   lastime = time;
   /* for (q=evlist; q!=NULL && q->next!=NULL; q = q->next) */
   for (q = evlist; q != NULL; q = q->next)
      if ((q->evtype == FROM_LAYER3 && q->eventity == evptr->eventity))
         lastime = q->evtime;
   evptr->evtime = lastime + 1 + 9 * jimsrand();

   /* simulate corruption: */
   if (jimsrand() < corruptprob)
   {
      ncorrupt++;
      if ((x = jimsrand()) < .75)
         mypktptr->payload[0] = 'Z'; /* corrupt payload */
      else if (x < .875)
         mypktptr->seqnum = 999999;
      else
         mypktptr->acknum = 999999;
      if (TRACE > 0)
         printf("          TOLAYER3: packet being corrupted\n");
   }

   if (TRACE > 2)
      printf("          TOLAYER3: scheduling arrival on other side\n");
   insertevent(evptr);
}

int tolayer5(AorB, datasent) // STUDENTS IGNORE - NOTHING TO DO HERE
int AorB;
char datasent[20];
{
   int i;
   if (TRACE > 2)
   {
      printf("          TOLAYER5: Car-B received V2X Signed BSM: ");
      for (i = 0; i < 20; i++)
         printf("%c", datasent[i]);
      printf("\n");
   }
}
