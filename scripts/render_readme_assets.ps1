$ErrorActionPreference = "Stop"
New-Item -ItemType Directory -Force -Path "screenshots" | Out-Null
@'
from PIL import Image, ImageDraw, ImageFont
W,H=1280,720
bg=(5,8,18); panel=(13,23,39); text=(244,241,234); muted=(168,179,199); cyan=(37,215,239); green=(88,240,179); pink=(255,114,182); violet=(157,140,255)
try:
    title=ImageFont.truetype('C:/Windows/Fonts/segoeuib.ttf', 62)
    body=ImageFont.truetype('C:/Windows/Fonts/segoeui.ttf', 25)
    small=ImageFont.truetype('C:/Windows/Fonts/consolab.ttf', 18)
    serif=ImageFont.truetype('C:/Windows/Fonts/georgiab.ttf', 48)
except Exception:
    title=body=small=serif=ImageFont.load_default()
im=Image.new('RGB',(W,H),bg); d=ImageDraw.Draw(im)
d.rounded_rectangle([48,48,1232,672], radius=28, fill=panel, outline=violet, width=2)
d.text((96,106),'TRAVEL PRICING VOLATILITY ROUTER',font=small,fill=green)
d.text((96,178),'Fare pressure stays visible',font=serif,fill=text)
d.text((96,238),'before conversion breaks.',font=serif,fill=text)
d.text((96,332),'Fare spikes, load factor, fuel movement, demand pressure,',font=body,fill=muted)
d.text((96,372),'search-to-book drag, and blackout windows route to action.',font=body,fill=muted)
for i,(label,val) in enumerate([('FARE PRESSURE','$307'),('AVG VOLATILITY','72.6'),('REROUTE ROUTES','2'),('TOP ROUTE','ATL ORL')]):
    x=96+i*272
    d.rounded_rectangle([x,490,x+240,604],radius=18,fill=(16,28,48),outline=(40,48,66),width=1)
    d.text((x+20,528),label,font=small,fill=muted)
    d.text((x+20,562),val,font=title if i < 3 else small,fill=text)
im.save('screenshots/01-overview-proof.png')

def card(draw, xy, size, outline, label, heading, lines, metric):
    x,y=xy; w,h=size
    draw.rounded_rectangle([x,y,x+w,y+h], radius=22, fill=panel, outline=outline, width=2)
    draw.text((x+28,y+34), label, font=small, fill=cyan)
    yy=y+82
    for line in heading:
        draw.text((x+28, yy), line, font=body, fill=text)
        yy += 34
    yy += 18
    for line in lines:
        draw.text((x+28, yy), line, font=body, fill=muted)
        yy += 31
    draw.text((x+28, y+h-86), metric, font=title, fill=text)
im=Image.new('RGB',(W,H),bg); d=ImageDraw.Draw(im)
d.text((64,70),'Route volatility lanes',font=serif,fill=text)
card(d,(64,150),(360,430),pink,'REROUTE',['Atlanta Orlando','summer'],['Family demand and','fare pressure need','inventory routing.'],'100.0')
card(d,(464,150),(360,430),violet,'REROUTE',['SFO Tokyo','award window'],['Award inventory and','partner seats need','one pricing review.'],'91.2')
card(d,(864,150),(360,430),green,'STABLE',['NYC London','business'],['Executive fare story','is stable without','promo dilution.'],'26.7')
im.save('screenshots/02-route-proof.png')
'@ | python -
