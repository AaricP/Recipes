# UPDATE_THIS change the paths

from django.urls import path
from . import views

urlpatterns = [
    path('', views.recipe_form_view, name='recipe_form'),  # Handles the form for adding recipes
    path('api/addRecipe/', views.AddRecipe.as_view(), name='add_recipe'),  # API for adding a recipe
    path('api/recipes/', views.recipe_list_api, name='recipe_list_api'),   # API for listing recipes (GET handler)
]


