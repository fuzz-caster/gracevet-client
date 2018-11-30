// eslint-disable
const rekamMedik = {
  norek: '',
  tipe_norek: '',
  penyakit_id: null,
  tanggal: '',
  waktu: '',
  berat: 0,
  freq_n: 0,
  freq_p: 0,
  freq_t: 0,
  mth: '',
  mulut: '',
  kul_rambut: '',
  kelenjar_limfe: '',
  pernapasan: '',
  peredaran_darah: '',
  pencernaan: '',
  kelamin_perkencingan: '',
  ang_gerak: '',
  diagnosa: '',
  prognosis: '',
  terapi: ''
}

const pemilik = {
  nama: '',
  alamat: '',
  // eslint-disable-next-line
  no_telp: ''
}

const pasien = {
  nama: '',
  jk: 1,
  signalemen: '',
  lahir: '',
  id_ras: null
}

const defItem = {
  pemilikId: null,
  pasienId: null,
  penyakitId: null,
  pemilik,
  pasien,
  rekamMedik,
  hasilLab: [],
  penKhusus: []
}

export const validations = {
  rekamMedik (p) {
    return !!p.tanggal && !!p.waktu
  },
  isValid (x) {
    return !!x.pemilikId && !!x.pasienId && !!x.penyakitId && this.rekamMedik(x.rekamMedik)
  },
  isValidMember (x) {
    return this.pemilikId !== null && this.pasienId !== null && this.rekamMedik(x.rekamMedik)
  }
}

export const fDefItem = () => JSON.parse(JSON.stringify(defItem))
