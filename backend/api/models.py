from django.db import models

class Classes(models.Model):
    classname = models.CharField(max_length=100)
    classType = models.CharField(max_length=50)
    user = models.CharField(max_length=50)

class Subjects(models.Model):
    subjectname = models.CharField(max_length=100)
    credit = models.IntegerField()
    length = models.IntegerField()
    type = models.CharField(max_length=50)
    user = models.CharField(max_length=50)

class Teachers(models.Model):
    teachername = models.CharField(max_length=100)
    subjects = models.JSONField()  # Assuming JSONField for storing arrays in PostgreSQL
    user = models.CharField(max_length=50)

class Divisions(models.Model):
    divisionname = models.CharField(max_length=100)
    subdivisions = models.JSONField()  # Assuming JSONField for storing arrays in PostgreSQL
    subjects = models.JSONField()  # Assuming JSONField for storing arrays in PostgreSQL
    user = models.CharField(max_length=50)

class Schedule(models.Model):
    days = models.JSONField()  # Assuming JSONField for storing arrays in PostgreSQL
    start_times = models.JSONField()  # Assuming JSONField for storing arrays in PostgreSQL
    end_times = models.JSONField()  # Assuming JSONField for storing arrays in PostgreSQL
    break_start_time = models.TimeField()
    break_end_time = models.TimeField()
    user = models.CharField(max_length=50)

class Users(models.Model):
    username = models.CharField(max_length=100)
    password = models.CharField(max_length=100)
    email = models.EmailField()
    firstname = models.CharField(max_length=100)
    lastname = models.CharField(max_length=100)
