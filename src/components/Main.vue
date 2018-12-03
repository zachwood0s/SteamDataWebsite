<template lang="pug">
div
  NavBar
  .container-fluid
    .row.justify-content-center(v-if="charts && charts.length")
      .col-8
        #carousel.carousel.slide.mt-3
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
                  

</div>

</template>

<script>
import axios from "axios"
import NavBar from "@/components/NavBar.vue"
import Chart from "@/components/Chart.vue"

export default {
  name: "Main",
  components: {
    NavBar,
    Chart
  },
  data () {
    return {
      charts: [],
      top10: {
        users: {
          playtime: []
        },
        items: {
          playtime: [],
          reviews: [],
          owners: [],
          users: [],
          recommended: []
        }
      },
      genreTotals: [],
      funniestReview: {},
      helpfulReview: {}
    }
  },
  methods: {
    async loadData(){
      const usersPlaytimePromise = axios(`/api/top10/users/playtime`)
      const itemPlaytimePromise = axios(`/api/top10/items/playtime`)
      const itemReviewsPromise = axios(`/api/top10/items/reviews`)
      const itemOwnersPromise = axios(`/api/top10/items/owners`)
      const itemUsersPromise = axios(`/api/top10/items/users`)
      const itemRecommendedPromise = axios(`/api/top10/items/recommended`)
      const genreTotalsPromise = axios(`/api/genreTotals`)
      const funniestReviewPromise = axios(`/api/funniestReview`)
      const helpfulReviewPromise = axios(`/api/helpfulReview`)

      Promise.all([usersPlaytimePromise, 
                   itemPlaytimePromise,
                   itemReviewsPromise,
                   itemOwnersPromise,
                   itemUsersPromise,
                   itemRecommendedPromise,
                   genreTotalsPromise,
                   funniestReviewPromise,
                   helpfulReviewPromise])
      .then(result => {
        [up, ip, ir, io, iu, irec, gt, fr, hr] = result
        if(up.data.recordsets) this.top10.users.playtime = up.data.recordsets[0]
        if(ip.data.recordsets) this.top10.items.playtime = ip.data.recordsets[0]
        if(ir.data.recordsets) this.top10.items.reviews = ir.data.recordsets[0]
        if(io.data.recordsets) this.top10.items.owners = io.data.recordsets[0]
        if(iu.data.recordsets) this.top10.items.users = iu.data.recordsets[0]
        if(irec.data.recordsets) this.top10.items.recommended = irec.data.recordsets[0]
        if(gt.data.recordsets) this.genreTotals = gt.data.recordsets[0]
        if(fr.data.recordsets) this.funniestReview = fr.data.recordsets[0][0]
        if(hr.data.recordsets) this.helpfulReview = hr.data.recordsets[0][0]

        this.loadCharts()
      });
    },
    loadCharts() {
      this.charts = [
        this.loadGameGenres(),
        this.loadPopularGamesNow(),
        this.loadTopGames(),
        this.loadMostRecommended(),
        this.loadTopBundles()
      ]
    },
    loadGameGenres(){
      return {
        name: "GameGenres",
        data: {
          labels: ["RPG", "Action", "FPS", "Puzzle", "Strategy", "Arcade", "Multiplayer"],
          datasets: [{
            label: 'All Games by Genre',
            data: [5012, 9635, 15983, 2398, 4122, 5199, 10229],
            backgroundColor: [
              'rgba(255, 99, 132, .7)',
              'rgba(54, 162, 235, .7)',
              'rgba(255, 206, 86, .7)',
              'rgba(75, 192, 192, .7)',
              'rgba(153, 102, 255, .7)',
              'rgba(255, 159, 64, .7)',
              'rgba(200, 172, 64, .7)'
            ]
          }]
        }
      }
    },
    loadPopularGamesNow(){
      return {
        name: "PopularGamesNow",
        data:  {
          label: 'Popular Games Being Played Now!!!!',
          datasets: [
            {
              label: ["Red Dead Redemption 2"],
              backgroundColor: 'rgba(170,160,64,0.6)',
              data: [{ x: 1200, y: 1400, r: 30 }]
            },
            {
              label: ["Fortnite"],
              backgroundColor: 'rgba(255,0,0,0.6)',
              data: [{ x: 500, y: 1700, r: 24 }]
            },
            {
              label: ["League of Legends"],
              backgroundColor: 'rgba(0,200,0,0.6)',
              data: [{ x: 906, y: 1000, r: 24 }]
            },
            {
              label: ["Starcraft II"],
              backgroundColor: 'rgba(100,100,50,0.6)',
              data: [{ x: 100, y: 300, r: 24 }]
            },

          ]
        }
      }
    },
    loadTopGames(){
      return {
        name: "OverallTopGames",
        data:  {
          labels: ["Starcraft II", "League of Legends", "CS:GO", "PUBG", "Runescape", "WoW", "Factorio", "Black Desert", "Illegally downloaded Minecraft", "Terraria"],
          datasets: [{
            label: "Playtime",
            data: [1294, 1134, 976, 785, 780, 654, 345, 300, 189, 100, 50],
            backgroundColor: [
              '#CA626C', '#CA5F98', '#C25FCA', '#995FCA', '#5886CA', '#59BBCA', '#58CA9E', '#5BCA73', '#A3CA5B', '#CAAA62'
            ]
          }]
        }
      }
    },
    loadMostRecommended(){
      return {
        name: "MostRecoOverall",
        data: {
          labels: ["Starcraft II", "League of Legends", "CS:GO", "PUBG", "Runescape"],
          datasets: [{
            label: "Recommendations",
            data: [1294, 1134, 976, 785, 780, 654, 345, 300, 189, 100, 50],
            backgroundColor: [
              '#CA626C', '#CA5F98', '#C25FCA', '#995FCA', '#5886CA'
            ]
          }]
        }
      }
    },
    loadTopBundles(){
      return {
        name: "TopBundles",
        data:  {
          labels: ["Bundle1", "Bundle2", "Bundle3", "Bundle4", "Bundle5", "Bundle6", "Bundle7", "Bundle8", "Bundle9", "Bundle10"],
          datasets: [{
            label: "Playtime",
            data: [1294, 1134, 976, 785, 780, 654, 345, 300, 189, 100, 50],
            backgroundColor: [
              '#CA626C', '#CA5F98', '#C25FCA', '#995FCA', '#5886CA', '#59BBCA', '#58CA9E', '#5BCA73', '#A3CA5B', '#CAAA62'
            ]
          }]
        }
      }
    }
  },
  created(){
    this.loadData()
  }
}
</script>

