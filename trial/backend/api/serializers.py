from .models import TeacherUser
from rest_framework import serializers
#from .models import Note


class TeacherUserSerializer(serializers.ModelSerializer):
    class Meta:
        model =TeacherUser
        fields = ["id", "name", "email","password","is_staff"]
        extra_kwargs = {"password": {"write_only": True},"is_staff":{"read_only":True}}

    def create(self, validated_data):
        print(validated_data)
        user =TeacherUser.objects.create_user(**validated_data)
        return user

from django.contrib.auth import get_user_model
from .models import TeacherUser
from rest_framework import serializers

User = get_user_model()

class TeacherUserLoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)

    def validate(self, attrs):
        email = attrs.get('email')
        password = attrs.get('password')
        print(email)
        if email and password:
            user = TeacherUser.objects.filter(email=email).first()
            if user:
                print(user.password)
                if user.check_password(password):
                    return {'user': user, 'email': email,"password":password}
                else:
                    raise serializers.ValidationError("Incorrect password.")
            else:
                raise serializers.ValidationError("User does not exist.")
        else:
            raise serializers.ValidationError("Email and password are required.")


'''class NoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Note
        fields = ["id", "title", "content", "created_at", "author"]
        extra_kwargs = {"author": {"read_only": True}}
'''

'''class TokenSerializer(serializers.ModelSerializer):
    class Meta:
        model = AccessToken
        fields = ["user", "token"]'''