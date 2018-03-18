// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import moment from 'moment';
import router from './router';
import BootstrapVue from 'bootstrap-vue/dist/bootstrap-vue.esm';
import VeeValidate from 'vee-validate';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import swal from 'sweetalert2';
import 'vue2-toast/lib/toast.css';
import Toast from 'vue2-toast';
Vue.use(Toast, {
  defaultType: 'top',
  duration: 3000,
  wordWrap: true,
  width: '150px'
});
Vue.config.productionTip = false
Vue.filter('formatDate', function(value) {
  if (value) {
    return moment(String(value)).format('MM/DD/YYYY hh:mm')
  }
});
Vue.use(VeeValidate);
/* eslint-disable no-new */


router.beforeEach((to,from,next)=>{

  if(to.name != 'Login'){
    if(localStorage.getItem('token') == null){
      router.push({name : 'Login'})
    }else{
      next();
    }
  }else{
    if(localStorage.getItem('token') != null){
      if(from.name == null){
        router.push({name : 'Products'})
      }else{
        router.push({name : from.name})
      }

    }else{
      next();
    }
  }
  // console.log(to);
  // next();
});

new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
}).$mount('#app');
