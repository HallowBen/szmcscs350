"""szmcscs350 URL Configuration
The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from msilib.schema import Media
from django.contrib import admin
from django.urls import path, include
from galeria import views
from django.conf.urls.static import static
from django.conf import settings

urlpatterns = [
    path('', views.g_temak, name="galeria"),
    path('<slug:tema_kulcs>/', views.g_esemenyek, name="esemeny"),
    path('<slug:tema_kulcs>/<slug:esemeny_kulcs>/', views.g_esemeny_kepek, name="kepek"),
    # path('<slug:tema_kulcs>/<slug:esemeny_kulcs>/<int:cid>', views.g_nagykep, name="g_nagykep"),
]

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
