import os
import requests
import shutil

from PIL import Image

uuid = input('Input UUID:')

os.mkdir(uuid)

def get_face(uuid, face_pos, mask_pos, name, flip=False):
    im_face = Image.open('{0}/skin.png'.format(uuid)).crop(face_pos)
    im_mask = Image.open('{0}/skin.png'.format(uuid)).crop(mask_pos)
    im_face.paste(im_mask, (0,0), im_mask) # passing the mask image as its own mask allows for transparency

    if flip:
        im_face = im_face.rotate(180)

    im_face.save('{0}/{1}.png'.format(uuid, name))

url = 'https://mc-heads.net/skin/{0}'.format(uuid)
response = requests.get(url, stream=True)
with open(uuid + '/skin.png', 'wb') as out_file:
    shutil.copyfileobj(response.raw, out_file)
del response

get_face(uuid, (0, 8, 8, 16), (32, 8, 40, 16), 'nx') # left side
get_face(uuid, (16, 0, 24, 8), (48, 0, 56, 8), 'ny', True) # bottom
get_face(uuid, (24, 8, 32, 16), (56, 8, 64, 16), 'nz') # back
get_face(uuid, (16, 8, 24, 16), (48, 8, 56, 16), 'px') # right side
get_face(uuid, (8, 0, 16, 8), (40, 0, 48, 8), 'py') # top
get_face(uuid, (8, 8, 16, 16), (40, 8, 48, 16), 'pz') # front



