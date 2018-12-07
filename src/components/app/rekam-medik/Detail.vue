<template>
  <div>
    <v-toolbar app dark color="teal darken-1" flat>
      <v-toolbar-title class="headline font-weight-bold">
        #{{ pasien.tipe_norek }}-{{ pasien.norek }}
      </v-toolbar-title>
      <v-spacer/>
      <v-toolbar-items>
        <v-btn
          @click="openPrintPreview"
          flat>
          <span class="mr-2">Print</span>
          <font-awesome-icon icon="download" size="lg"></font-awesome-icon>
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <v-divider/>
    <v-container>
      <v-layout row wrap>
        <v-flex md6 offset-md3>
            <v-card class="mb-4">
              <v-card-title class="indigo darken-1 white--text">Pemilik</v-card-title>
              <v-card-text>
                <div class="left-box pa-2">
                  <div class="desc-box">
                    <span>Nama: </span>
                    <span>{{ pemilik.nama }}</span>
                  </div>
                  <div class="desc-box">
                    <span>Alamat: </span>
                    <span>{{ pemilik.alamat }}</span>
                  </div>
                  <div class="desc-box">
                    <span>No. Telp: </span>
                    <span>{{ pemilik.no_telp }}</span>
                  </div>
                </div>
              </v-card-text>
            </v-card>

            <v-card class="mb-4">
              <v-card-title class="indigo darken-1 white--text">Pasien</v-card-title>
              <v-card-text>
                <div class="left-box pa-2">
                  <div class="desc-box">
                    <span>Nama: </span>
                    <span>{{ pasien.nama }}</span>
                  </div>
                  <div class="desc-box">
                    <span>Jenis: </span>
                    <span>{{ pasien.jh_nama }}</span>
                  </div>
                  <div class="desc-box">
                    <span>Ras: </span>
                    <span>{{ pasien.ras_nama }}</span>
                  </div>
                  <div class="desc-box">
                    <span>Umur: </span>
                    <span>{{ pasien.format_lahir }} tahun -- {{ pasien.lahir }}</span>
                  </div>
                </div>
              </v-card-text>
            </v-card>

            <v-card class="mb-4">
              <v-card-title class="indigo darken-1 white--text">Rekam Medik</v-card-title>
              <v-card-text>
                <div class="right-box">
                  <div class="desc-box">
                    <span>Nomor Rekam Medik: </span>
                    <span>{{ rekamMedik.norek }}</span>
                  </div>
                  <div class="desc-box">
                    <span>Tipe Nomor Rekam Medik: </span>
                    <span>{{ rekamMedik.tipe_norek }}</span>
                  </div>
                  <div class="desc-box">
                    <span>Tanggal dan Waktu: </span>
                    <span>{{ rekamMedik.tanggal }} {{ rekamMedik.waktu }}</span>
                  </div>
                  <div class="desc-box">
                    <span>Berat: </span>
                    <span>{{ rekamMedik.berat }}</span>
                  </div>
                  <div class="desc-box">
                    <span>Freq N: </span>
                    <span>{{ rekamMedik.freq_n }}</span>
                  </div>
                  <div class="desc-box">
                    <span>Freq P: </span>
                    <span>{{ rekamMedik.freq_p }}</span>
                  </div>
                  <div class="desc-box">
                    <span>Freq T: </span>
                    <span>{{ rekamMedik.freq_t }}</span>
                  </div>
                </div>
              </v-card-text>
            </v-card>

            <v-card class="mb-4">
              <v-card-title class="indigo darken-1 white--text">Kondisi</v-card-title>
              <v-card-text>
                <div class="kondisi-box">
                  <div class="desc-box">
                    <span>MTH: </span>
                    <span>{{ rekamMedik.mth }}</span>
                  </div>
                  <div class="desc-box">
                    <span>Mulut: </span>
                    <span>{{ rekamMedik.mulut }}</span>
                  </div>
                  <div class="desc-box">
                    <span>Kulit Rambut: </span>
                    <span>{{ rekamMedik.kul_ra }}</span>
                  </div>
                  <div class="desc-box">
                    <span>Kelenjar Limfe: </span>
                    <span>{{ rekamMedik.kelenjar_limfe }}</span>
                  </div>
                  <div class="desc-box">
                    <span>Pernapasan: </span>
                    <span>{{ rekamMedik.pernapasan }}</span>
                  </div>
                  <div class="desc-box">
                    <span>Peredaran Darah: </span>
                    <span>{{ rekamMedik.peredaran_darah }}</span>
                  </div>
                  <div class="desc-box">
                    <span>Pencernaan: </span>
                    <span>{{ rekamMedik.pencernaan }}</span>
                  </div>
                  <div class="desc-box">
                    <span>Kelamin Perkencingan: </span>
                    <span>{{ rekamMedik.kelamin_perkencingan }}</span>
                  </div>
                  <div class="desc-box">
                    <span>Anggota Gerak: </span>
                    <span>{{ rekamMedik.ang_gerak }}</span>
                  </div>
                  <div class="desc-box">
                    <span>Diagnosa: </span>
                    <span>{{ rekamMedik.diagnosa }}</span>
                  </div>
                  <div class="desc-box">
                    <span>Prognosis: </span>
                    <span>{{ rekamMedik.prognosis }}</span>
                  </div>
                  <div class="desc-box">
                    <span>Terapi: </span>
                    <span>{{ rekamMedik.terapi }}</span>
                  </div>
                </div>
              </v-card-text>
            </v-card>
        </v-flex>
      </v-layout>
      <v-divider/>
    </v-container>
  </div>
