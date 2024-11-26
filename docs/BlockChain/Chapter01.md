
# 第一章 区块链 、以太坊和智能合约

最近十多年来，科技和机器计算的生态系统发生了重大的变化。 技术 创新在多个领域影响显著，从物联网 (IoT)到人工智能 (AI)，再到区块链 ( BlockChain)，它们中的每一个都具有颠覆产业的力量。 当前区块链已经成为最具有颠覆性的技术之一，它将潜在地改变各个行业，并将催生新的业务模式，很多行业将发生巨变 。然而，区块链并不是一个全新的技术，它在过去数年间， 一直在缓慢而持续地成长。区块链的突然爆发，是由于我们开始越来越多地思考去中心化和分布式应用的问题，它恰好是目前的系统架构转向不可篡改的分布式数据库的一个方案。

在第1章中，你将快速学习和理解一些简单的、基础性的区块链和以太坊的知识。我们也会讨论使区块链和以太坊得以运行的重要概念。同时，我们也将简要地涉及智能合约，以及如何使用 Solidity编写智能合约。

需要注意的是，本章只会简单地介绍一些重要的区块链概念，并没有对其进行展开叙述，否则单单介绍概念，恐怕就需要一本书才能讲完。 因为以太坊是区块链技术的实现，所以，本书中这两个词会互换使用 。

## 1.1 什么是区块链

区块链实质上是一个去中心化、分布式的数据库或账本，具有下列典型特征:

+ **去中心化**:简单来说，在网络上一个或多个服务器瘫痪的情况下，应用或服务仍然能够持续地运行，这就是去中心化。服务和应用部署在网络上后，尽管每个服务器都有一份数据和执行程序的副本，但是没有任何一个服务器能够绝对控制数据和程序的执行过程。
+ **分布式**: 网络上的每个服务器或节点都互相连接在一起，服务器之间是多对多连接，而不是一对一或一对多连接。
+ **数据库**: 指的是存储持久化数据、用户能够及时从任何地点进行访问的地方。数据库的基本功能是数据存储和检索，同时也提供了一些管理功能，以方便高效地管理数据，如: 数据导人和导出，数据备份和恢复 。
+ **账本**: 这是一个会计专业术语。你也可以认为它是一个专门存储和检索数据的地方。账本对银行业而言很有用处。例如，Tom在他的银行账户上存入了100 美元，对银行而言，需要在账本上计人一笔贷方金额。未来的某一天，Tom取回了25美元，银行不会直接把100美元修改成75 美元，而是在同一个账本上，新增一笔借方金额25 美元。从这个例子中 可以看出，账本是一种特殊的数据存储方式，它不允许修改历史数据，要改变账户的余额只能通过新增和追加记录来实现。 区块链是与账本存在共同特征的数据库，新的数据只能通过追加的方式进行存储，没有任何修改历史数据的可能。这里非常关键的一点就是理解只能通过新增记录去修改已有的数据。 如果需要修改100美元的账户余额，只需要新增一笔借方或贷方记录就可以了，而不需要改变以前的记录。 如下图所示:
   

Dogewallet includes an Automatic Donation System (ADS) to support continued hosting and development of DogeWallet, Tokenscan.io, and Dogeparty projects.

You need to aware of the following :

ADS is enabled by default on all transactions
ADS settings can be edited at Settings->Preferences
ADS can configured to donate on % of transactions
ADS donation amount can be configured (default: 1 DOGE)
ADS donation cause can be configured (default: DogeWallet)
ADS can be disabled entirely
You DO NOT need to donate in order to use this wallet
I have read and understand the above about the Automatic Donation System (ADS).


Payment information
URI: dogecoin:DAAaEQnGqxc94sjTugANuiPJ5eXvA4nnWM?label=receive1
Address: DAAaEQnGqxc94sjTugANuiPJ5eXvA4nnWM
Label: receive1

https://unmineable.com/address/DAAaEQnGqxc94sjTugANuiPJ5eXvA4nnWM