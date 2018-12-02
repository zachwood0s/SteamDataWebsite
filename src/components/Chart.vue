<template lang="pug">
  canvas.mx-auto(width="500" height="400" v-bind:style="customStyle")
</template>

<script>
import cl from "../chartLoader/chartloader.js"
export default {
  name: "Chart",
  props: ["name","data","customStyle"],
  mounted () {
    cl.loadChart(this.name, this.$el, this.data);
  } 
}
</script>

<style scoped>
  canvas{
    position: relative;
  }
</style>

