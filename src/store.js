import Vue from 'vue'
import Vuex from 'vuex'
import kunjungan from '@/components/app/kunjungan/store'

Vue.use(Vuex)

export default new Vuex.Store({
  namespaced: true,
  modules: {
    kunjungan
  }
})
