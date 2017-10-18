<template>
  <v-layout column class="pt-5">
    <v-flex xs6 offset-xs3>
      <div class="white elevation-2">
        <v-toolbar flat dense class="cyan" dark>
          <v-toolbar-title dark>Login</v-toolbar-title>
        </v-toolbar>

        <v-form @submit.prevent="login()" class="pl-4 pr-4 pt-4 pb-2">
          <v-text-field @keydown="removeError()" name="email" label="E-mail" v-model="email" required />
          <v-text-field @keydown="removeError()" type="password" name="password" label="Password" v-model="password" required/>
          <v-alert class="center" error :value="error" v-html="error" />
          <v-btn type="submit" class="cyan" dark>Login</v-btn>
        </v-form>
      </div>
    </v-flex>
  </v-layout>
</template>

<script>
import AuthenticationService from '@/services/AuthenticationService'

export default {
  data () {
    return {
      email: '',
      password: '',
      error: null
    }
  },
  methods: {
    async login () {
      try {
        const response = await AuthenticationService.login({
          email: this.email,
          password: this.password
        })
        this.$store.dispatch('setToken', response.data.token)
        this.$store.dispatch('setUser', response.data.user)
      } catch (error) {
        this.error = error.response.data.error
      }
    },
    removeError () {
      this.error = null
    }
  }
}
</script>

<style scoped>
.center {
  display: block;
  text-align: center; 
}
button {
  font-weight:600;
}
</style>