from rest_framework import serializers
from .models import *

class UsuariosSerializer(serializers.ModelSerializer):
    class Meta:
        model= Usuarios
        fields= '__all__'

class DatosSerializer(serializers.ModelSerializer):
    class Meta:
        model= Datos
        fields= '__all__'