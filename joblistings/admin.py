from django.contrib import admin
from .models import *
import os
from django.conf import settings

class JobListingAdmin(admin.ModelAdmin):
    list_display = ('id', 'title','company','year','date','jobImage','applyLink')  
admin.site.register(JobListing, JobListingAdmin)

class ContactAdmin(admin.ModelAdmin):
    list_display = ('id', 'name','email','subject','message')
admin.site.register(ContactForm,ContactAdmin)

# Register your models here.
