from django.shortcuts import render
from django.http import JsonResponse
from django.shortcuts import render
from django.http import HttpResponse
import json
import smtplib
from email.message import EmailMessage
from .models import *


def index(request):
    job_listings = JobListing.objects.all().order_by('-date')

    # Serialize the queryset to JSON
    job_listings_json = json.dumps([{
        'title': listing.title,
        'company': listing.company,
        'year': listing.year,
        # Format date as 'dd-mm-yyyy'
        'date': listing.date.strftime('%d-%m-%Y'),
        'jobImage': listing.jobImage.url,  # Get the URL of the image
        'applyLink': listing.applyLink
    } for listing in job_listings])

    context = {
        'jobListings_json': job_listings_json,
    }
    return render(request, 'index.html', context)


def save_query(request):
    if request.method == 'POST':
        name = request.POST.get('name')
        email = request.POST.get('email')
        subject = request.POST.get('subject')
        message = request.POST.get('message')

        # Create a new Query object and save it to the database
        query = ContactForm(name=name, email=email,
                            subject=subject, message=message)
        query.save()

        # Send a JSON response indicating success
        return JsonResponse({'status': 'success'})

    return JsonResponse({'status': 'error', 'message': 'Invalid request method'})
