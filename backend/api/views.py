from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Schedule, Divisions, Users, Classes, Subjects, Teachers, Schedule, Divisions
from .serializers import ClassesBatchSerializer, SubjectsSerializer, TeachersSerializer,TimetableSerializer,DisplayTTSerializer, DivisionsSerializer, ScheduleSerializer, UsersSerializer
from datetime import datetime, timedelta
import jwt
from django.conf import settings
from .GA_helpers import format_for_ga, create_random_timetable


class ClassesAPIView(APIView):
    def post(self, request, *args, **kwargs):
        try:
            # Extract user information from the first dictionary
            user_data = request.data[0]
            user = user_data.get('user')

            # Delete existing data for the user in the Classes table
            Classes.objects.filter(user=user).delete()

            # Serialize and save the new data (excluding the first dictionary)
            serializer = ClassesBatchSerializer(data=request.data[1:], many=True)
            if serializer.is_valid():
                serializer.save(user=user)  # Pass the user information to the serializer
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class SubjectsAPIView(APIView):
    def post(self, request, *args, **kwargs):
        try:
            # Extract user information from the first dictionary
            user_data = request.data[0]
            user = user_data.get('user')


            # Delete existing data for the user in the Subjects table
            Subjects.objects.filter(user=user).delete()

            # Serialize and save the new data (excluding the first dictionary)
            serializer = SubjectsSerializer(data=request.data[1:], many=True)

            if serializer.is_valid():
                serializer.save(user=user)  # Pass the user information to the serializer
                return Response(serializer.data, status=status.HTTP_201_CREATED)

            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
  
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class TeachersAPIView(APIView):
    def post(self, request, *args, **kwargs):
        try:
            # Extract user information from the first dictionary
            user_data = request.data[0]
            user = user_data.get('user')

            # Delete existing data for the user in the Teachers table
            Teachers.objects.filter(user=user).delete()

            # Serialize and save the new data (excluding the first dictionary)
            serializer = TeachersSerializer(data=request.data[1:], many=True)
            if serializer.is_valid():
                serializer.save(user=user)  # Pass the user information to the serializer
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class DivisionsAPIView(APIView):
    def post(self, request):
        data = request.data
        try:
            # Delete any existing records with the given username
            user = data[0]['user']
            Divisions.objects.filter(user=user).delete()

            divisionData = data[1]['divisionData']
            for item in divisionData:
                divisionname = item['divisionName']
                subdivisions = [sub['subDivisionName'] for sub in item['subDivisions']]
                subjects = [sub['subjectName'] for sub in item['subjects']]
                division = Divisions(divisionname=divisionname, subdivisions=subdivisions, subjects=subjects, user=user)
                division.save()
            return Response(status=status.HTTP_201_CREATED)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class ScheduleAPIView(APIView):
    def post(self, request):
        data = request.data
        try:
            # Delete any existing records with the given username
            user = data[0]['user']
            Schedule.objects.filter(user=user).delete()

            for item in data:
                if 'daysOfWeek' in item:
                    days = [row['Day'] for row in item['daysOfWeek']]
                    start_times = [row['StartTime'] for row in item['sessionTimes']]
                    end_times = [row['EndTime'] for row in item['sessionTimes']]
                    break_start_time = item['breakData']['BreakStartTime']
                    break_end_time = item['breakData']['BreakEndTime']
                    schedule = Schedule(days=days, start_times=start_times, end_times=end_times, break_start_time=break_start_time, break_end_time=break_end_time, user=user)
                    schedule.save()
            return Response(status=status.HTTP_201_CREATED)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
class UserRegistrationAPIView(APIView):
    def post(self, request, *args, **kwargs):
        serializer = UsersSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

class UserLoginAPIView(APIView):
    def post(self, request, *args, **kwargs):
        email = request.data.get('email')
        password = request.data.get('password')
        user = Users.objects.filter(email=email, password=password).first()
        if user:
            # Generate JWT access token
            access_token_payload = {
                'user_id': user.id,
                'exp': datetime.utcnow() + timedelta(seconds=settings.ACCESS_TOKEN_EXPIRATION)
            }
            access_token = jwt.encode(access_token_payload, settings.SECRET_KEY, algorithm='HS256')

            # Generate refresh token (optional)
            refresh_token_payload = {
                'user_id': user.id
            }
            refresh_token = jwt.encode(refresh_token_payload, settings.SECRET_KEY, algorithm='HS256')

            # Construct the response data
            data = {
                'kind': 'identitytoolkit#VerifyPasswordResponse',
                'localId': user.id,
                'email': user.email,
                'firstname': user.firstname,
                'lastname': user.lastname,
                'username': user.username,
                'displayName': '',  # You can include user's display name here if applicable
                'idToken': access_token,  # No need to decode here
                'registered': True,
                'refreshToken': refresh_token,  # No need to decode here
                'expiresIn': str(settings.ACCESS_TOKEN_EXPIRATION),  # Convert to string
                'expireDate': (datetime.utcnow() + timedelta(seconds=settings.ACCESS_TOKEN_EXPIRATION)).isoformat()  # ISO 8601 format
            }
            return Response(data=data, status=status.HTTP_200_OK)
        return Response({"error": "Invalid credentials"}, status=status.HTTP_400_BAD_REQUEST)
    


