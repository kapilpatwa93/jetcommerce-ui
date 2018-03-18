<template>

  <div id="cart-component">
    <navbar></navbar>
    <div class="container">
      <table id="cart" class="table table-hover table-condensed">
        <tr v-if="cart.products.length <=0 ">
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
        <tr v-if="cart.products.length > 0 " v-for="item in cart.products">
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
            <input type="number" class="form-control text-center" value="1" v-model="item.quantity" :min="1"
                   :max="item.available_quantity">
          </td>
          <td data-th="Subtotal" class="text-center">
            <div v-if="item.quantity!='' && item.quantity >0">
              {{parseFloat(item.product_price) * parseFloat(item.quantity)}}
            </div>
          </td>
          <td class="actions" data-th="">
            <button class="btn btn-info btn-sm" @click="updateCart(item)">Update</button>
            <button class="btn btn-danger btn-sm" @click="removeFromCart(item)">Remove</button>
          </td>
        </tr>
        </tbody>
        <tfoot>

        <tr>
          <td><a href="#/products" class="btn btn-warning"><i class="fa fa-angle-left"></i> Continue Shopping</a></td>
          <td colspan="2" class="hidden-xs"></td>
          <td class="hidden-xs text-center"><strong>Total {{cart.cart_total}}</strong></td>
          <td><a href="#" @click="placeOrder()" v-if="cart.products.length > 0" class="btn btn-success btn-block">Checkout <i
            class="fa fa-angle-right"></i></a></td>
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
    name: 'Cart',
    data() {
      return {
        cart: {}
      }
    },
    methods: {
      updateCart(product) {

        if (product.quantity >= product.available_quantity) {
          swal('Invalid Quantity', 'You cannot add more than ' + product.available_quantity + ' ' + product.name + ' in your cart', 'error');

        } else {
          if (isNaN(product.quantity) || product.quantity <= 0 || product.quantity == "") {
            swal('Invalid Quantity', 'Product quantity should be a valid number.', 'error');
          } else {
            let data = {
              product_id: product.product_id,
              quantity: product.quantity
            };
            if (product.disable_update_option != true) {
              product.disable_update_option = true;
              CartService.addToCart(this, product).then((data) => {
                product.disable_update_option = false;
                this.$toast('Product updated in cart successfully')
                this.getCart();
              }, err => {
                product.disable_update_option = false;
                alert("Something went wrong!");
              })
            }
          }
        }
      },

      getCart() {
        CartService.getCart(this).then((response) => {
          this.cart = response.body.data;

        }, err => {

        });
      },

      removeFromCart(product) {
        swal({
          title: 'Remove',
          text: 'Are you sure you want to remove this product from the cart?',
          type: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Yes',
          cancelButtonText: 'No'
        }).then((result) => {
          if (result.value) {
            let data = {
              product_id: product.product_id
            };
            CartService.removeFromCart(this, data).then((response) => {
                this.$toast(response.body.message);
                this.getCart();
              },
              err => {

              })
          }
        })



    },
    placeOrder() {
      swal({
        title: 'Place Order',
        text: 'Are you sure you want to place order?',
        type: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes',
        cancelButtonText: 'No'
      }).then((result) => {

        OrderService.placeOrder(this).then((response) => {
          this.$toast(response.body.message);
          router.push({path: '/my-orders'})
        }, err => {

        })
      });
    }
  }
  ,
  created()
  {
    this.getCart();
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
