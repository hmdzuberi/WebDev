<template>
  <div class="survey-list">
    <h1>List of Submitted Surveys</h1>

    <!-- Loading Indicator -->
    <div v-if="isLoading" class="loading">Loading surveys...</div>

    <!-- Error Message -->
    <div v-if="error" class="error-message">
      Error loading surveys: {{ error.message }}
    </div>

    <!-- Survey Table (uses surveysList from composable) -->
    <table v-if="!isLoading && !error && surveysList.length > 0">
      <thead>
        <tr>
          <th>ID</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Email</th>
          <th>Survey Date</th>
          <th>Likelihood</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <!-- Loop through surveysList -->
        <tr v-for="survey in surveysList" :key="survey.id">
          <td>{{ survey.id }}</td>
          <td>{{ survey.firstName }}</td>
          <td>{{ survey.lastName }}</td>
          <td>{{ survey.email }}</td>
          <td>{{ survey.surveyDate }}</td>
          <td>{{ survey.recommendationLikelihood || 'N/A' }}</td>
          <td>
            <button @click="handleUpdate(survey.id)" class="action-button update-button">Update</button>
            <button @click="handleDelete(survey.id)" class="action-button delete-button" :disabled="isLoading">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Message if no surveys are found -->
    <div v-if="!isLoading && !error && surveysList.length === 0">
      No surveys have been submitted yet.
    </div>

    <!-- Navigation links -->
    <div class="navigation-links">
      <router-link to="/">Go Home</router-link> |
      <router-link to="/survey">Add New Survey</router-link>
    </div>

  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useSurveyApi } from '@/composables/useSurveyApi.js';

const router = useRouter();

// Use the composable
const { surveysList, isLoading, error, fetchSurveys, deleteSurvey } = useSurveyApi();

// Fetch surveys when the component mounts
onMounted(() => {
  fetchSurveys(); // Call the composable function
});

// Handle navigation to the update page
const handleUpdate = (surveyId) => {
  router.push({ name: 'SurveyUpdate', params: { id: surveyId } });
};

// Handle survey deletion using the composable
const handleDelete = async (surveyId) => {
  if (!confirm(`Are you sure you want to delete survey ID: ${surveyId}?`)) {
    return;
  }

  const success = await deleteSurvey(surveyId);

  if (success) {
    alert(`Survey ID: ${surveyId} deleted successfully.`);
    // Remove the survey from the local list reactively
    surveysList.value = surveysList.value.filter(survey => survey.id !== surveyId);
    // Alternatively, refetch the entire list:
    // await fetchSurveys();
  } else {
    // The error ref from the composable should be populated
    alert(`Error deleting survey: ${error.value?.message || 'Unknown error'}`);
    // Optionally clear the error if needed
    // error.value = null;
  }
};

</script>

<style scoped>
.survey-list {
  max-width: 900px;
  margin: 20px auto;
  padding: 20px;
}

.loading, .error-message {
  text-align: center;
  padding: 20px;
  font-size: 1.1em;
}

.error-message {
  color: red;
  border: 1px solid red;
  background-color: #ffebeb;
  border-radius: 4px;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

th, td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}

th {
  background-color: #f2f2f2;
  font-weight: bold;
}

tr:nth-child(even) {
  background-color: #f9f9f9;
}

.action-button {
  padding: 5px 10px;
  margin-right: 5px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9em;
}

.update-button {
  background-color: #ffc107; /* Yellow */
  color: black;
}

.delete-button {
  background-color: #dc3545; /* Red */
  color: white;
}

.delete-button:disabled {
    opacity: 0.6;
    cursor: not-allowed;
}

.navigation-links {
    margin-top: 20px;
    text-align: center;
}

.navigation-links a {
  margin: 0 10px;
  font-weight: bold;
  color: #2c3e50;
}

.navigation-links a.router-link-exact-active {
  color: #42b983;
}
</style>