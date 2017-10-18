<template>
  <v-toolbar dark flat class="cyan page--header">
      <router-link to='/'>
        <v-toolbar-title class="white--text mr-4">
          TabTracker
        </v-toolbar-title>
      </router-link>
    <v-toolbar-items>
      <v-btn flat to="/songs">Browse</v-btn>
    </v-toolbar-items>
    <v-spacer/>
    <v-toolbar-items>
      <v-btn flat to="register" v-if="!$store.state.isLoggedIn">Sign Up</v-btn>
      <v-btn flat to="login" v-if="!$store.state.isLoggedIn">Log in</v-btn>
      <v-btn flat @click="logout()" v-if="$store.state.isLoggedIn">Log Out</v-btn>
    </v-toolbar-items>
  </v-toolbar>
</template>

<script>
export default {
  methods: {
    logout () {
      this.$store.dispatch('setToken', null)
      this.$store.dispatch('setUser', null)
      this.$router.push({
        name: 'home'
      })
    }
  }
}
</script>

<style scoped>
a {
  text-decoration: none;
}
.page--header {
  margin-bottom: 20px;
}
</style>