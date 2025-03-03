from Crypto.Cipher import AES
from Crypto.Util.Padding import pad, unpad
import hmac
import hashlib
import time

# Shared secret keys (must be the same for encryption & decryption)
AES_KEY = b'SecureCAN_123456'   # Must be exactly 16 bytes
HMAC_KEY = b'HMACSecretKey_123'  # HMAC Key for authentication

# Sample data
original_data = b'ENG_ON'  # Example engine control command (6 bytes)

# Generate Freshness Value (Timestamp)
freshness_value = int(time.time()).to_bytes(4, 'big')  # 4-byte timestamp

# Encrypt Message
def encrypt_message(data):
    cipher = AES.new(AES_KEY, AES.MODE_ECB)
    padded_data = pad(data, AES.block_size)
    print(f"🔹 Expected Plaintext Before Encryption: {padded_data.hex()}")  # Debugging
    encrypted_data = cipher.encrypt(padded_data)
    return encrypted_data[:8]  # Truncate to 8 bytes for CAN

# Generate MAC
def generate_mac(data, freshness_value):
    return hmac.new(HMAC_KEY, data + freshness_value, hashlib.sha256).digest()[:4]  # 4-byte MAC

# Encrypt Data & Generate MAC
encrypted_payload = encrypt_message(original_data)
mac = generate_mac(encrypted_payload, freshness_value)

# Construct Secure Message
secure_message = encrypted_payload + freshness_value + mac  # 8 + 4 + 4 = 16 bytes

print(f"🔹 Encrypted Data (Hex): {encrypted_payload.hex()}")
print(f"🔹 Freshness Value (Hex): {freshness_value.hex()}")
print(f"🔹 MAC (Hex): {mac.hex()}")
print(f"🔹 Packed Secure Message: {secure_message.hex()}")

# Now Try to Decrypt
def decrypt_message(encrypted_data):
    cipher = AES.new(AES_KEY, AES.MODE_ECB)
    encrypted_payload = encrypted_data.ljust(16, b'\x00')  # Pad to 16 bytes
    decrypted_data = cipher.decrypt(encrypted_payload)
    print(f"🔹 Decrypted Data (Raw Hex After Decryption): {decrypted_data.hex()}")  # Debugging
    return unpad(decrypted_data, AES.block_size)

# Unpack Secure Message
received_encrypted_payload = secure_message[:8]  # Extract first 8 bytes
received_freshness_value = secure_message[8:12]  # Extract next 4 bytes
received_mac = secure_message[12:16]  # Extract last 4 bytes

# Decrypt and Verify
decrypted_payload = decrypt_message(received_encrypted_payload)
print(f"✅ Valid Message Received: {decrypted_payload.decode()}")

# Verify MAC
expected_mac = generate_mac(received_encrypted_payload, received_freshness_value)
print(f"🔹 Expected MAC: {expected_mac.hex()} | Received MAC: {received_mac.hex()}")
if expected_mac == received_mac:
    print("✅ MAC Verification Successful!")
else:
    print("❌ MAC Verification Failed!")
