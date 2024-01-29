import { createStore } from "vuex"
import {popupModule} from "./popupModule.js";

export  default  createStore({
    modules: {
        popupModule: popupModule
    }
});