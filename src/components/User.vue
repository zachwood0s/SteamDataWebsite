<template lang="pug">
  div
    NavBar
    .container
      .row.mt-5
        h1.color-base1.font-weight-bold.text-center.w-100 {{username}}
      .row.justify-content-md-center
        .col-8
          .carousel.slide.mt-3#carousel(data-ride='carousel')
            .carousel-inner
              .carousel-item.active
                .card
                  .card-body
              .carousel-item
                .card
                  .card-body
              .carousel-item
                .card
                  .card-body
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
      .row.justify-content-md-center
        .col-3(v-if="stats && stats.TotalPlayTime")
          .card.bg-base6
            .card-body
              h2.text-center {{stats.TotalPlayTime}} hours
              h5.text-center Total Playtime
        .col-3(v-if="stats && stats.PlayTime2Weeks")
          .card.bg-base6
            .card-body
              h2.text-center {{stats.PlayTime2Weeks}} hours
              h5.text-center 2 Week Playtime
      .row.justify-content-md-center.mt-5
        h2.color-base1.font-weight-bold.text-center.w-100 {{username}}'s Games
      .row.justify-content-md-center.mb-5
        ul.list-group.col-md(
          v-if="games && games.length"
        )
          li.bg-base5.list-group-item.my-1(
            v-for="game of games"
          )
            .row
              .col-4 {{ game.Name }}
              .col-3.font-weight-bold 2 Week Playtime: {{ game.Week2PlayTime }}
              .col-3.font-weight-bold Total Playtime: {{ game.TotalPlayTime }}
              router-link.col-2.font-weight-bold.bg-base9.color-base6.h-100.viewProfile.text-center(:to="{path: '/game/'+game.ItemID }") View Game

</template>

<script>
import axios from 'axios'
import NavBar from './NavBar.vue'
export default {
  name: 'User',
  components: {
    NavBar
  },
  data () {
    return {
      username: this.$route.params.username,
      reviews: [], // ReturnedCount [out], Description, Game(Name), PostedOn(date), LastEdited(date), Funny(how many found), Helpful(how many found), Recommended(bit)
      games: [], // ReturnedCount [out], Name, TotalPlaytime, Week2Playtime, ItemID
      stats: {} // TotalPlaytime, Playtime2Weeks, ReviewCount, FunnyCount, HelpfulCount, RecommendedCount
    }
  },
  methods: {
    async loadData () {
      try{
        console.log(`/api/userReviews?username=${this.username}&resultCount=1000`)
        const reviewsPromise = axios(`/api/userReviews?username=${this.username}`)
        const gamesPromise = axios(`/api/userGames?username=${this.username}`)
        const statsPromise = axios(`/api/userStats?username=${this.username}`)

        Promise.all([reviewsPromise, gamesPromise, statsPromise]).then(result => {
          const [reviews, games, stats] = result
          this.reviews = reviews.data.recordsets[0]
          this.games = games.data.recordsets[0]
          this.stats = stats.data.recordsets[0][0]
          console.log(this.reviews, this.games, this.stats)
        });
      } catch (e) {
        console.log(e)
      }
    }
  },
  created () {
    this.loadData();
  }
}
</script>

