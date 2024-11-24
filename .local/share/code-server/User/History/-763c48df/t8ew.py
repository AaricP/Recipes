# UPDATE_THIS to new database layout for recipes

from django.db import models

class UserInfo(models.Model):
    RecipeID = models.IntegerField(unique=True)
    RecipeTitle = models.CharField(max_length=200)
    LastName = models.CharField(max_length=200)
    Business = models.CharField(max_length=200)
    Address = models.CharField(max_length=255)
    PhoneNumber = models.CharField(max_length=15)

    def __str__(self):
        return f"{self.FirstName} {self.LastName} ({self.UserID})"
