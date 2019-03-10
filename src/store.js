import Vue from 'vue'
import Vuex from 'vuex'
import People from './views/People/Module'
import Commerce from './views/Commerce/Module'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    People, Commerce
  },
})
