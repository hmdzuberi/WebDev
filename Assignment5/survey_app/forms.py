# Defines Django forms for handling survey data input and validation.

from django import forms
from .models import SurveyResponse

class SurveyResponseForm(forms.ModelForm):
    # Customize checkbox widgets for 'liked most'
    liked_students = forms.BooleanField(label='Students', required=False, widget=forms.CheckboxInput(attrs={'class': 'form-check-input'}))
    liked_location = forms.BooleanField(label='Location', required=False, widget=forms.CheckboxInput(attrs={'class': 'form-check-input'}))
    liked_campus = forms.BooleanField(label='Campus', required=False, widget=forms.CheckboxInput(attrs={'class': 'form-check-input'}))
    liked_atmosphere = forms.BooleanField(label='Atmosphere', required=False, widget=forms.CheckboxInput(attrs={'class': 'form-check-input'}))
    liked_dorm_rooms = forms.BooleanField(label='Dorm Rooms', required=False, widget=forms.CheckboxInput(attrs={'class': 'form-check-input'}))
    liked_sports = forms.BooleanField(label='Sports', required=False, widget=forms.CheckboxInput(attrs={'class': 'form-check-input'}))

    # Customize radio select widget for 'heard_about'
    heard_about = forms.ChoiceField(
        choices=SurveyResponse.HEARD_ABOUT_CHOICES,
        widget=forms.RadioSelect(attrs={'class': 'form-check-input'}),
        required=True
    )

    # Customize select widget for 'recommend_likelihood'
    recommend_likelihood = forms.ChoiceField(
        choices=SurveyResponse.RECOMMEND_CHOICES,
        widget=forms.Select(attrs={'class': 'form-select'}),
        required=True
    )

    # Customize text area widget for 'additional_comments'
    additional_comments = forms.CharField(
        widget=forms.Textarea(attrs={'rows': 4, 'class': 'form-control'}),
        required=False
    )

    # Customize survey_date widget if needed (e.g., for date picker)
    survey_date = forms.DateField(
        widget=forms.DateInput(attrs={'type': 'date', 'class': 'form-control'}),
        required=True
    )

    class Meta:
        model = SurveyResponse
        fields = '__all__' # Include all fields from the model
        # Exclude fields managed automatically
        exclude = ['created_at', 'updated_at']

        # Add widget attributes for Bootstrap styling (or other CSS frameworks)
        widgets = {
            'first_name': forms.TextInput(attrs={'class': 'form-control'}),
            'last_name': forms.TextInput(attrs={'class': 'form-control'}),
            'street_address': forms.TextInput(attrs={'class': 'form-control'}),
            'city': forms.TextInput(attrs={'class': 'form-control'}),
            'state': forms.TextInput(attrs={'class': 'form-control'}),
            'zip_code': forms.TextInput(attrs={'class': 'form-control'}),
            'telephone': forms.TextInput(attrs={'class': 'form-control'}),
            'email': forms.EmailInput(attrs={'class': 'form-control'}),
        }

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)