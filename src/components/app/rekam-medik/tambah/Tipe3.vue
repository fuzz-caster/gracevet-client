<template>
  <div>
    <v-toolbar dark color="indigo" app>
      <v-toolbar-title>Pemilik Lama, Pasien Baru</v-toolbar-title>
    </v-toolbar>
    <v-stepper vertical v-model="step">

      <v-stepper-step step="1" :complete="step > 1">
        Input Data Pasien
      </v-stepper-step>
      <v-stepper-content step="1">
        <pasien-form @done="takePasienData" />
      </v-stepper-content>

      <v-stepper-step step="2" :complete="step > 2">
        Input Data Pemilik
      </v-stepper-step>
      <v-stepper-content step="2">
        <pemilik-list @done="takePemilikData"/>
      </v-stepper-content>

    </v-stepper>
  </div>
</template>

<script>
import PasienForm from './PasienForm'
import PemilikList from './PemilikList'
import Services from '@/services'

export default {
  components: {
    PasienForm,
    PemilikList
  },
  data () {
    return {
      step: 1,
      pasien: {},
      pemilikId: null
    }
  },
  methods: {
    takePasienData (pasien) {
      this.pasien = pasien
      this.step += 1
    },
    takePemilikData (pemilikId) {
      this.pemilikId = pemilikId
      this.save()
    },
    async save () {
      // eslint-disable-next-line
      let pemilik_id = this.pemilikId
      let pasien = this.pasien
      try {
        let result = await Services.Custom.tambahTipe3({ pemilik_id, pasien })
        let id = result.id
        this.$router.push(`/app/rekammedik/update/rekammedik/${id}`)
      } catch (err) {
        console.log(err)
      }
    }
  }
}
</script>

<style>

</style>
