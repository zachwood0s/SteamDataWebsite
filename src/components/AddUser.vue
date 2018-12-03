<template>
  <div>
    <NavBar/>
    <div class="alert alert-danger" role="alert" v-if="!userNotAdded">
      Error: Cannot add user
    </div>
    <div class="alert alert-primary" role="alert" v-if="userAdded">
      Successfully added user!
    </div>
    <div class="container">
      <div class="row">
        <div class="col-sm"></div>
        <div class="col-sm">
          <h1 style="text-align: center;">Add User</h1>
          <form>
            <div class="form-group" id="login">
              <label for="username">Username:</label>
              <input class="form-control" type="text" name="username" v-model="input.username" />
            </div>
              <button class="btn btn-secondary" type="button" v-on:click="addUser()">Add User</button>
          </form>
          </div>
          <div class="col-sm"></div>
        </div>
      </div>
  </div>
</template>

<script>
import axios from 'axios'
import NavBar from './NavBar.vue'

const loadStartPadding = 300;

export default {
  name: "AddUser",
  data () {
    return {
          input: {
              username: "",
          },
          userAdded: false, 
          userNotAdded: true
      }
  },
  methods: {
    addUser() {
      if(this.input.username != "") {
        axios.post(`/api/admin/add/user?username=${this.username}`)
          .then(response => {
          console.log("got response", response)
            if(response.data.output.added == 1){
              this.userAdded=true
            } else{
              // not added - show "user already exists"
              this.userNotAdded=false
            }
          })
          .catch(e => {
            this.userNotAdded=false
          })
        } else {
          this.userNotAdded=false
        }
      }
  },
  components: {
    NavBar
  },
  
}
</script>