# UPDATE_THIS to new database layout for recipes

from django.db import models

class Recipe(models.Model):
    RecipeID = models.IntegerField(unique=True)  # Unique ID for each recipe
    Name = models.CharField(max_length=200)  # Recipe name
    Ingredients = models.TextField()  # List of ingredients as text
    Quantity = models.CharField(max_length=100)  # Quantity or servings

    def __str__(self):
        return f"{self.Name} (ID: {self.RecipeID})"

