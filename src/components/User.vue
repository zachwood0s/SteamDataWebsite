<template lang="pug">
  div
    NavBar
    .container
      .row.mt-5
        h1.color-base1.font-weight-bold {{username}}
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

</template>

<script>
import NavBar from './NavBar.vue'
export default {
  name: 'User',
  components: {
    NavBar
  },
  data () {
    return {
      username: this.$route.params.username
    }
  }
}
</script>

