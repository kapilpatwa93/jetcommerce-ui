<template>
  <form  @submit.prevent="validateBeforeSubmit">
  <div class="col-sm-4 col-sm-offset-4 login from-group">
    <h2>Log In</h2>

    <div class="alert alert-danger" v-if="error">
      <p>{{ error }}</p>
    </div>
    <div class="form-group">
      <input
        name="email"
        type="text"
        class="form-control"
        placeholder="Enter your email"
        v-validate="'required|email'"
        v-model="credentials.email"
      >
      <div v-show="errors.has('email')" class="input-error">{{ errors.first('email') }}</div>
    </div>
    <div class="form-group">
      <input
        name="password"
        v-validate="'required'"
        type="password"
        class="form-control"
        placeholder="Enter your password"
        v-model="credentials.password"
      >
      <div v-show="errors.has('email')" class="input-error ">{{ errors.first('password') }}</div>
    </div>
    <button type="submit" class="btn btn-primary" :disabled="errors.length == 0" @click="submit()">Login</button>
  </div>
  </form>
</template>

<script>
  import auth from '../auth'

  export default {
    data() {
      return {
        credentials: {
          email: '',
          password: ''
        },
        error: ''
      }
    },
    methods: {
      validateBeforeSubmit() {
        this.$validator.validateAll().then((result) => {
          if (result) {
            // eslint-disable-next-line
            return;
          }
        });
      },
      submit() {
        var credentials = {
          email: this.credentials.email,
          password: this.credentials.password
        }
        // We need to pass the component's this context
        // to properly make use of http in the auth service
        auth.login(this, credentials, 'about')
      }
    }

  }
</script>

<style>
  .login {
    margin: auto;
  }
  .input-error{
    color:red;
    text-align: left;
  }

</style>
