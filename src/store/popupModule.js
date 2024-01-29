export  const  popupModule = {
    state: () => ({
        popupFormVisible: false,
        popupResultVisible: false,
        selectedCity: 1,
        result: "<div class=\"w-full space-x-4\">Результат</div>"
    }),
    getters: {

    },
    mutations: {
        changePopupFormVisible(state, value) {
            state.popupFormVisible = value;
        },
        changeSelectedCity(state, value) {
            state.selectedCity = value
        },
        changePopupResultVisible(state, value) {
            state.popupResultVisible = value;
        },
        changeResult(state, value) {
            state.result = value;
        }
    },
    actions: {

    }
}