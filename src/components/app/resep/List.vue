<template>
  <div>

    <v-container fluid class="pa-0">
      <v-layout row class="info-row">

        <v-flex md4>
          <v-card flat class="mx-0" dark color="blue darken-2">
            <v-card-text>
              <v-layout row align-center>
                <div class="title text-md-center my-2">
                  {{ pemilik.nama }}
                </div>
                <v-divider vertical class="mx-2"/>
                <v-layout column justify-center class="py-2">
                  <v-chip small>
                    {{ pemilik.alamat }}
                  </v-chip>
                  <v-chip small>
                    {{ pemilik.no_telp }}
                  </v-chip>
                </v-layout>
              </v-layout>
            </v-card-text>
          </v-card>
        </v-flex>

        <v-flex md4>
          <v-card flat class="mx-0" dark color="blue darken-3">
            <v-card-text>
              <v-layout row align-center>
                <div class="title text-md-center my-2">
                  {{ pasien.nama }}
                </div>
                <v-divider vertical class="mx-2"/>
                <v-layout column justify-center class="py-2">
                  <v-chip small>
                    {{ pasien.ras_nama }}
                  </v-chip>
                  <v-chip small>
                    {{ pasien.jh_nama }}
                  </v-chip>
                </v-layout>
              </v-layout>
            </v-card-text>
          </v-card>
        </v-flex>

        <v-flex md4>
          <v-card flat class="mx-0" dark color="blue darken-2">
            <v-card-text>
              <v-layout row align-center>
                <div class="title text-md-center my-2 white--text">
                  {{ rekam_medik.norek }}
                </div>
                <v-divider vertical class="mx-2"/>
                <v-layout column justify-center class="py-2">
                  <v-chip small>
                    {{ rekam_medik.tipe_norek }}
                  </v-chip>
                  <v-chip small>
                    {{ formatDate(rekam_medik.tanggal) }}
                  </v-chip>
                </v-layout>
              </v-layout>
            </v-card-text>
          </v-card>
        </v-flex>

      </v-layout>
    </v-container>

    <loading-view v-if="state == 'loading'"/>
    <error-view v-if="state == 'error'" @reload="reload"
      :message="errorMessage"/>
    <success-view v-if="state == 'success'"
      :message="successMessage"
      :actions="successActions"/>

    <add-form @save="addDialog = false; onSaveNew($event)"/>

    <div v-if="state == 'idle'">
      <v-toolbar flat dark color="cyan darken-1">
        <v-toolbar-title class="title">
          Data Resep
        </v-toolbar-title>
        <v-spacer/>
        <v-btn small dark color="primary" @click="addDialog = true">
          Tambah
        </v-btn>
      </v-toolbar>
      <v-container fluid>
        <v-data-table
          :headers="headers"
          :items="items"
        >
        </v-data-table>
      </v-container>
    </div>
  </div>
</template>
<script>
import moment from 'moment'
import Services from '@/services'
import AddForm from './AddForm'
import ErrorView from '@/components/app/commons/ErrorView'
import SuccessView from '@/components/app/commons/SuccessView'
import LoadingView from '@/components/app/commons/LoadingView'

export default {
  props: ['id'],
  components: {
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
      headers: [
        {
          text: 'nama',
          value: 'nama'
        },
        {
          text: 'satuan',
          value: 'satuan'
        },
        {
          text: 'harga',
          value: 'harga'
        },
        {
          text: 'Jumlah',
          value: 'jumlah'
        }
      ],
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
  }
}
</script>

<style>
  .info-row .v-card {
    border-radius: 0;
  }
</style>
