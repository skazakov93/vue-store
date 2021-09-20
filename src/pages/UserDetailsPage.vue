<template>
  <div class="user-details-page">
    <h2>User Details</h2>
  </div>
</template>

<script>
  export default {
    name: "UserDetailsPage",
    
    props: {
      userId: {
        type: String,
        required: true
      }
    },

    data:() => ({
      
    }),

    methods: {

    },

    created() {
      
    }
  }
</script>

<style lang="scss">
  @import "UserDetailsPage";
</style>
