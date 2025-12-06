import csv
import json
import re
import os
from collections import defaultdict

# Configuration
INPUT_FILE = 'products_export_1 (1).csv'
OUTPUT_CSV = 'cleaned_products.csv'
OUTPUT_JSON = 'src/data/products.json'

def clean_html(raw_html):
    if not raw_html:
        return ""
    # Remove data-*, class, style attributes
    clean = re.sub(r'\s+(data-[a-z-]+|class|style)="[^"]*"', '', raw_html)
    # Remove empty tags (e.g., <p></p>, <span></span>)
    clean = re.sub(r'<[^\/>][^>]*>\s*<\/[^>]+>', '', clean)
    # Remove specific unwanted tags but keep content if needed, or just strip excessive whitespace
    clean = re.sub(r'\s+', ' ', clean).strip()
    return clean

def parse_price(price_str):
    try:
        return float(price_str)
    except (ValueError, TypeError):
        return 0.0

def process_products():
    products = defaultdict(lambda: {
        'id': None,
        'title': '',
        'description': '',
        'vendor': '',
        'type': '',
        'tags': [],
        'options': defaultdict(set),
        'variants': [],
        'images': [],
        'price_range': {'min': float('inf'), 'max': float('-inf')},
        'compare_at_price_range': {'min': float('inf'), 'max': float('-inf')}
    })

    final_products = []
    
    if os.path.exists(INPUT_FILE):
        with open(INPUT_FILE, mode='r', encoding='utf-8') as csvfile:
            reader = csv.DictReader(csvfile)
            
            for row in reader:
                handle = row['Handle']
                if not handle:
                    continue
                
                prod = products[handle]
                
                # Basic Info (only from the first row encountered for this handle, usually the main one)
                if not prod['title']:
                    prod['title'] = row['Title']
                    prod['description'] = clean_html(row['Body (HTML)'])
                    prod['vendor'] = row['Vendor']
                    prod['type'] = row['Type']
                    prod['tags'] = [t.strip() for t in row['Tags'].split(',')] if row['Tags'] else []
                
                # Images
                if row['Image Src']:
                    if row['Image Src'] not in prod['images']:
                        prod['images'].append(row['Image Src'])
                
                # Variants & Options
                # Collect Options
                for i in range(1, 4):
                    opt_name = row.get(f'Option{i} Name')
                    opt_val = row.get(f'Option{i} Value')
                    if opt_name and opt_val:
                        prod['options'][opt_name].add(opt_val)
                
                # Variant Data
                price = parse_price(row.get('Variant Price'))
                compare_price = parse_price(row.get('Variant Compare At Price'))
                
                if price > 0:
                    prod['price_range']['min'] = min(prod['price_range']['min'], price)
                    prod['price_range']['max'] = max(prod['price_range']['max'], price)
                
                if compare_price > 0:
                    prod['compare_at_price_range']['min'] = min(prod['compare_at_price_range']['min'], compare_price)
                    prod['compare_at_price_range']['max'] = max(prod['compare_at_price_range']['max'], compare_price)
    
                variant = {
                    'sku': row.get('Variant SKU'),
                    'price': price,
                    'compare_at_price': compare_price,
                    'inventory_qty': row.get('Variant Inventory Qty'),
                    'options': {}
                }
                for i in range(1, 4):
                    opt_name = row.get(f'Option{i} Name')
                    opt_val = row.get(f'Option{i} Value')
                    if opt_name and opt_val:
                        variant['options'][opt_name] = opt_val
                
                prod['variants'].append(variant)
    
        # Finalize Data Structure
        product_id_counter = 1
        
        for handle, data in products.items():
            # Convert sets to lists for JSON serialization
            options_list = {k: list(v) for k, v in data['options'].items()}
            
            # Determine main price (use min price for display)
            display_price = data['price_range']['min'] if data['price_range']['min'] != float('inf') else 0
            original_price = data['compare_at_price_range']['min'] if data['compare_at_price_range']['min'] != float('inf') else 0
            
            # Extract specific options like Size and Color if they exist
            sizes = options_list.get('Size', []) + options_list.get('SIZE', [])
            # Normalize sizes
            sizes = sorted(list(set(sizes)))
            
            final_prod = {
                'id': product_id_counter,
                'handle': handle,
                'title': data['title'],
                'description': data['description'],
                'price': display_price,
                'originalPrice': original_price,
                'discount': round(((original_price - display_price) / original_price * 100)) if original_price > display_price else 0,
                'images': data['images'],
                'sizes': sizes,
                'category': data['type'] or 'Lehenga', # Default to Lehenga if empty, based on data
                'tags': data['tags'],
                'sku': data['variants'][0]['sku'] if data['variants'] else '',
                'stock': sum(int(v['inventory_qty'] or 0) for v in data['variants'])
            }
            final_products.append(final_prod)
            product_id_counter += 1

        # Write JSON (only if we processed from CSV)
        with open(OUTPUT_JSON, 'w', encoding='utf-8') as f:
            json.dump(final_products, f, indent=4)

    elif os.path.exists(OUTPUT_JSON):
        print(f"Input file '{INPUT_FILE}' not found. Loading from '{OUTPUT_JSON}'...")
        with open(OUTPUT_JSON, 'r', encoding='utf-8') as f:
            final_products = json.load(f)
    else:
        print(f"Error: Input file '{INPUT_FILE}' and JSON '{OUTPUT_JSON}' not found.")
        return
    
    # Write CSV
    with open(OUTPUT_CSV, 'w', newline='', encoding='utf-8') as csvfile:
        fieldnames = ['id', 'handle', 'title', 'price', 'originalPrice', 'discount', 'category', 'sizes', 
                     'stock', 'images', 'image_1', 'image_2', 'image_3', 'image_4', 'image_5', 
                     'description', 'tags', 'sku']
        writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
        
        writer.writeheader()
        for p in final_products:
            row = p.copy()
            row['sizes'] = ', '.join(p['sizes'])
            row['images'] = ', '.join(p['images'])
            row['tags'] = ', '.join(p['tags'])
            
            # Populate individual image columns
            for i in range(5):
                img_key = f'image_{i+1}'
                if i < len(p['images']):
                    row[img_key] = p['images'][i]
                else:
                    row[img_key] = ''
            
            writer.writerow(row)

    print(f"Successfully processed {len(final_products)} products.")
    print(f"JSON saved to {OUTPUT_JSON}")
    print(f"CSV saved to {OUTPUT_CSV}")

if __name__ == '__main__':
    process_products()
