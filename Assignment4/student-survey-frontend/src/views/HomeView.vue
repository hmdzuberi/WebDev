<template>
  <div class="home">
    <h1>Welcome to the Student Survey Application</h1>
    <p>Please choose an option:</p>
    <nav>
      <router-link to="/survey">Fill out Student Survey</router-link> |
      <router-link to="/surveys">List All Surveys</router-link>
    </nav>
  </div>
</template>

<script>
// @ is an alias to /src
// We might add component imports here later if needed

export default {
  name: 'HomeView',
  components: {
    // HelloWorld // Remove or comment out if it was here
  }
}
</script>

<style scoped>
/* Add some basic styling if you like */
.home {
  text-align: center;
  margin-top: 40px;
}
nav {
  margin-top: 20px;
}
nav a {
  margin: 0 10px;
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
