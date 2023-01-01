from django.shortcuts import render
from .models import Blog,Tagok, Headvideo
from galeria.models import Esemeny, Photos
from galeria.models import Photos
from django.http import JsonResponse
import datetime
# Create your views here.

# home.html 


def home(request):
    video=Headvideo.objects.first()
    return render(request, 'home/home.html', { 'video': video})

def home_blog(request):
    blogqs=Blog.objects.order_by('-date')[:5]
    blog=[]
    for obj in blogqs:
        kepek=Photos.objects.filter(esemeny=obj.kepek).first().preview.url
        item={
            'id': obj.id,
            'nev': obj.posztolo_neve,
            'cim': obj.cim,
            'poszt': obj.poszt,
            'kep': kepek,
            'esemeny_datuma': obj.esemeny_datuma,
            'blog_tipus': obj.blog_tipus,
            'date': obj.date.strftime("%Y.%m.%d %H:%M"),
        }
        blog.append(item)
    return JsonResponse({'blog':blog})


def gallery_home(request):
    not_good="blog"
    esemenyqs=Esemeny.objects.exclude(theme_key=not_good).order_by('-update')[:5]
    esemeny=[]
    for obj in esemenyqs:
        kepek=Photos.objects.filter(esemeny=obj.esemeny_key).first().preview.url
        tema=str(obj.theme_key.theme_key)
        galeria_link="/galeria/"+tema+"/"+str(obj.esemeny_key)
        item={
            'id': obj.esemeny_key,
            'cim': obj.esemeny,
            'kep': kepek,
            'galleria': galeria_link,
            'esemeny_datuma': obj.esemeny_date,
            'date': obj.update.strftime("%Y.%m.%d %H:%M"),
        }
        esemeny.append(item)
    return JsonResponse({'esemeny':esemeny})


# tagok.html


def tagok(request):
    tagok=Tagok.objects.all().order_by("beosztas")
    return render(request, 'home/tagok.html', {'tagok':tagok})

# blog.html


def blog(request):
    return render(request, 'home/blog.html')

def blog_all(request):
    blogqs=Blog.objects.all().order_by('-date')
    blog=[]
    for obj in blogqs:
        tema=str(obj.kepek.theme_key.theme_key)
        galeria_link="/galeria/"+tema+"/"+str(obj.kepek.esemeny_key)
        jqkepek=Photos.objects.filter(esemeny=obj.kepek).all()
        kepurls=[]
        for img in jqkepek:
            kepurls.append(img.kepek.url)
        item={
            'id': obj.id,
            'nev': obj.posztolo_neve,
            'cim': obj.cim,
            'poszt': obj.poszt,
            'kep': kepurls,
            'galeria':galeria_link,
            'esemeny_datuma': obj.esemeny_datuma,
            'blog_tipus': obj.blog_tipus,
            'date': obj.date.strftime("%Y.%m.%d %H:%M"),
        }
        blog.append(item)
    return JsonResponse({'blog':blog})

# naptar

def enaptar(request):
    return render(request, 'home/esemeny_naptar.html')

# elerhetoseg

def elerhetoseg(request):
    return render(request, 'home/elerhetoseg.html')