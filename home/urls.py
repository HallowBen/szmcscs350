from unicodedata import name
from django.urls import path, include
import csapat.views as csapat
from home import views
from django.conf.urls.static import static
from django.conf import settings

urlpatterns = [
    path('', views.home, name="home"),
    path('tagok/', views.tagok, name="tagok"),
    path('hblog/', views.home_blog, name="hblog"),
    path('blog/', views.blog, name="blog"),
    path('blog/all', views.blog_all, name="blog_all"),
    path('hesemeny/', views.gallery_home, name="gallery_home"),
    path('csapat_tori/', csapat.csptori, name="csapat_tori"),
    path('cserkesz_tori/', csapat.csrtori, name="cserkesz_tori"),
    # path('esemeny_napta/', views.enaptar, name="esemeny_naptar"),
    path('elerhetoseg/', views.elerhetoseg, name="elerhetoseg"),

]

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)