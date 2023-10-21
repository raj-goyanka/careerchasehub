from django.db import models
import os
from django.conf import settings


class JobListing(models.Model):
    title = models.CharField(max_length=255)
    company = models.CharField(max_length=255)
    year = models.CharField(max_length=50)
    date = models.DateField()
    jobImage =  models.ImageField(upload_to='job-images/')
    applyLink = models.URLField()

    def __str__(self):
        return self.title
    
    def delete(self, *args, **kwargs):
        # Custom delete logic here
        if self.jobImage:
            # Get the image path
            image_path = os.path.join(settings.MEDIA_ROOT, str(self.jobImage))
            # Check if the file exists before attempting to delete
            if os.path.exists(image_path):
                os.remove(image_path)
        # Call the parent class's delete method to remove the object from the database
        super(JobListing, self).delete(*args, **kwargs)

    def delete_queryset(cls, queryset):
        # Custom queryset delete logic here
        for obj in queryset:
            obj.delete()    




class ContactForm(models.Model):
    name = models.CharField(max_length=255)
    email = models.EmailField()
    subject = models.CharField(max_length=255)
    message = models.TextField()

    def __str__(self):
        return self.subject 
