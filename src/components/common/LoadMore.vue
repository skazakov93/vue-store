<template>
  <div class="load-more">
    <q-btn
      color="primary"
      label="Load More"
      @click="loadMore"
    />
  </div>
</template>

<script>
  export default {
    name: "LoadMore",
    
    methods: {
      loadMore() {
        this.$emit('loadMore');
      }
    }
  }
</script>

<style lang="scss">
  @import "LoadMore";
</style>
