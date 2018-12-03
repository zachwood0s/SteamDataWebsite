<template lang="pug">
  div
    NavBar
    .container
      .row.justify-content-md-center#searchArea
        .col-md-8.mt-5
          input.mt-5.mb-1.w-100.ft-xxsuperlarge.color-base2#bundleSearch(
            placeholder='Search'
            v-model='searchText'
            v-on:keyup.enter='search'
            )
      .row.justify-content-md-center
        .col.text-center.ft-medium Search for a Steam Bundle
      .row.justify-content-md-center.mt-2(v-if="resultCount != 0")
        h6.color-base1.font-weight-bold Returned {{resultCount}} bundles
      .row.justify-content-md-center.my-2
        ul.list-group.col-md#usersList(
          v-if="bundles && bundles.length"
          v-bind:class="{loaded: loaded}"
        )
          li.bg-base5.list-group-item.my-1(
            v-for="bundle of bundles"
          )
            .row
              .col-10 {{ bundle.Name }}
              router-link.col-2.font-weight-bold.bg-base9.color-base6.h-100.viewProfile.text-center(:to="{path: '/bundle/'+bundle.BundleID+'?name='+bundle.Name }") View Bundle
        ul(v-if="errors && errors.length")
          li(v-for="error of errors") {{ error.message }}
</template>

<script>
import axios from 'axios'
import NavBar from './NavBar.vue'

const loadStartPadding = 300;

export default {
  methods: {
    search () {
      var loader = this.loadMore
      if(this.searchText != this.lastSearchText){
        this.page = 1
        loader = this.loadNew
        this.outOfResults = false
      }
      else if(this.outOfResults) {
        console.log("Out of results, ignoring")
        return;
      }

      var searchText = `/api/bundles?name=${this.searchText}&pageNumber=${this.page}&resultCount=${this.numberToLoad}`
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
      this.bundles = this.bundles.concat(response.data.recordsets[0])
    },
    loadNew (response) {
      this.bundles = response.data.recordsets[0]
      this.resultCount = response.data.output.ReturnedCount
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
  destroyed () {
    window.removeEventListener('scroll', this.onscroll)
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
      resultCount: 0,
      bundles: [],
      errors: []
    }
  }
}
</script>