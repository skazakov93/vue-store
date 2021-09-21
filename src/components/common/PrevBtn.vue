<template>
  <div class="prev-btn">
    <q-icon
      name="arrow_back_ios_new"
      size="3em"
      @click="onClick"
    />
  </div>
</template>

<script>
  export default {
    name: "PrevBtn",
    
    methods: {
      onClick() {
        this.$emit('click');
      }
    }
  }
</script>

<style lang="scss">
  @import "PrevBtn";
</style>
