import router from '../router';
import VueResource from "vue-resource"
import Vue from 'vue';
// URL and endpoint constants
const API_URL = 'http://localhost:3001/api/'
const PRODUCT_URL = API_URL + 'products/';
const SIGNUP_URL = API_URL + 'users/'
Vue.use(VueResource);
import auth from '../auth';
export default {

  name : 'ProductService',
  // Send a request to the login URL and save the returned JWT

  getProducts(context) {
    context.$http.headers.common['Access-Control-Allow-Origin'] = '*';
    let headers = auth.getAuthHeader();
    return context.$http.get(PRODUCT_URL,{headers : headers})
  },

}
