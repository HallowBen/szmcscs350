from msilib.schema import Media
from django.contrib import admin
from django.urls import path, include
from csapat import views
from django.conf.urls.static import static
from django.conf import settings

urlpatterns = [
    path('', views.home, name="segedanyagok"),
    path('seged/<str:order>', views.seged, name="segedajax"),
]

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)