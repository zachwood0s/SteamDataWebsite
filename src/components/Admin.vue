<template>
  <div>
    <NavBar/>
    	<form action="" method="POST" id="login">
            <div>
                <label for="email">Email:</label>
                <input type="text" id="email" name="email">
            </div>
            <div>
                <label for="password">Password:</label>
                <input type="password" id="password" name="password">
            </div>
            <button type="submit" form="login" value="Submit">Login</button>
        </form>
  </div>
</template>

<script>
import NavBar from "@/components/NavBar.vue"
export default {
  name: "Main",
  components: {
    NavBar
  }
}
</script>