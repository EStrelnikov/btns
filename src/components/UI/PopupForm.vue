<template>
  <div
      class="dialog fixed flex top-0 left-0 right-0 bottom-0"
      v-if="show"
      @click="hidePopup"
  >
    <div
        class="dialog__content m-auto bg-white rounded-lg p-5 max-h-screen overflow-x-auto"
        @click.stop
    >
      <h1 class="font-bold text-xl mb-5">Данные:</h1>
      <form
          class="flex flex-col gap-6"
          @submit="submitForm"
      >
        <div class="">
          <label class="block" for="form_name">Имя:</label>
          <input
              placeholder="Введите имя..."
              class="w-full border-2 p-2 rounded-lg"
              name="form_name"
              type="text"
              id="form_name"
              v-model="state.name"
          >
          <span v-if="this.v$.name.$error" class="block text-red-600">Обязательное поле</span>
        </div>
        <div class="recipient__form__box form__tel">
          <label class="form__box__label block" for="form_tel">Телефон:</label>
          <input
              v-model="state.phone"
              placeholder="+79998887711"
              name="form_tel"
              id="form_tel"
              type="tel"
              class="w-full border-2 p-2 rounded-lg"

          >
          <span v-if="this.v$.phone.$error" class="block text-red-600">Обязательное поле</span>

        </div>
        <div class="">
          <label class="block" for="form_mail">Email:</label>
          <input
              placeholder="email..."
              class="w-full border-2 p-2 rounded-lg"
              name="form_mail"
              id="form_mail"
              type="text"

              v-model="state.email"
          >
          <span v-if="this.v$.email.$error" class="block text-red-600">Обязательное поле</span>
        </div>

        <div class="">
          <label class="block" for="form_city">Город</label>
          <select
              class="border-2 p-2 w-full rounded-lg"
              id="form_city"
              :value="this.$store.state.popupModule.selectedCity"
              @change="changeCity"

          >
            <option
                selected="$store.state.popupModule.selectedCity"
                v-for="city in cities"
                :value="city.id"
                :key="city.id"
            >
              {{ city.name }}
            </option>
          </select>
        </div>
        <div class="flex justify-end items-center">
          <span v-if="this.loading" class="block loader"></span>

          <reusable-button class="ml-2">Отправить</reusable-button>
        </div>

      </form>
    </div>
  </div>

</template>

<script>
import axios from 'axios';
import ReusableButton from "./ReusableButton.vue";
import popupResult from "./PopupResult.vue";
import { useVuelidate } from '@vuelidate/core'
import { required, email, minLength  } from '@vuelidate/validators'
import { reactive, computed } from 'vue'
export default {
  name: "popup-form",
  components: {
    ReusableButton,popupResult
  },
  setup: function () {
    const state = reactive({
        name: "",
        phone: "",
        email: ""
    })

    const checkedPhoneNumber = (value) => /(\+7)[\s(]?(\d{3})[\s)]?(\d{3})[\s-]?(\d{2})[\s-]?(\d{2})/g.test(value);

    const rules = computed(() => {
      return {
          name: {required, minLength: minLength(5)},
          phone: {required, checkedPhoneNumber},
          email: {required, email}
      }
    })

    const v$ = useVuelidate(rules, state)
    return {
      state,
      v$
    }
  },
  data() {
    return  {
      v$: useVuelidate(),
      name: "",
      phone: "",
      email: "",
      loading: false
    }
  },
  props: {
    show: {
      type: Boolean,
      default: false
    },
    cities: {
      type: Array,
      default: [
        {
          id: 1,
          name: "Москва"
        },
        {
          id: 2,
          name: "Санкт-Петербург"
        },
        {
          id: 3,
          name: "Казань"
        },
      ]
    }
  },
  methods: {
    hidePopup() {
      this.$store.commit('changePopupFormVisible', false)
    },
    changeCity(e) {
      this.$store.commit('changeSelectedCity', Number(e.target.value));
    },
    async submitForm(e) {
      e.preventDefault()
      this.v$.$validate();
      if (!this.v$.$error) {
        this.loading = true;
        try {
          const { data } = await axios.post('http://hh.autodrive-agency.ru/test-tasks/front/task-7/', {
            name: this.state.name,
            phone: this.state.phone,
            email: this.state.email,
            city_id: this.$store.state.popupModule.selectedCity
          })
          debugger
          this.$store.commit('changeResult', data)
          this.state.name = "";
          this.state.phone = "";
          this.state.email = "";
        } catch (e) {
          console.error(e)
          debugger
          const { data } = e.response
          this.$store.commit('changeResult', data);
        } finally {
          this.loading = false;
          // this.$store.commit('changePopupFormVisible', false);
          this.$store.commit('changePopupResultVisible', true);
        }
      }
    }
  }
}
</script>

<style scoped>
  .dialog {
    background: rgba(0, 0, 0, 0.5);
  }

  .dialog__content {
    min-height: 400px;
    min-width: 400px;
  }

  .loader {
    width: 28px;
    height: 28px;
    border: 5px solid #000000;
    border-bottom-color: #FF3D00;
    border-radius: 50%;
    display: inline-block;
    box-sizing: border-box;
    animation: rotation 1s linear infinite;
  }

  @keyframes rotation {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
</style>