<template>
  <div>
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.5.0/css/all.css" integrity="sha384-B4dIYHKNBt8Bc12p+WXckhzcICo0wtJAoU8YZTY5qE0Id1GSseTk6S+L3BlXeVIU" crossorigin="anonymous">
    <NavBar/>
      <div style="margin: 35px 0px;" class="row">

        <div class="col-sm-1"></div>
        <div class="col-sm-2">
         <div class="card">
           <div class="card-body align-items-center d-flex justify-content-center">
             <i style="margin: 5px;" class="far fa-user fa-7x"></i>
           </div>
          <div class="card-body align-items-center d-flex justify-content-center">
           <router-link class="btn btn-secondary" v-bind:to="{path: '/admin/add/user'}">Add User</router-link>
           </div>
         </div>
        </div>

        <div class="col-sm-2">
         <div class="card">
           <div class="card-body align-items-center d-flex justify-content-center">
             <i style="margin: 5px;" class="fas fa-gamepad fa-7x"></i>
           </div>
           <div class="card-body align-items-center d-flex justify-content-center">
             <router-link class="btn btn-secondary" v-bind:to="{path: '/admin/add/item'}">Add Item</router-link>
           </div>
         </div>
        </div>

        <div class="col-sm-2">
         <div class="card">
           <div class="card-body align-items-center d-flex justify-content-center">
             <i style="margin: 5px;" class="fas fa-book-open fa-7x"></i>
          </div>
          <div class="card-body align-items-center d-flex justify-content-center">
              <router-link class="btn btn-secondary" v-bind:to="{path: '/admin/add/genre'}">Add Game Genre</router-link>
           </div>
         </div>
        </div>

        <div class="col-sm-2">
         <div class="card">
           <div class="card-body align-items-center d-flex justify-content-center">
             <i style="margin: 5px;" class="far fa-comments fa-7x"></i>
          </div>
          <div class="card-body align-items-center d-flex justify-content-center">
             <router-link class="btn btn-secondary" v-bind:to="{path: '/admin/archive/reviews'}">Archive Review</router-link>
           </div>
         </div>
        </div>

        <div class="col-sm-2">
         <div class="card">
           <div class="card-body align-items-center d-flex justify-content-center">
              <i style="margin: 5px;" class="fas fa-dollar-sign fa-7x"></i>
          </div>
          <div class="card-body align-items-center d-flex justify-content-center">
             <router-link class="btn btn-secondary" v-bind:to="{path: '/admin/update/bundle'}">Update Bundle Price</router-link>
           </div>
         </div>
        </div>

          <div class="col-sm-1">
          </div>
      </div>
  </div>
</template>

<script>
  import NavBar from "@/components/NavBar.vue"
  export default {
    name: "Admin",
    components: {
      NavBar
    }
  }
</script>