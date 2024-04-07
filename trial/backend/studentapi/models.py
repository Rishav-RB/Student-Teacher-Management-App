from django.contrib.auth.models import AbstractBaseUser, BaseUserManager
from django.db import models
from api.models import TeacherUser

class CustomUserManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError('The Email field must be set')
        email = self.normalize_email(email)
        
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
            
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        if extra_fields.get('is_staff') is not True:
            raise ValueError('Superuser must have is_staff=True.')
        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Superuser must have is_superuser=True.')

        return self.create_user(email, password, **extra_fields)

class StudentUser(AbstractBaseUser):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100)
    registration_number=models.CharField(max_length=20,unique=True)
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=128)
    is_staff = models.BooleanField(default=True)  # Grant admin privileges to TeacherUser

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['name']

    objects = CustomUserManager()

    def _str_(self):
        return self.email
    
class Subject(models.Model):
    name = models.CharField(max_length=100)
    teacher=models.ForeignKey(TeacherUser,on_delete=models.CASCADE,related_name="teacher")
    student=models.ManyToManyField(StudentUser,related_name="teaches")
    
    def __str__(self):
        return self.name
    
class Marks(models.Model):
    subject = models.CharField(max_length=100)
    marks=models.CharField(max_length=10)
    teacher=models.ForeignKey(TeacherUser,on_delete=models.CASCADE,related_name="teacher_id")
    student=models.ForeignKey(StudentUser,on_delete=models.CASCADE,related_name="student_id")
    
    def __str__(self):
        return self.name
    
class Result(models.Model):
    id = models.AutoField(primary_key=True)
    type = models.CharField(max_length=100)
    percentage=models.CharField(max_length=10)
    grade=models.CharField(max_length=10)
    student=models.ForeignKey(StudentUser,on_delete=models.CASCADE,related_name="student_detail")
    
    def __str__(self):
        return self.name

