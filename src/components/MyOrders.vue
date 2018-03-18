<template>

  <div id="cart-component">
    <navbar></navbar>
    <div class="container">
      <table id="cart" class="table table-hover table-condensed">
        <tr v-if="orders.length <=0 ">
          <td colspan="5">No Orders</td>
        </tr>
        <thead>
        <tr>
          <th style="width:50%">Order Date</th>
          <th style="width:10%">Order Total</th>
          <th style="width:20%"></th>
        </tr>
        </thead>
        <tbody>
        <tr v-if="orders.length > 0 " v-for="order in orders">
          <td data-th="Product">
            {{order.order_date | formatDate}}
          </td>
          <td data-th="Product">
            {{order.order_total }}
          </td>

          <td class="actions" data-th="">
            <button class="btn btn-info btn-sm" @click="viewOrder(order)">Update</button>
            <button class="btn btn-danger btn-sm" @click="removeFromCart(item)">Delete</button>
          </td>
        </tr>
        </tbody>
        <tfoot>
        <tr v-if="orders.length <=0">
          <td><a href="#/products" class="btn btn-warning"><i class="fa fa-angle-left"></i> Start Shopping</a></td>
        </tr>
       <!-- <tr>
          <td><a href="#/products" class="btn btn-warning"><i class="fa fa-angle-left"></i> Continue Shopping</a></td>
          <td colspan="2" class="hidden-xs"></td>
          <td class="hidden-xs text-center"><strong>Total {{cart.cart_total}}</strong></td>
          <td><a href="#" @click="placeOrder()" v-if="cart.products.length > 0" class="btn btn-success btn-block">Checkout <i
            class="fa fa-angle-right"></i></a></td>
        </tr>-->
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



  export default {
    components: {Navbar},
    name: 'MyOrders',
    data() {
      return {
        orders: []
      }
    },
    methods: {
      getOrders() {
        OrderService.getOrderList(this).then((response) => {
          this.orders =response.body.data;
          }
          , err => {

          })
      },
      viewOrder(order){
        router.push({ path: `/order-detail/${order._id}` })

      }

    },
    created() {
      this.getOrders();
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