</template>

<script>
import moment from 'moment'
import Service from '@/services'

const defPemilik = {
  id: null,
  nama: 'Jordan',
  alamat: 'oesapa',
  no_telp: '082303003'
}
const defPasien = {
  id: null,
  nama: 'Heli',
  jk: 1,
  signalemen: '',
  id_ras: 3,
  lahir: '2010-10-10',
  format_lahir: moment().diff('2010-10-10', 'years'),
  format_jk: 'Jantan',
  jh_nama: 'Guk Guk',
  ras_nama: 'Super',
  tipe_norek: '',
  norek: ''
}
const defRekamMedik = {
  id: null,
  pasien_id: null,
  pemilik_id: null,
  norek: '001-00023',
  tipe_norek: 'GA',
  elapsed: 'a few seconds ago',
  tanggal: '2018-10-26',
  waktu: '18:00',
  berat: 43,
  freq_n: 2,
  freq_p: 1.2,
  freq_t: 0.4,
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
export default {
  props: ['id'],
  data () {
    return {
      pasien: defPasien,
      pemilik: defPemilik,
      rekamMedik: defRekamMedik,
      panelState: [true, true, true, true]
    }
  },
  methods: {
    loadRekamMedik () {
      return Service.RekamMedik.getById(this.id)
        .then(item => {
          this.rekamMedik = item
          // Parsing date and time
          let date = moment(item.tanggal).format('D MMMM, YYYY')
          let time = moment(item.tanggal).format('HH:mm')
          this.rekamMedik.tanggal = date
          this.rekamMedik.waktu = time
        })
    },
    loadPasien (id) {
      return Service.Pasien.getById(id)
        .then(item => {
          console.log(item)
          this.pasien = item
        })
    },
    loadPemilik (id) {
      return Service.Pemilik.getById(id)
        .then(item => {
          this.pemilik = item
        })
    },
    reload () {
      this.loadRekamMedik()
        .catch(err => {
          console.log('Error getting rekam medik')
          throw err
        })
        .then(() => this.loadPasien(this.rekamMedik.pasien_id))
        .catch(err => {
          console.log('Error getting pasien')
          throw err
        })
        .then(() => this.loadPemilik(this.rekamMedik.pemilik_id))
        .catch(err => {
          console.log('Error getting pemilik')
          console.log(err)
        })
    },
    openPrintPreview () {
      window.open('http://localhost/app/extra/generateKunjunganReport.php?id_kunjungan=' + this.id, '_blank')
    }
  },
  mounted () {
    this.reload()
  }
}
</script>

<style lang="scss">
  .left-box {
    .desc-box {
      display: flex;
      padding: 12px 24px;
      justify-content: space-between;
      border-bottom: 1px solid #DDD;
    }
  }

  .right-box {
    .desc-box {
      display: flex;
      justify-content: space-between;
      padding: 12px 24px;
      border-bottom: 1px solid #DDD;
    }
  }

  .kondisi-box {
    .desc-box {
      display: flex;
      flex-direction: column;
      padding: 24px;
    }
  }
</style>
