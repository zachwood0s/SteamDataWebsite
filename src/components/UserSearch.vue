<template lang="pug">
    .container-fluid
        NavBar
        .container
            .row.justify-content-md-center#searchArea
                .col-md-8.mt-5
                    input.mt-5.mb-1.w-100.ft-xxsuperlarge.color-base2#userSearch(
                        placeholder='Search'
                        v-model='searchText'
                        v-on:keyup.enter='search'
                        )
</template>

<script>
import NavBar from './NavBar.vue'
export default {
  methods: {
    search () {
      console.log(this.searchText)
    }
  },
  components: {
    NavBar
  },
  data () {
    return {
      searchText: ''
    }
  }
}
</script>
