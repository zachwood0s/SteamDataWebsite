<template>
  <nav class="font-weight-bold ft-medium navbar bg-base0">
    <a class="navbar-brand color-base7 text-lg font-weight-bold" href="#">
      <span class="color-base8">Git</span>Steam'd
    </a>

    <ul class="nav ml-auto mt-lg-0">
      <li class="nav-item active">
        <a
          class="nav-link color-base7 h-bg-base6 h-color-base2"
          v-on:click="setActive('Users')"
          href="#"
        >Users</a>
      </li>
      <li class="nav-item active">
        <a
          class="nav-link color-base7 h-bg-base6 h-color-base2"
          v-on:click="setActive('Games')"
          href="#"
        >Games</a>
      </li>
    </ul>
  </nav>
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
