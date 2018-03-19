import router from '../router';
import VueResource from "vue-resource"
import Vue from 'vue';
// URL and endpoint constants
// const API_URL = 'http://localhost:3001/api/'
const API_URL = config.build.api_url;
const GET_CART = 'cart';
const PLACE_ORDER = API_URL + 'place-order';
const LIST_ORDERS = API_URL + 'orders/';
const ORDER_DETAILS = API_URL + 'order/';
Vue.use(VueResource);

import auth from '../auth';
import config from '../../config';
export default {
  name : 'OrderService',
  // Send a request to the login URL and save the returned JWT

  getOrderDetail(context,orderId) {
    let headers = auth.getAuthHeader();
    let orderDetail = ORDER_DETAILS + orderId;
    return context.$http.get(orderDetail,{headers : headers})
  },
  placeOrder(context){
    let headers = auth.getAuthHeader();
    return context.$http.post(PLACE_ORDER,{},{headers:headers});
  },

  getOrderList(context){
    let headers = auth.getAuthHeader();
    return context.$http.get(LIST_ORDERS,{headers :headers })
  },

}
