from django.shortcuts import render
from rest_framework import viewsets
from .serializers import  CitiesSerializer, UserSerializer, CoordinatesSerializer
from .models import Cities, User, Coordinates
from rest_framework.response import Response

# Create your views here.


class CitiesView(viewsets.ModelViewSet):
    serializer_class = CitiesSerializer
    queryset = Cities.objects.all()

    def create(self, request, *args, **kwargs):
        """
        #checks if post request data is an array initializes serializer with many=True
        else executes default CreateModelMixin.create function 
        """
        is_many = isinstance(request.data, list)
        if not is_many:
            return super(BookViewSet, self).create(request, *args, **kwargs)
        else:
            serializer = self.get_serializer(data=request.data, many=True)
            serializer.is_valid(raise_exception=True)
            self.perform_create(serializer)
            headers = self.get_success_headers(serializer.data)
            return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)


class UserView(viewsets.ModelViewSet):
    serializer_class = UserSerializer
    queryset = User.objects.all()

class CoordinatesView(viewsets.ModelViewSet):
    serializer_class = CoordinatesSerializer
    queryset = Coordinates.objects.all()