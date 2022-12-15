from django.contrib import admin
from .models import Blog, ProfilKepek, Tagok, Ors, Headvideo
# Register your models here.

class ratingadmin(admin.ModelAdmin):
    readonly_fields=('date',)

admin.site.register(Blog, ratingadmin)

#------------------------------------------------

class Leirasadmin(admin.ModelAdmin):
    readonly_fields=()

admin.site.register(ProfilKepek)
admin.site.register(Tagok)
admin.site.register(Ors, Leirasadmin)

#------------------------------------------------

admin.site.register(Headvideo)
