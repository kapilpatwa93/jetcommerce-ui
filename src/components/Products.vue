<template>

  <div id="products">
    <navbar></navbar>
    <div class="container">
      <div class="row">
        <div v-for="product in products" class="col-lg-3 col-md-3 col-sm-6 col-xs-12">
          <div class="my-list">
            <div class="product-image-con"><img class="product-image" :src="'http://localhost:3001/'+product.image1" alt="product.name"/></div>
            <div class="product-name">{{product.name}}</div>
            <div class="price">MRP : {{product.price}} INR</div>

            <div class="quantity">
              <div v-if="product.available_quantity > 0">{{product.available_quantity}} in stock</div>
              <div v-if="product.available_quantity <= 0">Out of stock</div>
            </div>
            <div class="detail">
              <p>{{product.description}} </p>
              <div class="product-image-con">
                <img class="product-image" :src="'http://localhost:3001/'+product.image1" alt="product.name"/>
              </div>
              <div v-if="product.available_quantity > 0">
                <input :disabled="product.available_quantity <=0" class="quantity-input" type="number" min="0"
                       :max="product.available_quantity" v-model="product.selected_quantity"/>
                <button :disabled="product.available_quantity <=0" class="btn btn-info"
                        @click="addToCart(product,$event)">Add To Cart
                </button>
              </div>
              <div v-if="product.available_quantity <= 0">Out of stock</div>
            </div>
          </div>
        </div>


      </div>
    </div>
  </div>
</template>

<script>
  import ProductService from '../services/products';
  import CartService from '../services/cart';
  import About from "./About.vue";
  import Navbar from "./navbar.vue";
  import swal from 'sweetalert2'
  export default {
    components: {
      Navbar,
      About
    },
    name: 'Products',
    data() {
      return {
        products: []
      }
    },
    methods: {
      addToCart(product, button) {

        if (!product.hasOwnProperty('selected_quantity')) {
          swal('Invalid Quantity','Please select quantity', 'error');
//          alert('Please select quantity');
        } else {
          if (product.selected_quantity > product.available_quantity) {
            swal('Invalid Quantity','You cannot add more than ' + product.available_quantity + ' ' + product.name + ' in your cart', 'error');
//            alert('You cannot add more than ' + product.available_quantity + ' ' + product.name + ' in your cart')
          } else {

            if (isNaN(product.selected_quantity) || product.selected_quantity <= 0 || product.selected_quantity == "") {
              swal('Invalid Quantity','Product quantity should be a valid number.', 'error');
//              alert('Product quantity should be a valid number.');
            } else {
              if (product.disable_add_option != true) {
                product.disable_add_option = true;
                let data = {
                  product_id: product._id,
                  quantity: product.selected_quantity
                }
                CartService.addToCart(this, data).then((response) => {
                  this.$toast(response.body.message);
                  product.disable_add_option = false;
                }, err => {
                  product.disable_add_option = false;
                });
              }
            }
          }
        }


      }
    },
    created() {
      ProductService.getProducts(this).then((data) => {
        this.products = data.body.data;

      }, err => {

      });

    }
  }
</script>
<!-- styling for the component -->
<style>
  img {
    max-width: 100%;
  }

  * {
    transition: all .5s ease;
    -moz-transition: all .5s ease;
    -webkit-transition: all .5s ease
  }

  .my-list {
    width: 100%;
    padding: 10px;
    border: 1px solid #f5efef;
    float: left;
    margin: 15px 0;
    border-radius: 5px;
    box-shadow: 2px 3px 0px #e4d8d8;
    position: relative;
    overflow: hidden;
  }

  .my-list h3 {
    text-align: left;
    font-size: 14px;
    font-weight: 500;
    line-height: 21px;
    margin: 0px;
    padding: 0px;
    border-bottom: 1px solid #ccc4c4;
    margin-bottom: 5px;
    padding-bottom: 5px;
  }

  .my-list span {
    float: left;
    font-weight: bold;
  }

  .my-list span:last-child {
    float: right;
  }

  .my-list .offer {
    width: 100%;
    float: left;
    margin: 5px 0;
    border-top: 1px solid #ccc4c4;
    margin-top: 5px;
    padding-top: 5px;
    color: #afadad;
  }

  .detail {
    position: absolute;
    top: -100%;
    left: 0;
    text-align: center;
    background: #fff;
    height: 100%;
    width: 100%;

  }

  .product-name {
    color: black;
    border-bottom: 1px solid;
  }

  .price {
    font-weight: 200;
    border-bottom: 1px solid;

  }

  .my-list:hover .detail {
    top: 0;
  }

  .quantity-input {
    width: 20%;
  }
  .product-image-con{
    margin: auto;
    margin-top:15px;
    height: 190px;
    width: 150px;
  }
  .product-image{
    max-height:100%;
    max-width: 100%;
  }
</style>
