from PIL import Image, ImageOps
from pathlib import Path
import json, shutil
root=Path(__file__).resolve().parents[1]
legacy=root/'legacy/for-new-agent'
assets={
 'hero':'source-evolution/images/block-2/img_3363-15-06-22-18-43.jpg',
 'tactile-cones':'source-evolution/images/block-1/plitka3.png',
 'tactile-lines':'source-evolution/images/block-1/plitka2.png',
 'tactile-diagonal':'source-evolution/images/block-1/plitka1.png',
 'tactile-stock':'source-evolution/images/block-2/img_1860-15-06-22-18-43.jpg',
 'tactile-pallets':'source-evolution/images/block-2/img_2864-15-06-22-18-43.jpg',
 'tactile-squares':'source-evolution/images/block-2/img_4649-15-06-22-18-43.jpg',
 'tactile-installation':'source-evolution/images/work/1542073708343_default-1.jpg',
 'tactile-walkway':'source-evolution/images/work/image00009.jpg',
 'tactile-crossing':'source-evolution/images/work/image00004.jpg',
 'brick':'source-wayback-static/cache/widgetkit/gallery/55/Image00003-ba7f9e23ce.jpg',
 'grass':'source-wayback-static/cache/widgetkit/gallery/73/002-1be5fb2a72.JPG',
 'coil':'source-wayback-static/cache/widgetkit/gallery/54/Image00004-c14fe0f2d0.jpg',
 'star':'source-wayback-static/cache/widgetkit/gallery/36/Image00008-0bb5a02e7b.jpg',
 'eight-bricks':'source-wayback-static/cache/widgetkit/gallery/37/Image00008-c4ca06c23b.jpg',
 'fence':'source-wayback-static/cache/widgetkit/gallery/70/003-74fe9f35ab.JPG',
 'gates':'source-wayback-static/cache/widgetkit/gallery/65/Image00001-4dff3fee5f.jpg',
 'client-brest':'source-evolution/images/block-2/logotip_brestzhilstroy.jpg',
 'client-road':'source-evolution/images/block-2/bez-nazvaniya.png',
 'client-bus':'source-evolution/images/block-2/logo.png',
}
manifest={}
for name,rel in assets.items():
 p=legacy/rel; im=ImageOps.exif_transpose(Image.open(p)); im.thumbnail((1400,1400)); im=im.convert('RGBA' if 'A' in im.getbands() else 'RGB')
 im.save(root/f'public/images/{name}.webp','WEBP',quality=84)
 manifest[name]={'src':f'/images/{name}.webp','width':im.width,'height':im.height,'source':str(p.relative_to(root))}
 if name=='hero':
  im.thumbnail((700,700));im.save(root/'public/images/hero-small.webp','WEBP',quality=82)
shutil.copyfile(root/'legacy/certificate_tactile.jpg',root/'public/documents/certificate-tactile.jpg')
for name,file in [('letter-1','img_5917-15-06-22-18-44.jpg'),('letter-2','img_5918-15-06-22-18-44.jpg'),('letter-3','img_5919-15-06-22-18-44.jpg')]:
 shutil.copyfile(legacy/'source-evolution/images/block-2'/file,root/f'public/documents/{name}.jpg')
(root/'src/data/media.json').write_text(json.dumps(manifest,ensure_ascii=False,indent=2))
print('Prepared',len(manifest),'images and four original documents.')
