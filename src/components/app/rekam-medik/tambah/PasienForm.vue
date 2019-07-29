<template>
  <v-card flat>
    <v-form ref="pasien-form" v-model="formIsValid">
      <v-select
        label="Tipe Nomor Rekam Medik"
        v-model="item.tipe_norek"
        :items="optionsTipeNorek">
      </v-select>
      <v-text-field
        label="Nomor Rekam Medik"
        v-model="item.norek"
        type="number"
      >
      </v-text-field>
      <v-text-field
        label="Nama"
        v-model="item.nama"
        :rules="[ v => !!v || 'Nama pasien harus diisi' ]"
      >
      </v-text-field>
      <v-text-field
        label="Lahir"
        v-model="item.lahir"
        type="date"
        :rules="[ v => !!v || 'Tanggal Lahir pasien harus diisi' ]"
      >
      </v-text-field>
      <v-select
        label="Ras"
        v-model="item.id_ras"
        :items="optionsRas"
        :rules="[ v => !!v || 'Ras pasien harus diisi' ]"
      >
      </v-select>
      <v-select
        label="Sex"
        v-model="item.jk"
        :items="optionsJenisKelamin">
      </v-select>
      <v-text-field
        label="Tatto/Chip"
        v-model="item.tatto_chip"
      >
      </v-text-field>
      <v-text-field
        label="Signalemen"
        v-model="item.signalemen"
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
  data () {
    return {
      formIsValid: false,
      item: {
        tipe_norek: 'GA',
        norek: '',
        nama: '',
        signalemen: '',
        jk: 0,
        lahir: null,
        id_ras: null,
        tatto_chip: ''
      },
      optionsJenisKelamin: [
        {
          value: 1,
          text: 'Jantan'
        },
        {
          value: 0,
          text: 'Betina'
        }
      ],
      optionsRas: [],
      optionsTipeNorek: ['GA', 'GB', 'GC', 'GD']
    }
  },
  methods: {
    loadRas () {
      Services.Options.get('ras')
        .then(items => {
          this.optionsRas = items
        })
        .catch(err => {
          console.log(err)
          alert('Gagal memuat data ras')
        })
    },
    async getNewRekamMedik () {
      let norek = await Services.Custom.newRekamMedikId()
      this.item.norek = norek
    }
  },
  mounted () {
    this.loadRas()
    this.getNewRekamMedik()
  }
}
</script>
