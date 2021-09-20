<template>
  <div class="sort">
    <q-select
      outlined
      :label="label" 
      :value="value"
      :options="options"
      @input="onInput"
    />
  </div>
</template>

<script>
  export default {
    name: "Sort",
    props: {
      value: {
        type: Object,
        required: true
      },
      options: {
        type: Array,
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
  @import "Sort";
</style>
