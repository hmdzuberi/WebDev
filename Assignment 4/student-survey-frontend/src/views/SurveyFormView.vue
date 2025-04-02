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
        <button type="submit">Submit</button>
        <button type="button" @click="handleCancel">Cancel</button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router'; // Import useRouter

const router = useRouter(); // Get router instance

// Reactive object to hold all form data
const formData = ref({
  firstName: '',
  lastName: '',
  streetAddress: '',
  city: '',
  state: '',
  zip: '',
  telephone: '',
  email: '',
  surveyDate: '',
  likedMost: [], // Array for checkboxes
  interestedVia: '', // Value from radio button
  likelihood: '', // Value from dropdown
  comments: ''
});

// Updated handleSubmit function
const handleSubmit = () => {
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
    additionalComments: formData.value.comments, // Map 'comments' to 'additionalComments'

    // Map likedMost array to boolean fields
    likedStudents: formData.value.likedMost.includes('students'),
    likedLocation: formData.value.likedMost.includes('location'),
    likedCampus: formData.value.likedMost.includes('campus'),
    likedAtmosphere: formData.value.likedMost.includes('atmosphere'),
    likedDormRooms: formData.value.likedMost.includes('dorm rooms'), // Ensure value matches exactly
    likedSports: formData.value.likedMost.includes('sports'),

    // Map interestedVia to interestSource (convert to lowercase)
    interestSource: formData.value.interestedVia.toLowerCase(),

    // Map likelihood to recommendationLikelihood (convert to lowercase)
    recommendationLikelihood: formData.value.likelihood.toLowerCase().replace(' ', '') // e.g., "very likely"
  };
  // Note: The API expects lowercase for interestSource and recommendationLikelihood.
  // We also remove space from "very likely" just in case, though lowercase might be enough.

  // 2. Log the transformed payload to verify
  console.log('Transformed data for API:', JSON.stringify(apiPayload, null, 2));
  alert('Survey Submitted! (Check console for transformed data)');

  // 3. Later: Send apiPayload to the backend API using fetch or axios
  /*
  try {
    const response = await fetch('/api/surveys', { // Replace with your actual API endpoint
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(apiPayload),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const result = await response.json();
    console.log('Success:', result);
    alert('Survey successfully submitted to backend!');
    // Optionally navigate away or reset form
    // router.push('/surveys');
  } catch (error) {
    console.error('Error submitting survey:', error);
    alert('Error submitting survey. Please try again.');
  }
  */

  // 4. Handle post-submission (e.g., navigate or reset)
  // router.push('/surveys'); // Example: Navigate to the list page
};

// Function to handle cancel action
const handleCancel = () => {
  console.log('Form cancelled');
  // Optionally reset the form
  // formData.value = { ...initial state... };
  // Navigate back to the home page
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