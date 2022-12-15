import re
from django.shortcuts import render

from szmcscs350.settings import STATIC_URL, STATICFILES_DIRS
from .models import Segedlet
import os
from django.conf import settings
from django.http import JsonResponse
from home.models import Ors,Tagok
# Create your views here.



def home(request):
    return render(request, 'csapat/home.html')

def seged(request, order):
    segedjq= Segedlet.objects.all().order_by(order)

    data=[]

    for obj in segedjq:
        item={
            'tema': obj.tema.temakor,
            'cim': obj.cim,
            'file': obj.file.url,
            'file_tipus': os.path.join(STATIC_URL, obj.file_tipus),
            'date': obj.date,
        }

        data.append(item)

    return JsonResponse({'data':data})

def csptori(request):
    osszletszam=0
    csp=""
    vezetoseg=0
    csstk=0
    cstk=0
    ovk=0
    oszors=0
    qsorsok=Ors.objects.all()
    orsok=[]
    for obj in qsorsok:
        if obj.segedorsvezeto==True:
            pfo=2
            ovk+=2
        else:
            pfo=1
            ovk+=1
        item={
            "orsvezeto":obj.orsvezeto,
            "orsnev":obj.orsnev,
            "letszam":obj.orsletszam+pfo,
        }
        osszletszam+=obj.orsletszam+pfo
        orsok.append(item)
        oszors+=1

    qstagok=Tagok.objects.all()

    for obj in qstagok:
        if obj.kepesites==1: cstk+=1
        elif obj.kepesites==2: csstk+=1
        if obj.kepesites!=3: vezetoseg+=1
    vov=""
    if Tagok.objects.filter(beosztas=1).first():
        vov=Tagok.objects.filter(beosztas=1).first().nev
    else:
        vov="none"
    item={
        "letszam":vezetoseg,
        "orsnev":"vezetőség",
        "orsvezeto": vov
    }
    orsok.append(item)

    for obj in orsok:
        osszletszam+=vezetoseg


    data={
        "orsok":orsok,
        "oszletszam":osszletszam,
        "tagok":qstagok,
        "vezetoseg":{"cst":cstk,"csst":csstk,"ov":ovk},
        "osszors":oszors
    }

    return render(request, "csapat/csapat_tori.html",{"data":data})

def csrtori(request):
    return render(request, "csapat/cserkesz_tori.html")