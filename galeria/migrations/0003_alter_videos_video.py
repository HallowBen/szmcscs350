# Generated by Django 4.1.2 on 2022-11-29 17:17

from django.db import migrations, models
import galeria.models


class Migration(migrations.Migration):

    dependencies = [
        ('galeria', '0002_alter_photos_kepek'),
    ]

    operations = [
        migrations.AlterField(
            model_name='videos',
            name='video',
            field=models.FileField(upload_to=galeria.models.content_file_name),
        ),
    ]