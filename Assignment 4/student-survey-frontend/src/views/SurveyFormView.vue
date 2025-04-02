<template>
  <div class="survey-form">
    <h1>Student Survey Form</h1>
    <form @submit.prevent="handleSubmit">
      <!-- Personal Information -->
      <div class="form-group">
        <label for="firstName">First Name:</label>
        <input type="text" id="firstName" v-model="formData.firstName" required />
      </div>
      <div class="form-group">
        <label for="lastName">Last Name:</label>
        <input type="text" id="lastName" v-model="formData.lastName" required />
      </div>
      <div class="form-group">
        <label for="streetAddress">Street Address:</label>
        <input type="text" id="streetAddress" v-model="formData.streetAddress" required />
      </div>
      <div class="form-group">
        <label for="city">City:</label>
        <input type="text" id="city" v-model="formData.city" required />
      </div>
      <div class="form-group">
        <label for="state">State:</label>
        <input type="text" id="state" v-model="formData.state" required />
      </div>
      <div class="form-group">
        <label for="zip">Zip Code:</label>
        <input type="text" id="zip" v-model="formData.zip" required />
      </div>
      <div class="form-group">
        <label for="telephone">Telephone Number:</label>
        <input type="tel" id="telephone" v-model="formData.telephone" required />
      </div>
      <div class="form-group">
        <label for="email">E-mail:</label>
        <input type="email" id="email" v-model="formData.email" required />
      </div>
      <div class="form-group">
        <label for="surveyDate">Date of Survey:</label>
        <input type="date" id="surveyDate" v-model="formData.surveyDate" required />
      </div>

      <!-- Liked Most (Checkboxes) -->
      <fieldset class="form-group">
        <legend>What did you like most about the campus? (Check all that apply)</legend>
        <div>
          <input type="checkbox" id="likedStudents" value="students" v-model="formData.likedMost" />
          <label for="likedStudents">Students</label>
        </div>
        <div>
          <input type="checkbox" id="likedLocation" value="location" v-model="formData.likedMost" />
          <label for="likedLocation">Location</label>
        </div>
        <div>
          <input type="checkbox" id="likedCampus" value="campus" v-model="formData.likedMost" />
          <label for="likedCampus">Campus</label>
        </div>
        <div>
          <input type="checkbox" id="likedAtmosphere" value="atmosphere" v-model="formData.likedMost" />
          <label for="likedAtmosphere">Atmosphere</label>
        </div>
        <div>
          <input type="checkbox" id="likedDorms" value="dorm rooms" v-model="formData.likedMost" />
          <label for="likedDorms">Dorm Rooms</label>
        </div>
        <div>
          <input type="checkbox" id="likedSports" value="sports" v-model="formData.likedMost" />
          <label for="likedSports">Sports</label>
        </div>
      </fieldset>

      <!-- How Became Interested (Radio Buttons) -->
      <fieldset class="form-group">
        <legend>How did you become interested in the university?</legend>
        <div>
          <input type="radio" id="interestFriends" value="friends" v-model="formData.interestedVia" />
          <label for="interestFriends">Friends</label>
        </div>
        <div>
          <input type="radio" id="interestTv" value="television" v-model="formData.interestedVia" />
          <label for="interestTv">Television</label>
        </div>
        <div>
          <input type="radio" id="interestInternet" value="Internet" v-model="formData.interestedVia" />
          <label for="interestInternet">Internet</label>
        </div>
        <div>
          <input type="radio" id="interestOther" value="other" v-model="formData.interestedVia" />
          <label for="interestOther">Other</label>
        </div>
      </fieldset>

      <!-- Likelihood to Recommend (Dropdown) -->
      <div class="form-group">
        <label for="likelihood">Likelihood of recommending this school:</label>
        <select id="likelihood" v-model="formData.likelihood">
          <option disabled value="">Please select one</option>
          <option>Very Likely</option>
          <option>Likely</option>
          <option>Unlikely</option>
        </select>
      </div>

      <!-- Additional Comments (Textarea) -->
      <div class="form-group">
        <label for="comments">Additional Comments:</label>
        <textarea id="comments" v-model="formData.comments" rows="4"></textarea>
      </div>

      <!-- Buttons -->
      <div class="form-actions">
        <button type="submit" :disabled="isSubmitting">
          {{ isSubmitting ? 'Submitting...' : 'Submit' }}
        </button>
        <button type="button" @click="handleCancel" :disabled="isSubmitting">Cancel</button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