class TimeTableAPIView(APIView):
    def post(self, request, *args, **kwargs):
        try:
            # Extract the username from the request data
            username = request.data.get('username')

            # Fetch data associated with the user from PostgreSQL instead of the default SQLite
            classes = Classes.objects.filter(user=username)
            subjects = Subjects.objects.filter(user=username)
            teachers = Teachers.objects.filter(user=username)
            divisions = Divisions.objects.filter(user=username)
            schedule_params = Schedule.objects.filter(user=username).first()

            if not all([classes.exists(), subjects.exists(), teachers.exists(), divisions.exists(), schedule_params]):
                return Response({'error': 'Incomplete data for generating timetable'},
                                status=status.HTTP_400_BAD_REQUEST)
            

            # Prepare data for the genetic algorithm - this code would be the same as if using SQLite
            ga_input_data = format_for_ga(classes, subjects, teachers, divisions, schedule_params)
  
            generated_timetable = create_random_timetable(ga_input_data)
            data_list = [{'division': key[0], 'day': key[1], 'start_time': key[2], 'end_time': key[3], **value} for key, value in generated_timetable.items()]
            serializer = TimetableSerializer(data=data_list, many=True)

            if serializer.is_valid():
                print("data: ", serializer.data)
                return Response(serializer.data,status=status.HTTP_200_OK)

        except Exception as e:
            print(f"Error: {str(e)}")
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
class DisplayTTAPIView(APIView):
    def post(self, request, *args, **kwargs):
        try:
            # Extract the username from the request data

            username = request.data.get('username')
 

            # Fetch data associated with the user from the database
            timetable_data = Schedule.objects.filter(user=username)
   

            if timetable_data.exists():
                serializer = DisplayTTSerializer(timetable_data, many=True)
                return Response(serializer.data, status=status.HTTP_200_OK)
            else:
                return Response({'error': 'No timetable data found for the given username'}, status=status.HTTP_404_NOT_FOUND)

        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class DisplayClassesAPIView(APIView):
    def post(self, request, *args, **kwargs):
        try:
            # Extract the username from the request data
            username = request.data.get('username')

            # Fetch data associated with the user from the database
            classes_data = Classes.objects.filter(user=username)


            if classes_data.exists():
                serializer = ClassesBatchSerializer(classes_data, many=True)
                return Response(serializer.data, status=status.HTTP_200_OK)
            else:
                return Response({'error': 'No classes data found for the given username'}, status=status.HTTP_404_NOT_FOUND)

        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
class DisplaySubjectsAPIView(APIView):
    def post(self, request, *args, **kwargs):
        try:
            # Extract the username from the request data
            username = request.data.get('username')

            # Fetch data associated with the user from the database
            subjects_data = Subjects.objects.filter(user=username)

            if subjects_data.exists():
                serializer = SubjectsSerializer(subjects_data, many=True)
                return Response(serializer.data, status=status.HTTP_200_OK)
            else:
                return Response({'error': 'No subjects data found for the given username'}, status=status.HTTP_404_NOT_FOUND)

        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class DisplayTeachersAPIView(APIView):
    def post(self, request, *args, **kwargs):
        try:
            # Extract the username from the request data
            username = request.data.get('username')
            
            # Fetch data associated with the user from the database
            teachers_data = Teachers.objects.filter(user=username)

            if teachers_data.exists():
                serializer = TeachersSerializer(teachers_data, many=True)
                return Response(serializer.data, status=status.HTTP_200_OK)
            else:
                return Response({'error': 'No teachers data found for the given username'}, status=status.HTTP_404_NOT_FOUND)

        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        

class DisplayDivisionsAPIView(APIView):
    def post(self, request, *args, **kwargs):
        try:
            # Extract the username from the request data
            username = request.data.get('username')

            # Fetch data associated with the user from the database
            divisions_data = Divisions.objects.filter(user=username)

            if divisions_data.exists():
                serializer = DivisionsSerializer(divisions_data, many=True)
                return Response(serializer.data, status=status.HTTP_200_OK)
            else:
                return Response({'error': 'No divisions data found for the given username'}, status=status.HTTP_404_NOT_FOUND)

        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
class DisplayScheduleAPIView(APIView):
    def post(self, request, *args, **kwargs):
        try:
            # Extract the username from the request data
            username = request.data.get('username')

            # Fetch schedule associated with the user from the database
            schedule_data = Schedule.objects.filter(user=username)

            if schedule_data.exists():
                serializer = ScheduleSerializer(schedule_data, many=True)
                return Response(serializer.data, status=status.HTTP_200_OK)
            else:
                return Response({'error': 'No schedule data found for the given username'}, status=status.HTTP_404_NOT_FOUND)

        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        