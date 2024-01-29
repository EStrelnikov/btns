<template>
  <div
      class="dialog fixed flex top-0 left-0 right-0 bottom-0"
      v-if="$store.state.popupModule.popupResultVisible"
  >
    <div
        class="dialog__content flex flex-col m-auto bg-white rounded-lg p-5 max-h-screen overflow-x-auto"
        @click.stop
    >
      <div class="flex-auto" v-html="$store.state.popupModule.result"></div>
      <reusable-button @click="hidePopup" class="self-end">ок</reusable-button>
    </div>
  </div>
</template>

<script>
import ReusableButton from "./ReusableButton.vue";

export default {
  name: "popup-result",
  components: {ReusableButton},
  methods: {
    hidePopup() {
      debugger
      this.$store.commit('changePopupResultVisible', false)
    }
  }
}
</script>


<style scoped>
.dialog {
  background: rgba(0, 0, 0, 0.5);
}

.dialog__content {
  min-height: 300px;
  min-width: 300px;
}
</style>