import can
import hmac
import hashlib
import time

from Crypto.Cipher import AES
from Crypto.Util.Padding import unpad
# from Cryptodome.Cipher import AES
# from Cryptodome.Util.Padding import unpad

# Shared secret keys (must match the sender)
AES_KEY = b'SecureCAN_123456'   # 16-byte AES key
HMAC_KEY = b'HMACSecretKey_123'  # Secret key for MAC authentication


def decrypt_message(encrypted_data):
    """Decrypts the message using AES."""
    cipher = AES.new(AES_KEY, AES.MODE_ECB)

    # decrypted_data = unpad(cipher.decrypt(
    #     encrypted_data.ljust(16, b'\x00')), AES.block_size)
    # return decrypted_data.strip(b'\x00')

    encrypted_payload = encrypted_data.ljust(16, b'\x00')  
    # decrypted_data = cipher.decrypt(encrypted_payload)  # Decrypt the full 16-byte block
    # return decrypted_data.strip(b'\x00') 
    # Ensure we decrypt a full 16-byte block
    # encrypted_payload = encrypted_data + (b'\x00' * 8)  # Append 8 zero bytes    
    decrypted_data = cipher.decrypt(encrypted_payload)  # Decrypt the full 16-byte block    
    print(f"Decrypted Data (Raw Hex): {decrypted_data.hex()}")  # Debugging
    # return decrypted_data.strip(b'\x00')  # Remove padding

    try:
        print(f"Before unpad->{decrypted_data}")
        decrypted_unpadded = unpad(decrypted_data, AES.block_size)
        print(f"-- Decrypted Data (After Unpad): {decrypted_unpadded.hex()}")  # Debugging
        return decrypted_unpadded
    except ValueError:
        print("❌ Padding error detected! Returning raw decrypted data.")
        return decrypted_data  # Return without unpad

def verify_mac(encrypted_data, freshness_value, received_mac):
    """Verifies if the received MAC is valid."""
    expected_mac = hmac.new(HMAC_KEY, encrypted_data + freshness_value, hashlib.sha256).digest()[:4]
    return expected_mac == received_mac


# Setup virtual CAN interface
bus = can.interface.Bus(channel='vcan0', interface='socketcan')

print("Listening for SecOC CAN messages...")

print(f"AES.block_size -> {AES.block_size}")
msg1 = None
msg2 = None

while msg1 is None or msg2 is None:
    msg = bus.recv()
    if msg.arbitration_id == 0x123:
        msg1 = msg
        print(f"Received Frame 1: {msg1.data.hex()} (ID: 0x123)")

    elif msg.arbitration_id == 0x124:
        msg2 = msg
        print(f"Received Frame 2: {msg2.data.hex()} (ID: 0x124)")

# Reconstruct the original message
full_message = msg1.data + msg2.data
print(f"Reconstructed Secure Message: {full_message.hex()}")

encrypted_payload = full_message[:8]  # First 8 bytes = encrypted payload
freshness_value = full_message[8:12]  # Next 4 bytes = freshness value
received_mac = full_message[12:16]    # Last 4 bytes = MAC

print(f"Extracted Encrypted Payload: {encrypted_payload.hex()}")
print(f"Extracted Freshness Value: {freshness_value.hex()}")
print(f"Extracted MAC: {received_mac.hex()}")

 # Verify MAC
if verify_mac(encrypted_payload, freshness_value, received_mac):
    decrypted_payload = decrypt_message(encrypted_payload)

    # Verify freshness (prevent replay attacks)
    received_time = int.from_bytes(freshness_value, byteorder='big')
    # received_time = int.from_bytes(freshness_value, 'big') 
    current_time = int(time.time())
    print(f"current_time -> {current_time}")
    print(f"received_time-> {received_time}")
    if current_time - received_time > 5:  # Allow 5 sec tolerance
        print(f"️ Warning: Possible Replay Attack Detected!")
    else:
        print(f" Valid Message Received(Raw Hex): {decrypted_payload.hex()}")
        print(f" Valid Message Received: {decrypted_payload.decode()}")
else:
    print(f" MAC Verification Failed! Possible Spoofing Attack.")

# while True:
#     msg = bus.recv()
#     if msg.arbitration_id == 0x123:
#         encrypted_payload = msg.data[:8]  # First 8 bytes = encrypted payload
#         freshness_value = msg.data[8:12]  # Next 4 bytes = freshness value
#         received_mac = msg.data[12:16]    # Last 4 bytes = MAC

#         # Verify MAC
#         if verify_mac(encrypted_payload, freshness_value, received_mac):
#             decrypted_payload = decrypt_message(encrypted_payload)

#             # Verify freshness (prevent replay attacks)
#             received_time = int.from_bytes(freshness_value, byteorder='big')
#             current_time = int(time.time())
#             if current_time - received_time > 5:  # Allow 5 sec tolerance
#                 print(f"️ Warning: Possible Replay Attack Detected!")
#             else:
#                 print(f" Valid Message Received: {decrypted_payload.decode()}")
#         else:
#             print(f" MAC Verification Failed! Possible Spoofing Attack.")
