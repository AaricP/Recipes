# UPDATE_THIS edit column names, and import name, and model

from rest_framework import serializers
from .models import Recipe  # Import the updated Recipe model

class RecipeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Recipe
        fields = ['RecipeID', 'Name', 'Ingredients', 'Quantity']  # Updated field names

