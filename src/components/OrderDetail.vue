<template>

  <div id="order">
    <navbar></navbar>
    <div class="container">
      <table id="cart" class="table table-hover table-condensed">
        <tr v-if="order.products.length <=0 ">
          <td colspan="5">Cart is empty</td>
        </tr>
        <thead>
        <tr>
          <th style="width:45%">Product</th>
          <th style="width:10%">Price</th>
          <th style="width:8%">Quantity</th>
          <th style="width:17%" class="text-center">Subtotal</th>
          <th style="width:20%"></th>
        </tr>
        </thead>
        <tbody>
        <tr v-if="order.products.length > 0 " v-for="item in order.products">
          <td data-th="Product">
            <div class="row">
              <div class="col-sm-2 hidden-xs"><img src="http://placehold.it/100x100" alt="..." class="img-responsive"/>
              </div>
              <div class="col-sm-10">
                <h4 class="nomargin">{{item.product_name}}</h4>
                <p>{{item.product_description}}</p>
                <span>Instock : {{item.available_quantity}}</span>
              </div>
            </div>
          </td>
          <td data-th="Price"><i class="fa fa-rupee"></i>{{item.product_price}} </td>
          <td data-th="Quantity">
            <input type="number" disabled class="form-control text-center" value="1" v-model="item.quantity" :min="1"
                   :max="item.available_quantity">
          </td>
          <td data-th="Subtotal" class="text-center">
            <div v-if="item.quantity!='' && item.quantity >0">
              {{parseFloat(item.product_price) * parseFloat(item.quantity)}}
            </div>
          </td>
          <td class="actions" data-th="">
            <!--<button class="btn btn-info btn-sm" @click="viewOrder(item)">View</button>-->
          </td>
        </tr>
        </tbody>
        <tfoot>

        <tr>
          <td><a href="#/products" class="btn btn-warning"><i class="fa fa-angle-left"></i> Start Shopping</a></td>
          <td colspan="2" class="hidden-xs"></td>
          <td class="hidden-xs text-center"><strong>Total {{order.order_total}}</strong></td>

        </tr>
        </tfoot>
      </table>
    </div>
  </div>
</template>

<script>
  import ProductService from '../services/products';
  import CartService from '../services/cart';
  import OrderService from '../services/order';
  import Navbar from "./navbar.vue";
  import router from '../router';
  import swal from 'sweetalert2';
  export default {
    components: {Navbar},
    name: 'Order',
    data() {
      return {
        order: {}
      }
    },
    methods: {

    },
  created()
  {
    console.log(this.$route.params);
    OrderService.getOrderDetail(this,this.$route.params.orderid).then((response)=>{
      this.order = response.body.data;
    },err=>{

    });
//      console.log('prodcut initialise');
  }
  }
</script>
<!-- styling for the component -->
<style>
  .table > tbody > tr > td, .table > tfoot > tr > td {
    vertical-align: middle;
  }

  @media screen and (max-width: 600px) {
    table#cart tbody td .form-control {
      width: 20%;
      display: inline !important;
    }

    .actions .btn {
      width: 36%;
      margin: 1.5em 0;
    }

    .actions .btn-info {
      float: left;
    }

    .actions .btn-danger {
      float: right;
    }

    table#cart thead {
      display: none;
    }

    table#cart tbody td {
      display: block;
      padding: .6rem;
      min-width: 320px;
    }

    table#cart tbody tr td:first-child {
      background: #333;
      color: #fff;
    }

    table#cart tbody td:before {
      content: attr(data-th);
      font-weight: bold;
      display: inline-block;
      width: 8rem;
    }

    table#cart tfoot td {
      display: block;
    }

    table#cart tfoot td .btn {
      display: block;
    }

  }
</style>
