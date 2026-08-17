import fitz
import os

pdf_path = r'C:\Users\ACER\Downloads\FSP PRO (1).pdf'
output_dir = r'C:\Users\ACER\Desktop\Esyifaa\pdf_extracted'
os.makedirs(output_dir, exist_ok=True)
os.makedirs(os.path.join(output_dir, 'images'), exist_ok=True)

doc = fitz.open(pdf_path)
pages_data = []
img_count = 0

for page_num in range(len(doc)):
    page = doc[page_num]
    text = page.get_text()
    
    # Extract images
    page_images = []
    image_list = page.get_images(full=True)
    for img_index, img in enumerate(image_list):
        xref = img[0]
        base_image = doc.extract_image(xref)
        image_bytes = base_image['image']
        image_ext = base_image['ext']
        img_filename = 'img_p' + str(page_num+1) + '_' + str(img_index+1) + '.' + image_ext
        img_path = os.path.join(output_dir, 'images', img_filename)
        with open(img_path, 'wb') as f:
            f.write(image_bytes)
        page_images.append(img_filename)
        img_count += 1
    
    pages_data.append({
        'page': page_num + 1,
        'text': text,
        'images': page_images
    })

# Save full text
full_text = ''
for p in pages_data:
    full_text += '\n=== PAGE ' + str(p['page']) + ' ===\n'
    full_text += p['text']
    if p['images']:
        full_text += '\n[IMAGES ON PAGE: ' + ', '.join(p['images']) + ']\n'

with open(os.path.join(output_dir, 'content.txt'), 'w', encoding='utf-8') as f:
    f.write(full_text)

print('Done! ' + str(len(doc)) + ' pages, ' + str(img_count) + ' images extracted')
print('Output: ' + output_dir)
