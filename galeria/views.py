from django.shortcuts import render
from django.http import JsonResponse
from .models import Esemeny, Theme, Photos, Videos

# Create your views here.

def g_temak(request):
    temak=Theme.objects.all()
    return render(request, 'gallery/gallery_theme.html', {'title': "Galléria", 'temak':temak})


def g_esemenyek(request, tema_kulcs):
    temak=Theme.objects.filter(theme_key=tema_kulcs).all()
    for obj in temak:
        tema={
            'theme_key':obj.theme_key,
            'temakor':obj.temakor,
            'boritokep':obj.boritokep,
            'date':obj.date,
        }   
   
    esemenyek=Esemeny.objects.filter(theme_key=tema_kulcs).all().order_by('-esemeny_date')
    
    return render(request, 'gallery/gallery_esemeny.html', {'title': "Galléria", 'esemenyek':esemenyek, 'tema':tema})




def g_esemeny_kepek(request, tema_kulcs, esemeny_kulcs):
    
    temak=Theme.objects.filter(theme_key=tema_kulcs).all()
    for obj in temak:
        tema={
            'theme_key':obj.theme_key,
            'temakor':obj.temakor,
            'boritokep':obj.boritokep,
            'date':obj.date,
        }

    esemenyek=Esemeny.objects.filter(esemeny_key=esemeny_kulcs).all()
    for obj in esemenyek:
        esemeny={
            'theme_key':obj.theme_key,
            'esemeny':obj.esemeny,
            'esemeny_key':obj.esemeny_key,
            'date':obj.date,
            'update':obj.update.strftime("%Y.%m.%d %H:%M"),
            'esemeny_date':obj.esemeny_date,
            'kepszam': obj.kepszam,
        }

    qskepek=Photos.objects.filter(esemeny=esemeny_kulcs).all()
    kdata=[]
    for obj in qskepek:
        kepek={
            'id':obj.id,
            'esemeny': obj.esemeny,
            'preview': obj.preview,
            'kepek': obj.kepek,
            'date':obj.date,
        }
        kdata.append(kepek)


    qsvideok=Videos.objects.filter(esemeny=esemeny_kulcs).all()
    vdata=[]
    for obj in qsvideok:
        videok={
            'id':obj.id,
            'esemeny': obj.esemeny,
            'video': obj.video,
            'type': obj.type,
            'date':obj.date,
        }
        vdata.append(videok)

    return render(request, 'gallery/gallery_photos.html', {'title': "Galléria",  'esemeny':esemeny, 'tema':tema, 'kepek':kdata,'videok':vdata,})
