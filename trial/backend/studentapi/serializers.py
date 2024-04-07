from .models import StudentUser
from rest_framework import serializers
from .models import StudentUser,Subject,Marks,Result

class StudentUserSerializer(serializers.ModelSerializer):
    class Meta:
        model =StudentUser
        fields = ["id", "name","registration_number","email","password","is_staff"]
        extra_kwargs = {"password": {"write_only": True},"is_staff":{"read_only":True}}
    
    def create(self, validated_data):
        print(validated_data)
        user =StudentUser.objects.create_user(**validated_data)
        return user

class StudentUserLoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)

    def validate(self, attrs):
        email = attrs.get('email')
        password = attrs.get('password')
        print(email)
        if email and password:
            user = StudentUser.objects.filter(email=email).first()
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
        
class SubjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Subject
        fields = ["name","student","teacher"]

class MarksSerializer(serializers.ModelSerializer):
    class Meta:
        model = Marks
        fields = ["subject","marks","teacher","student"]

class ResultSerializer(serializers.ModelSerializer):
    class Meta:
        model = Result
        fields = ["type","percentage","grade","student"]