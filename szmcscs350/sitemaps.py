from django.contrib.sitemaps import Sitemap
from django.urls import reverse
import datetime
        

class StaticViewSitemap(Sitemap):
    changefreq = 'monthly'
    lastmod= datetime.datetime(2023,1,1)

    def items(self):
        return ['hirek', 'segedanyagok', 'galeria']

    def location(self, item):
        return reverse(item)

class StaticViewSitemap2(Sitemap):
    changefreq = 'yearly'
    lastmod= datetime.datetime(2023,1,1)

    def items(self):
        return ['tagok','csapat_tori','elerhetoseg', ]

    def location(self, item):
        return reverse(item)

class StaticViewSitemap3(Sitemap):
    changefreq = 'never'
    lastmod= datetime.datetime(2023,1,1)

    def items(self):
        return ['home','cserkesz_tori']

    def location(self, item):
        return reverse(item)
