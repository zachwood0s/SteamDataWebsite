<template>
  <div>
    <NavBar/>
    <div class="alert alert-danger" role="alert" v-if="!valid">
      Incorrect Login Credentials
    </div>
    <div class="container">
      <div class="row">
        <div class="col-sm"></div>
        <div class="col-sm">
          <h1 style="text-align: center;">Admin Login</h1>
          <form>
          	<div class="form-group" id="login">
              <label for="username">Username:</label>
              <input class="form-control" type="text" name="username" v-model="input.username" />
            </div>
            <div class="form-group" id="login">
              <label for="password">Password:</label>
              <input class="form-control" type="password" name="password" v-model="input.password" />
            </div>
              <button class="btn btn-secondary" type="button" v-on:click="login()">Login</button>
          </form>
          </div>
          <div class="col-sm"></div>
        </div>
      </div>
  </div>
</template>

<script>
var sha256 = require('js-sha256');
import NavBar from "@/components/NavBar.vue"
export default {
  name: "Login",
  data() {
      return {
          input: {
              username: "",
              password: ""
          },
          valid:true
      }
  },
  methods: {
      login() {
          var hash = sha256(this.input.password);
          if(this.input.username != "" && hash != "") {
            axios.get(`/api/admin/login?username=${this.username}&password=${hash}`)
            .then(response => {
              if(response.data.output.exists == 1){
                this.$router.push({path: "/admin/reviews"})
              } else{
              this.valid=false
              //incorrect
              }
            })
            .catch(e => {
              this.valid = false
            })
          } else {
              this.valid = false
          }
      }
  },
  components: {
    NavBar
  }
}
</script>