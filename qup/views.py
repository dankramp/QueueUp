from django.shortcuts import render, get_object_or_404
from django.http import HttpResponse

from .models import Room, Playlist, Song

def room(request, room_num):
    try:
        _room = Room.objects.get(room_id=room_num)
    except Room.DoesNotExist:
        return render(request, 'qup/bad_room.html', {'room_num': room_num})
    return render(request, 'qup/room.html', {'room_num': room_num, 'room': _room})

