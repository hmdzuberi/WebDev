<!-- This view provides the page structure for creating a new student survey, using the SurveyFormFields component and handling form submission and cancellation logic. -->
<template>
  <div class="survey-form">
    <h1>Student Survey Form</h1>
    <form @submit.prevent="handleSubmit" novalidate>
      <!-- Use the reusable form fields component -->
      <SurveyFormFields v-model="formData" :errors="errors" />

      <!-- Buttons -->
      <div class="form-actions">
        <button type="submit" :disabled="isSubmitting || isLoading">
          {{ isSubmitting ? 'Submitting...' : 'Submit' }}
        </button>
        <button type="button" @click="handleCancel" :disabled="isSubmitting || isLoading">Cancel</button>
      </div>

      <!-- Display API submission errors -->
      <div v-if="apiError" class="error-message api-error">
        Error submitting survey: {{ apiError.message }}
      </div>

    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import SurveyFormFields from '@/components/SurveyFormFields.vue';
import { useSurveyForm } from '@/composables/useSurveyForm.js';
import { useSurveyApi } from '@/composables/useSurveyApi.js';

const router = useRouter();

// Use the composables
const { formData, errors, validateForm, resetForm } = useSurveyForm();
const { isLoading, error: apiError, createSurvey } = useSurveyApi();

// Local submission state (distinct from API loading state)
const isSubmitting = ref(false);

// Handle form submission
const handleSubmit = async () => {
  if (!validateForm()) {
    alert('Please correct the errors in the form.');
    // Scroll to first error (optional enhancement)
    const firstErrorField = document.querySelector('.input-error, .fieldset-error');
    if (firstErrorField) {
      firstErrorField.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
    return;
  }

  if (isSubmitting.value) return; // Prevent double submission

  isSubmitting.value = true;

  const result = await createSurvey(formData.value);

  isSubmitting.value = false;

  if (result && !apiError.value) {
    alert('Survey submitted successfully!');
    resetForm(); // Reset form after successful submission
    // Optionally navigate away, e.g., back to a list view
    router.push('/surveys'); // Navigate to the list view
  } else {
    // Error is handled by the apiError ref exposed by useSurveyApi
    // Alert is shown via the template
    console.error("Submission failed:", apiError.value);
     alert('Submission failed. Please check the details and try again.');
  }
};

// Handle cancellation
const handleCancel = () => {
  if (confirm('Are you sure you want to cancel? Any unsaved changes will be lost.')) {
    resetForm();
    router.push('/surveys'); // Navigate back to the list view
  }
};
</script>

<style scoped>
/* Styles for the view container */
.survey-form {
  max-width: 800px;
  margin: 2rem auto;
  padding: 2rem;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

h1 {
  text-align: center;
  margin-bottom: 2rem;
  color: #333;
}

/* Form Actions (Buttons) */
.form-actions {
  margin-top: 2rem;
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
}

button {
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s ease, opacity 0.3s ease;
}

button[type="submit"] {
  background-color: #007bff; /* Primary button color */
  color: white;
}

button[type="submit"]:hover {
  background-color: #0056b3;
}

button[type="button"] {
  background-color: #6c757d; /* Secondary button color */
  color: white;
}

button[type="button"]:hover {
  background-color: #5a6268;
}

button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

/* API Error Message Specific Styling */
.api-error {
    margin-top: 1.5rem;
    padding: 1rem;
    background-color: #f8d7da; /* Light red background */
    border: 1px solid #f5c6cb; /* Red border */
    color: #721c24; /* Dark red text */
    border-radius: 4px;
    text-align: center;
}

/* Inherit field styles from SurveyFormFields, add specific view styles */
/* Example: Add spacing or alignment specific to this view */
</style>