// Define initial state for resetting the form
const getInitialFormData = () => ({
  firstName: '',
  lastName: '',
  streetAddress: '',
  city: '',
  state: '',
  zip: '',
  telephone: '',
  email: '',
  surveyDate: '',
  likedMost: [],
  interestedVia: '',
  likelihood: '',
  comments: ''
});

// Reactive object to hold all form data
const formData = ref(getInitialFormData());

// Reactive variable to track submission state
const isSubmitting = ref(false);

// Updated handleSubmit function
const handleSubmit = async () => {
  if (isSubmitting.value) return; // Prevent double submission

  isSubmitting.value = true; // Indicate submission started

  // 1. Create the payload object in the desired API structure
  const apiPayload = {
    // Direct mappings
    firstName: formData.value.firstName,
    lastName: formData.value.lastName,
    streetAddress: formData.value.streetAddress,
    city: formData.value.city,
    state: formData.value.state,
    zip: formData.value.zip,
    telephone: formData.value.telephone,
    email: formData.value.email,
    surveyDate: formData.value.surveyDate,
    additionalComments: formData.value.comments,

    // Map likedMost array to boolean fields
    likedStudents: formData.value.likedMost.includes('students'),
    likedLocation: formData.value.likedMost.includes('location'),
    likedCampus: formData.value.likedMost.includes('campus'),
    likedAtmosphere: formData.value.likedMost.includes('atmosphere'),
    likedDormRooms: formData.value.likedMost.includes('dorm rooms'),
    likedSports: formData.value.likedMost.includes('sports'),

    // Map interestedVia to interestSource (convert to lowercase)
    interestSource: formData.value.interestedVia.toLowerCase(),

    // Map likelihood to recommendationLikelihood (convert to lowercase)
    recommendationLikelihood: formData.value.likelihood.toLowerCase().replace(' ', '')
  };

  // 2. Log the transformed payload (optional, good for debugging)
  console.log('Sending data to API:', JSON.stringify(apiPayload, null, 2));

  // 3. Send apiPayload to the backend API using fetch
  // *** IMPORTANT: Replace '/api/surveys' with your actual backend endpoint URL ***
  // e.g., 'http://localhost:8081/api/surveys' if backend is on a different port
  const apiUrl = '/api/surveys';

  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Add any other headers if required, like Authorization tokens
      },
      body: JSON.stringify(apiPayload),
    });

    if (!response.ok) {
      // Try to get error details from backend response body
      let errorDetails = `HTTP error! status: ${response.status}`;
      try {
          const errorData = await response.json();
          errorDetails += `, Message: ${errorData.message || JSON.stringify(errorData)}`;
      } catch (e) {
          // If response is not JSON or empty
          errorDetails += `, Response: ${await response.text()}`;
      }
      throw new Error(errorDetails);
    }

    const result = await response.json(); // Assuming backend returns the created survey or a success message
    console.log('Success:', result);
    alert('Survey successfully submitted!');

    // 4. Handle post-submission: Reset form and optionally navigate
    formData.value = getInitialFormData(); // Reset form to initial state
    // Optionally navigate to the list page or a thank you page
    // router.push('/surveys');
    // router.push('/thank-you');

  } catch (error) {
    console.error('Error submitting survey:', error);
    alert(`Error submitting survey: ${error.message}\nPlease check the console and try again.`);
  } finally {
    isSubmitting.value = false; // Re-enable submit button regardless of outcome
  }
};

// Function to handle cancel action
const handleCancel = () => {
  console.log('Form cancelled');
  // Optionally reset form data on cancel too
  // formData.value = getInitialFormData();
  router.push('/');
};
</script>

<style scoped>
.survey-form {
  max-width: 600px;
  margin: 20px auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
}
.form-group, .form-actions {
  margin-bottom: 15px;
}
.form-group label, fieldset legend {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}
/* Display labels next to checkboxes/radios */
fieldset div {
  margin-bottom: 5px;
}
fieldset label {
 display: inline-block;
 margin-left: 5px;
 font-weight: normal;
}

input[type="text"],
input[type="tel"],
input[type="email"],
input[type="date"],
select,
textarea {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box; /* Include padding and border in the element's total width and height */
}
textarea {
  resize: vertical;
}
button {
  padding: 10px 15px;
  margin-right: 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
button[type="submit"] {
  background-color: #42b983;
  color: white;
}
button[type="button"] {
  background-color: #ccc;
}

/* Add some spacing for checkboxes and radio buttons */
input[type="checkbox"],
input[type="radio"] {
  margin-right: 5px;
}
</style>