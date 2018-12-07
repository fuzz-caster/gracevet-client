<template>
  <v-card flat>
    <v-form ref="pasien-form" v-model="formIsValid">
      <v-text-field
        label="Nama"
        v-model="item.nama"
        readonly
        :rules="[ v => !!v || 'Nama pasien harus diisi' ]"
      >
      </v-text-field>
      <v-text-field
        label="Alamat"
        v-model="item.alamat"
        readonly
      >
      </v-text-field>
      <v-text-field
        label="No. Telp"
        v-model="item.no_telp"
        readonly
      >
      </v-text-field>
    </v-form>

    <v-btn
      @click="$emit('done', item)"
      depressed
      dark
      :disabled="!formIsValid"
      color="blue"
    >
      Selesai
    </v-btn>
  </v-card>
</template>

<script>
import Services from '@/services'

export default {
  props: ['idPemilik'],
  data () {
    return {
      formIsValid: false,
      item: {
        nama: '',
        alamat: '',
        no_telp: ''
      }
    }
  },
  watch: {
    idPemilik: function (val) {
      if (!val) {
        return
      }
      Services.Pemilik.getById(val)
        .then(item => {
          this.item = item
        })
    }
  }
}
</script>
