import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './action'
import session from './session'


Vue.use(Vuex)

const state = {
  stateRoute: "home",
  linkUrl: "",
  linkName: ""
}




export default new Vuex.Store({
  state,
  actions,
  mutations,
  session
})
