from curses.ascii import isdigit
from distutils.command.upload import upload
from django.db import models
import os
import cv2
from django.conf import settings

from imagekit.models import ImageSpecField
from imagekit.processors import ResizeToFill

from django.template.defaultfilters import slugify

from PIL import Image, ExifTags
from django.db.models.signals import post_save
from django.dispatch import receiver
import time, datetime


def content_file_name(instance, filename):
    fname,ext = filename.split('.')
    newfname= "%s.%s" % ( str(slugify(fname)), ext)
    # current_d=datetime.date.today()
    # str_current_d=current_d.strftime("%Y_%m_%d")
    return os.path.join('galeria/',instance.esemeny.esemeny_key, newfname)


def resize(sizeforratio, fullpath, type, sizeforratio2=0):
    #wanted size landscape(1200*x) portrait(x*1200) 
    img=cv2.imread(fullpath)
    if type=='ratio':
        if img.shape[1]<img.shape[0]:
            ratio=sizeforratio/img.shape[0]
            width = int(img.shape[1]*ratio)
            height = int(img.shape[0]*ratio)
            dimension =(width,height)
        else:
            ratio=sizeforratio/img.shape[1]
            width = int(img.shape[1]*ratio)
            height = int(img.shape[0]*ratio)
            dimension =(width,height)


    elif type=='profile':
        width = int(sizeforratio)
        height = int(sizeforratio)
        dimension =(width,height)

    elif type=='fixed':
        if img.shape[1]<img.shape[0]:
            width = int(sizeforratio)
            height= int(sizeforratio2)
            dimension=(width,height)
        elif img.shape[1]>img.shape[0]:
            width = int(sizeforratio2)
            height= int(sizeforratio)
            dimension=(width,height)
        else:
            width = int(sizeforratio)
            height= int(sizeforratio)
            dimension=(width,height)

    resized=cv2.resize(img,dimension,interpolation=cv2.INTER_AREA)
    cv2.imwrite(fullpath,resized)


def rotate_image(filepath):
  try:
    image = Image.open(filepath)
    for orientation in ExifTags.TAGS.keys():
      if ExifTags.TAGS[orientation] == 'Orientation':
            break
    exif = dict(image._getexif().items())

    if exif[orientation] == 3:
        image = image.rotate(180, expand=True)
    elif exif[orientation] == 6:
        image = image.rotate(270, expand=True)
    elif exif[orientation] == 8:
        image = image.rotate(90, expand=True)
    image.save(filepath)
    image.close()
  except (AttributeError, KeyError, IndexError):
    # cases: image don't have getexif
    pass



def convertImage(filepath):
    img = Image.open(filepath)
    print(img.format)
    if img.format!="JPG" and img.format!="JPEG":
        img = img.convert("RGBA")
    
        datas = img.getdata()
    
        newData = []
    
        for item in datas:
            if item[0] == 255 and item[1] == 255 and item[2] == 255:
                newData.append((255, 255, 255, 0))
            else:
                newData.append(item)
    
        img.putdata(newData)
        img.save(filepath)
        img.close()
        print("success")



# Create your models here.

class Theme(models.Model):
    temakor=models.CharField( max_length=50 )
    theme_key=models.SlugField( max_length=50, unique=True, primary_key=True, blank=True, editable=False )
    boritokep = models.ImageField(
         upload_to='galleria_temakor/',
        default=0, 
    )

    boritokep_preview= ImageSpecField(processors=[ResizeToFill(220, 220)], source='boritokep',format='JPEG', options={'quality': 60})

    date = models.DateField( auto_now_add=True )

    class META:
        managed = True
        db_table='Theme'
        ordering = ['date']
        verbose_name_plural = "témák"
        verbose_name = "téma"

    def __str__(self):
            return str( self.temakor )

    def save(self, *args, **kwargs):
        self.theme_key = slugify(self.temakor)
        super(Theme, self).save(*args, **kwargs)
        fullpath = os.path.abspath(os.path.join(settings.MEDIA_ROOT, self.boritokep.name))
        rotate_image(fullpath)
        resize(1200,fullpath, 'ratio')
        # convertImage(fullpath)

    



class Esemeny(models.Model):
    esemeny=models.CharField(max_length=50 )
    esemeny_key=models.SlugField(max_length=50, unique=True, primary_key=True, blank=True, editable=False)

    esemeny_date=models.IntegerField( blank=True, editable=False )

    # boritokep = models.ImageField( 
    #     upload_to='galleria/%Y%m%d/', 
    #     default=0,
    #     )

    theme_key=models.ForeignKey("Theme", on_delete=models.CASCADE)
    date= models.DateField( auto_now_add=True )
    update= models.DateTimeField( auto_now=True )
    class META:
        managed = True
        db_table='Esemeny'
        ordering = ['date']
        verbose_name_plural = "események"
        verbose_name = "esemény"

    def __str__(self):
        return str(self.esemeny)

    def save(self, *args, **kwargs):
        self.esemeny_key = slugify(self.esemeny)
        x=self.esemeny_key.split('-')
        for i in x:
            if i.isdigit():
                self.esemeny_date = i
                super(Esemeny, self).save(*args, **kwargs)

    @property
    def kepszam(self):
        return self.photos_set.count()
    
    
class Videos(models.Model):
    esemeny=models.ForeignKey("Esemeny", default=0, on_delete=models.CASCADE)
    video = models.FileField( upload_to=content_file_name)
    date= models.DateField( auto_now_add=True )
    type= models.SlugField(blank=True, editable=False)

    class META:
        managed = True
        db_table='Videos'
        ordering = ['date']
        verbose_name_plural = "videó"
        verbose_name = "videók"

    def save(self, *args, **kwargs):
        filename, extention= os.path.splitext(self.video.url)
        self.type = slugify(extention)
        super(Videos, self).save(*args, **kwargs)
        
    

class Photos(models.Model):
    esemeny=models.ForeignKey("Esemeny", on_delete=models.CASCADE)
    kepek = models.ImageField(
        upload_to=content_file_name,
        default=0
        )
    preview= ImageSpecField(processors=[ResizeToFill(220, 220)], source='kepek',format='JPEG', options={'quality': 60})
    
    date= models.DateField( auto_now_add=True )

    class META:
        managed = True
        db_table='Photos'
        ordering = ['date']
        verbose_name_plural = "kép"
        verbose_name = "képek"





@receiver(post_save, sender=Photos, dispatch_uid="update_image_profile")
def update_image(sender, instance, **kwargs):
  if instance.kepek:
    BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    fullpath = BASE_DIR + instance.kepek.url
    rotate_image(fullpath)
    resize(1200, fullpath, "ratio")
    convertImage(fullpath)