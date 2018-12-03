<template lang="pug">
div
  NavBar
  //.alert.alert-danger(role="alert" v-if="!valid") Incorrect Login Credentials
  .container
    .row
      .col-sm
      .col-sm
        h1.text-center Add Genre
        .form-group#genre
          label(for="genre") New Genre:
          input.form-control(type="text" name="genre" v-model="addText")
        .btn.btn-secondary(type="button" v-on:click="addGenre") Add Genre
      .col-sm
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
          addText:'',
          valid:true
      }
  },
  methods: {
    addGenre(){
       console.log(this.addText)
        axios.post('/api/admin/add/genre', {
            Name: this.addText
        })
        .then(response => {
            
            console.log(response);
        })
        .catch(e => {
            console.log(error);
        });

    }
  },
  components: {
    NavBar
  },
  
}
</script>