from django.db import models

class Room(models.Model):
    room_id = models.IntegerField(default=1000)
    creation_date = models.DateTimeField()

class Playlist(models.Model):
    room = models.ForeignKey(Room, on_delete=models.CASCADE)
    num_songs = models.IntegerField(default=0)

class Song(models.Model):
    playlist = models.ForeignKey(Playlist, on_delete=models.CASCADE)
    title = models.CharField(max_length=200)
    artist = models.CharField(max_length=200)
    duration = models.IntegerField(default=0)
