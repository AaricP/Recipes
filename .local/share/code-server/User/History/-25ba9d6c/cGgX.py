# UPDATE_THIS to not be user info but recipes???

from django import forms
from .models import UserInfo

class UserInfoForm(forms.ModelForm):
    class Meta:
        model = UserInfo
        exclude = ['UserID']
