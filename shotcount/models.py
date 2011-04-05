from django.db import models
from django.contrib.auth.models import User

# Create your models here.

class Shot(models.Model):
	startingPoint = models.CharField(max_length=100)
	endingPoint = models.CharField(max_length=100)
	dist = models.IntegerField()
	club = models.CharField(max_length=30)
	player = models.ForeignKey(User, related_name="player")
	date = models.DateTimeField(auto_now_add=True, null = True)
	
	class Admin: pass
	
	def __str__(self):
		return self.name
		