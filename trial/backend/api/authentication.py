from django.contrib.auth import get_user_model
from .models import TeacherUser
from django.contrib.auth.backends import BaseBackend


class TeacherUserAuthenticationBackend(BaseBackend):
    def authenticate(self, request, email=None, password=None, **kwargs):
        User = get_user_model()
        if email is None or password is None:
            return None
        
        try:
            user = TeacherUser.objects.get(email=email)
            if user.check_password(password):
                return user
        except TeacherUser.DoesNotExist:
            return None
