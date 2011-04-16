from django.http import HttpResponse
from django.shortcuts import render_to_response
from shotcount.models import Shot

def index(request):

	return render_to_response('shotcount/index.html', )
	#return render_to_response('test.html')

def about(request):
	return render_to_response('shotcount/about.html')
	
def iphone(request):
	return render_to_response('shotcount/iphone.html')