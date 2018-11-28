import Vue from 'vue'
import PasienBaru from './PasienBaru'
import PemilikBaru from './PemilikBaru'
import PemilikMember from './PemilikMember'
import HasilLab from './HasilLab'
import RekamMedik from './RekamMedik'
import PenKhusus from './PenKhusus'
import SimpleAutoComplete from './SimpleAutoComplete'
import Service from '@/services'
import Step1 from './Step1'

const PasienMember = Vue.component('pasien-member', {
  data () {
    return {
      name: 'Pasien',
      f: Service.Pasien.list
    }
  },
  methods: {
    save (o) {
      this.$store.commit('kunjungan/pasienId', o.id)
    }
  },
  components: {
    SimpleAutoComplete
  },
  template: `
    <div>
      <simple-auto-complete :name="name" :f="f" @save="save" />
    </div>
  `
})

export default [
  {
    path: 'paspem',
    component: Step1
  },
  {
    path: 'baru/pemilik',
    component: PemilikBaru
  },
  {
    path: 'baru/pasien',
    component: PasienBaru
  },
  {
    path: 'member/pemilik',
    component: PemilikMember
  },
  {
    path: 'member/pasien',
    component: PasienMember
  },
  {
    path: 'hasillab',
    component: HasilLab
  },
  {
    path: 'rekammedik',
    component: RekamMedik
  },
  {
    path: 'penkhusus',
    component: PenKhusus
  }
]
