<template>
  <v-card
    tile flat>
    <v-card-text>

      <v-layout row justify-start align-center>
        <v-flex md2>
          <div class="title mr-4 my-4">Pemilik</div>
        </v-flex>
        <vue-select
          :options="pemilik.items"
          label="text"
          v-model="pemilik.selected"
          placeholder="Pemilk"
          style="min-width: 500px;"
        >
        </vue-select>
      </v-layout>

      <v-layout row justify-start align-center>
        <v-flex md2>
          <div class="title mr-4 my-4">Pasien</div>
        </v-flex>
        <vue-select
          :options="pasien.items"
          label="text"
          v-model="pasien.selected"
          placeholder="Pasien"
          style="min-width: 500px;"
        >
        </vue-select>
      </v-layout>

      <v-layout row justify-start align-center>
        <v-flex md2>
          <div class="title mr-4 my-4">Penyakit</div>
        </v-flex>
        <vue-select
          :options="penyakit.items"
          label="text"
          v-model="penyakit.selected"
          placeholder="Penyakit"
          style="min-width: 500px;"
        >
        </vue-select>
      </v-layout>

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
  isLoading: false,
  pasien: {
    items: [],
    selected: null
  },
  pemilik: {
    items: [],
    selected: null
  },
  penyakit: {
    items: [],
    selected: null
  }
}
export default {
  components: {
    vueSelect
  },
  data () {
    return defData
  },
  methods: {
    getPemilik (val) {
      // Items have already been requested

      // Lazily load input items
      Service.Options.get('pemilik')
        .then(data => {
          this.pemilik.items = data
        })
        .catch(err => {
          console.log(err)
        })
    },
    getPasien (val) {
      // Items have already been requested
      // Lazily load input items
      Service.Options.get('pasien')
        .then(data => {
          // console.log(data)
          // Transform null values
          let items = data.map(it => {
            if (it.text === null) {
              return Object.assign(it, { text: 'Unknown name' })
            }
            return it
          })
          this.pasien.items = items
        })
        .catch(err => {
          console.log(err)
        })
    },
    getPenyakit (val) {
      // Items have already been requested
      // Lazily load input items
      Service.Options.get('penyakit')
        .then(data => {
          this.penyakit.items = data
        })
        .catch(err => {
          console.log(err)
        })
    },
    save () {
      let payload = {
        pemilikId: this.pemilik.selected.value,
        pasienId: this.pasien.selected.value,
        penyakitId: this.penyakit.selected.value
      }
      this.$store.commit('kunjungan/step1', payload)
      this.$router.push('/app/kunjungan/rekammedik')
    }
  },
  mounted () {
    this.getPasien('')
    this.getPemilik('')
    this.getPenyakit('')
  }
}
</script>

<style>

</style>
