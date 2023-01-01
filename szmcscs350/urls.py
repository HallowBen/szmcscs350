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
from django.contrib import admin
from django.urls import (path, include, re_path)
from django.conf.urls.static import static
from django.conf import settings
from django.contrib.sitemaps.views import sitemap
from .sitemaps import StaticViewSitemap,StaticViewSitemap2,StaticViewSitemap3

sitemaps = {
    'statics': StaticViewSitemap,
    'statics2':StaticViewSitemap2,
    'statics3':StaticViewSitemap3
}
    
urlpatterns = [
    path('szmcscs_secure_login/', admin.site.urls),
    path('', include('home.urls')),
    path('sitemap.xml', sitemap, {'sitemaps': sitemaps}, name='django.contrib.sitemaps.views.sitemap'),
    re_path(r'^robots\.txt', include('robots.urls')),
    path('admin/', include('admin_honeypot.urls', namespace='admin_honeypot')),
    path('galeria/', include('galeria.urls')),
    path('captcha', include('captcha.urls')),
    path('segedanyagok/', include('csapat.urls')),
]

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
