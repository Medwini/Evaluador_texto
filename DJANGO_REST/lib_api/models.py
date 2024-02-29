from django.db import models

# Create your models here.
class Usuarios(models.Model):
    nombre = models.CharField(max_length=100)
    usuario =  models.CharField(max_length=50)
    contrasena = models.CharField(max_length=50)

class Datos(models.Model):
    text = models.CharField(max_length=800)
    likes =  models.IntegerField()
    comments = models.IntegerField()
    shares = models.IntegerField()
    reactions_count =  models.IntegerField()
    emociones = models.CharField(max_length=800, default='')
    sentimientos = models.CharField(max_length=800, default='')