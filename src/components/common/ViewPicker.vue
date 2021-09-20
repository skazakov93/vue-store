<template>
  <div class="view-picker">
    <q-icon
      name="view_list"
      size="2em"
      :class="{selected: isSelected('list')}"
      @click="onListViewClick"
    />

    <q-icon
      name="grid_view"
      size="2em"
      :class="{selected: isSelected('grid')}"
      @click="onGridViewClick"
    />
  </div>
</template>

<script>
  export default {
    name: "ViewPicker",
    props: {
      value: {
        type: String,
        required: true
      }
    },

    methods: {
      isSelected(type) {
        return type === this.value;
      },
      onGridViewClick() {
        this.$emit('select', 'grid');
      },
      onListViewClick() {
        this.$emit('select', 'list');
      }
    }
  }
</script>

<style lang="scss">
  @import "ViewPicker";
</style>
