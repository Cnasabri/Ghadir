"""Extract web assets from the supplied album; originals remain intact."""
from pathlib import Path
from PIL import Image
import json

root=Path(__file__).parent
out=root/'assets'
(out/'web').mkdir(exist_ok=True)
(out/'plans').mkdir(exist_ok=True)
for i in range(33):
    im=Image.open(out/'pages'/f'page-{i:03}.jpg')
    im.thumbnail((2000,1000))
    im.save(out/'web'/f'page-{i+1:02}.webp',quality=86)
# The first plan is on the left; remaining plans are on the right.
floors=[16,17,20,21,24,25,28]
for floor,page in enumerate(floors,1):
    im=Image.open(out/'pages'/f'page-{page:03}.jpg')
    w,h=im.size
    plan=im.crop((0,0,w//2,h)) if floor in (1,3,5,7) else im.crop((w//2,0,w,h))
    specs=im.crop((w//2,0,w,h)) if floor in (1,3,5,7) else im.crop((0,0,w//2,h))
    plan.save(out/'plans'/f'floor-{floor}.jpg',quality=94)
    specs.save(out/'plans'/f'specs-{floor}.jpg',quality=94)
# Crops of actual source photographs, without printed text blocks.
crops={'hero':(30,(0,0,.5,1)), 'exterior':(6,(.5,0,1,1)),
       'lobby':(8,(0,0,.5,1)), 'garden':(11,(.5,0,1,1)),
       'pool':(12,(0,0,.5,1)), 'parking':(14,(0,0,.5,.5)),
       'living':(26,(0,0,.5,1)), 'bedroom':(23,(0,0,.5,1)),
       'night':(32,(0,0,.5,1)), 'terrace':(11,(0,0,.24,1))}
for name,(page,box) in crops.items():
    im=Image.open(out/'pages'/f'page-{page:03}.jpg');w,h=im.size
    im=im.crop(tuple(round(v*(w if j%2==0 else h)) for j,v in enumerate(box)))
    im.thumbnail((2200,1800));im.save(out/'web'/f'{name}.webp',quality=90)
im=Image.open(out/'pages'/'page-000.jpg')
im.crop((4000,1000,5100,1750)).save(out/'web'/'logo.webp',quality=95)
print('Prepared 33 pages, seven plans and photograph crops.')
