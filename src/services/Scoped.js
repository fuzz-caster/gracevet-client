import { Axios } from './Axios'

const RekamMedik = {
  getHasilLab (id) {
    return Axios.get(`rekam-medik/api_dao_rekam_medik.php?command=hasil_lab&id=${id}`)
      .then(resp => resp.data)
      .then(list => {
        return list.map(it => {
          it.struktur = JSON.parse(it.struktur)
          return it
        })
      })
  },
  setHasilLab (id, data) {
    return Axios.post(`rekam-medik/api_dao_rekam_medik.php?command=hasil_lab&id=${id}`, data)
  }
}

export default {
  RekamMedik
}
