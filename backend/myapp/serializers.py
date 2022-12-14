from rest_framework import serializers
from .models import Cities, User, Coordinates

class CitiesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cities
        fields = ('id', 'region_id', 'name_ar','name_en','center_lat','center_lon')


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id','name')

class CoordinatesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Coordinates
        fields = ('id','user_id','timestamp','lat','lon')