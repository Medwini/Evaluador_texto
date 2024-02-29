from django.urls import path, include
from rest_framework import routers
from lib_api import views
from .views import *

# router = routers.DefaultRouter()
# router.register(r'Usuarios', views.UsuariosViewSet)

urlpatterns = [
    # path('', include(router.urls)),
    path('data/', UsuariosView.as_view(), name='Lista_Datos'),
    path('data/<int:id>', UsuariosView.as_view(), name='Listar_usuario'),
    path('data/login', LoginView.as_view(), name='login'),
    path('data/cargarArchivo', ArchivoCarg.as_view(), name='ArchivoCarg'),
]