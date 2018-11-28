<template>
  <div>
    <div v-if="state == 'idle'">
      <v-toolbar flat color="white">
        <v-toolbar-title>
          Edit Data Rekam Medik
        </v-toolbar-title>
        <v-spacer/>
        <v-btn
          color="primary"
          dark
          large
          :disabled="!validate"
          @click="save"
        >
          <span class="mr-4">Simpan</span>
          <font-awesome-icon icon="download" size="lg"></font-awesome-icon>
        </v-btn>
      </v-toolbar>

      <v-divider/>
      <v-toolbar dense color="white" flat class="my-4">
        <v-toolbar-items>
          <v-btn v-for="it in navs" :key="it.to"
            flat
            :to="it.to">
            {{ it.text }}
          </v-btn>
        </v-toolbar-items>
      </v-toolbar>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      navs: [
        {
          text: 'Rekam Medik',
          to: 'rekammedik'
        },
        {
          text: 'Hasil Lab',
          to: 'hasillab'
        },
        {
          text: 'Penanganan Khusus',
          to: 'penkhusus'
        }
      ],
      type: 'baru',
      state: 'idle',
      successActions: [
        {
          name: 'Ulangi',
          doIt: () => {
            console.log('detail')
          }
        },
        {
          name: 'List Rekam Medik',
          doIt: () => {
            console.log('list')
          }
        }
      ]
    }
  }
}
</script>

<style>

</style>
