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
import axios from 'axios'
import NavBar from './NavBar.vue'

const loadStartPadding = 300;

export default {
  methods: {
    search () {
      var loader = this.loadMore
      console.log("no more results: ", this.outOfResults)
      if(this.searchText != this.lastSearchText){
        this.page = 1
        loader = this.loadNew
      }
      else if(this.outOfResults) {
        console.log("Out of results, ignoring")
        return;
      }

      var searchText = `/api/users?name=${this.searchText}&pageNumber=${this.page}&resultCount=${this.numberToLoad}`
      console.log(searchText)
      this.searching = true

      axios.get(searchText)
      
        .then(response => {
          this.searching = false;
          if (response.data.recordsets[0].length < this.numberToLoad){
            console.log('No more results')
            this.outOfResults = true
          }
          loader(response)
          this.lastSearchText = this.searchText
          window.setTimeout(() => this.loaded = true, 10)
        })
        .catch(e => {
          this.errors.push(e)
        })
    },
    loadMore (response) {
      this.users = this.users.concat(response.data.recordsets[0])
    },
    loadNew (response) {
      this.users = response.data.recordsets[0]
    },
    onscroll () {
      var d = document.documentElement
      var offset = d.scrollTop + window.innerHeight
      var height = d.offsetHeight

      if (offset + loadStartPadding >= height) {
        if (!this.searching) {
          this.page++
          this.search()
        }
      }
    }
  },
  created () {
    window.addEventListener('scroll', this.onscroll)
  },
  components: {
    NavBar
  },
  data () {
    return {
      outOfResults: false,
      lastSearchText: '',
      searchText: '',
      searching: false,
      loaded: false,
      numberToLoad: 50,
      page: 1,
      users: [],
      errors: []
    }
  }
}
</script>