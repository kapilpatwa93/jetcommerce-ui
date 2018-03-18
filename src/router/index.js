import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import About from '@/components/About';
import Login from '@/components/Login';
import Products from '@/components/Products';
import Cart from '@/components/Cart';
import MyOrders from '@/components/MyOrders';
import OrderDetails from '@/components/OrderDetail';
Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path : '/login',
      name : "Login",
      component : Login
    },
    {
      path : '/products',
      name : "Products",
      component : Products
    },
    {
      path : '/cart',
      name : "Cart",
      component : Cart
    },
    {
      path : '/my-orders',
      name : "MyOrders",
      component : MyOrders
    },
    {
      path : '/order-detail/:orderid',
      name : "OrderDetails",
      component : OrderDetails
    },
    {
      path : '/about',
      name : 'About',
      component:About
    }
  ]
})
