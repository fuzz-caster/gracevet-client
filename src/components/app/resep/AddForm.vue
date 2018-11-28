<template>
  <v-card>
    <v-toolbar flat dense>
      <v-toolbar-title>Tambah data perawatan</v-toolbar-title>
    </v-toolbar>
    <v-card-text>
      <v-form ref="form" v-model="valid">
        
        <v-text-field required label="Jumlah" type="number" v-model="item.jumlah"></v-text-field>
        <simple-auto-complete name="Obat" :f="listObat" @save="item.id_obat = $event.id" />

      </v-form>
    </v-card-text>
    <v-card-actions>
      <v-btn @click="$emit('save', item)"
        flat
        dark
        :disabled="!valid"
        color="primary"
      >
        Save
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import SimpleAutoComplete from '@/components/app/kunjungan/SimpleAutoComplete'
import Services from '@/services'

const defItem = {
  id_obat: null,
  jumlah: 0
}

export default {
  components: {
    SimpleAutoComplete
  },
  data () {
    return {
      item: defItem,
      options: {
        tipe: ['RAWAT', 'KELUAR']
      },
      valid: false
    }
  },
  methods: {
    listObat (page, key) {
      return Services.Obat.list(page, key)
    }
  }
}
</script>

<style>

</style>
