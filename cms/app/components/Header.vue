<template>
  <a class="navbar-item" @click="logout">Logout</a>
</template>

<script>
  export default {
    methods: {
      async logout() {
        await this.$auth.logout();
      },
    },
  }
</script>