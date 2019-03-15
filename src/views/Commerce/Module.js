import { READ_COMMERCE_DATA } from '@/views/Commerce/Module'
import { SAVE_COMMERCE_DATA } from '@/views/Commerce/Module'

const state = {
  commerceDate: [
    {
      day: '22/01/2019',
      visit: 34,
      visitors: 28,
      views: 111
    },
    {
      day: '23/01/2019',
      visit: 22,
      visitors: 20,
      views: 89
    },
    {
      day: '24/01/2019',
      visit: 60,
      visitors: 50,
      views: 170
    },
    {
      day: '25/01/2019',
      visit: 52,
      visitors: 45,
      views: 120
    },
    {
      day: '26/01/2019',
      visit: 42,
      visitors: 36,
      views: 97
    }
  ]
}

const mutations = {
  [SAVE_COMMERCE_DATA] (state, payload) {
    state.peoplesData = payload
  }
}

const getters = {
  [READ_COMMERCE_DATA]: state => state.commerceDate
}

export default {
  state,
  getters,
  mutations
}
