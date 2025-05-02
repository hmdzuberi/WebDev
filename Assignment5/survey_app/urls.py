# Defines URL patterns specific to the survey_app.

from django.urls import path
from . import views

urlpatterns = [ 
    # Survey URLs
    path('new/', views.survey_create_view, name='survey_new'),
    path('list/', views.survey_list_view, name='survey_list'),
    path('<int:pk>/update/', views.survey_update_view, name='survey_update'),
    path('<int:pk>/delete/', views.survey_delete_view, name='survey_delete'),
] 