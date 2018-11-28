<template>
  <div>
    <action-bar
      @save="save"
      @clear="clear"
      :invalid="!formValid"
    />
    <v-form :value="formValid" class="ma-4">

      <v-text-field
        v-model="pemilik.nama"
        label="Nama Pemilik Baru"
        :rules="[v => !!v || 'Input nama pemilik baru']"
      >
      </v-text-field>
      <v-text-field
        v-model="pemilik.alamat"
        label="Alamat Pemilik Baru"
        :rules="[v => !!v || 'Input alamat pemilik baru']"
      >
      </v-text-field>
      <v-text-field
        v-model="pemilik.no_telp"
        label="Nomor Telpon"
      >
      </v-text-field>
    </v-form>
  </div>
</template>

<script>
import { fDefItem } from './defItem'
import ActionBar from './ActionBar'

export default {
  components: {
    ActionBar
  },
  data () {
    return {
      pemilik: fDefItem()
    }
  },
  computed: {
    formValid () {
      return !!this.pemilik.nama && !!this.pemilik.alamat
    }
  },
  methods: {
    save () {
      let result = Object.assign({}, this.pemilik)
      this.$store.commit('kunjungan/pemilik', result)
    },
    reload () {
      this.pemilik = this.$store.state.kunjungan.pemilik
    },
    clear () {
      let di = fDefItem()
      this.$store.commit('kunjungan/pemilik', di.pemilik)
      this.reload()
    }
  },
  mounted () {
    this.reload()
  }
}
</script>

<style>

</style>
