import router from '../router';
import VueResource from "vue-resource"
import Vue from 'vue';
// URL and endpoint constants
const API_URL = 'http://localhost:3001/api/'
const LOGIN_URL = API_URL + 'login/';
const SIGNUP_URL = API_URL + 'users/'
Vue.use(VueResource);
export default {

  // User object will let us check authentication status
  user: {
    authenticated: false
  },

  // Send a request to the login URL and save the returned JWT

  login(context, creds, redirect) {

    let headers = {};
    headers['Access-Control-Allow-Origin'] = '*';
    context.$http.post(LOGIN_URL, creds).then((response) => {

      localStorage.setItem('token', response.body.data.token)
      // localStorage.setItem('access_token', response.access_token)

      this.user.authenticated = true;

      // Redirect to a specified route
      if (redirect) {
        router.push({path : '/products'})
      }

    }, (err) => {


      if(err.body.error.code != 1001){
        context.error = err.body.error.message;
      }

    })
  },

  signup(context, creds, redirect) {
    context.$http.post(SIGNUP_URL, creds).then((data) => {
      localStorage.setItem('id_token', data.id_token)
      localStorage.setItem('access_token', data.access_token)

      this.user.authenticated = true

      if (redirect) {
        router.go(redirect)
      }
    }, err => {
      context.error = err
    })
  },

  // To log out, we just need to remove the token
  logout() {
    localStorage.removeItem('token');
    router.push({path:'/login'})
    this.user.authenticated = false
  },

  checkAuth() {
    var jwt = localStorage.getItem('token')
    if (jwt) {
      this.user.authenticated = true
    }
    else {
      this.user.authenticated = false
    }
  },

  // The object to be passed as a header for authenticated requests
  getAuthHeader() {
    return {
      'X-ACCESS-TOKEN':  localStorage.getItem('token')
    }
  }
}
