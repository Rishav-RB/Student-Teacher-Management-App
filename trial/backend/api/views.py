from django.shortcuts import render
from .models import TeacherUser
from rest_framework import generics
from .serializers import TeacherUserSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from .serializers import TeacherUserLoginSerializer
from django.contrib.auth import authenticate
from rest_framework.authentication import SessionAuthentication, TokenAuthentication
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.views import TokenRefreshView
from datetime import timedelta,datetime
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import jwt
from django.shortcuts import get_object_or_404
from api.authentication import TeacherUserAuthenticationBackend


class CreateUserView(generics.CreateAPIView):
    queryset = TeacherUser.objects.all()
    serializer_class = TeacherUserSerializer
    permission_classes = [AllowAny]

class ListUserView(generics.ListAPIView):
    # Retrieve the access token from the cookie
    def get(self, request, *args, **kwargs):
        token = request.COOKIES.get('jwt')
        secret_key ='3vj3$*l^m^c0z#2b*q4ps+42ph&@tmz5o($7h$+4qy3lt8y*z!'
        print(token)
        if not token:
            error={
                "error":"Authentication Token not provided"
            }
            response=JsonResponse(error,status=401)
            return response
        try:
            # Decode and verify the token
            decoded_token = jwt.decode(token, secret_key, algorithms=["HS256"])

            # Check expiry
            current_time = datetime.now().timestamp()
            email=decoded_token.get("email")
            print(email)
            if decoded_token.get("exp", 0) < current_time:
                print("Token has expired")
            else:
                print("Token is valid")

            # You can also validate claims here if needed

        except jwt.ExpiredSignatureError:
            print("Token has expired")
        except jwt.InvalidTokenError:
            print("Invalid token")
        try:
            user=TeacherUser.objects.filter(email=email).first()
            data={
                "email":user.email,
                "id":user.id,
                "name":user.name,
                "is_staff":user.is_staff
            }
            response=JsonResponse(data)
            return response
        except:
            return Response({'detail': 'Failed to get user info'}, status=status.HTTP_400_BAD_REQUEST)
    '''queryset = TeacherUser.objects.all()
    serializer_class = TeacherUserSerializer'''
    permission_classes = [AllowAny]

'''class ListTokenView(generics.ListAPIView):
    queryset=AccessToken.objects.all()
    permission_classes=[AllowAny]
    serializer_class=TokenSerializer'''


class TeacherUserLoginAPIView(APIView):
    authentication_classes = [TeacherUserAuthenticationBackend]  # Exempt from authentication
    permission_classes = [AllowAny]
    def post(self, request, *args, **kwargs):
        serializer = TeacherUserLoginSerializer(data=request.data)
        if serializer.is_valid():
            email = serializer.validated_data.get('email')
            password = serializer.validated_data.get('password')
            print(email,password)
            user = authenticate(backend=TeacherUserAuthenticationBackend,email=email, password=password)
            if user:
                payload = {
                    'email': email,
                    'exp': datetime.now() + timedelta(minutes=10)  # Set expiry time to 10 minutes from now
                }

                # Encode the token
                secret_key = '3vj3$*l^m^c0z#2b*q4ps+42ph&@tmz5o($7h$+4qy3lt8y*z!'  # Replace with your own secret key
                encoded_token = jwt.encode(payload, secret_key, algorithm='HS256')

                print(encoded_token)
                '''refresh = RefreshToken.for_user(user)
                access_token=refresh.access_token
                expiry_time = datetime.now() + timedelta(minutes=10)
                access_token['exp'] = int(expiry_time.timestamp())'''
                access_token_encoded = encoded_token
                data = {
                    'jwt': access_token_encoded,
                }
                '''user_id=TeacherUser.objects.filter(email=email).first()
                print(user_id)
                token = AccessToken(user=user_id, token=access_token_encoded)
                token.save()'''
                response=JsonResponse(data)
                response.set_cookie('jwt', access_token_encoded, httponly=True)
                return response
            else:
                return Response({'detail': 'Invalid credentials'}, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class LogoutAPIView(APIView):
    def post(self, request, *args, **kwargs):
        response = JsonResponse({'message': 'Logout successful'})
        response.delete_cookie('jwt')  # Delete the JWT cookie
        return response
    permission_classes=[AllowAny]
    

'''class CustomTokenRefreshView(TokenRefreshView):
    def post(self, request, *args, **kwargs):
        refresh_token = request.data.get('refresh')
        uid=request.data.get('user_id')
        if refresh_token:
            try:
                refresh = RefreshToken(refresh_token)
                access_token = refresh.access_token
                # Calculate the expiry time for the access token (example: 15 minutes from now)
                expiry_time = datetime.now() + timedelta(minutes=10)
                access_token['exp'] = int(expiry_time.timestamp())
                access_token_encoded = str(access_token)
                data = {
                    'access': access_token_encoded,  # Access the access token value
                }
                user_id=TeacherUser.objects.filter(id=uid).first()
                response=JsonResponse(data)
                token = get_object_or_404(AccessToken, user=user_id)
                # Assuming you have a new access token value
                new_access_token = access_token_encoded

                # Update the access token value
                token.token = new_access_token

                # Save the updated AccessToken object
                token.save()
                test=int(access_token_encoded)
                print(test['exp'])
                response.set_cookie('access_token', access_token_encoded, httponly=True)
                return response
            except Exception as e:
                return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response({'error': 'No refresh token provided'}, status=status.HTTP_400_BAD_REQUEST)

'''
