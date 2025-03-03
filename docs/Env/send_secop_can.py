#! /home/parallels/myenv/bin/python3
import can
import hmac
import hashlib
import time
from Crypto.Cipher import AES
from Crypto.Util.Padding import pad


# Shared secret keys (must be known by both sender and receiver)
AES_KEY = b'SecureCAN_123456'   # 16-byte AES key
HMAC_KEY = b'HMACSecretKey_123'  # Secret key for MAC authentication

def encrypt_message(data):
    """Encrypts the message using AES."""
    cipher = AES.new(AES_KEY, AES.MODE_ECB)  # AES in ECB mode
    print(f"Original Data (Before Padding): {data}")
    padded_data = pad(data.ljust(8, b'\x00'), AES.block_size)  # Pad to 16 bytes
    
    print(f"Padded Data (Hex Before Encryption): {padded_data.hex()}")
    print(f"Expected Plaintext Before Encryption: {padded_data.hex()}") 
    return cipher.encrypt(padded_data)[:8]  # CAN message size is limited to 8 bytes

def generate_mac(data, freshness_value):
    """Generates a MAC using HMAC-SHA256."""
    return hmac.new(HMAC_KEY, data + freshness_value, hashlib.sha256).digest()[:4]  # 4-byte MAC

# Setup virtual CAN interface
bus = can.interface.Bus(channel='vcan0', bustype='socketcan')

# Sample ECU message
original_data = b'ENG_ON'  # Example engine control command (6 bytes)

# Generate Freshness Value (Timestamp)
# freshness_value = str(int(time.time())).encode()[-4:]  # Take the last 4 bytes of the timestamp
freshness_value = int(time.time()).to_bytes(4, 'big')  # 4-byte binary timestamp
print(f"Freshness Value (Hex): {freshness_value.hex()}")

print(f"Original Data (Before Encryption): {original_data}")
# Encrypt the message
encrypted_payload = encrypt_message(original_data)
print(f"Encrypted Data (Hex): {encrypted_payload.hex()}")

# Generate MAC
mac = generate_mac(encrypted_payload, freshness_value)
print(f"MAC (Hex): {mac.hex()}")

# SecOC-secured message: [Encrypted Payload] + [Freshness Value] + [MAC]
secure_message = encrypted_payload + freshness_value + mac  # Total: 8 + 4 + 4 = 16 bytes

# # Send secure CAN message
# msg = can.Message(arbitration_id=0x123, data=secure_message, is_extended_id=False)
# bus.send(msg)

# print(f"Sent Secure CAN Message: {encrypted_payload.hex()} FV: {freshness_value.hex()} MAC: {mac.hex()}")

print(f"Will send message: {secure_message}")

print(f"Sent Frame 1: {secure_message[:8].hex()} (ID: 0x123)")
print(f"Sent Frame 2: {secure_message[8:].hex()} (ID: 0x124)")


# First CAN frame: Send encrypted data + first 2 bytes of freshness value
msg1 = can.Message(arbitration_id=0x123, data= secure_message[:8], is_extended_id=False)
bus.send(msg1)

# Second CAN frame: Send last 2 bytes of freshness value + MAC
msg2 = can.Message(arbitration_id=0x124, data=secure_message[8:], is_extended_id=False)
bus.send(msg2)

print(f"Sent Secure CAN Messages:")
print(f"Frame 1: {msg1.data.hex()} (ID: 0x123)")
print(f"Frame 2: {msg2.data.hex()} (ID: 0x124)")
