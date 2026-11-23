from django.urls import path

from . import views

app_name = "inquieras"

urlpatterns = [
    path("", views.index, name="index"),
]
