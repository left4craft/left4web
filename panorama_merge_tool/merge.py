import sys
from PIL import Image

list_im = ['1.png', '3.png', '4.png', '5.png', '0.png', '2.png', 'black.png', 'black.png']

images = [Image.open(x) for x in list_im]
widths, heights = zip(*(i.size for i in images))

total_width = sum(widths)
max_height = max(heights)

new_im = Image.new('RGB', (total_width, max_height))

x_offset = 0
for im in images:
  new_im.paste(im, (x_offset,0))
  x_offset += im.size[0]

new_im.save('merged.png')