# Contains view functions that handle requests and return responses for the survey_app.

from django.shortcuts import render, redirect, get_object_or_404
from .models import SurveyResponse
from .forms import SurveyResponseForm

# Homepage View
def home_view(request):
    return render(request, 'survey_app/home.html') 

# Survey Create View (Handles GET for display and POST for submission)
def survey_create_view(request):
    if request.method == 'POST':
        form = SurveyResponseForm(request.POST)
        if form.is_valid():
            form.save() # Save the new survey response to the database
            # Redirect to a success page or the list page (preferred)
            return redirect('survey_list') # Assumes we have a URL named 'survey_list'
        # If form is not valid, render the form again with errors
    else: # GET request
        form = SurveyResponseForm() # Create an empty form
    
    # Render the template with the form
    return render(request, 'survey_app/survey_form.html', {'form': form})

# Survey List View
def survey_list_view(request):
    surveys = SurveyResponse.objects.all().order_by('-survey_date', '-created_at') # Get all responses, ordered
    return render(request, 'survey_app/survey_list.html', {'surveys': surveys})

def survey_update_view(request, pk):
    survey = get_object_or_404(SurveyResponse, pk=pk)
    if request.method == 'POST':
        form = SurveyResponseForm(request.POST, instance=survey)
        if form.is_valid():
            form.save()
            return redirect('survey_list')
    else:
        form = SurveyResponseForm(instance=survey) # Pre-fill form with existing data
    return render(request, 'survey_app/survey_form.html', {'form': form, 'is_update': True})

def survey_delete_view(request, pk):
    survey = get_object_or_404(SurveyResponse, pk=pk)
    if request.method == 'POST':
        survey.delete()
        return redirect('survey_list')
    # For GET request, show a confirmation page
    return render(request, 'survey_app/survey_confirm_delete.html', {'survey': survey})
