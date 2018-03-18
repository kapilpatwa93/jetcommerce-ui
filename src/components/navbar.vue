<template>

  <div id="navbar">
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <a class="navbar-brand">JetShop</a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item active">
            <a class="nav-link" href="/#/products">Products <span class="sr-only">(current)</span></a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#/cart">Cart</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#/my-orders">My Orders</a>
          </li>

        </ul>
      </div>
      <div class="pull-right">
        <ul class="navbar-nav">
          <li class="nav-item ">
            <a class="nav-link" href="#" @click="logout()">Logout</a>
          </li>
        </ul>

      </div>
    </nav>

  </div>
</template>

<script>
  import AuthService from '../auth';
  export default {
    name: 'Navbar',
    methods : {
      logout(){
        AuthService.logout();
      }
    }
  }
</script>
<!-- styling for the component -->
<style>
  #about {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
</style>
