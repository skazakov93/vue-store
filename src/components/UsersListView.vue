<template>
  <div class="users-list-view">
    <div
      class="list"
      v-for="user in users"
      :key="user.id"
      @click="onUserClick(user.id)"
    >
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
    name: "UsersListView",
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
  @import "UsersListView";
</style>
