from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('save_query/',views.save_query, name='save_query'),
    # Add more URL patterns as needed
]
