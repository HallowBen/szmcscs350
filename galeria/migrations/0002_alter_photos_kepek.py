# Generated by Django 4.1.2 on 2022-11-28 21:38

from django.db import migrations, models
import galeria.models


class Migration(migrations.Migration):

    dependencies = [
        ('galeria', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='photos',
            name='kepek',
            field=models.ImageField(default=0, upload_to=galeria.models.content_file_name),
        ),
    ]