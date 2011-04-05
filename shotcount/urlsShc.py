

urlpatterns += patterns('shots.shotcount.views',
	(r'^$', 'app'),
	#(r'^(?P<project_id>\d+)/$', 'question_list'),
    #(r'^(?P<project_id>\d+)/(?P<question_id>\d+)/$', 'question_list'), 
    #(r'^create/$', 'createProject'),
    #(r'^edit/(?P<project_id>\d+)/(?P<question_id>\d+)/(?P<answer_id>\d+)/$', 'editAnswer'),
	#(r'^edit/(?P<project_id>\d+)/(?P<question_id>\d+)/$', 'editQuestion'),
    #(r'^answer/(?P<project_id>\d+)/(?P<question_id>\d+)/$', 'createAnswer'),
    #(r'^question/(?P<project_id>\d+)/$', 'createQuestion'),
    #(r'^project/$', 'createProject'),
  	#(r'^delete/(?P<project_id>\d+)/$', 'deleteProject'),
	#(r'^delete/(?P<project_id>\d+)/(?P<question_id>\d+)/(?P<answer_id>\d+)/$', 'deleteAnswer'),
	#(r'^delete/(?P<project_id>\d+)/(?P<question_id>\d+)/$', 'deleteQuestion'),
	#(r'^collaborate/(?P<project_id>\d+)/$', 'applyToCollaborate'),
  
         
    #url(r'^(?P<object_id>\d+)/results/$', 'django.views.generic.list_detail.object_detail', dict(info_dict, template_name='polls/results.html'), 'poll_results'),
    #(r'^(?P<poll_id>\d+)/vote/$', 'Learness.polls.views.vote'),

)

