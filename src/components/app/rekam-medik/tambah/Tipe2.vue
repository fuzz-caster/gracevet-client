<template>
  <div>
    <v-toolbar dark color="indigo" app>
      <v-toolbar-title>Pemilik Baru, Pasien Baru</v-toolbar-title>
    </v-toolbar>
    <v-stepper vertical v-model="step">

      <v-stepper-step step="1" :complete="step > 1">
        Cari Pasien
      </v-stepper-step>
      <v-stepper-content step="1">
        <pasien-list @done="takePasienData" />
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
import PasienList from './PasienList'
import PemilikForm from './PemilikForm'
import Services from '@/services'

export default {
  components: {
    PasienList,
    PemilikForm
  },
  data () {
    return {
      step: 1,
      pasienId: null,
      pemilik: {}
    }
  },
  methods: {
    takePasienData (pasienId) {
      this.pasienId = pasienId
      this.step += 1
    },
    takePemilikData (pemilik) {
      this.pemilik = pemilik
      this.save()
    },
    async save () {
      let pemilik = this.pemilik
      // eslint-disable-next-line
      let pasien_id = this.pasienId
      try {
        let result = await Services.Custom.tambahTipe2({ pemilik, pasien_id })
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
