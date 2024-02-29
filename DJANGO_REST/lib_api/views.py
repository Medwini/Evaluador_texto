# from django.shortcuts import render
from typing import Any
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
from django.http import HttpRequest, JsonResponse
from django.http.response import HttpResponse as HttpResponse
from .serializer import *
from .models import *
from rest_framework import viewsets
from rest_framework.authtoken.models import Token
from django.views import View
import json
from transformers import pipeline

from django.contrib.auth import authenticate

# Create your views here.

# class UsuariosViewSet(viewsets.ModelViewSet):
#     queryset = Usuarios.objects.all()
#     serializer_class = UsuariosSerializer
#USUARIOS
class UsuariosView(View):

    @method_decorator(csrf_exempt)
    def dispatch(self, request, *args, **kwargs):
        return super().dispatch(request, *args, **kwargs)

    def get(self, request, id=0):
        if (id > 0):   
            usuarios = list(Usuarios.objects.filter(id=id).values())
            if len(usuarios)>0:
                datos={'mensaje':'Busqueda exitosa', 'usuarios':usuarios}
            else:
                datos={'mensaje':'No se encontraron datos'}
        else:
            usuarios = list(Usuarios.objects.values())
            if len(usuarios)>0:
                datos={'mensaje':'Busqueda exitosa', 'usuarios':usuarios}
            else:
                datos={'mensaje':'No se encontraron datos'}
        return JsonResponse(datos)
    
    def post(self, request):
        dt =json.loads(request.body)
        usuario = dt.get('usuario')
        if Usuarios.objects.filter(usuario=usuario).exists():
            datos={'mensaje':'Ya existe un cliente con ese usuario'}
        else:
            Usuarios.objects.create(nombre=dt['nombre'],usuario=dt['usuario'],contrasena=dt['contrasena'] )
            datos={'mensaje':'Registrado exitosamente'}        
        return JsonResponse(datos)
    
    def put(self, request,id):
        dt =json.loads(request.body)
        usuario = list(Usuarios.objects.filter(id=id).values())
        if len(usuario)>0:
            usuario =Usuarios.objects.get(id=id)
            usuario.nombre=dt['nombre']
            usuario.usuario=dt['usuario']
            usuario.contrasena=dt['contrasena']
            usuario.save()
            datos={'mensaje':'Editado exitosamente'}
        else:
            datos={'mensaje':'No se encontraron datos'}
        return JsonResponse(datos)
    
    def delete(self, request, id):
        usuario = list(Usuarios.objects.filter(id=id).values())
        if len(usuario)>0:
            Usuarios.objects.filter(id=id).delete()
            datos={'mensaje':'Eliminado exitosamente'}
        else:
            datos={'mensaje':'No se encontraron datos'}
        return JsonResponse(datos)

#LOGIN
class LoginView(View):

    @method_decorator(csrf_exempt)
    def dispatch(self, request, *args, **kwargs):
        return super().dispatch(request, *args, **kwargs)

    def post(self, request):
        data = json.loads(request.body.decode('utf-8'))

        usuario = data.get('usuario')
        contrasena = data.get('contrasena')
        
        try:
            usuario = Usuarios.objects.get(usuario=usuario, contrasena=contrasena)
            usuario_data = {
                'nombre': usuario.nombre,
                'usuario': usuario.usuario,
                'contrasena': usuario.contrasena,
            }
            datos = {'mensaje': 'Inicio de sesión exitosa', 'usuario': usuario_data}
            return JsonResponse(datos)
        except Usuarios.DoesNotExist:
            datos = {'mensaje': 'Datos no coinciden con nuestros clientes'}
            return JsonResponse(datos)
        
#ARCHIVO CSV
class ArchivoCarg(View):

    @method_decorator(csrf_exempt)
    def dispatch(self, request, *args, **kwargs):
        return super().dispatch(request, *args, **kwargs)

    def post(self, request):

        classifier = pipeline(task="text-classification", model="SamLowe/roberta-base-go_emotions", top_k=None)
        classifier_s =pipeline(task="text-classification", model="finiteautomata/beto-sentiment-analysis", top_k=None)
        data_csv =json.loads(request.body)
        print(data_csv)
        # if not Datos.objects.exists():
        sentences = data_csv['text']

        model_outputs = classifier(sentences)
        model_outputs_s = classifier_s(sentences)
        print(model_outputs_s[0])
        Datos.objects.create(text=data_csv['text'],likes=data_csv['likes'],comments=data_csv['comments'],shares=data_csv['shares'],reactions_count=data_csv['reactions_count'], emociones=model_outputs[0], sentimientos=model_outputs_s[0])
        data = list(Datos.objects.values())
        datos={'mensaje':'Registrado exitosamente', 'data': data}        
        # print(datos)
        # else:
        #     datos={'mensaje':'Existen datos cargados, por favor elimine para volver a cargar'}      

        return JsonResponse(datos)
    
    def delete(self, request):
        queryset = Datos.objects.all()
        if Datos.objects.exists():
            queryset.delete()
            datos={'mensaje':'Datos eliminados con exito, ya puede volver a cargar'}
        else:
            datos={'mensaje':'No se encontraron datos'}
        return JsonResponse(datos)
    
    def get(self, request, id=0):
        if (id > 0):   
            data = list(Datos.objects.filter(id=id).values())
            if len(data)>0:
                datos={'mensaje':'Busqueda exitosa', 'data':data}
            else:
                datos={'mensaje':'No se encontraron datos'}
        else:
            data = list(Datos.objects.values())
            if len(data)>0:
                datos={'mensaje':'Busqueda exitosa', 'data':data}
            else:
                datos={'mensaje':'No se encontraron datos'}
        return JsonResponse(datos)