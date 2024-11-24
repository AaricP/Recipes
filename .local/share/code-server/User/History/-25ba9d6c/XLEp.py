# UPDATE_THIS edit name of path form registration to recipe?? and get rid of hello

from django import forms
from .models import UserInfo

class UserInfoForm(forms.ModelForm):
    class Meta:
        model = UserInfo
        exclude = ['UserID']
