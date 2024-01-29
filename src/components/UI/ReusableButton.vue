<template>
  <button
      class="p-3.5 rounded-md bg-green-600 hover:bg-green-500 hover:shadow-md duration-300 text-white"
  >
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: "reusable-button",
  props: {
    type: {
      default: "submit"
    }
  }
}
</script>

<style scoped>

</style>