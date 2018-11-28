<template>
  <v-card
    dark
    color="deep-purple darken-1 white--text">
    <v-card-title class="headline">Cari {{ name }}</v-card-title>
    <v-card-text>
      <v-autocomplete
        dark
        v-model="text"
        :items="items"
        :loading="isLoading"
        :search-input.sync="search"
        placeholder="Input keyword untuk mencari"
        hide-no-data
        hide-selected
        item-text="nama"
        item-value="id"
        :clearable="true"
      >
      </v-autocomplete>
    </v-card-text>
    <v-card-actions>
      <v-btn ripple @click="save" color="primary" dark>
        Simpan
      </v-btn>
      <v-btn ripple @click="text = null" color="error" dark>
        Clear
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
const defData = {
  text: null,
  search: '',
  items: [],
  isLoading: false
}
export default {
  props: ['name', 'f'],
  data () {
    return defData
  },
  methods: {
    query (val) {
      // Items have already been requested
      if (this.isLoading) return

      this.isLoading = true

      // Lazily load input items
      this.f(1, val)
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
      if (isNaN(text)) return
      let o = { id: parseInt(text) }
      this.$emit('save', o)
    }
  },
  watch: {
    search (val) {
      this.query(val)
    }
  }
}
</script>

<style>

</style>
