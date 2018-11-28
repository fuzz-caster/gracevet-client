import { ras, penyakit, jenisHewan, pemilik, pasien, penKhusus } from './structures'
import UpdateFormBase from './UpdateFormBase'
import Service from '@/services'
import Vue from 'vue'

const items = [
  {
    name: 'Ras',
    icon: 'paw',
    service: Service.Ras,
    structures: ras,
    path: 'ras/update/:id'
  },
  {
    name: 'Penyakit',
    icon: 'tablets',
    service: Service.Penyakit,
    structures: penyakit,
    path: 'penyakit/update/:id'
  },
  {
    name: 'JenisHewan',
    icon: 'paw',
    service: Service.JenisHewan,
    structures: jenisHewan,
    path: 'jenishewan/update/:id'
  },
  {
    name: 'Pemilik',
    icon: 'heart',
    service: Service.Pemilik,
    structures: pemilik,
    path: 'pemilik/update/:id'
  },
  {
    name: 'Pasien',
    icon: 'heartbeat',
    service: Service.Pasien,
    structures: pasien,
    path: 'pasien/update/:id'
  },
  {
    name: 'PenangananKhusus',
    icon: 'folder-open',
    service: Service.PenKhusus,
    structures: penKhusus,
    path: 'penkhusus/update/:id'
  }
]

export const updateFormRoutes = items.map(it => {
  let structures = it.structures
  let compName = it.name + 'UpdateEditor'
  let component = Vue.component(compName, {
    extends: UpdateFormBase,
    data () {
      return {
        name: it.name,
        icon: it.icon,
        structures,
        service: it.service
      }
    }
  })
  return {
    name: it.name + 'UpdateEditor',
    path: it.path,
    component,
    props: true
  }
})
