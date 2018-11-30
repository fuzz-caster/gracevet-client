<template>
  <div>
    <v-toolbar color="indigo darken-1" dark>
      <v-toolbar-title>
        Edit Data Rekam Medik
      </v-toolbar-title>
      <v-spacer/>
      <v-btn
        color="primary"
        dark
        large
        :disabled="!valid"
        @click="$emit('save')"
      >
        <span class="mr-4">Simpan</span>
        <font-awesome-icon icon="download" size="lg"></font-awesome-icon>
      </v-btn>
    </v-toolbar>
    <v-toolbar dense color="cyan darken-1" dark class="py-4 elevation-6">
      <v-toolbar-items>
        <v-btn v-for="it in navs" :key="it.to"
          flat
          @click="navigateTo(it.to)">
          {{ it.text }}
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
    </div>
</template>

<script>
export default {
  props: ['valid', 'id'],
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
        },
        {
          text: 'Rawat Inap',
          to: 'perawatan'
        }
      ]
    }
  },
  methods: {
    navigateTo (path) {
      let p = `/app/rekammedik/update/${path}/${this.id}`
      this.$router.push(p)
    }
  }
}
</script>

<style>

</style>
