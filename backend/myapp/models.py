from django.db import models

# Create your models here.

class DB(models.Model):
    title = models.CharField(max_length=120)
    description = models.TextField()
    completed = models.BooleanField(default=False)

    def _str_(self):
        return self.title

class Cities(models.Model):
    id = models.IntegerField(primary_key=True)
    region_id = models.IntegerField()
    name_ar = models.CharField(max_length=120)
    name_en = models.CharField(max_length=120)
    center_lat = models.FloatField()
    center_lon =  models.FloatField()

    def _str_(self):
        return self.name_en

class User(models.Model):
    name=models.CharField(max_length=120)

    def _str_(self):
        return self.name_en

class Coordinates(models.Model):
    user_id = models.IntegerField()
    timestamp=models.CharField(max_length=120)
    lat = models.FloatField()
    lon =  models.FloatField()