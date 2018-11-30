<template>
  <div>
    <v-toolbar dark color="indigo">
      <v-toolbar-title>Pemilik Baru, Pasien Baru</v-toolbar-title>
    </v-toolbar>
    <v-stepper vertical v-model="step">

      <v-stepper-step step="1" :complete="step > 1">
        Input Data Pasien
      </v-stepper-step>
      <v-stepper-content step="1">
        <pasien-form @done="takePasienData"/>
      </v-stepper-content>

      <v-stepper-step step="2" :complete="step > 2">
        Input Data Pemilik
      </v-stepper-step>
      <v-stepper-content step="2">
        <pemilik-form @done="takePemilikData"/>
      </v-stepper-content>

    </v-stepper>
  </div>
</template>

<script>
import PasienForm from './PasienForm'
import PemilikForm from './PemilikForm'
import Services from '@/services'

export default {
  components: {
    PasienForm,
    PemilikForm
  },
  data () {
    return {
      step: 1,
      pasien: {},
      pemilik: {}
    }
  },
  methods: {
    takePasienData (pasien) {
      this.pasien = pasien
      this.step += 1
    },
    takePemilikData (pemilik) {
      this.pemilik = pemilik
      this.save()
    },
    async save () {
      let pemilik = this.pemilik
      let pasien = this.pasien
      try {
        let result = await Services.Custom.tambahTipe1({ pemilik, pasien })
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
