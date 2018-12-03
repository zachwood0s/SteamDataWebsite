<template lang="pug">
div
  NavBar
  .container-fluid
    .row.justify-content-center.mt-3(v-if="charts && charts.length")
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
  
  .row.justify-content-center.mt-5
    h1.color-base2 Funniest Review
  .row.justify-content-center(v-if="funniestReview")
    .col-8
      .card
        .card-body
          router-link(:to="{path: '/game/'+funniestReview.ItemID+'?name='+funniestReview.Game}")
            h5.card-title.color-base2.font-weight-bold {{ funniestReview.Name }}: {{funniestReview.Username}}
          h6.card-subtitle.mb-2.color-base4 {{ funniestReview.PostedOn}} 
            span.color-base5.font-italic (Last Edited: {{ funniestReview.LastEdited }})
          .card-text {{ funniestReview.Description }}
        .card-footer
          .row.justify-content-md-center
            .col-2.font-weight-bold Funny: {{ funniestReview.Funny }}
            .col-2.font-weight-bold Helpful: {{ funniestReview.Helpful }}
            .col-3.color-base11.font-weight-bold(v-if="funniestReview.Recommend") Would Recommend
            .col-3.color-base8.font-weight-bold(v-else) Would NOT Recommend

  .row.justify-content-center.mt-5
    h1.color-base2 Most Helpful Review
  .row.justify-content-center.mb-5(v-if="helpfulReview")
    .col-8
      .card
        .card-body
          router-link(:to="{path: '/game/'+helpfulReview.ItemID+'?name='+funniestReview.Game}")
            h5.card-title.color-base2.font-weight-bold {{ helpfulReview.Name }}: {{helpfulReview.Username}}
          h6.card-subtitle.mb-2.color-base4 {{ helpfulReview.PostedOn}} 
            span.color-base5.font-italic (Last Edited: {{ helpfulReview.LastEdited }})
          .card-text {{ helpfulReview.Description }}
        .card-footer
          .row.justify-content-md-center
            .col-2.font-weight-bold Funny: {{ helpfulReview.Funny }}
            .col-2.font-weight-bold Helpful: {{ helpfulReview.Helpful }}
            .col-3.color-base11.font-weight-bold(v-if="helpfulReview.Recommend") Would Recommend
            .col-3.color-base8.font-weight-bold(v-else) Would NOT Recommend
                  

</div>

</template>

<script>
import axios from "axios"
import NavBar from "@/components/NavBar.vue"
import Chart from "@/components/Chart.vue"
import colorConfig from "../../static/js/colorSetup.js"

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
      helpfulReview: {},
      rgbaColors: []
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
        const [up, ip, ir, io, iu, irec, gt, fr, hr] = result
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
      this.rgbaColors = colorConfig.getRbgColorsBetween(8, 15)
        .map(i => colorConfig.rgbToRgbaString(i, .7))
      this.charts = [
        this.loadGameGenres(),
        this.loadTopGames(),
        this.loadMostRecommended(),
      ]
    },
    loadGameGenres(){
      var genres = this.genreTotals.slice(0, 7).sort(function() {
        return .5 - Math.random();
      })
      return {
        name: "GameGenres",
        data: {
          labels: genres.map(i => i.Name),
          datasets: [{
            label: 'All Games by Top 7 Genres',
            data: genres.map(i => i.Totals),
            backgroundColor: this.rgbaColors
          }]
        }
      }
    },
    loadTopGames(){
      return {
        name: "OverallTopGames",
        data:  {
          labels: this.top10.items.playtime.map(i => i.Name),
          datasets: [{
            label: "Playtime",
            data: this.top10.items.playtime.map(i => i.Value),
            backgroundColor: this.rgbaColors 
          }]
        }
      }
    },
    loadMostRecommended(){
      console.log(this.top10.items.recommended)
      return {
        name: "MostRecoOverall",
        data: {
          labels: this.top10.items.recommended.map(i => i.Name),
          datasets: [{
            label: "Recommendations",
            data: this.top10.items.recommended.map(i => i.Recommended),
            backgroundColor: this.rgbaColors 
          }]
        }
      }
    },
  },
  created(){
    this.loadData()
  }
}
</script>

