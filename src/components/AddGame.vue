<template>
  <div>
    <NavBar/>
    <div class="alert alert-danger" role="alert" v-if="!gameNotAdded">
      Error: Cannot add game
    </div>
    <div class="alert alert-primary" role="alert" v-if="gameAdded">
      Successfully added game!
    </div>
    <div class="container">
      <div class="row">
        <div class="col-sm"></div>
        <div class="col-sm">
          <h1 style="text-align: center;">Add Game</h1>
          <form>
            <div class="form-group" id="Name">
              <label for="name">Game Name:</label>
              <input class="form-control" type="text" name="name" v-model="input.Name" />
            </div>
            <div class="form-group" id="Price">
              <label for="price">Game Price:</label>
              <input class="form-control" type="number" step="0.01" name="price" v-model="input.Price"/>
            </div>
              <button class="btn btn-secondary" type="button" v-on:click="addGame()">Add Game</button>
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
  name: "AddGame",
  data () {
    return {
          input: {
              Name: "",
              Price: ""
          },
          gameAdded: false, 
          gameNotAdded: true

      }
  },
  methods: {
    addGame() {
      if(this.input.Name != "" && this.input.Price) {
        axios.post(`/api/admin/add/item?name=${this.Name}&price=${this.Price}`)
          .then(response => {
            console.log("got response", response)
            if(response.data.output.added == 1){
              this.gameAdded=true
            } else{
              this.gameNotAdded=false
            }
          })
          .catch(e => {
            this.gameNotAdded=false
          })
        } else {
          this.gameNotAdded=false
        }
      }
  },
  components: {
    NavBar
  },
  
}
</script>