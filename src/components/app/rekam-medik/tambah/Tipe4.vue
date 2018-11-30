<template>
  <div>
    <v-toolbar dark color="indigo" app>
      <v-toolbar-title>Pemilik Lama, Pasien Lama (Member)</v-toolbar-title>
    </v-toolbar>
    <v-stepper vertical v-model="step">

      <v-stepper-step step="1" :complete="step > 1">
        Cari Pasien
      </v-stepper-step>
      <v-stepper-content step="1">
        <pasien-list @done="takePasienData" />
      </v-stepper-content>

      <v-stepper-step step="2" :complete="step > 2">
        Cari Pemilik
      </v-stepper-step>
      <v-stepper-content step="2">
        <pemilik-list @done="takePemilikData" />
      </v-stepper-content>

    </v-stepper>
  </div>
</template>

<script>
import PasienList from './PasienList'
import PemilikList from './PemilikList'
import Services from '@/services'

export default {
  components: {
    PasienList,
    PemilikList
  },
  data () {
    return {
      step: 1,
      pasienId: null,
      pemilikId: null
    }
  },
  methods: {
    takePasienData (pasienId) {
      this.pasienId = pasienId
      this.step += 1
    },
    takePemilikData (pemilikId) {
      this.pemilikId = pemilikId
      this.save()
    },
    async save () {
      // eslint-disable-next-line
      let pemilik_id = this.pemilikId
      // eslint-disable-next-line
      let pasien_id = this.pasienId
      try {
        let result = await Services.Custom.tambahTipe4({ pemilik_id, pasien_id })
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
