<template>
  <div class="flex gap-2 flex-wrap">
    <reusable-button
        city="1"
        @click="showDialog"
    >
      Заказать в Москву
    </reusable-button>
    <reusable-button
        city="2"
        class="bg-sky-700 hover:bg-sky-500"
        @click="showDialog"
    >
      Заказать в Санкт-Петербург
    </reusable-button>
  </div>
</template>

<script>
export default {
  name: "order-btns",
  data() {
    return {

    }
  },
  methods: {
    showDialog(e) {
      const city = e.target.getAttribute('city');
      this.$store.commit('changeSelectedCity', Number(city));
      this.$store.commit('changePopupFormVisible', true)
    }
  }
}
</script>

<style scoped>

</style>