<template>
  <router-view/>
</template>

<script>
import colors from "../static/js/colorSetup.js"
export default {
  name: 'App',
  beforeCreate(){
    colors.createCssColors()
  }
}
</script>

<style>
</style>
