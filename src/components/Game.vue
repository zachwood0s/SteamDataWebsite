<template lang="pug">
  div
    NavBar
    .container
      .row.mt-5
        h1.color-base1.font-weight-bold.text-center.w-100 {{name}}
          a.ml-1.pb-1(v-if="stats && stats.URL" v-bind:href="stats.URL")
            img(src="https://cdn0.iconfinder.com/data/icons/social-15/200/steam-128.png" width="30" height="30") 
      .row.justify-content-md-center.ft-medium
        span.mx-1.color-base11.font-weight-bold(
          v-if="stats && stats.Price"
        ) ${{stats.Price}}
        span.badge.badge-pill.bg-base13.color-base7.mx-1.my-auto(
          v-if="genres && genres.length" 
          v-for="genre of genres"
        ) {{genre.Name}}
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
        .col-3(v-if="stats && stats.TotalPlayTimeForever")
          .card.bg-base6.h-100
            .card-body
              h2.text-center.font-weight-bold {{ Math.round(stats.TotalPlayTimeForever / 24 * 100)/100}} days
              h6.text-center ({{ Math.round(stats.TotalPlayTimeForever / 8760 *100) / 100 }} years)
              h5.text-center Total Playtime
        .col-3(v-if="stats && stats.TotalPlayTime2Weeks")
          .card.bg-base6.h-100
            .card-body
              h2.text-center.font-weight-bold {{ Math.round(stats.TotalPlayTime2Weeks / 24 * 100)/100}} days
              h6.text-center ({{ Math.round(stats.TotalPlayTime2Weeks / 8760 *100) / 100 }} years)
              h5.text-center 2 Week Playtime
        .col-3(v-if="stats && stats.UsersOwned")
          .card.bg-base6.h-100
            .card-body
              h2.text-center.font-weight-bold {{ stats.UsersOwned }}
              h5.text-center Purchases
              h6.text-center ({{ Math.round(stats.UsersOwned / totalUsers * 10000)/100}}% of players)
        .col-3(v-if="stats && stats.UsersPlayed")
          .card.bg-base6.h-100
            .card-body
              h2.text-center.font-weight-bold {{ stats.UsersPlayed }} 
              h5.text-center Players
              h6.text-center ({{ Math.round(stats.UsersPlayed / totalUsers * 10000)/100}}% of players)

      .row.justify-content-md-center.mt-5
        a(href="#topPlayers" data-toggle="collapse")
          h2.color-base1.font-weight-bold.text-center.w-100 Top 10 {{ name }} Players
      .row.justify-content-md-center.mb-5.collapse.show#topPlayers
        ul.list-group.col-md(
          v-if="users && users.length"
        )
          li.bg-base5.list-group-item.my-1(
            v-for="user of users"
          )
            .row
              .col-4 {{ user.Username.substring(0, 28) }} 
                span(v-if="user.Username.length > 28") ...
              .col-3.font-weight-bold Two Week Playtime: {{ user.TimePlayed2Weeks }} hour
                span(v-if="user.TimePlayed2Weeks != 1") s
              .col-3.font-weight-bold Total Playtime: {{ user.TimePlayedForever }} hour
                span(v-if="user.TimePlayedForever != 1") s
              router-link.col-2.font-weight-bold.bg-base9.color-base6.h-100.viewProfile.text-center(:to="{path: '/user/'+user.Username }") View Profile

      .row-justify-content-md-center.mt-5
        a(href="#bundlesList" data-toggle="collapse")
          h2.color-base1.font-weight-bold.text-center.w-100 Bundles containing {{name}}
      .row.justify-content-md-center.mb-5.collapse.show#bundlesList
        ul.list-group.col-md(
          v-if="bundles && bundles.length"
        )
          li.bg-base5.list-group-item.my-1(
            v-for="bundle of bundles"
          )
            .row
              .col-7 {{ bundle.Name.substring(0, 50) }} 
                span(v-if="bundle.Name.length > 50") ...
              .col-3.font-weight-bold ${{ bundle.DiscountPrice.toFixed(2) }} 
                span.color-base11.ml-1.font-weight-bold {{ Math.round((bundle.FinalPrice - bundle.DiscountPrice) / bundle.FinalPrice * 100) }}% off
              router-link.col-2.font-weight-bold.bg-base9.color-base6.h-100.viewProfile.text-center(:to="{path: '/bundle/'+bundle.BundleID+'?name='+bundle.Name }") View Bundle

      .row.justify-content-md-center.mt-5
        a(href="#reviewsList" data-toggle="collapse")
          h2.color-base1.font-weight-bold.text-center.w-100 {{name}}'s Reviews
      .row.justify-content-md-center.mb-5.collapse.show#reviewsList
        ul.list-group.col-md(
          v-if="reviews && reviews.length"
        )
          li.list-group-item.my-1.border-0(
            v-for="review of reviews"
          )
            .card
              .card-body
                router-link(:to="{path: '/user/'+review.Username}")
                  h5.card-title.color-base2.font-weight-bold {{ review.Username }}
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
        ) {{name}} does not have any reviews

