from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from myapp import views

router = routers.DefaultRouter()
router.register(r'cities', views.CitiesView, 'cities')
router.register(r'users', views.UserView, 'users')
router.register(r'coordinates', views.CoordinatesView, 'coordinates')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
]