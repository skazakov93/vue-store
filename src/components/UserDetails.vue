<template>
  <div class="user-details">
    <div class="image">
      <img :src="user.avatar" />
    </div>

    <div class="info">
      <div class="name">
        {{user.name}}
      </div>

      <div class="email">
        E-mail: {{user.email}}
      </div>

      <div class="text">
        {{user.motivationLetter}}
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "UserDetails",
    props: {
      user: {
        type: Object,
        required: true
      }
    }
  }
</script>

<style lang="scss">
  @import "UserDetails";
</style>
