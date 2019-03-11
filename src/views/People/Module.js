import axios from 'axios'
import { DATA_TABLE, TRANSFER_DATA } from '../../config'

export const SAVE_PEOPLE_DATA = 'People/SAVE_PEOPLE_DATA'
export const READ_PEOPLE_DATA = 'People/READ_PEOPLE_DATA'
export const FETCH_PEOPLE_DATA = 'People/FETCH_PEOPLE_DATA'
export const TRANSFER_PEOPLE_DATA = 'People/TRANSFER_PEOPLE_DATA'

const state = {
  peoplesData: []
}

const getters = {
  [READ_PEOPLE_DATA]: state => state.peoplesData
}

const mutations = {
  [SAVE_PEOPLE_DATA] (state, payload) {
    state.peoplesData = payload
  }
}

const actions = {
  async [FETCH_PEOPLE_DATA] ({ commit }) {
    try {
      const { data } = await axios.get(DATA_TABLE)
      commit(SAVE_PEOPLE_DATA, data)
    } catch (e) {
      console.log(e)
    }
  },
  async [TRANSFER_PEOPLE_DATA] (payload) {
    try {
      await axios.post(TRANSFER_DATA, payload, { headers: { 'Content-Type': 'application/json', mode: 'no-cors' } })
    } catch (e) {
      console.log(e)
    }
  }
}

export default {
  state,
  getters,
  mutations,
  actions,
}
