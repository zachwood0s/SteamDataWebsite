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
          <h1 style="text-align: center;">Add Genre</h1>
          <form>
            <div class="form-group" id="genre">
              <label for="genre">New Genre:</label>
              <input class="form-control" type="text" name="genre" v-model="input.genre" />
            </div>
              <button class="btn btn-secondary" type="button" v-on:click="addGenre()">Add Genre</button>
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
  name: "AddGenre",
  data () {
    return {
          input: {
              genre: "",
          },
          valid:true
      }
  },
  methods: {
  },
  components: {
    NavBar
  },
  
}
</script>