</template>

<script>
import axios from 'axios'
import NavBar from './NavBar.vue'
import Chart from './Chart.vue'
import colorConfig from "../../static/js/colorSetup.js"
export default {
  name: 'Game',
  components: {
    NavBar,
    Chart
  },
  data () {
    return {
      itemID: this.$route.params.itemID,
      name: this.$route.query.name,
      reviews: [], // ReturnedCount [out], Description, Game(Name), PostedOn(date), LastEdited(date), Funny(how many found), Helpful(how many found), Recommended(bit)
      bundles: [], // ReturnedCount [out], Name, TotalPlaytime, Week2Playtime, ItemID
      stats: {}, // Price(maybe), UsersOwned, UsersPlayed, TotalPlaytimeForever, TotalPlaytime2Weeks
      charts: [],
      genres: [],
      users: [],
      totalUsers: 1,
    }
  },
  methods: {
    async loadData () {
      try{
        const reviewsPromise = axios(`/api/gameReviews?itemID=${this.itemID}&resultCount=0`)
        const bundlesPromise = axios(`/api/gameBundles?itemID=${this.itemID}&resultCount=0`)
        const statsPromise = axios(`/api/gameStats?itemID=${this.itemID}`)
        const genrePromise = axios(`/api/gameGenres?itemID=${this.itemID}`)
        const usersPromise = axios(`/api/gameUsers?itemID=${this.itemID}&resultCount=10`)
        const totalUsersPromise = axios(`/api/totalUsers`)

        Promise.all([reviewsPromise, bundlesPromise, statsPromise, genrePromise, usersPromise, totalUsersPromise]).then(result => {
          const [reviews, bundles, stats, genres, users, totalUsers] = result
          if(reviews.data.recordsets){
            this.reviews = reviews.data.recordsets[0]
          }
          if(bundles.data.recordsets){
            this.bundles = bundles.data.recordsets[0]
          }
          this.stats = stats.data.recordsets[0][0]
          if(genres.data.recordsets){
            this.genres = genres.data.recordsets[0]
          }
          if(users.data.recordsets){
            this.users = users.data.recordsets[0]
          }
          if(totalUsers.data.recordsets){
            this.totalUsers = totalUsers.data.recordsets[0][0].TotalUsers
          }
          this.charts = [
            this.reviewsOverTimeDataset(),
            this.gameRecommendationDataset()
          ]
        });
      } catch (e) {
        console.log(e)
      }
    },
    reviewsOverTimeDataset () {
      var selColors = colorConfig.getRbgColorsBetween(8,9)
      var years = this.reviews.map(i => i.PostedOn.substring(i.PostedOn.indexOf(',')+1).trim()).sort()
      var uniqueYears = {};
      for(var year of years){
        if(year in uniqueYears) uniqueYears[year]++
        else uniqueYears[year] = 1
      }
      return {
        name: "GamesReviewsOverTime",
        data: {
          labels: Object.keys(uniqueYears), 
          datasets: [{
            label: "Posts",
            data: Object.keys(uniqueYears).map(i => uniqueYears[i]),
            fill: false,
            backgroundColor: selColors.map(i => colorConfig.rgbToRgbaString(i, .7))
          }]
        }
      }
    },
    gameRecommendationDataset () {
      var recommendCount = this.reviews.filter(i => i.Recommend).length
      var selColors = colorConfig.getRbgColorsBetween(10,12)
      return {
        name: "GameRecommendRate",
        data: {
          labels: ["Recommended", "Not Recommended"],
          datasets: [{
            label: "Recommendations",
            data: [recommendCount, this.reviews.length - recommendCount],
            backgroundColor: selColors.map(i => colorConfig.rgbToRgbaString(i, 1))
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

