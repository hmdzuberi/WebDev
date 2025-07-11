<!-- This component renders the individual fields for the student survey form, using v-model for data binding and displaying validation errors. -->
<template>
  <div>
    <!-- Personal Information -->
    <div class="form-group">
      <label for="firstName">First Name: <span class="required">*</span></label>
      <input type="text" id="firstName" :value="modelValue.firstName" @input="$emit('update:modelValue', { ...modelValue, firstName: $event.target.value })" required :class="{ 'input-error': errors.firstName }" />
      <span v-if="errors.firstName" class="error-message">{{ errors.firstName }}</span>
    </div>
    <div class="form-group">
      <label for="lastName">Last Name: <span class="required">*</span></label>
      <input type="text" id="lastName" :value="modelValue.lastName" @input="$emit('update:modelValue', { ...modelValue, lastName: $event.target.value })" required :class="{ 'input-error': errors.lastName }" />
      <span v-if="errors.lastName" class="error-message">{{ errors.lastName }}</span>
    </div>
    <div class="form-group">
      <label for="streetAddress">Street Address: <span class="required">*</span></label>
      <input type="text" id="streetAddress" :value="modelValue.streetAddress" @input="$emit('update:modelValue', { ...modelValue, streetAddress: $event.target.value })" required :class="{ 'input-error': errors.streetAddress }" />
      <span v-if="errors.streetAddress" class="error-message">{{ errors.streetAddress }}</span>
    </div>
    <div class="form-group">
      <label for="city">City: <span class="required">*</span></label>
      <input type="text" id="city" :value="modelValue.city" @input="$emit('update:modelValue', { ...modelValue, city: $event.target.value })" required :class="{ 'input-error': errors.city }" />
      <span v-if="errors.city" class="error-message">{{ errors.city }}</span>
    </div>
    <div class="form-group">
      <label for="state">State: <span class="required">*</span></label>
      <input type="text" id="state" :value="modelValue.state" @input="$emit('update:modelValue', { ...modelValue, state: $event.target.value })" required :class="{ 'input-error': errors.state }" />
      <span v-if="errors.state" class="error-message">{{ errors.state }}</span>
    </div>
    <div class="form-group">
      <label for="zip">Zip Code: <span class="required">*</span></label>
      <input type="text" id="zip" :value="modelValue.zip" @input="$emit('update:modelValue', { ...modelValue, zip: $event.target.value })" required :class="{ 'input-error': errors.zip }" />
      <span v-if="errors.zip" class="error-message">{{ errors.zip }}</span>
    </div>
    <div class="form-group">
      <label for="telephone">Telephone Number: <span class="required">*</span></label>
      <input type="tel" id="telephone" :value="modelValue.telephone" @input="$emit('update:modelValue', { ...modelValue, telephone: $event.target.value })" required :class="{ 'input-error': errors.telephone }" />
      <span v-if="errors.telephone" class="error-message">{{ errors.telephone }}</span>
    </div>
    <div class="form-group">
      <label for="email">E-mail: <span class="required">*</span></label>
      <input type="email" id="email" :value="modelValue.email" @input="$emit('update:modelValue', { ...modelValue, email: $event.target.value })" required :class="{ 'input-error': errors.email }" />
      <span v-if="errors.email" class="error-message">{{ errors.email }}</span>
    </div>
    <div class="form-group">
      <label for="surveyDate">Date of Survey: <span class="required">*</span></label>
      <input type="date" id="surveyDate" :value="modelValue.surveyDate" @input="$emit('update:modelValue', { ...modelValue, surveyDate: $event.target.value })" required :class="{ 'input-error': errors.surveyDate }" />
      <span v-if="errors.surveyDate" class="error-message">{{ errors.surveyDate }}</span>
    </div>

    <!-- Liked Most (Checkboxes) -->
    <fieldset class="form-group" :class="{ 'fieldset-error': errors.likedMost }">
      <legend>What did you like most about the campus? (Check all that apply) <span class="required">*</span></legend>
       <!-- Helper function to update checkbox array -->
       <div v-for="option in ['students', 'location', 'campus', 'atmosphere', 'dorm rooms', 'sports']" :key="option">
          <input
            type="checkbox"
            :id="`liked${option.replace(/\s+/g, '')}`"
            :value="option"
            :checked="modelValue.likedMost.includes(option)"
            @change="(event) => updateLikedMost(event.target.value, event.target.checked)"
          />
          <label :for="`liked${option.replace(/\s+/g, '')}`">{{ option.charAt(0).toUpperCase() + option.slice(1) }}</label>
       </div>
      <span v-if="errors.likedMost" class="error-message">{{ errors.likedMost }}</span>
    </fieldset>

    <!-- How Became Interested (Radio Buttons) -->
    <fieldset class="form-group" :class="{ 'fieldset-error': errors.interestedVia }">
      <legend>How did you become interested in the university? <span class="required">*</span></legend>
       <div v-for="option in ['friends', 'television', 'Internet', 'other']" :key="option">
         <input
           type="radio"
           :id="`interest${option.replace(/\s+/g, '')}`"
           :value="option.toLowerCase()"
           :checked="modelValue.interestedVia === option.toLowerCase()"
           @change="$emit('update:modelValue', { ...modelValue, interestedVia: $event.target.value })"
         />
         <label :for="`interest${option.replace(/\s+/g, '')}`">{{ option }}</label>
       </div>
      <span v-if="errors.interestedVia" class="error-message">{{ errors.interestedVia }}</span>
    </fieldset>

    <!-- Likelihood to Recommend (Dropdown) -->
    <div class="form-group">
      <label for="likelihood">Likelihood of recommending this school: <span class="required">*</span></label>
      <select id="likelihood" :value="modelValue.likelihood" @change="$emit('update:modelValue', { ...modelValue, likelihood: $event.target.value })" required :class="{ 'input-error': errors.likelihood }">
        <option disabled value="">Please select one</option>
        <option>Very Likely</option>
        <option>Likely</option>
        <option>Unlikely</option>
      </select>
      <span v-if="errors.likelihood" class="error-message">{{ errors.likelihood }}</span>
    </div>

    <!-- Additional Comments (Textarea - Optional Field) -->
    <div class="form-group">
      <label for="comments">Additional Comments:</label>
      <textarea id="comments" :value="modelValue.comments" @input="$emit('update:modelValue', { ...modelValue, comments: $event.target.value })" rows="4"></textarea>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';

