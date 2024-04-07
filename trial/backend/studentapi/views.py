from rest_framework import generics
from django.forms.models import model_to_dict
from rest_framework.permissions import AllowAny
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import TeacherUser,StudentUser,Subject,Marks,Result
from .serializers import StudentUserLoginSerializer,SubjectSerializer,ResultSerializer,StudentUserSerializer,MarksSerializer
from django.contrib.auth import authenticate
from datetime import timedelta,datetime
from django.http import JsonResponse
import math

import jwt
from studentapi.authentication import StudentUserAuthenticationBackend
student_secret_key ='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'
teacher_secret_key = '3vj3$*l^m^c0z#2b*q4ps+42ph&@tmz5o($7h$+4qy3lt8y*z!'
EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'
EMAIL_HOST = 'smtp.gmail.com'
EMAIL_PORT = 587
EMAIL_USE_TLS = True
EMAIL_HOST_USER = 'rishavbiswas33@gmail.com'
EMAIL_HOST_PASSWORD = 'your_app_password'


# Create your views here.
class CreateStudentView(generics.CreateAPIView):
    queryset = StudentUser.objects.all()
    serializer_class = StudentUserSerializer
    permission_classes = [AllowAny]

class ListStudentView(generics.ListAPIView):
    def get(self, request, student_email):
        new_secret_key = student_secret_key
        print(student_email)
        mail=check_token(request=request,secret=new_secret_key)
        try:
            if mail!='not valid':
                u_id=student_email
                user=StudentUser.objects.filter(email=u_id).first()
                data={
                    "email":user.email,
                    "id":user.id,
                    "name":user.name,
                    "registration_number":user.registration_number
                }
                response=JsonResponse(data)
                return response
            else:
                return Response({'detail': 'Unauthorized!'}, status=status.HTTP_400_BAD_REQUEST) 
        except:
            return Response({'detail': 'Failed to get user info'}, status=status.HTTP_400_BAD_REQUEST)
    permission_classes = [AllowAny]

class ListAllStudentView(generics.ListAPIView):
    def get(self, request):
        new_secret_key = teacher_secret_key
        email=check_token(request=request,secret=new_secret_key)
        try:
            if email!='not valid':
                students=StudentUser.objects.all()
                details=[{"id":s.id,"name":s.name,"email":s.email,"registration number":s.registration_number} for s in students]
                data={
                    "details":details
                }
                response=JsonResponse(data)
                return response
            else:
                return Response({'detail': 'Unauthorized!'}, status=status.HTTP_400_BAD_REQUEST) 
        except:
            return Response({'detail': 'Failed to get user info'}, status=status.HTTP_400_BAD_REQUEST)
    permission_classes = [AllowAny]

class ListFastStudentView(generics.ListAPIView):
    def get(self, request):
        new_secret_key = '3vj3$*l^m^c0z#2b*q4ps+42ph&@tmz5o($7h$+4qy3lt8y*z!'
        email=check_token(request=request,secret=new_secret_key)
        print(email)
        try:
            if True:
                fast_learners=Result.objects.filter(type='Fast Learner').values()
                fast_learns=Result.objects.filter(type='Fast Learner')
                students_dets=[]
                students=[f for f in fast_learners]
                idx=0
                for learner in fast_learns:
                    student_det=StudentUser.objects.filter(id=learner.student.id).values().first()
                    print(students[idx])
                    student_data={"student":students[idx]['student_id'],"name":student_det['name'],"grade":students[idx]['grade'],"percentage":students[idx]['percentage'],"type":students[idx]['type']}
                    idx+=1
                    students_dets.append(student_data)
                data={
                    "details":students_dets
                }
                response=JsonResponse(data)
                return response
            else:
                return Response({'detail': 'Unauthorized!'}, status=status.HTTP_400_BAD_REQUEST) 
        except Exception as e:
            print(e)
            return Response({'detail': 'Failed to get user info'}, status=status.HTTP_400_BAD_REQUEST)
    permission_classes = [AllowAny]


