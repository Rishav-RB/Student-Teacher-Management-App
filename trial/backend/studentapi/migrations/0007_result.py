# Generated by Django 5.0.3 on 2024-04-05 17:05

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('studentapi', '0006_marks'),
    ]

    operations = [
        migrations.CreateModel(
            name='Result',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('type', models.CharField(max_length=100)),
                ('percentage', models.CharField(max_length=10)),
                ('grade', models.CharField(max_length=10)),
                ('student', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='student_detail', to='studentapi.studentuser')),
            ],
        ),
    ]
