import json
from urllib.parse import urlparse

try:
    with open('src/data/products.json', 'r', encoding='utf-8') as f:
        products = json.load(f)

    domains = set()
    protocols = set()

    for p in products:
        images = p.get('images', [])
        for img in images:
            if img:
                parsed = urlparse(img)
                if parsed.netloc:
                    domains.add(parsed.netloc)
                if parsed.scheme:
                    protocols.add(parsed.scheme)

    print("Domains found:")
    for d in sorted(domains):
        print(d)
    
    print("\nProtocols found:")
    for p in sorted(protocols):
        print(p)

except Exception as e:
    print(f"Error: {e}")
