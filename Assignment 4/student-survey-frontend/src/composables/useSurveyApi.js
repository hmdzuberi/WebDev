import { ref } from 'vue';

// Base API URL (Consider moving to environment variables in a real app)
const baseApiUrl = 'http://localhost:8080/api/surveys';

// Helper to transform form data to API payload
const transformFormDataToApi = (formData) => {
  return {
    firstName: formData.firstName,
    lastName: formData.lastName,
    streetAddress: formData.streetAddress,
    city: formData.city,
    state: formData.state,
    zip: formData.zip,
    telephone: formData.telephone,
    email: formData.email,
    surveyDate: formData.surveyDate,
    additionalComments: formData.comments || '', // Use form's comments field

    // Map likedMost array back to boolean fields
    likedStudents: formData.likedMost.includes('students'),
    likedLocation: formData.likedMost.includes('location'),
    likedCampus: formData.likedMost.includes('campus'),
    likedAtmosphere: formData.likedMost.includes('atmosphere'),
    likedDormRooms: formData.likedMost.includes('dorm rooms'),
    likedSports: formData.likedMost.includes('sports'),

    // Map interestedVia directly (assuming API expects lowercase)
    interestSource: formData.interestedVia || '',

    // Map likelihood to API format (e.g., lowercase)
    recommendationLikelihood: formData.likelihood.toLowerCase().replace(' ', '') || ''
  };
};

// Helper to transform API data to form data
const transformApiToFormData = (apiData) => {
  const liked = [];
  if (apiData.likedStudents) liked.push('students');
  if (apiData.likedLocation) liked.push('location');
  if (apiData.likedCampus) liked.push('campus');
  if (apiData.likedAtmosphere) liked.push('atmosphere');
  if (apiData.likedDormRooms) liked.push('dorm rooms');
  if (apiData.likedSports) liked.push('sports');

  let likelihood = '';
  if (apiData.recommendationLikelihood === 'verylikely') likelihood = 'Very Likely';
  else if (apiData.recommendationLikelihood === 'likely') likelihood = 'Likely';
  else if (apiData.recommendationLikelihood === 'unlikely') likelihood = 'Unlikely';

  return {
    firstName: apiData.firstName || '',
    lastName: apiData.lastName || '',
    streetAddress: apiData.streetAddress || '',
    city: apiData.city || '',
    state: apiData.state || '',
    zip: apiData.zip || '',
    telephone: apiData.telephone || '',
    email: apiData.email || '',
    surveyDate: apiData.surveyDate || '',
    likedMost: liked,
    interestedVia: apiData.interestSource || '',
    likelihood: likelihood,
    comments: apiData.additionalComments || ''
  };
};

export function useSurveyApi() {
  const isLoading = ref(false);
  const error = ref(null);
  const surveyData = ref(null); // For storing fetched data
  const surveysList = ref([]); // For list of surveys

  // Fetch ALL surveys
  const fetchSurveys = async () => {
    isLoading.value = true;
    error.value = null;
    surveysList.value = []; // Clear previous list
    try {
      const response = await fetch(baseApiUrl, {
        method: 'GET',
        headers: { 'Accept': 'application/json' }
      });
      if (!response.ok) {
        const errorBody = await response.text();
        throw new Error(`HTTP error! status: ${response.status}, body: ${errorBody}`);
      }
      const data = await response.json();
      // Assuming the API returns the list directly
      surveysList.value = data; 
      console.log('Surveys list:', surveysList.value);
      return surveysList.value;
    } catch (err) {
      console.error('Error fetching surveys list:', err);
      error.value = err;
      return null;
    } finally {
      isLoading.value = false;
    }
  };

  // Fetch a single survey
  const fetchSurvey = async (surveyId) => {
    isLoading.value = true;
    error.value = null;
    surveyData.value = null;
    try {
      const response = await fetch(`${baseApiUrl}/${surveyId}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      surveyData.value = transformApiToFormData(data);
      return surveyData.value;
    } catch (err) {
      console.error('Error fetching survey:', err);
      error.value = err;
      return null;
    } finally {
      isLoading.value = false;
    }
  };

  // Create a new survey
  const createSurvey = async (formData) => {
    isLoading.value = true;
    error.value = null;
    try {
      const payload = transformFormDataToApi(formData);
      const response = await fetch(baseApiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
      if (!response.ok) {
         const errorBody = await response.text(); // Try to get more info
         throw new Error(`HTTP error! status: ${response.status}, body: ${errorBody}`);
      }
      return await response.json(); // Return the created survey data (or ID)
    } catch (err) {
      console.error('Error creating survey:', err);
      error.value = err;
      return null;
    } finally {
      isLoading.value = false;
    }
  };

  // Update an existing survey
  const updateSurvey = async (surveyId, formData) => {
    isLoading.value = true;
    error.value = null;
    try {
      const payload = transformFormDataToApi(formData);
      console.log('Payload:', payload);
      const response = await fetch(`${baseApiUrl}/${surveyId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
      if (!response.ok) {
         const errorBody = await response.text();
         throw new Error(`HTTP error! status: ${response.status}, body: ${errorBody}`);
      }
      return await response.json(); // Return the updated survey data
    } catch (err) {
      console.error('Error updating survey:', err);
      error.value = err;
      return null;
    } finally {
      isLoading.value = false;
    }
  };

  // Delete a survey
  const deleteSurvey = async (surveyId) => {
    isLoading.value = true;
    error.value = null;
    try {
      const response = await fetch(`${baseApiUrl}/${surveyId}`, {
        method: 'DELETE'
      });
      if (!response.ok) {
        // Check for specific statuses if needed (e.g., 204 No Content might be success)
        if (response.status === 204) {
             return true; // Consider 204 as success
        }
        const errorBody = await response.text();
        throw new Error(`HTTP error! status: ${response.status}, body: ${errorBody}`);
      }
      // Check if there's a response body to parse, often DELETE is 204 No Content
       if (response.status === 200) {
            try {
                return await response.json(); // Or handle success appropriately
            } catch (jsonError) {
                 // Handle cases where backend returns 200 OK but empty/invalid JSON body
                 console.warn('Delete successful (status 200) but response body is not valid JSON or empty.');
                 return true; 
            }
       }
       return true; // Assume success if response is ok and not 200 (e.g., 204)

    } catch (err) {
      console.error('Error deleting survey:', err);
      error.value = err;
      return false; // Indicate failure
    } finally {
      isLoading.value = false;
    }
  };

  return {
    isLoading, // General loading state for API calls
    error,     // General error state for API calls
    surveyData, // Holds fetched survey data
    surveysList, // List of surveys
    fetchSurvey,
    fetchSurveys,
    createSurvey,
    updateSurvey,
    deleteSurvey // Added delete function
  };
} 