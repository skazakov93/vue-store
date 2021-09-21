<template>
  <div class="next-btn">
    <q-icon
      name="arrow_forward_ios"
      size="3em"
      @click="onClick"
    />
  </div>
</template>

<script>
  export default {
    name: "NextBtn",
    
    methods: {
      onClick() {
        this.$emit('click');
      }
    }
  }
</script>

<style lang="scss">
  @import "NextBtn";
</style>
