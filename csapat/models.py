from django.db import models
import cv2
import os
from home.models import resize
from django.template.defaultfilters import slugify
# Create your models here.



class Temakor(models.Model):
    temakor= models.CharField(max_length=20, blank=True)
    tema_kulcs=models.SlugField( editable=False, blank=True, primary_key=True, unique=True )
    # kep= models.ImageField(blank=True, upload_to='file/boritokepek')
    date = models.DateField(auto_now_add=True)

    class META:
        managed = True
        db_table='Temakor'

    def save(self):
        self.tema_kulcs=slugify(self.temakor)
        super(Temakor, self).save()
        # fullpath = os.path.abspath(os.path.join(settings.MEDIA_ROOT, self.kep.name))
        # resize(200,fullpath,'ratio')

    def __str__(self):
        return str( self.temakor )

    

#--------------------------------------------------------------------------------------

class Segedlet(models.Model):

    filetipusvalasztek=[
        ("icons/ppt.png",'ppt'),
        ("icons/pdf.png",'pdf'),
        ("icons/doc.png",'doc'),
        ("icons/txt.png",'txt'),
        ("icons/png.png",'png'),
        ("icons/jpg.png",'jpg'),
        ("icons/mp4.png",'mp4'),
        ("icons/zip.png",'zip')
    ]

    tema= models.ForeignKey("Temakor", on_delete=models.CASCADE)
    cim= models.CharField(max_length=50, blank=True)
    file = models.FileField(upload_to='file', blank=True)
    file_tipus = models.CharField( default='ppt',max_length=13, choices=filetipusvalasztek)
    date = models.DateField(auto_now_add=True)

    class META:
        managed = True
        db_table='Segedlet'

    def save(self):
        super(Segedlet, self).save()

    def __str__(self):
        return str(self.cim)



#______________________________________________________________________________________________________________________________________________________________________________