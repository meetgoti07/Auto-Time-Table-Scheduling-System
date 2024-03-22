# Generated by Django 5.0.3 on 2024-03-22 16:41

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0002_classes_user_divisions_user_schedule_user_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='classes',
            name='user',
            field=models.CharField(max_length=50),
        ),
        migrations.AlterField(
            model_name='divisions',
            name='user',
            field=models.CharField(max_length=50),
        ),
        migrations.AlterField(
            model_name='schedule',
            name='user',
            field=models.CharField(max_length=50),
        ),
        migrations.AlterField(
            model_name='subjects',
            name='user',
            field=models.CharField(max_length=50),
        ),
        migrations.AlterField(
            model_name='teachers',
            name='user',
            field=models.CharField(max_length=50),
        ),
    ]
