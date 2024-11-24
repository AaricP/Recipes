# UPDATE_THIS to not be user info but recipes???

from django import forms
from .models import Recipe  # Import the Recipe model

class RecipeForm(forms.ModelForm):
    class Meta:
        model = Recipe  # Use the Recipe model
        exclude = ['RecipeID']  # Exclude the automatically generated RecipeID

