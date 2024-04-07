# Generated by Django 5.0.3 on 2024-04-04 19:06

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0001_initial'),
        ('studentapi', '0003_subject'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='subject',
            name='student',
        ),
        migrations.RemoveField(
            model_name='subject',
            name='teacher',
        ),
        migrations.AddField(
            model_name='subject',
            name='student',
            field=models.ManyToManyField(related_name='teaches', to='api.teacheruser'),
        ),
        migrations.AddField(
            model_name='subject',
            name='teacher',
            field=models.ForeignKey(default=0, on_delete=django.db.models.deletion.CASCADE, related_name='teacher', to='studentapi.studentuser'),
            preserve_default=False,
        ),
    ]
