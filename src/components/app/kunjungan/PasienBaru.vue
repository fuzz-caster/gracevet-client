<template>
  <div>
    <action-bar
      @save="save"
      @clear="clear"
      :invalid="!formValid"
    />
    <v-form v-if="!error" :value="formValid" class="ma-4">
      <div>
        <v-text-field
          v-model="pasien.nama"
          label="Nama Pasien Baru"
          :rules="[v => !!v || 'Input nama pasien baru']"
        >
        </v-text-field>
        <v-select
          v-model="pasien.id_ras"
          label="Ras dari pasien bersangkutan"
          :items="options.ras"
          :rules="[v => !!v || 'Input ras dari pasien baru']"
        >
        </v-select>
        <v-select
          v-model="pasien.jk"
          label="Jenis Kelamin"
          :items="options.jk"
        >
        </v-select>

        <v-text-field type="date" v-model="pasien.lahir" label="Tanggal Lahir Pasien" />

      </div>
    </v-form>
    <error-view
      v-else
      :message="errorMessage"
      v-on:reload="reload"
    >
    </error-view>
  </div>
</template>

<script>
import { fDefItem } from './defItem'
import ErrorView from '@/components/app/commons/ErrorView'
import ActionBar from './ActionBar'
import Service from '@/services'
import moment from 'moment'

export default {
  components: {
    ErrorView,
    ActionBar
  },
  data () {
    return {
      pasien: fDefItem().pasien,
      options: {
        ras: [],
        jk: [
          {
            text: 'Jantan',
            value: 1
          },
          {
            text: 'Betina',
            value: 0
          }
        ]
      },
      error: false,
      errorMessage: ''
    }
  },
  computed: {
    age () {
      return moment(this.pasien.lahir).fromNow()
    },
    formValid () {
      return !!this.pasien.lahir && !!this.pasien.nama && !!this.pasien.id_ras
    }
  },
  methods: {
    save () {
      this.$store.commit('kunjungan/pasien', this.pasien)
    },
    loadOptions () {
      return Service.Options.get('ras')
        .then(items => {
          this.options.ras = items
        })
    },
    clear () {
      let di = fDefItem()
      console.log(di.pasien)
      this.$store.commit('kunjungan/pasien', di.pasien)
      this.reload()
    },
    reload () {
      this.pasien = this.$store.state.kunjungan.pasien
      return this.loadOptions()
        .catch(err => {
          console.log(err)
          this.error = true
          this.errorMessage = 'Gagal mengambil data ras'
        })
    }
  },
  mounted () {
    this.reload()
  }
}
</script>

<style>

</style>
