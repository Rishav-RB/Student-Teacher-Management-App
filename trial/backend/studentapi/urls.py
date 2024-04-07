from django.urls import path
from .views import StudentUserLoginAPIView
from .views import ListAllStudentView,ListAverageStudentView,ListSlowStudentView,ListFastStudentView,MarksStudentList,ResultCreate,ResultsTeacherList,ResultsStudentList,CreateStudentView,ListStudentView,LogoutAPIView,SubjectCreate,SubjectDelete,SubjectList,MarksCreate,MarksList,DeleteMarks

urlpatterns = [
    path("user/register/", CreateStudentView.as_view(), name="register11"),
    path("user/detail/<str:student_email>/", ListStudentView.as_view(), name="list11"),
    path("user/details/", ListAllStudentView.as_view(), name="list_all"),
    path("user/details/fast/", ListFastStudentView.as_view(), name="list_fast"),
    path("user/details/average/", ListAverageStudentView.as_view(), name="list_avg"),
    path("user/details/slow/", ListSlowStudentView.as_view(), name="list_slow"),
    path("user/login/", StudentUserLoginAPIView.as_view(), name="get_token11"),
    path("user/logout/", LogoutAPIView.as_view(), name="refresh11"),
    path("subjects/add/", SubjectCreate.as_view(), name="sub_create"),
    path("subjects/view/<str:teacher_mail>/", SubjectList.as_view(), name="sub_view"),
    path("subjects/remove/<int:subject_id>/", SubjectDelete.as_view(),name="sub_delete"),
    path("marks/add/", MarksCreate.as_view(), name="marks_create"),
    path("marks/teacher-view/", MarksList.as_view(), name="marks_treacher_view"),
    path("marks/student-view/", MarksStudentList.as_view(), name="marks_student_view"),
    path("marks/delete/", DeleteMarks.as_view(), name="marks_del"),
    path("result/create/", ResultCreate.as_view(), name="result_create"),
    path("result/student-view/", ResultsStudentList.as_view(), name="result_student_view"),
    path("result/teacher-view/", ResultsTeacherList.as_view(), name="result_teacher_view"),
]