from django.contrib import admin
from .models import Segedlet,Temakor
# Register your models here.


class segedletadmin(admin.ModelAdmin):
    readonly_fields=('date',)

class temakoradmin(admin.ModelAdmin):
    readonly_fields=('date','tema_kulcs',)

admin.site.register(Segedlet,segedletadmin)
admin.site.register(Temakor,temakoradmin)