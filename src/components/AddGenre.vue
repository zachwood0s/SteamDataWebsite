<template lang="pug">
div
    NavBar
    .container
        .row
            .col-sm
            .col-sm
                h1.text-center Update A Game's genre
                .form-group#searchBundle
                    label(for="Bundle") Search Games:
                    input.form-control(type="text" name="Game" v-on:keyup.enter="search" v-model="searchText")
            .col-sm
        .row.justify-content-md-center.my-2
            ul.list-group.col-md#bundlesList(
                v-if="games && games.length"
                v-bind:class="{loaded: loaded}"
            )
                li.bg-base5.list-group-item.my-1(
                    v-for="game of games"
                )
                    .row
                        .col-10 {{ game.Name }}
                        .btn.btn-primary.col-2.font-weight-bold.bg-base9.color-base6.h-100.viewProfile.text-center(data-toggle="modal" data-target="#modalCall" v-on:click = "setGameGenre(game.ItemID, game.Name)") Add Genre
    
    
    .modal.fade#modalCall(tabindex="-1" role="dialog" aria-labelledby="priceLabel" aria-hidden="true") 
        .modal-dialog(role="document")
            .modal-content 
                .modal-header
                    h5.modal-title#priceLabel Add Game
                    button.close(data-dismiss="modal" aria-label="close")
                        span(area-hidden = "true") &times;
                .modal-body Add Genre to {{selectGameName}}:
                    input.form-control(type="text" name="newGenre" v-bind:placeholder="Action" id="updateText" v-model="updateText")
                    span.color-base11(v-if="updated && validUpdate") Successfully Updated
                    span.color-base8(v-if="updated && !validUpdate") Update Failed
                .modal-footer
                    button.btn.btn-secondary(data-dismiss="modal") Close
                    button.btn.btn-primary(value="Input" v-on:click="update") Save Changes                

</template>

<script>
import NavBar from "@/components/NavBar.vue"
import axios from 'axios'

const loadStartPadding = 300;

export default {
  name: "UpdateBundle",
  components: {
    NavBar
  },
  methods: {

    setGameGenre(gameID, gameName){
        console.log(gameID, gameName)
        this.selectGameID = gameID,
        this.selectGameName = gameName
    },

    update(){

        console.log(this.updateText)
        axios.post(`/api/admin/add/genre?itemId=${this.selectGameID}&genreName=${this.updateText}`)
        .then(response => {
            this.validUpdate = true
            this.updated = true
            console.log(response);
        })
        .catch(e => {
            console.log(error);
            this.validUpdate = false
        });
    },
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
      var searchText = `/api/games?name=${this.searchText}&pageNumber=${this.page}&resultCount=${this.numberToLoad}`
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
      this.games = this.games.concat(response.data.recordsets[0])
    },
    loadNew (response) {
      this.games = response.data.recordsets[0]
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
      updateText: '',
      searching: false,
      loaded: false,
      numberToLoad: 50,
      page: 1,
      games: [],
      errors: [],
      selectBundleID: 0,
      selectBundleName: '',
      selectDiscountPrice: 0,
      validUpdate: false,
      updated: false
    }
  },

}
</script>