class ListAverageStudentView(generics.ListAPIView):
    def get(self, request):
        new_secret_key = teacher_secret_key
        email=check_token(request=request,secret=new_secret_key)
        try:
            if email!='not valid':
                fast_learners=Result.objects.filter(type='Average Learner').values()
                fast_learns=Result.objects.filter(type='Average Learner')
                students_dets=[]
                students=[f for f in fast_learners]
                idx=0
                for learner in fast_learns:
                    student_det=StudentUser.objects.filter(id=learner.student.id).values().first()
                    print(students[idx])
                    student_data={"student":students[idx]['student_id'],"name":student_det['name'],"grade":students[idx]['grade'],"percentage":students[idx]['percentage'],"type":students[idx]['type']}
                    idx+=1
                    students_dets.append(student_data)
                data={
                    "details":students_dets
                }
                response=JsonResponse(data)
                return response
            else:
                return Response({'detail': 'Unauthorized!'}, status=status.HTTP_400_BAD_REQUEST) 
        except Exception as e:
            print(e)
            return Response({'detail': 'Failed to get user info'}, status=status.HTTP_400_BAD_REQUEST)
    permission_classes = [AllowAny]

class ListSlowStudentView(generics.ListAPIView):
    def get(self, request):
        new_secret_key = teacher_secret_key
        email=check_token(request=request,secret=new_secret_key)
        try:
            if email!='not valid':
                fast_learners=Result.objects.filter(type='Slow Learner')
                fast_learns=Result.objects.filter(type='Slow Learner')
                students_dets=[]
                students=[f for f in fast_learners]
                idx=0
                for learner in fast_learns:
                    student_det=StudentUser.objects.filter(id=learner.student.id).values().first()
                    print(students[idx])
                    student_data={"student":students[idx]['student_id'],"name":student_det['name'],"grade":students[idx]['grade'],"percentage":students[idx]['percentage'],"type":students[idx]['type']}
                    idx+=1
                    students_dets.append(student_data)
                data={
                    "details":students_dets
                }
                response=JsonResponse(data)
                return response
            else:
                return Response({'detail': 'Unauthorized!'}, status=status.HTTP_400_BAD_REQUEST) 
        except Exception as e:
            print(e)
            return Response({'detail': 'Failed to get user info'}, status=status.HTTP_400_BAD_REQUEST)
    permission_classes = [AllowAny]


class StudentUserLoginAPIView(APIView):
    authentication_classes = [StudentUserAuthenticationBackend]  # Exempt from authentication
    permission_classes = [AllowAny]
    def post(self, request, *args, **kwargs):
        serializer = StudentUserLoginSerializer(data=request.data)
        if serializer.is_valid():
            email = serializer.validated_data.get('email')
            password = serializer.validated_data.get('password')
            print(email,password)
            user = authenticate( backend=StudentUserAuthenticationBackend,email=email, password=password)
            if user:
                payload = {
                    'email': email,
                    'exp': datetime.now() + timedelta(minutes=10)  # Set expiry time to 10 minutes from now
                }

                # Encode the token
                secret_key = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'  # Replace with your own secret key
                encoded_token = jwt.encode(payload, secret_key, algorithm='HS256')

                print(encoded_token)
                access_token_encoded = encoded_token
                data = {
                    'jwt': access_token_encoded,
                }
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

class SubjectList(generics.ListAPIView):
    def get(self, request, teacher_mail):
        new_secret_key = '3vj3$*l^m^c0z#2b*q4ps+42ph&@tmz5o($7h$+4qy3lt8y*z!'
        check_token(request=request,secret=new_secret_key)
        try:
            teachdetails=TeacherUser.objects.filter(email=teacher_mail).first()
            details=Subject.objects.filter(teacher=teachdetails.id)
            det=[model_to_dict(d) for d in details]
            name=[dt['name'] for dt in det]
            final_data=[]
            idx=0
            if det:
                for subject in det:
                    students=[]
                    nm=name[idx]
                    idx+=1
                    students=subject['student']
                    print(students)
                    student_ids=[]
                    for std in students:
                        student_ids.append(std)
                    print(student_ids)
                    print(nm)
                    student_details = []
                    for student_id in student_ids:
                        student_detail = StudentUser.objects.filter(email=student_id).values('id','email','registration_number').first()
                        if student_detail:
                            student_details.append(student_detail)
                    print(student_details)
                    data={
                        "subject":nm,
                        'teacher':det[0]['teacher'],
                        "students":student_details
                    }
                    #print(data)
                    final_data.append(data)
                #print(final_data)
                json={
                    "data":final_data
                }
                response=JsonResponse(json)
                return response
            else :
                return Response({'detail': 'No such record exists'}, status=status.HTTP_400_BAD_REQUEST)
        except:
            return Response({'detail': 'No such record exists'}, status=status.HTTP_400_BAD_REQUEST)
    permission_classes = [AllowAny]

