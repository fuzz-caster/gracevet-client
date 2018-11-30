<template>
  <v-card>
    <v-toolbar flat dense>
      <v-toolbar-title>Tambah data perawatan</v-toolbar-title>
    </v-toolbar>
    <v-card-text>
      <v-form ref="form" v-model="valid">
        <v-text-field required label="Tanggal" type="date" v-model="item.tanggal"></v-text-field>
        <v-text-field required label="Waktu" type="time" v-model="item.waktu"></v-text-field>
        <v-textarea type="datetime"
          label="Keterangan"
          v-model="item.keterangan"
          required
          rows="5"></v-textarea>
        <v-text-field label="NxM"
          type="number"
          min="0"
          required
          v-model="item.nxm">
        </v-text-field>
        <v-text-field label="PxM"
          type="number"
          min="0"
          required
          v-model="item.pxm">
        </v-text-field>
        <v-text-field label="ToC"
          required
          v-model="item.toc">
        </v-text-field>
        <v-select
          :items="options.tipe"
          v-model="item.tipe"
          label="Tipe"
        ></v-select>
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
const defItem = {
  tanggal: null,
  waktu: null,
  keterangan: '',
  nxm: 0,
  pxm: 0,
  toc: '',
  tipe: 'RAWAT'
}

export default {
  data () {
    return {
      item: defItem,
      options: {
        tipe: ['RAWAT', 'KELUAR']
      },
      valid: false
    }
  }
}
</script>

<style>

</style>
