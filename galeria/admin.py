from django.contrib import admin
from .models import Photos, Theme, Esemeny, Videos
# Register your models here.

class PhotoAdmin(admin.StackedInline):
    model = Photos

class VideoAdmin(admin.StackedInline):
    model = Videos

class EsemenyAdmin(admin.ModelAdmin):
    readonly_fields=('esemeny_key','esemeny_date',)
    inlines = [PhotoAdmin, VideoAdmin]

    class Meta:
        model = Esemeny


class photoadmin(admin.ModelAdmin):
    # readonly_fields=('date','creation_date', 'creation_year', 'meta')
    readonly_fields=('date','esemeny',)

class themeadmin(admin.ModelAdmin):
    readonly_fields=('date','theme_key')

class videoadmin(admin.ModelAdmin):
    readonly_fields=('date', 'type',)




admin.site.register(Photos, photoadmin)
admin.site.register(Esemeny, EsemenyAdmin)
admin.site.register(Theme, themeadmin)
admin.site.register(Videos, videoadmin)
