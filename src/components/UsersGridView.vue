<template>
  <div class="users-grid-view">
    <div
      class="card"
      v-for="user in users"
      :key="user.id"
      @click="onUserClick(user.id)"
    >
      <div class="avatar">
        <img :src="user.avatar" />
      </div>

      <div class="name">
        {{user.name}}
      </div>

      <div class="email">
        {{user.email}}
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "UsersGridView",
    props: {
      users: {
        type: Array,
        required: true
      }
    },

    methods: {
      onUserClick(userId) {
        this.$emit('click', userId);
      }
    }
  }
</script>

<style lang="scss">
  @import "UsersGridView";
</style>
