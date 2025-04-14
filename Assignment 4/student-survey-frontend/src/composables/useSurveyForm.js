import { ref } from 'vue';

// Initial state factory
const getInitialFormData = () => ({
  firstName: '', lastName: '', streetAddress: '', city: '', state: '',
  zip: '', telephone: '', email: '', surveyDate: '',
  likedMost: [], interestedVia: '', likelihood: '', comments: ''
});

export function useSurveyForm(initialData = null) {
  // Reactive state for form data, errors
  const formData = ref(initialData ? { ...initialData } : getInitialFormData());
  const errors = ref({});

  // Validation function
  const validateForm = () => {
    errors.value = {}; // Clear previous errors
    const data = formData.value;

    // Required fields
    if (!data.firstName) errors.value.firstName = 'First name is required.';
    if (!data.lastName) errors.value.lastName = 'Last name is required.';
    if (!data.streetAddress) errors.value.streetAddress = 'Street address is required.';
    if (!data.city) errors.value.city = 'City is required.';
    if (!data.state) errors.value.state = 'State is required.';
    if (!data.zip) errors.value.zip = 'Zip code is required.';
    if (!data.telephone) {
        errors.value.telephone = 'Telephone number is required.';
    } else {
        const phoneRegex = /^\(\d{3}\)\s?\d{3}-\d{4}$|^\d{3}-\d{3}-\d{4}$/;
        if (!phoneRegex.test(data.telephone)) {
            errors.value.telephone = 'Invalid phone format. Use (XXX) XXX-XXXX or XXX-XXX-XXXX.';
        }
    }
    if (!data.email) {
        errors.value.email = 'Email is required.';
    } else if (!/\S+@\S+\.\S+/.test(data.email)) { // Basic email format check
        errors.value.email = 'Email format is invalid.';
    }
    if (!data.surveyDate) errors.value.surveyDate = 'Date of survey is required.';

    // Checkbox group (at least one selection)
    if (!data.likedMost || data.likedMost.length === 0) {
        errors.value.likedMost = 'Please select at least one option you liked.';
    }

    // Radio button group (one selection)
    if (!data.interestedVia) {
        errors.value.interestedVia = 'Please select how you became interested.';
    }

    // Select dropdown (one selection)
    if (!data.likelihood) {
        errors.value.likelihood = 'Please select the likelihood of recommending.';
    }

    return Object.keys(errors.value).length === 0;
  };

  // Function to reset the form to its initial state
  const resetForm = () => {
    formData.value = getInitialFormData();
    errors.value = {}; // Also clear errors on reset
  };

  // Expose reactive state and methods
  return {
    formData,
    errors,
    validateForm,
    resetForm
  };
} 