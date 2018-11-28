import HasilLab from './HasilLab'
import RekamMedik from './RekamMedik'
import PenKhusus from './PenKhusus'
import Step1 from './Step1'

export default [
  {
    path: 'paspem',
    component: Step1
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
