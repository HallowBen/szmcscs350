from django.db import models
import os
from django.conf import settings
from django.template.defaultfilters import slugify
from galeria.models import rotate_image, resize, convertImage


class Blog(models.Model):

    Tipus_choices=[
        ('be','beszámoló'),
        ('me','meghívó')
    ]

    posztolo_neve= models.CharField(max_length=50, blank=True)
    cim= models.CharField(max_length=20, blank=True)
    poszt = models.TextField(blank=True)
    kepek= models.ForeignKey("galeria.Esemeny", on_delete=models.CASCADE)
    boritokep = models.ImageField( upload_to="blog/", blank=True)
    esemeny_datuma= models.DateField( blank=True)
    blog_tipus=models.CharField( 
        max_length=2,
        choices=Tipus_choices,
        default='be'
    )
    date = models.DateTimeField(auto_now_add=True)

    def save(self):
        super(Blog, self).save()
        if self.boritokep:
            fullpath = os.path.abspath(os.path.join(settings.MEDIA_ROOT, self.boritokep.name))
            resize(1200, fullpath, 'ratio')
            rotate_image(fullpath)



#______________________________________________________________________________________________________________________________________________________________________________



class Tagok(models.Model):
    beosztas_choices=[
        ('1','csapatparancsnok'),
        ('2','csapatparancsnok helyettes'),
        ('3','rajparancsnok parancsnok'),
        ('4','segéd tiszt'),
        ('5','őrs vezető'), 
    ]
    kepesites_choices=[
        ('1','cst'),
        ('2','csst'),
        ('3','őv'),
    ]

    tag_key=models.SlugField(max_length=50, unique=True, primary_key=True, blank=True, editable=False)

    profilkep=models.ForeignKey("ProfilKepek", on_delete=models.CASCADE, blank=True, null=True )
    
    beosztas=models.CharField( 
        max_length=1,
        choices=beosztas_choices,
        blank=True
    )
    
    kepesites=models.CharField( 
        max_length=1,
        choices=kepesites_choices,
        blank=True
    )

    nev=models.CharField( max_length=25 )

    class META:
        managed = True
        db_table='Tagok'
        Order = "beosztas"

    def __str__(self):
        return str(self.nev)

    def save(self, *args, **kwargs):
        self.tag_key = slugify(self.nev)
        super(Tagok, self).save(*args, **kwargs)

#--------------------------------------------------------------------------------------

class ProfilKepek(models.Model):
    nev=models.CharField( max_length=25 )
    kep= models.ImageField( upload_to='profilkepek/', blank=True , default="profilkepek/default_profile.jpg")

    class META:
        managed = True
        db_table='ProfilKepek'

    def save(self):
        super(ProfilKepek, self).save()
        fullpath = os.path.abspath(os.path.join(settings.MEDIA_ROOT, self.kep.name))
        resize(400, fullpath, 'profile')
        rotate_image(fullpath)
        
    def __str__(self):
        return str(self.nev)

#--------------------------------------------------------------------------------------

class Ors(models.Model):
    
    orsvezeto=models.ForeignKey("Tagok", on_delete=models.CASCADE, blank=True )
    segedorsvezeto=models.BooleanField(default=False)
    orsnev=models.CharField( max_length=50)
    orskep=models.ImageField(upload_to="home/orsok/", blank=True)
    orsletszam=models.IntegerField()

    class META:
        managed = True
        db_table='Leiras'


    def save(self):
        super(Ors, self).save()
        if self.orskep:
            fullpath = os.path.abspath(os.path.join(settings.MEDIA_ROOT, self.orskep.name))
            resize(1200,fullpath,'ratio')
            rotate_image(fullpath)

    def __str__(self):
        return str(self.orsnev)
        


#______________________________________________________________________________________________________________________________________________________________________________



class Headvideo(models.Model):
    name=models.CharField( max_length=25 )
    video=models.FileField( upload_to="home" )
    
def __str__(self):
    return str(self.name)