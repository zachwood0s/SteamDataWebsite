<template>
  <div>
    <NavBar/>
    <div class="alert alert-danger" role="alert" v-if="!valid">
          Incorrect Login Credentials
      </div>
    	<div id="login">
        <h1>Login</h1>
        <input type="text" name="username" v-model="input.username" placeholder="Username" />
        <input type="password" name="password" v-model="input.password" placeholder="Password" />
        <button type="button" v-on:click="login()">Login</button>
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