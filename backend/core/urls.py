from django.urls import include, path
from rest_framework import routers

from api.views import ClassesAPIView, SubjectsAPIView ,DisplayClassesAPIView , DisplaySubjectsAPIView ,TeachersAPIView, ScheduleAPIView,DisplayTTAPIView, DivisionsAPIView, UserRegistrationAPIView, UserLoginAPIView, TimeTableAPIView, DisplayTeachersAPIView, DisplayDivisionsAPIView, DisplayScheduleAPIView
router = routers.DefaultRouter()

# Wire up our API using automatic URL routing.
# Additionally, we include login URLs for the browsable API.
urlpatterns = [
    path('', include(router.urls)),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    path('api/classes/', ClassesAPIView.as_view(), name='classes-api'),
    path('api/subjects/', SubjectsAPIView.as_view(), name='subjects-api'),
    path('api/teachers/', TeachersAPIView.as_view(), name='teachers-api'),
    path('api/schedule/', ScheduleAPIView.as_view(), name='schedule-api'),
    path('api/divisions/', DivisionsAPIView.as_view(), name='division-api'),
    path('api/divisions/', DivisionsAPIView.as_view(), name='division-api'),
    path('api/user-registration/', UserRegistrationAPIView.as_view(), name='userregistration-api'),
    path('api/user-login/', UserLoginAPIView.as_view(), name='userlogin-api'),
    path('api/generate-timetable/', TimeTableAPIView.as_view(), name='generate-timetable'),
    path('api/display-timetable/', DisplayTTAPIView.as_view(), name='display-timetable'),
    path('api/display-classes/', DisplayClassesAPIView.as_view(), name='display-classes'),
    path('api/display-subjects/', DisplaySubjectsAPIView.as_view(), name='display-subjects'),
    path('api/display-teachers/', DisplayTeachersAPIView.as_view(), name='display-teachers'),
    path('api/display-divisions/', DisplayDivisionsAPIView.as_view(), name='display-divisions'),
    path('api/display-schedule/', DisplayScheduleAPIView.as_view(), name='display-schedule'),
]