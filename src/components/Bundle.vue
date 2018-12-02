<template lang="pug">
  div
    NavBar
    .container
      .row.mt-5
        h1.color-base1.font-weight-bold.text-center.w-100 {{name}}
          a.ml-1.pb-1(v-if="stats && stats.URL" v-bind:href="stats.URL")
            img(src="https://cdn0.iconfinder.com/data/icons/social-15/200/steam-128.png" width="30" height="30") 
      .row.justify-content-md-center.ft-medium
        span.mx-1.font-weight-bold(
          v-if="stats && stats.DiscountPrice"
        ) ${{stats.DiscountPrice}}
        span.color-base11.ml-1.mr-3.font-weight-bold {{ Math.round((stats.FinalPrice - stats.DiscountPrice) / stats.FinalPrice * 100) }}% off
        span.badge.badge-pill.bg-base13.color-base7.mx-1.my-auto(
          v-if="genres && genres.length" 
          v-for="genre of genres"
        ) {{genre.Name}}
      .row.justify-content-md-center.my-5(v-if="charts && charts.length")
        .col-8
          div(
            v-for="(chart, index) in charts"
            :class="{ 'active': index === 0 }"
            )
            .card.chartCard
              .card-body
                Chart(
                  v-bind:name="chart.name"
                  v-bind:data="chart.data"
                  v-bind:customStyle="chart.style"
                )


      .row.justify-content-md-center.mt-5
        a(href="#gamesList" data-toggle="collapse")
          h2.color-base1.font-weight-bold.text-center.w-100 Bundle Contents
      .row.justify-content-md-center.mb-5.collapse.show#gamesList
        ul.list-group.col-md(
          v-if="games && games.length"
        )
          li.bg-base5.list-group-item.my-1(
            v-for="game of games"
          )
            .row
              .col-7 {{ game.Name.substring(0, 60) }} 
                span(v-if="game.Name.length > 60") ...
              .col-3 
                span.mr-2
                  a.ml-1.pb-1.nohover(v-if="game.URL" v-bind:href="game.URL")
                    img(src="https://cdn0.iconfinder.com/data/icons/social-15/200/steam-128.png" width="30" height="30") 
                span.font-weight-bold.color-base11 ${{ game.Price.toFixed(2) }}
              router-link.col-2.font-weight-bold.bg-base9.color-base6.h-100.viewProfile.text-center(:to="{path: '/game/'+game.ItemID+'?name='+game.Name }") View Game
        h4(
          v-else
        ) {{name}} does not have any games

</template>

<script>
import axios from 'axios'
import NavBar from './NavBar.vue'
import Chart from './Chart.vue'
import colorConfig from "../../static/js/colorSetup.js"
export default {
  name: 'Bundle',
  components: {
    NavBar,
    Chart
  },
  data () {
    return {
      bundleID: this.$route.params.bundleID,
      name: this.$route.query.name,
      games: [], // ReturnedCount [out], Name, TotalPlaytime, Week2Playtime, ItemID
      stats: {}, // Price(maybe), UsersOwned, UsersPlayed, TotalPlaytimeForever, TotalPlaytime2Weeks
      charts: [],
      genres: [],
      totalUsers: 1,
    }
  },
  methods: {
    async loadData () {
      try{
        console.log(`/api/bundleGames?bundleID=${this.bundleID}`)
        const gamesPromise = axios(`/api/bundleGames?bundleID=${this.bundleID}`)
        const statsPromise = axios(`/api/bundleStats?bundleID=${this.bundleID}`)
        const genrePromise = axios(`/api/bundleGenres?bundleID=${this.bundleID}`)

        Promise.all([gamesPromise, statsPromise, genrePromise]).then(result => {
          const [games, stats, genres] = result
          if(games.data.recordsets){
            this.games = games.data.recordsets[0]
          }
          this.stats = stats.data.recordsets[0][0]
          if(genres.data.recordsets){
            this.genres = genres.data.recordsets[0]
          }

          if(this.genres.length > 2) this.charts.push(this.loadGenreDataset())
        });
      } catch (e) {
        console.log(e)
      }
    },
    loadGenreDataset() {
      var selColor = colorConfig.getRbgColorsBetween(8,15)
      return {
        name: "BundleGenres",
        data: {
          labels: this.genres.map(i=>i.Name),
          datasets:[{
            label: "Bundle",
            fill: true,
            data:this.genres.map(i => i.Counts),
            backgroundColor: selColor.map(i => colorConfig.rgbToRgbaString(i, .7)) 
          }]
        }
      }
    },
  },
  created () {
    this.loadData();
  }
}
</script>

