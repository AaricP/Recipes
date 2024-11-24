# UPDATE_THIS change to be about recipes rather than users. get data from the templates/registration.registartionFrom.html but change it

import random
from django.shortcuts import render
from django.http import JsonResponse
from .forms import RecipeForm
from .models import Recipe
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from .serializers import RecipeSerializer

def generate_unique_recipe_id():
    while True:
        recipe_id = random.randint(100000, 999999)
        if not Recipe.objects.filter(RecipeID=recipe_id).exists():
            return recipe_id

def recipe_form_view(request):
    if request.method == 'POST':
        form = RecipeForm(request.POST)
        if form.is_valid():
            recipe = form.save(commit=False)
            recipe.RecipeID = generate_unique_recipe_id()
            recipe.save()
            return JsonResponse({"message": "Recipe added successfully!"}, status=201)
        else:
            return JsonResponse({"errors": form.errors}, status=400)
    else:
        form = RecipeForm()
    return render(request, 'recipes/recipeForm.html', {'form': form})


@api_view(['GET'])
def recipe_list_api(request):
    recipes = Recipe.objects.all()
    serializer = RecipeSerializer(recipes, many=True)
    return Response(serializer.data)


class AddRecipe(APIView):
    def get(self, request):
        # Get all recipes
        recipes = Recipe.objects.all()
        serializer = RecipeSerializer(recipes, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        data = request.data
        data['RecipeID'] = generate_unique_recipe_id()
        serializer = RecipeSerializer(data=data)
        
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

