<template>
  <div class="search">
    <q-input
      outlined 
      type="text"
      debounce="300"
      :label="label"
      :value="value"
      @input="onInput"
    />
  </div>
</template>

<script>
  export default {
    name: "Search",
    props: {
      value: {
        type: String,
        required: true
      },
      label: {
        type: String,
        required: true
      }
    },

    methods: {
      onInput(val) {
        this.$emit('input', val);
      }
    }
  }
</script>

<style lang="scss">
  @import "Search";
</style>
