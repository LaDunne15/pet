import { createStore } from 'vuex'
const store = createStore({
    state () {
      return {
        token: "1"
      }
    },
    mutations: {
      savetoken (state,t) {
        state.token = t
      }
    }
})
export default store