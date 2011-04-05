from django.http import HttpResponse
from django.shortcuts import render_to_response
from shotcount.models import Shot

def app(request):

	return render_to_response('shotcount/app.html', )
	#return render_to_response('test.html')