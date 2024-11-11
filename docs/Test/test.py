from pyignite import Client

# Initialize the Ignite client
client = Client()

# Connect to the Ignite server running in Docker
#client.connect('localhost', 10800)
client.connect('172.19.1.10', 10800)


# Example: create a cache and insert data
cache = client.get_or_create_cache('my_cache')

# Put and get some values
cache.put('key', 'value2')
result = cache.get('key')

print(f"Retrieved value: {result}")  # Should print "value"

# Clean up
client.close()
