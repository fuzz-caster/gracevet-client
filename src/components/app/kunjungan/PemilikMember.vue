<template>
  <v-card
    tile>
    <v-card-title class="headline">Cari Pemilik</v-card-title>
    <v-card-text>
      <vue-select
        :options="items"
        label="nama"
        v-model="selectedPemilik"
      >
      </vue-select>
    </v-card-text>
    <v-card-actions>
      <v-btn ripple @click="save" color="primary" dark>
        Simpan
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import Service from '@/services'
import vueSelect from 'vue-select'

const defData = {
  text: null,
  search: '',
  items: [],
  isLoading: false,
  selectedPemilik: null
}
export default {
  components: {
    vueSelect
  },
  data () {
    return defData
  },
  methods: {
    query (val) {
      // Items have already been requested
      if (this.isLoading) return

      this.isLoading = true

      // Lazily load input items
      Service.Pemilik.list(1, val)
        .then(data => {
          this.items = data.items
        })
        .catch(err => {
          console.log(err)
        })
        .finally(() => (this.isLoading = false))
    },
    save () {
      let text = this.text
      console.log(text)
      if (isNaN(text)) return
      let id = parseInt(text)
      this.$store.commit('kunjungan/pemilikId', id)
    }
  },
  mounted () {
    this.query('')
  }
}
</script>

<style>

</style>
