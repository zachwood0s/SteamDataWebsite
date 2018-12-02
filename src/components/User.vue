<template lang="pug">
  div
    NavBar
    .container
      .row.mt-5
        h1.color-base1.font-weight-bold.text-center.w-100 {{username}}
          a.ml-1.pb-1(v-if="stats && stats.Url" v-bind:href="stats.Url")
            img(src="https://cdn0.iconfinder.com/data/icons/social-15/200/steam-128.png" width="30" height="30") 
      .row.justify-content-md-center.mb-5(v-if="charts && charts.length")
        .col-8
          .carousel.slide.mt-3#carousel(data-ride='carousel')
            .carousel-inner
              .carousel-item(
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

              a.carousel-control-prev(
                href="#carousel"
                role="button"
                data-slide="prev"
              )
                span.carousel-control-prev-icon(aria-hidden="true")
                span.sr-only Previous
              a.carousel-control-next(
                href="#carousel"
                role="button"
                data-slide="next"
              )
                span.carousel-control-next-icon(aria-hidden="true")
                span.sr-only Next
      .row.justify-content-md-center.equal
        .col-3(v-if="stats && stats.TotalPlayTime")
          .card.bg-base6.h-100
            .card-body
              h2.text-center.font-weight-bold {{stats.TotalPlayTime}} hours
              h5.text-center Total Playtime
        .col-3(v-if="stats && stats.PlayTime2Weeks")
          .card.bg-base6.h-100
            .card-body
              h2.text-center.font-weight-bold {{stats.PlayTime2Weeks}} hours
              h5.text-center 2 Week Playtime
        .col-3(v-if="games && games.length")
          .card.bg-base6.h-100
            .card-body
              h2.text-center.font-weight-bold {{totalGames}} 
              h5.text-center Games
      .row.justify-content-md-center.mt-5
        a(href="#gamesList" data-toggle="collapse")
          h2.color-base1.font-weight-bold.text-center.w-100 {{username}}'s Games 
      .row.justify-content-md-center.mb-5.collapse.show#gamesList
        ul.list-group.col-md(
          v-if="games && games.length"
        )
          li.bg-base5.list-group-item.my-1(
            v-for="game of games"
          )
            .row
              .col-4 {{ game.Name.substring(0, 28) }} 
                span(v-if="game.Name.length > 28") ...
              .col-3.font-weight-bold 2 Week Playtime: {{ game.Week2PlayTime }}
              .col-3.font-weight-bold Total Playtime: {{ game.TotalPlayTime }}
              router-link.col-2.font-weight-bold.bg-base9.color-base6.h-100.viewProfile.text-center(:to="{path: '/game/'+game.ItemID+'?name='+game.Name }") View Game
        h4(
          v-else
        ) {{username}} doesn't have any games
      .row.justify-content-md-center.mt-5
        a(href="#reviewsList" data-toggle="collapse")
          h2.color-base1.font-weight-bold.text-center.w-100 {{username}}'s Reviews
      .row.justify-content-md-center.mb-5.collapse.show#reviewsList
        ul.list-group.col-md(
          v-if="reviews && reviews.length"
        )
          li.list-group-item.my-1.border-0(
            v-for="review of reviews"
          )
            .card
              .card-body
                router-link(:to="{path: '/game/'+review.ItemID+'?name='+review.Game}")
                  h5.card-title.color-base2.font-weight-bold {{ review.Game }}
                h6.card-subtitle.mb-2.color-base4 {{ review.PostedOn}} 
                  span.color-base5.font-italic (Last Edited: {{ review.LastEdited }})
                .card-text {{ review.Description }}
              .card-footer
                .row.justify-content-md-center
                  .col-2.font-weight-bold Funny: {{ review.Funny }}
                  .col-2.font-weight-bold Helpful: {{ review.Helpful }}
                  .col-3.color-base11.font-weight-bold(v-if="review.Recommend") Would Recommend
                  .col-3.color-base8.font-weight-bold(v-else) Would NOT Recommend
        h4(
          v-else
        ) {{username}} has not made any reviews

</template>

<script>
import axios from 'axios'
import NavBar from './NavBar.vue'
import Chart from './Chart.vue'
import colorConfig from "../../static/js/colorSetup.js"
export default {
  name: 'User',
  components: {
    NavBar,
    Chart
  },
  data () {
    return {
      username: this.$route.params.username,
      reviews: [], // ReturnedCount [out], Description, Game(Name), PostedOn(date), LastEdited(date), Funny(how many found), Helpful(how many found), Recommended(bit)
      games: [], // ReturnedCount [out], Name, TotalPlaytime, Week2Playtime, ItemID
      stats: {}, // TotalPlaytime, Playtime2Weeks, ReviewCount, FunnyCount, HelpfulCount, RecommendedCount
      charts: [],
      genres: [],
      totalGames: 0
    }
  },
  methods: {
    async loadData () {
      try{
        console.log(`/api/userReviews?username=${this.username}&resultCount=0`)
        const reviewsPromise = axios(`/api/userReviews?username=${this.username}&resultCount=0`)
        const gamesPromise = axios(`/api/userGames?username=${this.username}&resultCount=0`)
        const statsPromise = axios(`/api/userStats?username=${this.username}`)
        const genrePromise = axios(`/api/userGenres?username=${this.username}`)

        Promise.all([reviewsPromise, gamesPromise, statsPromise, genrePromise]).then(result => {
          const [reviews, games, stats, genres] = result
          if(reviews.data.recordsets) this.reviews = reviews.data.recordsets[0]
          if(games.data.recordsets) this.games = games.data.recordsets[0]
          if(stats.data.recordsets && 
             stats.data.recordsets[0] && 
             stats.data.recordsets[0][0]) this.stats = stats.data.recordsets[0][0]
          if(genres.data.recordsets) this.genres = genres.data.recordsets[0]
          if(games.data.output.ReturnedCount) this.totalGames = games.data.output.ReturnedCount
          this.charts = [
            this.loadTopGamesDataset(),
            this.loadGameRecommendDataset(),
            this.loadGameGenreDataset()
          ]
        });
      } catch (e) {
        console.log(e)
      }
    },
    loadTopGamesDataset(){
      var top6 = this.games.slice(0, 6)
      var selColors = colorConfig.getRbgColorsBetween(8,14)
      return {
        name: "UsersTopGames",
        style: "right: 20px",
        data: {
          labels: top6.map(i => i.Name),
          datasets: [{
            label: "Playtime",
            data: top6.map(i => i.TotalPlayTime),
            backgroundColor: selColors.map(i => colorConfig.rgbToRgbaString(i, .2)),
            borderColor: selColors.map(i => colorConfig.rgbToRgbaString(i, 1)),
            borderWidth: 1
          }]
        }
      }
    },
    loadGameRecommendDataset(){
      var numUncatReview = this.stats.ReviewCount - this.stats.FunnyCount - this.stats.HelpfulCount
      var selColors = colorConfig.getRbgColorsBetween(8,10)
      return{
        name:"UsersGameRecommendRatio",
        data:{
          labels: ["Games Recommended","Not Recommended"],
          datasets: [{
              label: "User Recommendations",
              data: [
                this.stats.RecommendedCount,
                this.totalGames - this.stats.RecommendedCount],
              backgroundColor: selColors.map(i => colorConfig.rgbToRgbaString(i, 1))
          }]
        }
      }
    },
    loadGameGenreDataset(){
      var selColors = colorConfig.getRbgColorsBetween(8,15)
      return {
        name: "UsersGameGenre",
        data: {
          labels: this.genres.map(i => i.Name),
          datasets: [{
            label: 'Games Genre',
            data: this.genres.map(i => i.GenreCount),
            backgroundColor: selColors.map(i => colorConfig.rgbToRgbaString(i, .7))
          }]
        }
      }
    }
  },
  created () {
    this.loadData();
  }
}
</script>

