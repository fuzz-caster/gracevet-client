import { fDefItem, validations } from './defItem'

const state = {
  ...(fDefItem())
}

const mutations = {
  rekamMedik (state, rekamMedik) {
    state.rekamMedik = rekamMedik
  },
  pemilik (state, pemilik) {
    state.pemilik = pemilik
  },
  pasien (state, pasien) {
    state.pasien = pasien
  },
  hasilLab (state, hasilLab) {
    state.hasilLab = hasilLab
  },
  penKhusus (state, penKhusus) {
    state.penKhusus = penKhusus
  },
  clear (state) {
    state = fDefItem()
  },
  pemilikId (state, id) {
    state.pemilikId = id
  },
  pasienId (state, id) {
    state.pasienId = id
  },
  step1 (state, { pemilikId, pasienId, penyakitId }) {
    state.pasienId = pasienId
    state.pemilikId = pemilikId
    state.penyakitId = penyakitId
  }
}

const getters = {
  isValid: state => {
    return validations.isValid(state)
  },
  isValidMember: state => {
    return validations.isValidMember(state)
  }
}

export default {
  state,
  mutations,
  getters,
  namespaced: true
}
