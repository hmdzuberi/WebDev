<template>
  <div class="survey-form">
    <h1>Update Student Survey</h1>

    <!-- Loading state while fetching existing data -->
    <div v-if="isLoadingData" class="loading">Loading survey data...</div>

    <!-- Error message if fetching fails -->
    <div v-if="fetchError" class="error-message fetch-error">
      Error loading survey data: {{ fetchError.message }}
      <br />
      <router-link to="/surveys">Back to List</router-link>
    </div>

    <!-- Display API submission errors -->
    <div v-if="apiError && !fetchError" class="error-message api-error">
        Error updating survey: {{ apiError.message }}
    </div>

    <!-- The actual form (shown only when data is loaded and no fetch error) -->
    <form @submit.prevent="handleUpdateSubmit" v-if="!isLoadingData && !fetchError" novalidate>

      <!-- Use the reusable form fields component -->
      <SurveyFormFields v-model="formData" :errors="errors" />

      <!-- Buttons -->
      <div class="form-actions">
        <button type="submit" :disabled="isSubmitting || isLoadingApi">
          {{ isSubmitting ? 'Updating...' : 'Update Survey' }}
        </button>
        <router-link to="/surveys" custom v-slot="{ navigate }">
          <button type="button" @click="navigate" :disabled="isSubmitting || isLoadingApi">Cancel</button>
        </router-link>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import SurveyFormFields from '@/components/SurveyFormFields.vue';
import { useSurveyForm } from '@/composables/useSurveyForm.js';
import { useSurveyApi } from '@/composables/useSurveyApi.js';

const route = useRoute();
const router = useRouter();
const surveyId = route.params.id;

// Use composables
// Pass null initially, will be populated after fetch
const { formData, errors, validateForm } = useSurveyForm(null);
// isLoadingApi and apiError are used for create/update calls
// Use separate refs for fetch loading/error states
const { isLoading: isLoadingApi, error: apiError, fetchSurvey, updateSurvey } = useSurveyApi();

// State specific to fetching initial data for update
const isLoadingData = ref(false);
const fetchError = ref(null);

// State for submission process
const isSubmitting = ref(false);

// Fetch data when component mounts
onMounted(async () => {
  isLoadingData.value = true;
  fetchError.value = null;
  try {
    const fetchedData = await fetchSurvey(surveyId);
    if (fetchedData && !apiError.value) {
      // Update the form data ref provided by useSurveyForm
      // IMPORTANT: Replace the entire ref value, don't just assign properties
      formData.value = fetchedData;
       // Optionally clear validation errors after successful fetch
       errors.value = {};
    } else {
      // If fetchSurvey returned null or apiError has a value from fetchSurvey
      fetchError.value = apiError.value || new Error('Survey not found or failed to load.');
    }
  } catch (err) {
    // Catch any other unexpected errors during mount/fetch
    console.error('Error in onMounted fetch:', err);
    fetchError.value = err;
  } finally {
    isLoadingData.value = false;
  }
});

// --- Handle Update Submission ---
const handleUpdateSubmit = async () => {
  if (!validateForm()) {
    alert('Please correct the errors in the form.');
    const firstErrorField = document.querySelector('.input-error, .fieldset-error');
    if (firstErrorField) {
      firstErrorField.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
    return;
  }

  if (isSubmitting.value) return;
  isSubmitting.value = true;

  // Call the updateSurvey function from the composable
  const result = await updateSurvey(surveyId, formData.value);

  isSubmitting.value = false;

  if (result && !apiError.value) {
    alert('Survey updated successfully!');
    router.push('/surveys'); // Navigate back to the list view
  } else {
    // Error is handled by the apiError ref
    console.error("Update failed:", apiError.value);
     alert('Update failed. Please check the details and try again.');

  }
};

</script>

<style scoped>
/* Use similar styling as SurveyFormView, potentially with minor adjustments */
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

/* Loading and Fetch Error Styling */
.loading,
.fetch-error {
  text-align: center;
  padding: 2rem;
  margin-bottom: 1rem;
  border-radius: 4px;
}

.loading {
  color: #007bff;
}

.fetch-error {
  color: #721c24;
  background-color: #f8d7da;
  border: 1px solid #f5c6cb;
}

.fetch-error a {
    color: #007bff; /* Link color */
    text-decoration: underline;
    margin-top: 0.5rem;
    display: inline-block;
}

/* API Error Message Specific Styling */
.api-error {
    margin-top: 1.5rem; /* Add space above */
    margin-bottom: 1.5rem; /* Add space below */
    padding: 1rem;
    background-color: #f8d7da; /* Light red background */
    border: 1px solid #f5c6cb; /* Red border */
    color: #721c24; /* Dark red text */
    border-radius: 4px;
    text-align: center;
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

/* Different color for Update button */
button[type="submit"] {
  background-color: #28a745; /* Green for update */
  color: white;
}

button[type="submit"]:hover {
  background-color: #218838;
}

/* Cancel button styling consistent with Create view */
button[type="button"] {
  background-color: #6c757d;
  color: white;
}

button[type="button"]:hover {
  background-color: #5a6268;
}

button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
</style> 