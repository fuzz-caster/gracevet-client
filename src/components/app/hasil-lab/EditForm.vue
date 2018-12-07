<template>
  <div>
    <v-container fluid v-if="state == 'idle'">
      <v-layout row>
        <v-flex md6 offset-md3>
          <v-card>
            <v-card-title class="indigo white--text">
              <v-text-field
                label="Nama Hasil Lab"
                dark
                v-model="item.nama">
              </v-text-field>
            </v-card-title>
            <v-card-text>
              <v-btn
                @click="addStruk"
                dark color="blue" class="my-4" small>Tambah</v-btn>
              <v-card v-for="(st, index) in item.struktur" class="my-3" raised :key="index">
                <v-card-title>{{ st.nama }}</v-card-title>
                <v-card-text>
                  <v-text-field label="Nama" v-model="st.nama" />
                  <v-select :items="typeOptions" label="Tipe" v-model="st.type" />
                </v-card-text>
                <v-card-actions>
                  <v-btn @click="delItem(index)" flat small color="red">Hapus</v-btn>
                </v-card-actions>
              </v-card>
            </v-card-text>
            <v-card-actions>
              <v-btn color="indigo" dark @click="save">
                Simpan
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
    <loading-view v-if="state == 'loading'"/>
    <error-view v-if="state == 'error'" message="Gagal menambahkan data hasil lab"/>
    <success-view v-if="state == 'success'" 
      message="Sukses menambahkan data hasil lab"
      :actions="successActions"
      />
  </div>
</template>

<script>
import Services from '@/services'
import LoadingView from '@/components/app/commons/LoadingView'
import ErrorView from '@/components/app/commons/ErrorView'
import SuccessView from '@/components/app/commons/SuccessView'

export default {
  props: ['id'],
  components: {
    LoadingView,
    ErrorView,
    SuccessView
  },
  data () {
    return {
      state: 'idle',
      item: {
        nama: '',
        struktur: []
      },
      typeOptions: ['string', 'number'],
      successActions: [
        {
          name: 'Ulangi',
          doIt: () => {
            this.load()
          }
        },
        {
          name: 'List Hasil Lab',
          doIt: () => {
            this.$router.push('/app/hasillab/list')
          }
        }
      ]
    }
  },
  methods: {
    load () {
      this.state = 'loading'
      return Services.HasilLab.getById(this.id)
        .then(result => {
          let struktur = JSON.parse(result.struktur)
          let x = Object.assign({}, result, { struktur })
          this.item = x
          this.state = 'idle'
        })
        .catch(err => {
          console.log(err)
          this.state = 'error'
          throw err
        })
    },
    addStruk () {
      const defNewStruk = {
        type: 'string',
        name: ''
      }
      this.item.struktur.push(defNewStruk)
    },
    save () {
      this.state = 'loading'
      return Services.HasilLab.update(this.id, this.item)
        .then(resp => {
          this.state = 'success'
        })
        .catch(err => {
          console.log(err)
          this.state = 'error'
          throw err
        })
    },
    delItem (index) {
      this.item.struktur.splice(index, 1)
    }
  },
  mounted () {
    this.load()
  }
}
</script>

<style>

</style>
