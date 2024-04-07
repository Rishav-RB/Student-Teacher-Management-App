from django.urls import path
from .views import TeacherUserLoginAPIView
from .views import CreateUserView,ListUserView,LogoutAPIView

urlpatterns = [
    path("user/register/", CreateUserView.as_view(), name="register"),
    path("user/details/", ListUserView.as_view(), name="list"),
    path("user/login/", TeacherUserLoginAPIView.as_view(), name="get_token"),
    path("user/logout/", LogoutAPIView.as_view(), name="refresh")
]