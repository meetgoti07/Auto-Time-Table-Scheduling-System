from rest_framework import serializers
from datetime import datetime
from .models import Classes, Subjects, Teachers, Divisions, Schedule, Users

class ClassesBatchSerializer(serializers.ModelSerializer):
    ClassName = serializers.CharField(source='classname')
    Type = serializers.CharField(source='classType')
    user = serializers.PrimaryKeyRelatedField(read_only=True)

    class Meta:
        model = Classes
        fields = ['ClassName', 'Type', 'user']

class SubjectsSerializer(serializers.ModelSerializer):
    user = serializers.PrimaryKeyRelatedField(read_only=True)
    class Meta:
        model = Subjects
        fields = ['subjectname', 'credit', 'length', 'type', 'user']

class TeachersSerializer(serializers.ModelSerializer):
    user = serializers.PrimaryKeyRelatedField(read_only=True)
    class Meta:
        model = Teachers
        fields = ['teachername', 'subjects', 'user']

class DivisionsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Divisions
        fields = ['divisionname', 'subdivisions', 'subjects', 'user']

class ScheduleSerializer(serializers.ModelSerializer):
    user = serializers.CharField(max_length=50)
    daysOfWeek = serializers.JSONField()  # Assuming JSONField for storing arrays in PostgreSQL
    sessionTimes = serializers.JSONField()  # Assuming JSONField for storing arrays in PostgreSQL
    breakData = serializers.JSONField()  # Assuming JSONField for storing arrays in PostgreSQL

    class Meta:
        model = Schedule
        fields = ['daysOfWeek', 'sessionTimes', 'breakData', 'user']

class UsersSerializer(serializers.ModelSerializer):
    class Meta:
        model = Users
        fields = ['id', 'username', 'password', 'email', 'firstname', 'lastname']

class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()

class TimetableSerializer(serializers.Serializer):
    division = serializers.CharField()
    day = serializers.CharField()
    start_time = serializers.DateTimeField(format='%H:%M')
    end_time = serializers.DateTimeField(format='%H:%M')
    classname = serializers.CharField()
    subjectname = serializers.CharField()
    teachername = serializers.CharField()

class DisplayTTSerializer(serializers.ModelSerializer):
    class Meta:
        model = Schedule
        fields = ['start_times', 'end_times', 'days']