// Props definition using modelValue for v-model compatibility
const props = defineProps({
  modelValue: {
    type: Object,
    required: true,
    default: () => ({ // Provide a default structure
        firstName: '', lastName: '', streetAddress: '', city: '', state: '',
        zip: '', telephone: '', email: '', surveyDate: '',
        likedMost: [], interestedVia: '', likelihood: '', comments: ''
    })
  },
  errors: {
    type: Object,
    required: true,
    default: () => ({})
  }
});

// Emits definition
const emit = defineEmits(['update:modelValue']);

// Helper function to handle checkbox array updates
const updateLikedMost = (value, isChecked) => {
  const currentLikedMost = [...props.modelValue.likedMost]; // Create a copy
  if (isChecked) {
    if (!currentLikedMost.includes(value)) {
      currentLikedMost.push(value);
    }
  } else {
    const index = currentLikedMost.indexOf(value);
    if (index > -1) {
      currentLikedMost.splice(index, 1);
    }
  }
  // Emit the entire updated modelValue object
  emit('update:modelValue', { ...props.modelValue, likedMost: currentLikedMost });
};

</script>

<style scoped>
/* Add styles if needed, or rely on parent styles */
.form-group {
  margin-bottom: 1rem; /* Adjust spacing as needed */
}

label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: bold;
}

input[type="text"],
input[type="tel"],
input[type="email"],
input[type="date"],
select,
textarea {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box; /* Include padding and border in the element's total width and height */
  font-size: 1rem;
}

/* Add specific styles for checkboxes and radio buttons if needed */
fieldset {
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 1rem;
  margin-bottom: 1rem;
}

legend {
  font-weight: bold;
  margin-bottom: 0.5rem;
  padding: 0 0.5rem; /* Add some padding around the legend text */
}

fieldset div {
  margin-bottom: 0.5rem; /* Space between options */
}

fieldset label {
  display: inline-block; /* Align label next to checkbox/radio */
  margin-left: 0.5rem;
  font-weight: normal; /* Normal weight for options */
}

/* Error Styling */
.input-error,
select.input-error,
textarea.input-error {
  border-color: #dc3545; /* Red border for error */
}

.fieldset-error {
    border-color: #dc3545; /* Red border for fieldset error */
}

.fieldset-error legend {
    color: #dc3545; /* Red text for legend */
}

.error-message {
  color: #dc3545; /* Red text for error message */
  font-size: 0.875rem;
  margin-top: 0.25rem;
}

.required {
  color: #dc3545; /* Red asterisk */
  margin-left: 0.25rem;
}

/* Ensure consistency for required indicator span */
.required-indicator {
    color: #dc3545;
    margin-left: 0.25rem;
}

/* Responsive adjustments (optional) */
@media (max-width: 600px) {
  input[type="text"],
  input[type="tel"],
  input[type="email"],
  input[type="date"],
  select,
  textarea {
    font-size: 0.9rem; /* Slightly smaller font on small screens */
  }
}
</style> 