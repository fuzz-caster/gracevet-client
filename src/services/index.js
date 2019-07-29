import { Axios } from './Axios'
import { ServiceFactory, OptionsFactory, Kunjungan } from './ServiceFactory'
import moment from 'moment'

function kunjTerakhirFormatter (t) {
  let x = moment(t.kunj_terakhir)
  let z = ''
  let y = ''
  if (t.kunj_terakhir === null || x.isValid() === false) {
    x = '--'
  } else {
    z = x.format('MMMM D YYYY, h:mm a')
    y = x.fromNow()
  }
  let result = Object.assign({}, t, {
    kunj_terakhir: z,
    elapsed: y
  })
  return result
}

function tanggalFormatter (t) {
  let x = moment(t.tanggal)
  let z = x.format('DD-MM-YYYY, hh:mm a')
  console.log('z is ', z)
  let y = x.fromNow()
  let result = Object.assign({}, t, {
    tanggal: z,
    elapsed: y
  })
  return result
}

function penggunaanTerakhirMapper (t) {
  let x = moment(t.penggunaan_terakhir)
  let z = ''
  let y = ''
  if (t.penggunaan_terakhir === null || x.isValid() === false) {
    x = '--'
  } else {
    z = x.format('MMMM D YYYY, h:mm a')
    y = x.fromNow()
  }
  let result = Object.assign({}, t, {
    penggunaan_terakhir: z,
    elapsed: y
  })
  return result
}

const Services = {
  JenisHewan: ServiceFactory('jenis-hewan/api_dao_jenis_hewan.php', 'jenis_hewan', kunjTerakhirFormatter),
  Ras: ServiceFactory('ras/api_dao_ras.php', 'ras', kunjTerakhirFormatter),
  Pemilik: ServiceFactory('pemilik/api_dao_pemilik.php', 'pemilik', kunjTerakhirFormatter),
  Penyakit: ServiceFactory('penyakit/api_dao_penyakit.php', 'penyakit', kunjTerakhirFormatter),
  RekamMedik: ServiceFactory('rekam-medik/api_dao_rekam_medik.php', 'rekam_medik', tanggalFormatter),
  Pasien: ServiceFactory('pasien/api_dao_pasien.php', 'pasien', kunjTerakhirFormatter),
  PenKhusus: ServiceFactory('tipe-pen-khusus/api_dao_tipe_pen_khusus.php', 'tipe_pen_khusus', penggunaanTerakhirMapper),
  HasilLab: ServiceFactory('tipe-hasil-lab/api_dao_tipe_hasil_lab.php', 'tipe_hasil_lab', penggunaanTerakhirMapper),
  Options: OptionsFactory(),
  Kunjungan
}

const Custom = {
  async rekamMedikFlatten (id) {
    console.log(Services)
    let rm = await Services.RekamMedik.getById(id)
    let pasien = await Services.Pasien.getById(rm.pasien_id)
    let pemilik = await Services.Pemilik.getById(rm.pemilik_id)
    return {
      rekam_medik: rm,
      pasien,
      pemilik
    }
  },
  async addPerawatan (idRm, item) {
    let x = item
    x.waktu = item.tanggal + ' ' + item.waktu
    let payload = {
      rm_id: idRm,
      ...x
    }
    return Axios.post(`/perawatan/index.php?command=add`, payload)
  },

  async getPerawatan (idRm) {
    return Axios.get(`/perawatan/index.php?command=load_by_rm&rm_id=${idRm}`)
      .then(resp => resp.data)
  },

  tambahTipe1 ({ pemilik, pasien }) {
    let url = `/kunjungan/tambah.php?command=PasienBaruPemilikBaru`
    return Axios.post(url, { pemilik, pasien }).then(resp => resp.data)
  },

  tambahTipe2 ({ pemilik, pasien_id }) {
    let url = `/kunjungan/tambah.php?command=PasienLamaPemilikBaru`
    return Axios.post(url, { pemilik, pasien_id }).then(resp => resp.data)
  },

  tambahTipe3 ({ pemilik_id, pasien }) {
    let url = `/kunjungan/tambah.php?command=PasienBaruPemilikLama`
    return Axios.post(url, { pemilik_id, pasien }).then(resp => resp.data)
  },

  tambahTipe4 ({ pemilik_id, pasien_id }) {
    let url = `/kunjungan/tambah.php?command=PasienLamaPemilikLama`
    return Axios.post(url, { pemilik_id, pasien_id }).then(resp => resp.data)
  },

  removePerawatan (id) {
    return Axios.get(`/perawatan/index.php?command=delete&id=${id}`)
  },
  async newRekamMedikId () {
    return Axios.get(`/extra/newNorek.php`).then(resp => resp.data).then(it => it.new_norek)
  },
  summary () {
    return Axios.get(`/extra/summary.php`).then(resp => resp.data)
  }
}

export default {
  ...Services,
  Custom
}
