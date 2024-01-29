<template>
  <div class="m-auto max-w-7xl py-4">
    <order-btns></order-btns>
    <popup-form
        v-model:show="$store.state.popupModule.popupFormVisible"
    >
    </popup-form>
    <popup-result></popup-result>
  </div>
</template>

<script>
import orderBtns from "./components/OrderBtns.vue";
import PopupResult from "./components/UI/PopupResult.vue";
export default {
  components: {
    PopupResult,
    orderBtns
  },
  data() {

    return {

    }
  }
}
</script>

<style scoped>

</style>
