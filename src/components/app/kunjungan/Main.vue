<template>
  <div>
    <div v-if="state == 'idle'">
      <v-toolbar flat color="teal darken-2" dark>
        <v-toolbar-title>
          <span class="title">Tambah Data Kunjungan </span>
        </v-toolbar-title>
        <v-spacer/>
        <v-btn
          color="primary"
          dark
          large
          :disabled="!validate"
          @click="save"
        >
          <span class="mr-4">Simpan</span>
          <font-awesome-icon icon="download" size="lg"></font-awesome-icon>
        </v-btn>
      </v-toolbar>

      <v-toolbar dense color="cyan darken-2" dark flat class="py-4">
        <v-toolbar-items>
          <v-btn v-for="it in navs" :key="it.to"
            flat
            :to="it.to">
            {{ it.text }}
          </v-btn>
        </v-toolbar-items>
      </v-toolbar>

      <router-view/>

    </div>
    <loading-view v-if="state == 'loading'"/>
    <error-view v-if="state == 'error'" message="Gagal menambahkan data rekam medik"
      @reload="state = 'idle'"/>
    <success-view v-if="state == 'success'" 
      message="Sukses menambahkan data rekam medik"
      :actions="successActions"
      />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Services from '@/services'
import ErrorView from '@/components/app/commons/ErrorView'
import LoadingView from '@/components/app/commons/LoadingView'
import SuccessView from '@/components/app/commons/SuccessView'

export default {
  components: {
    ErrorView,
    LoadingView,
    SuccessView
  },
  data () {
    return {
      navs: [
        {
          text: 'Pasien dan Pemilik',
          to: '/app/kunjungan/paspem'
        },
        {
          text: 'Rekam Medik',
          to: '/app/kunjungan/rekammedik'
        },
        {
          text: 'Hasil Lab',
          to: '/app/kunjungan/hasillab'
        },
        {
          text: 'Penanganan Khusus',
          to: '/app/kunjungan/penkhusus'
        }
      ],
      type: 'member',
      state: 'idle',
      successId: null,
      successActions: [
        {
          name: 'Ulangi',
          doIt: () => {
            this.state = 'idle'
          }
        },
        {
          name: 'Detail',
          doIt: () => {
            this.$router.push(`/app/rekammedik/detail/${this.successId}`)
          }
        },
        {
          name: 'List Rekam Medik',
          doIt: () => {
            this.$router.push('/app/rekammedik/list')
          }
        },
        {
          name: 'Print',
          doIt: () => {
            console.log('print')
          }
        }
      ]
    }
  },
  computed: {
    baru () {
      return this.type === 'baru'
    },
    f () {
      return Services.Kunjungan.member
    },
    ...mapGetters('kunjungan', [
      'isValid',
      'isValidMember'
    ]),
    validate () {
      if (this.type === 'baru') {
        return this.isValid
      } else {
        return this.isValidMember
      }
    }
  },
  beforeRouteUpdate (to, from, next) {
    let xs = to.path.split('/')
    this.type = xs[3]
    next()
  },
  methods: {
    save () {
      this.state = 'loading'
      Services.Kunjungan.member(this.$store.state.kunjungan)
        .then(data => {
          this.successId = data.id
          this.state = 'success'
        })
        .catch(err => {
          console.log(err)
          this.state = 'error'
        })
    }
  }
}
</script>

<style lang="scss">
#kunjungan-tab {
  .v-window__container {
    max-height: 70vh;
    overflow-y: auto;
  }
  .v-tabs__wrapper {
    padding-left: 24px;
    margin-top: 32px;
    margin-bottom: 32px;

    a.v-tabs__item {
      text-align: left;
    }
  }
}

.baru-toolbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
