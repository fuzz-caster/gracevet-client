<template>
  <div>
    <loading-view v-if="state == 'loading'"/>
    <error-view v-if="state == 'error'" @reload="state = 'idle'"
      :message="errorMessage"/>
    <success-view v-if="state == 'success'"
      message="Sukses mengubah data rekam medik"
      :actions="successActions"/>
    <div v-if="state == 'idle'">
      <base-edit-form
        :valid="formValid"
        :id="id"
        @save="save"/>
      <v-form :value="formValid" class="ma-4">

        <v-select
          :items="options.penyakit"
          v-model="rekamMedik.penyakit_id"
          :rules="[v => !!v || 'Silahkan pilih penyakit']"
        >
        </v-select>

        <v-text-field type="date" v-model="rekamMedik.tanggal" label="Hari dan Tanggal kunjungan ini"
          :rules="[v => !!v || 'Silahkan input waktu kunjungan']"/>
        <v-divider/>

        <v-text-field type="time" v-model="rekamMedik.waktu" label="Waktu kunjungan"
          :rules="[v => !!v || 'Silahkan input waktu kunjungan']"/>

        <v-divider/>
        <v-text-field
          label="Berat badan pasien"
          v-model="rekamMedik.berat"
          type="number"
          min="0"
          max="1000"
        >
        </v-text-field>
        <v-divider/>
        <v-text-field
          label="Frekuensi N"
          v-model="rekamMedik.freq_n"
          type="number"
        >
        </v-text-field>
        <v-divider/>
        <v-text-field
          label="Frekuensi P"
          v-model="rekamMedik.freq_p"
          type="number"
        >
        </v-text-field>
        <v-divider/>
        <v-text-field
          label="Frekuensi T"
          v-model="rekamMedik.freq_t"
          type="number"
        >
        </v-text-field>
        <v-divider/>
          <v-textarea
          suffix="MTH"
          v-model="rekamMedik.mth"
          full-width
        >
        </v-textarea>
        <v-divider/>
        <v-textarea
          suffix="Mulut"
          v-model="rekamMedik.mulut"
          full-width
        >
        </v-textarea>
        <v-divider/>
        <v-textarea
          suffix="Kulit Rambut"
          v-model="rekamMedik.kul_rambut"
          full-width
        >
        </v-textarea>
        <v-divider/>
        <v-textarea
          suffix="Kelenjar Limfe"
          v-model="rekamMedik.kelenjar_limfe"
          full-width
        >
        </v-textarea>
        <v-divider/>

        <v-textarea
          suffix="Pernapasan"
          v-model="rekamMedik.pernapasan"
          full-width
        >
        </v-textarea>
        <v-divider/>

        <v-textarea
          suffix="Peredaran Darah"
          v-model="rekamMedik.peredaran_darah"
          full-width
        >
        </v-textarea>
        <v-divider/>

        <v-textarea
          suffix="Pencernaan"
          v-model="rekamMedik.pencernaan"
          full-width
        >
        </v-textarea>
        <v-divider/>

        <v-textarea
          suffix="Kelamin Perkencingan"
          v-model="rekamMedik.kelamin_perkencingan"
          full-width
        >
        </v-textarea>
        <v-divider/>

        <v-textarea
          suffix="Anggota Gerak"
          v-model="rekamMedik.ang_gerak"
          full-width
        >
        </v-textarea>

        <v-divider/>

        <v-textarea
          suffix="Diagnosa"
          v-model="rekamMedik.diagnosa"
          full-width
        >
        </v-textarea>
        <v-divider/>

        <v-textarea
          suffix="Prognosis"
          v-model="rekamMedik.prognosis"
          full-width
        >
        </v-textarea>
        <v-divider/>

        <v-textarea
          suffix="Terapi"
          v-model="rekamMedik.terapi"
          full-width
        >
        </v-textarea>
        <v-divider/>
      </v-form>
    </div>
  </div>
</template>

<script>
import * as moment from 'moment'
import Services from '@/services'
import BaseEditForm from './BaseEditForm'
import ErrorView from '@/components/app/commons/ErrorView'
import SuccessView from '@/components/app/commons/SuccessView'
import LoadingView from '@/components/app/commons/LoadingView'
import { fDefItem } from '@/components/app/kunjungan/defItem'

export default {
  props: ['id'],
  components: {
    BaseEditForm,
    LoadingView,
    ErrorView,
    SuccessView
  },
  data () {
    return {
      state: 'idle',
      rekamMedik: fDefItem().rekamMedik,
      options: {
        tipeNorek: ['GA', 'GB', 'GC', 'GD'],
        penyakit: []
      },
      successActions: [
        {
          name: 'Ulangi',
          doIt: () => {
            this.reload()
              .then(() => {
                this.state = 'idle'
              })
              .catch(err => {
                console.log(err)
              })
          }
        }
      ]
    }
  },
  computed: {
    formValid () {
      return !!this.rekamMedik.norek && !!this.rekamMedik.tipe_norek && !!this.rekamMedik.tanggal && !!this.rekamMedik.waktu
    }
  },
  methods: {
    save () {
      // Combine tanggal dan waktu
      let datetime = `${this.rekamMedik.tanggal} ${this.rekamMedik.waktu}:00`
      let result = Object.assign({}, this.rekamMedik, { tanggal: datetime })
      this.state = 'loading'
      return Services.RekamMedik.update(this.id, result)
        .then(() => {
          this.state = 'success'
        })
        .catch(err => {
          console.log(err)
          this.state = 'error'
          throw err
        })
    },
    reload () {
      this.state = 'loading'
      return Services.Options.get('penyakit')
        .then(items => {
          this.options.penyakit = items
        })
        .then(() => Services.RekamMedik.getById(this.id))
        .then(data => {
          let dateTime = moment(data.tanggal, 'DD-MM-YYYY, h:mm a')
          let tanggal = dateTime.format('YYYY-MM-DD')
          let waktu = dateTime.format('HH:mm')

          this.rekamMedik = data
          this.rekamMedik.tanggal = tanggal
          this.rekamMedik.waktu = waktu
          this.state = 'idle'
        })
        .catch(err => {
          console.log(err)
          this.state = 'error'
        })
    }
  },
  mounted () {
    this.reload()
  }
}
</script>

<style>

</style>
