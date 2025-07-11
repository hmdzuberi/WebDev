# Defines the database models (schema) for the survey_app.

from django.db import models
from django.utils import timezone

class SurveyResponse(models.Model):
    # Choices for 'heard_about' radio buttons
    HEARD_ABOUT_CHOICES = [
        ('friends', 'Friends'),
        ('television', 'Television'),
        ('internet', 'Internet'),
        ('other', 'Other'),
    ]

    # Choices for 'recommend_likelihood' dropdown
    RECOMMEND_CHOICES = [
        ('very_likely', 'Very Likely'),
        ('likely', 'Likely'),
        ('unlikely', 'Unlikely'),
    ]

    # Personal Information
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    street_address = models.CharField(max_length=255)
    city = models.CharField(max_length=100)
    state = models.CharField(max_length=50)
    zip_code = models.CharField(max_length=10)
    telephone = models.CharField(max_length=15)
    email = models.EmailField()
    survey_date = models.DateField(default=timezone.now)

    # Liked Most (Checkboxes) - Using BooleanFields
    liked_students = models.BooleanField(default=False)
    liked_location = models.BooleanField(default=False)
    liked_campus = models.BooleanField(default=False)
    liked_atmosphere = models.BooleanField(default=False)
    liked_dorm_rooms = models.BooleanField(default=False)
    liked_sports = models.BooleanField(default=False)

    # How heard about us (Radio Buttons)
    heard_about = models.CharField(
        max_length=20,
        choices=HEARD_ABOUT_CHOICES,
        blank=False,
        null=False
    )

    # Recommendation Likelihood (Dropdown)
    recommend_likelihood = models.CharField(
        max_length=20,
        choices=RECOMMEND_CHOICES,
        blank=False,
        null=False
    )

    # Additional Comments (Text Area)
    additional_comments = models.TextField(blank=True, null=True)

    # Timestamps (Optional but good practice)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.first_name} {self.last_name} - {self.survey_date}"

    class Meta:
        ordering = ['-survey_date', '-created_at']
