# UPDATE_THIS use make migrations to update this???

# Generated by Django 5.1.3 on 2024-11-22 23:30

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='UserInfo',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('UserID', models.IntegerField(unique=True)),
                ('FirstName', models.CharField(max_length=200)),
                ('LastName', models.CharField(max_length=200)),
                ('Business', models.CharField(max_length=200)),
                ('Address', models.CharField(max_length=255)),
                ('PhoneNumber', models.CharField(max_length=15)),
            ],
        ),
    ]