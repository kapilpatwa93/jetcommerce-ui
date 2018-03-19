import router from '../router';
import VueResource from "vue-resource"
import Vue from 'vue';
import config from '../../config';
// URL and endpoint constants
// const API_URL = 'http://localhost:3001/api/'
const API_URL = config.build.api_url;
const GET_CART = 'cart';
const ADD_TO_CART = API_URL + 'add-to-cart';
const REMOVE_FROM_CART = API_URL + 'remove-from-cart';
const PRODUCT_URL = API_URL + 'cart/';
Vue.use(VueResource);
import auth from '../auth';
export default {
  name : 'CartService',
  // Send a request to the login URL and save the returned JWT

  getCart(context) {
    let headers = auth.getAuthHeader();
    return context.$http.get(PRODUCT_URL,{headers : headers})
  },

  addToCart(context,product){
    let headers = auth.getAuthHeader();

    return context.$http.post(ADD_TO_CART,product,{headers :headers })
  },
  removeFromCart(context,product){
    let headers = auth.getAuthHeader();
    return context.$http.post(REMOVE_FROM_CART,product,{headers :headers })
  }

}
