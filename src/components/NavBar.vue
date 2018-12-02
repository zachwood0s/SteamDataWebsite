<template lang="pug">
  nav.font-weight-bold.ft-medium.navbar.bg-base0
    router-link.navbar-brand.color-base7.text-lg.font-weight-bold(:to="{path: '/'}")
      span.color-base8 Git
      span Steam'd
    ul.nav.ml-auto.mt-lg-0
      li.nav-item.active
        router-link.nav-link.color-base7.h-bg-base6.h-color-base2(
          :to="{path: '/userSearch'}"
        ) Users
      li.nav-item.active
        router-link.nav-link.color-base7.h-bg-base6.h-color-base2(
          :to="{path: '/gameSearch'}"
        ) Games
      li.nav-item.active
        router-link.nav-link.color-base7.h-bg-base6.h-color-base2(
          :to="{path: '/'}"
        ) Bundles
</template>

<script>
export default {
  name: 'NavBar',
  methods: {
    setActive (option) {
      this.$parent.$parent.isactive = option
    }
  }
}
</script>
