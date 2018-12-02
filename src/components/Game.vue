<template lang="pug">
  div
    NavBar
    .container
      .row.mt-5
        h1.color-base1.font-weight-bold.text-center.w-100 {{name}}
          a.ml-1.pb-1(v-if="stats && stats.URL" v-bind:href="stats.URL")
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
              h5.text-center 2 Week Playtime
        .col-3(v-if="stats && stats.UsersOwned")
          .card.bg-base6.h-100
            .card-body
              h2.text-center.font-weight-bold {{ stats.UsersOwned }}
              h6.text-center ({{ Math.round(stats.UsersOwned / totalUsers * 10000)/100}}% of players)
              h5.text-center Purchases
        .col-3(v-if="stats && stats.UsersPlayed")
          .card.bg-base6.h-100
            .card-body
              h2.text-center.font-weight-bold {{ stats.UsersPlayed }} 
              h5.text-center Players

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
              .col-3.font-weight-bold 2 Week Playtime: {{ user.TimePlayed2Weeks }}
              .col-3.font-weight-bold Total Playtime: {{ user.TimePlayedForever }}
              router-link.col-2.font-weight-bold.bg-base9.color-base6.h-100.viewProfile.text-center(:to="{path: '/user/'+user.Username }") View Profile

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
        console.log(`/api/userReviews?username=${this.username}&resultCount=0`)
        const reviewsPromise = axios(`/api/gameReviews?itemID=${this.itemID}&resultCount=0`)
        const bundlesPromise = axios(`/api/gameBundles?itemID=${this.itemID}&resultCount=0`)
        const statsPromise = axios(`/api/gameStats?itemID=${this.itemID}`)
        const genrePromise = axios(`/api/gameGenres?itemID=${this.itemID}`)
        const usersPromise = axios(`/api/gameUsers?itemID=${this.itemID}&resultCount=10`)
        const totalUsersPromise = axios(`/api/totalUsers`)

        Promise.all([reviewsPromise, bundlesPromise, statsPromise, genrePromise, usersPromise, totalUsersPromise]).then(result => {
          const [reviews, bundles, stats, genres, users, totalUsers] = result
          this.reviews = reviews.data.recordsets[0]
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
          ]
        });
      } catch (e) {
        console.log(e)
      }
    },
  },
  created () {
    this.loadData();
  }
}
</script>

