from django.conf.urls import include, url

from . import views

urlpatterns = [
    url(r'^([0-9]{4})$', views.room, name='room'),
]
