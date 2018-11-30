<template>
  <div>
    <v-dialog v-model="addDialog" max-width="500">
      <add-form @save="addDialog = false; onSaveNew($event)"/>
    </v-dialog>

    <loading-view v-if="state == 'loading'"/>
    <error-view v-if="state == 'error'" @reload="reload"
      :message="errorMessage"/>
    <success-view v-if="state == 'success'"
      :message="successMessage"
      :actions="successActions"/>

    <div v-if="state == 'idle'">
      <base-edit-form
        :valid="false"
        :id="id"/>

      <v-toolbar flat dark color="cyan darken-1">
        <v-toolbar-title class="body-1">
          Data Rawat Inap
        </v-toolbar-title>
        <v-spacer/>
        <v-btn small dark color="primary" @click="addDialog = true">
          Tambah
        </v-btn>
      </v-toolbar>
      <v-container fluid>
        <v-timeline
          align-top
          dense
        >
          <template v-for="(it, i) in items">
            <v-timeline-item
              color="blue"
              small
              v-if="it.tipe == 'RAWAT'"
              :key="i"
            >
              <v-layout pt-3>
                <v-flex xs2>
                  <div class="body-2">{{ it.tanggal }} / {{ it.waktu }}</div>
                  <div>{{ it.elapsed }}</div>
                </v-flex>
                <v-flex xs6>
                  <div class="body-1">{{ it.keterangan }}</div>
                </v-flex>
                <v-flex xs4>
                  <div class="body-1 pa-1 px-4">NxM: {{ it.nxm }}</div>
                  <v-divider/>
                  <div class="body-1 pa-1 px-4">PxM: {{ it.pxm }}</div>
                  <v-divider/>
                  <div class="body-1 pa-1 px-4">Toc: {{ it.toc }}</div>
                  <v-btn @click="onDelete(it.id)" block dark small flat color="red">Hapus</v-btn>
                </v-flex>
              </v-layout>
            </v-timeline-item>
            <v-timeline-item
              color="pink"
              small
              v-if="it.tipe == 'KELUAR'"
              :key="i"
            >
              <v-layout pt-3>
                <v-flex xs2>
                  <div class="body-2">{{ it.tanggal }} / {{ it.waktu }}</div>
                  <div>{{ it.elapsed }}</div>
                </v-flex>
                <v-flex xs6>
                  <div class="body-1">{{ it.keterangan }}</div>
                </v-flex>
              </v-layout>
            </v-timeline-item>
            <v-divider :key="'div' + i"/>
          </template>
        </v-timeline>
      </v-container>
    </div>
  </div>
</template>
<script>
import moment from 'moment'
import Services from '@/services'
import AddForm from './PerawatanAddForm'
import BaseEditForm from './BaseEditForm'
import ErrorView from '@/components/app/commons/ErrorView'
import SuccessView from '@/components/app/commons/SuccessView'
import LoadingView from '@/components/app/commons/LoadingView'

export default {
  props: ['id'],
  components: {
    BaseEditForm,
    LoadingView,
    ErrorView,
    SuccessView,
    AddForm
  },
  data () {
    return {
      pemilik: {
        id: null,
        nama: 'Jordan',
        alamat: 'oesapa',
        no_telp: '081234221092'
      },
      pasien: {
        id: null,
        nama: 'Foobar',
        jk: 1,
        lahir: '2017-10-10',
        format_jk: 'Jantan',
        ras_nama: 'Bulldog',
        jh_nama: 'Anjing'
      },
      rekam_medik: {
        id: null,
        tipe_norek: 'GC',
        norek: '129-002-002',
        tanggal: '2018-08-08 09:00:00'
      },
      addDialog: false,
      state: 'loading',
      errorMessage: '',
      successMessage: '',
      successActions: [
        {
          name: 'Ulangi',
          doIt: () => {
            this.reload()
            this.getPerawatanList()
          }
        }
      ],
      items: []
    }
  },
  methods: {
    formatDate (d) {
      return moment(d).fromNow()
    },
    reload () {
      this.state = 'loading'
      return Services.Custom.rekamMedikFlatten(this.id)
        .then(data => {
          this.pemilik = data.pemilik
          this.pasien = data.pasien
          this.rekam_medik = data.rekam_medik
          this.state = 'idle'
        })
        .catch(err => {
          console.log(err)
          this.state = 'error'
          throw err
        })
    },
    getPerawatanList () {
      this.state = 'loading'
      return Services.Custom.getPerawatan(this.id)
        .then(data => {
          this.items = data.map(it => {
            let x = moment(it.waktu)
            let tanggal = x.format('YYYY-MM-DD')
            let waktu = x.format('HH:mm')
            let elapsed = x.fromNow()
            return Object.assign({}, it, { tanggal, waktu, _moment: x, elapsed })
          })
          this.state = 'idle'
        })
        .catch(err => {
          console.log(err)
          this.state = 'error'
          throw err
        })
    },
    onSaveNew (item) {
      this.state = 'loading'
      Services.Custom.addPerawatan(this.id, item)
        .catch(err => {
          this.state = 'error'
          console.log(err)
        })
        .then(() => {
          this.state = 'success'
        })
    },
    onDelete (id) {
      this.state = 'loading'
      Services.Custom.removePerawatan(id)
        .catch(err => {
          console.log(err)
          this.state = 'error'
        })
        .then(() => {
          this.state = 'success'
        })
    }
  },
  mounted () {
    this.reload()
      .then(() => this.getPerawatanList())
  }
}
</script>

<style>
  .info-row .v-card {
    border-radius: 0;
  }
</style>
