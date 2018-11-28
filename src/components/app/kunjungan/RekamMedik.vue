<template>
  <div>
    <action-bar
      @save="save"
      @clear="clear"
      :invalid="!formValid"
    />
    <v-form :value="formValid" class="ma-4">
      
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
        suffix="Kg"
        style="max-width: 300px"
      >
      </v-text-field>
      <v-divider/>
      <v-text-field
        label="Frekuensi N"
        v-model="rekamMedik.freq_n"
        type="number"
        style="max-width: 300px"
      >
      </v-text-field>
      <v-divider/>
      <v-text-field
        label="Frekuensi P"
        v-model="rekamMedik.freq_p"
        type="number"
        style="max-width: 300px"
      >
      </v-text-field>
      <v-divider/>
      <v-text-field
        label="Frekuensi T"
        v-model="rekamMedik.freq_t"
        type="number"
        style="max-width: 300px"
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
</template>

<script>
import { fDefItem } from './defItem'
import ActionBar from './ActionBar'

export default {
  components: {
    ActionBar
  },
  data () {
    return {
      rekamMedik: fDefItem().rekamMedik,
      options: {
        tipeNorek: ['GA', 'GB', 'GC', 'GD']
      }
    }
  },
  computed: {
    formValid () {
      return !!this.rekamMedik.tanggal && !!this.rekamMedik.waktu
    }
  },
  methods: {
    save () {
      // Combine tanggal dan waktu
      let datetime = `${this.rekamMedik.tanggal}`
      let result = Object.assign({}, this.rekamMedik, { tanggal: datetime })
      this.$store.commit('kunjungan/rekamMedik', result)
      this.$router.push('/app/kunjungan/hasillab')
    },
    reload () {
      this.rekamMedik = this.$store.state.kunjungan.rekamMedik
    },
    clear () {
      let di = fDefItem()
      this.$store.commit('kunjungan/rekamMedik', di.rekamMedik)
      this.reload()
    }
  },
  mounted () {
    this.reload()
  }
}
</script>

<style>

</style>