class SubjectCreate(generics.CreateAPIView):
    def post(self, request):
        new_secret_key = '3vj3$*l^m^c0z#2b*q4ps+42ph&@tmz5o($7h$+4qy3lt8y*z!'
        email=check_token(request=request,secret=new_secret_key)
        if(email!="not valid"):
            try:
                serializer=SubjectSerializer(data=request.data)
                if serializer.is_valid():
                    name=serializer.validated_data.get('name')
                    teacher=serializer.validated_data.get('teacher')
                    student=serializer.validated_data.get('student')
                    print(name,teacher,student)
                    subject= Subject(name=name, teacher=teacher)
                    subject.save()
                    subject.student.set(student)
                    data={
                        "subject":name,
                        "teacher_id":teacher.id,
                    }
                    response=JsonResponse(data)
                    return response
                else:
                    return Response({'detail': 'Error in detailS'}, status=status.HTTP_400_BAD_REQUEST)
            except Exception as e:
                print(e)
                return Response({'detail': 'Unable to POST'}, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response({'detail': 'Unauthorized'}, status=status.HTTP_400_BAD_REQUEST)
    permission_classes = [AllowAny]

class SubjectDelete(generics.DestroyAPIView):
    def get(self, request, subject_id):
        new_secret_key = '3vj3$*l^m^c0z#2b*q4ps+42ph&@tmz5o($7h$+4qy3lt8y*z!'
        s_id=subject_id
        email=check_token(request=request,secret=new_secret_key)
        try:
            details=Subject.objects.filter(id=s_id).first()
            details.delete()
            data={
                "status":"Deletion Succesful",
                "performed By":email,
            }
            response=JsonResponse(data)
            return response
        except:
            return Response({'detail': 'Unable to delete SubjecT detailS'}, status=status.HTTP_400_BAD_REQUEST)
    permission_classes = [AllowAny]

class MarksList(generics.ListAPIView):
    def get(self, request):
        new_secret_key = teacher_secret_key
        email=check_token(request=request,secret=new_secret_key)
        try:
            if email!="not valid":
                teacher_id=TeacherUser.objects.filter(email=email).first()
                print(teacher_id.id)
                details=Marks.objects.filter(teacher=teacher_id.id)
                if details:
                    serialized_details =[model_to_dict(detail) for detail in details]
                    print(serialized_details)
                    data={
                        "details":serialized_details
                    }
                    response=JsonResponse(data)
                    return response
                else :
                    return Response({'detail': 'No such record exists'}, status=status.HTTP_400_BAD_REQUEST)
            else:
                return Response({'detail': 'Unauthorized!'}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            print(e)
            return Response({'detail': 'No such record exists'}, status=status.HTTP_400_BAD_REQUEST)
    permission_classes = [AllowAny]

class MarksStudentList(generics.ListAPIView):
    def get(self, request):
        new_secret_key = student_secret_key
        email=check_token(request=request,secret=new_secret_key)
        try:
            if email!="not valid":
                student_id=StudentUser.objects.filter(email=email).first()
                print(student_id.id)
                details=Marks.objects.filter(student=student_id.id)
                if details:
                    serialized_details =[model_to_dict(detail) for detail in details]
                    print(serialized_details)
                    data={
                        "details":serialized_details
                    }
                    response=JsonResponse(data)
                    return response
                else :
                    return Response({'detail': 'No such record exists'}, status=status.HTTP_400_BAD_REQUEST)
            else:
                return Response({'detail': 'Unauthorized!'}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            print(e)
            return Response({'detail': 'No such record exists'}, status=status.HTTP_400_BAD_REQUEST)
    permission_classes = [AllowAny]

class MarksCreate(generics.CreateAPIView):
    def post(self, request):
        new_secret_key = '3vj3$*l^m^c0z#2b*q4ps+42ph&@tmz5o($7h$+4qy3lt8y*z!'
        email=check_token(request=request,secret=new_secret_key)
        if(email!="not valid"):
            print(email)
            try:
                serializer=MarksSerializer(data=request.data)
                if serializer.is_valid():
                    subject=serializer.validated_data.get('subject')
                    marks=serializer.validated_data.get('marks')
                    teacher=serializer.validated_data.get('teacher')
                    student=serializer.validated_data.get('student')
                    print(subject,marks,teacher,student)
                    mark = Marks.objects.filter(teacher=teacher, student=student, subject=subject).first()

                    if mark:
                        # If a record exists, update the existing record
                        mark.marks = marks
                        mark.save()
                        data={
                            "subject":subject,
                            "marks":marks,
                            "student-id":student.id,
                            "teacher_id":teacher.id,
                            "status":"updated"
                        }
                        response=JsonResponse(data)
                        return response
                    else:
                        # If no record exists, create a new one
                        mark = Marks(subject=subject, marks=marks, student=student, teacher=teacher)
                        mark.save()
                        data={
                            "subject":subject,
                            "marks":marks,
                            "student-id":student.id,
                            "teacher_id":teacher.id,
                            "status":"created"
                        }
                        response=JsonResponse(data)
                        return response
                else:
                    return Response({'detail': 'Error in detailS'}, status=status.HTTP_400_BAD_REQUEST)
            except Exception as e:
                print(e)
                return Response({'detail': 'Unable to POST'}, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response({'detail': 'Unauthorized!'}, status=status.HTTP_400_BAD_REQUEST)
    permission_classes=[AllowAny]

class DeleteMarks(generics.DestroyAPIView):
    def post(self, request):
        new_secret_key = '3vj3$*l^m^c0z#2b*q4ps+42ph&@tmz5o($7h$+4qy3lt8y*z!'
        email=check_token(request=request,secret=new_secret_key)
        try:
            teacher = request.data.get('teacher')
            student = request.data.get('student')
            subject = request.data.get('subject')
            details = Marks.objects.filter(teacher=teacher, student=student, subject=subject).first()
            details.delete()
            data={
                "status":"Deletion Succesful",
                "subject":subject,
                "student":student
            }
            response=JsonResponse(data)
            return response
        except:
            return Response({'detail': 'Unable to delete Marks detailS'}, status=status.HTTP_400_BAD_REQUEST)
    permission_classes = [AllowAny]

from django.core.mail import EmailMessage

class ResultCreate(generics.CreateAPIView):
    def post(self, request):
        new_secret_key = '3vj3$*l^m^c0z#2b*q4ps+42ph&@tmz5o($7h$+4qy3lt8y*z!'
        email=check_token(request=request,secret=new_secret_key)
        if(email!="not valid"):
            print(email)
            try:
                students=StudentUser.objects.all()
                results=Result.objects.all()
                if results:
                    results.delete()
                for student in students:
                    marks=Marks.objects.filter(student=student)
                    if marks:
                        length=len(marks)
                        percentage=0.0
                        sum=0
                        for num in marks:
                            print(num.marks)
                            sum+=int(num.marks)
                        percentage=sum/length
                        if percentage>=80:
                            type='Fast Learner'
                        elif percentage>=50 and percentage<80:
                            type='Average Learner'
                        else:
                            type='Slow Learner'
                        if percentage>90:
                            grade='A+'
                        elif percentage>80 and percentage<=90:
                            grade='A'
                        elif percentage>70 and percentage<=80:
                            grade='B'
                        elif percentage>60 and percentage<=70:
                            grade='C'
                        elif percentage>50 and percentage<=60:
                            grade='D'
                        elif percentage>=35 and percentage<=50:
                            grade='E'
                        else:
                            grade='F'
                        percentage=math.ceil(percentage)
                        percentage=str(percentage)
                        print(percentage,type,grade,student.id)
                        serializer=ResultSerializer(data={"type":type,'percentage':percentage,'grade':grade,'student':student.id})
                        if serializer.is_valid():
                            type_n=serializer.validated_data.get('type')
                            percentage_n=serializer.validated_data.get('percentage')
                            grade_n=serializer.validated_data.get('grade')
                            student_id_n=serializer.validated_data.get('student')
                            print(type,percentage,grade,student.id)
                            result=Result(type=type_n,percentage=percentage_n,grade=grade_n,student=student_id_n)
                            result.save()
                            send_mail('rishavbiswas33@gmail.com',student.email,student.name) 
                        else:
                            print('error here')
                    else:
                        print("no data for ",student.id)
                res=Result.objects.all()
                details=[{"type":r.type,"percentage":r.percentage,"grade":r.grade,"student":r.student.id,"name":r.student.name,"email":r.student.email} for r in res]
                data={
                    "status":details
                }
                response=JsonResponse(data) 
                #print(result)
                return response
            except Exception as e:
                print(e)
                return Response({'detail': 'Unable to POST'}, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response({'detail': 'Unauthorized!'}, status=status.HTTP_400_BAD_REQUEST)
    permission_classes=[AllowAny]

class ResultsStudentList(generics.ListAPIView):
    def get(self, request):
        new_secret_key = student_secret_key
        email=check_token(request=request,secret=new_secret_key)
        try:
            if email!="not valid":
                student_id=StudentUser.objects.filter(email=email).first()
                print(student_id.id)
                details=Marks.objects.filter(student=student_id.id)
                if details:
                    serialized_details =[model_to_dict(detail) for detail in details]
                    result=Result.objects.filter(student=student_id.id).values().first()
                    data={
                        "marks":serialized_details,
                        "result":result
                    }
                    response=JsonResponse(data)
                    return response
                else :
                    return Response({'detail': 'No such record exists'}, status=status.HTTP_400_BAD_REQUEST)
            else:
                return Response({'detail': 'Unauthorized!'}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            print(e)
            return Response({'detail': 'No such record exists'}, status=status.HTTP_400_BAD_REQUEST)
    permission_classes = [AllowAny]

class ResultsTeacherList(generics.ListAPIView):
    def get(self, request):
        new_secret_key = teacher_secret_key
        email=check_token(request=request,secret=new_secret_key)
        try:
            if email!="not valid":
                teacher_id=TeacherUser.objects.filter(email=email).first()
                print(teacher_id.id)
                #details=Marks.objects.filter(teacher=teacher_id.id)
                    #serialized_details =[model_to_dict(detail) for detail in details]
                res=Result.objects.all()
                if(res):
                    res_details=[{"type":r.type,"percentage":r.percentage,"grade":r.grade,"student":r.student.id,"name":r.student.name,"email":r.student.email} for r in res]
                    data={
                        "result":res_details
                    }
                    response=JsonResponse(data)
                    return response
                else :
                    return Response({'detail': 'No such record exists'}, status=status.HTTP_400_BAD_REQUEST)
            else:
                return Response({'detail': 'Unauthorized!'}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            print(e)
            return Response({'detail': 'No such record exists'}, status=status.HTTP_400_BAD_REQUEST)
    permission_classes = [AllowAny]

def check_token(request,secret):
        token = request.COOKIES.get('jwt')
        new_secret_key = secret
        print(token)
        if not token:
            error={
                "error":"Authentication Token not provided"
            }
            response=JsonResponse(error,status=401)
            return response
        try:
            # Decode and verify the token
            decoded_token = jwt.decode(token, new_secret_key, algorithms=["HS256"])
            print(decoded_token)
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
        except :
            print("Invalid token")
            return "not valid"
        #print(email)
        if email:
            return email
        else:
            return "not valid"

import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from oauthlib.oauth2 import BackendApplicationClient
from requests_oauthlib import OAuth2Session

# OAuth configuration
from dotenv import load_dotenv
import os
load_dotenv()
CLIENT_ID=os.getenv('CLIENT_ID')
CLIENT_SECRET=os.getenv('CLIENT_SECRET')
REFRESH_TOKEN=os.getenv('REFRESH_TOKEN')
#SCOPES = ['https://mail.google.com/']
SCOPES = ['https://developers.google.com/oauthplayground']

# Create OAuth2 session
def send_mail(sender_mail,recv_mail,name):
    client = BackendApplicationClient(client_id=CLIENT_ID)
    oauth = OAuth2Session(client=client)
    token = {'refresh_token': REFRESH_TOKEN}
    oauth.refresh_token('https://accounts.google.com/o/oauth2/token',client_id=CLIENT_ID, client_secret=CLIENT_SECRET, refresh_token=REFRESH_TOKEN)

    # Gmail SMTP server configuration
    smtp_server = 'smtp.gmail.com'
    smtp_port = 587  # For TLS

    # Email content
    sender_email = sender_mail
    receiver_email = recv_mail
    subject = 'Result Updated!!'
    message = '''Dear {},

            I hope this email finds you well.

            I'm writing to inform you that the results for Test Exam have been updated. You can now view your updated results by accessing Scholar Space Portal.

            If you have any questions or concerns regarding your results, please don't hesitate to reach out to us.

            Thank you for your attention, and best of luck with your continued endeavors.

            Warm regards,
            DevTeam,
            Scholar Space'''.format(name)

    # Create message
    msg = MIMEMultipart()
    msg['From'] = sender_email
    msg['To'] = receiver_email
    msg['Subject'] = subject
    msg.attach(MIMEText(message, 'plain'))

    # Send email
    try:
        with smtplib.SMTP(smtp_server, smtp_port) as server:
            server.ehlo()  # Can be omitted
            server.starttls()
            server.ehlo()  # Can be omitted
            access_token=oauth.token['access_token']
            def oauth2_token(x=None):
                return 'user={}\1auth=Bearer {}\1\1'.format(sender_email, access_token)
            #server.auth('XOAUTH2', lambda x: 'user={}\1auth=Bearer {}\1\1'.format(sender_email, access_token))
            server.auth('XOAUTH2', oauth2_token)
            server.sendmail(sender_email, receiver_email, msg.as_string())
        print('Email sent successfully.')
    except Exception as e:
        print(f'Failed to send email: {e}')