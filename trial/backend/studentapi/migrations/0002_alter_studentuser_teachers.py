# Generated by Django 5.0.3 on 2024-04-04 14:47

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0001_initial'),
        ('studentapi', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='studentuser',
            name='teachers',
            field=models.ManyToManyField(related_name='students', to='api.teacheruser'),
        ),
    ]
