import Vue from "vue"
import Vuex from "vuex"

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    spaceInitTab: '',
    Authorization: localStorage.getItem('Authorization') ? localStorage.getItem('Authorization') : '',//验证码
  },
  mutations: {
    setSpaceInitTab(state, data) {
      state.spaceInitTab = data
    },
    // 修改token，并将token存入localStorage
    changeLogin (state, user) {
      state.Authorization = user.Authorization;
      localStorage.setItem('Authorization', user.Authorization);
    }
  }
})
export default store
