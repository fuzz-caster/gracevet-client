import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/SayHello'
import App from '@/components/app/App'
import Dashboard from '@/components/app/Dashboard'
import RekamMedikList from '@/components/app/rekam-medik/List'
import RekamMedikDetail from '@/components/app/rekam-medik/Detail'
import EditRekamMedik from '@/components/app/rekam-medik/EditRekamMedik'
import EditHasilLab from '@/components/app/rekam-medik/EditHasilLab'
import EditPenKhusus from '@/components/app/rekam-medik/EditPenKhusus'
import PenyakitList from '@/components/app/penyakit/List'
import JenisHewanList from '@/components/app/jenis-hewan/List'
import RasList from '@/components/app/ras/List'
import PemilikList from '@/components/app/pemilik/List'
import PenKhususList from '@/components/app/pen-khusus/List'
import PasienList from '@/components/app/pasien/List'
import HasilLabList from '@/components/app/hasil-lab/List'
import HasilLabEdit from '@/components/app/hasil-lab/EditForm'
import Login from '@/components/auth/Login'
import PemilikAddEditor from '@/components/app/commons/add-form/PemilikAddForm'
import PasienAddEditor from '@/components/app/commons/add-form/PasienAddForm'
import PenyakitAddEditor from '@/components/app/commons/add-form/PenyakitAddForm'
import RasAddEditor from '@/components/app/commons/add-form/RasAddForm'
import PenKhususAddEditor from '@/components/app/commons/add-form/PenKhususAddForm'
import JenisHewanAddEditor from '@/components/app/commons/add-form/JenisHewanAddForm'
import TambahKunjungan from '@/components/app/kunjungan/Main'
import { updateFormRoutes } from '@/components/app/commons/add-form/update-forms'
import kunjunganRoutes from '@/components/app/kunjungan/routes'
import RmPerawatanList from '@/components/app/perawatan/List'
import Tipe1 from '@/components/app/rekam-medik/tambah/Tipe1'
import Tipe2 from '@/components/app/rekam-medik/tambah/Tipe2'
import Tipe3 from '@/components/app/rekam-medik/tambah/Tipe3'
import Tipe4 from '@/components/app/rekam-medik/tambah/Tipe4'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/auth',
      name: 'Login',
      component: Login
    },
    {
      path: '/app',
      name: 'App',
      component: App,
      redirect: 'dashboard',
      children: [
        {
          path: 'dashboard',
          name: 'Dashboard',
          component: Dashboard
        },
        {
          path: 'perawatan/rm/:id',
          props: true,
          component: RmPerawatanList
        },
        {
          path: 'rekammedik/list',
          name: 'RekamMedikList',
          component: RekamMedikList
        },
        {
          path: 'rekammedik/detail/:id',
          name: 'RekamMedikDetail',
          props: true,
          component: RekamMedikDetail
        },
        {
          path: 'rekammedik/update/rekammedik/:id',
          props: true,
          component: EditRekamMedik
        },
        {
          path: 'rekammedik/update/hasillab/:id',
          props: true,
          component: EditHasilLab
        },
        {
          path: 'rekammedik/tambah/PemilikBaruPasienBaru',
          component: Tipe1
        },
        {
          path: 'rekammedik/tambah/PemilikBaruPasienLama',
          component: Tipe2
        },
        {
          path: 'rekammedik/tambah/PemilikLamaPasienBaru',
          component: Tipe3
        },
        {
          path: 'rekammedik/tambah/PemilikLamaPasienLama',
          component: Tipe4
        },
        {
          path: 'rekammedik/update/penkhusus/:id',
          props: true,
          component: EditPenKhusus
        },
        {
          path: 'jenishewan/list',
          name: 'JenisHewanList',
          component: JenisHewanList
        },
        {
          path: 'ras/list',
          name: 'RasList',
          component: RasList
        },
        {
          path: 'penyakit/list',
          name: 'PenyakitList',
          component: PenyakitList
        },
        {
          path: 'pemilik/list',
          name: 'PemilikList',
          component: PemilikList
        },
        {
          path: 'pemilik/add',
          name: 'PemilikAdd',
          component: PemilikAddEditor
        },
        {
          path: 'pasien/add',
          name: 'PasienAdd',
          component: PasienAddEditor
        },
        {
          path: 'penyakit/add',
          name: 'PenyakitAdd',
          component: PenyakitAddEditor
        },
        {
          path: 'ras/add',
          name: 'RasAdd',
          component: RasAddEditor
        },
        {
          path: 'penkhusus/add',
          name: 'PenKhususAdd',
          component: PenKhususAddEditor
        },
        {
          path: 'jenishewan/add',
          name: 'JenisHewanKhususAdd',
          component: JenisHewanAddEditor
        },
        {
          path: 'pasien/list',
          name: 'PasienList',
          component: PasienList
        },
        {
          path: 'penkhusus/list',
          name: 'PenKhususList',
          component: PenKhususList
        },
        {
          path: 'hasillab/list',
          name: 'HasilLabList',
          component: HasilLabList
        },
        {
          path: 'hasillab/update/:id',
          props: true,
          component: HasilLabEdit
        },
        {
          path: 'kunjungan',
          name: 'TambahKunjungan',
          component: TambahKunjungan,
          children: kunjunganRoutes
        },
        ...updateFormRoutes
      ]
    }
  ]
})
