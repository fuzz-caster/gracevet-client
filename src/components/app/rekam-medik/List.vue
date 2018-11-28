<template>
  <div>
    <listing
      :name="name"
      :icon="icon"
      :headers="headers"
      :service="service"
      :route-path="routePath"
      :add-handler="() => { dialogIsVisible = true }"
    >
      <template slot="row-content" slot-scope="rprops">
        <td>
          <div class="font-weight-bold caption">#{{ rprops.rprops.item.tipe_norek }} - {{ rprops.rprops.item.norek }}</div>
        </td>
        <td>
          <div class="body-2 font-weight-bold">{{ rprops.rprops.item.penyakit_nama }}</div>
        </td>
        <td>
          <div class="caption">{{ rprops.rprops.item.tanggal }}</div>
        </td>
        <td>
          <div class="body-1">{{ rprops.rprops.item.pasien_nama }}</div>
          <div class="caption">{{ rprops.rprops.item.ras_nama }} / {{ rprops.rprops.item.jh_nama }}</div>
        </td>
        <td>
          <div class="body-1">{{ rprops.rprops.item.pemilik_nama }}</div>
        </td>
      </template>
      <template slot="action-content" slot-scope="rprops">
        <td class="text-xs-right">
          <v-btn icon small flat
            @click="openPerawatan(rprops.rprops.item.id)">
            <font-awesome-icon
              class="pink--text text-lighten-1"
              icon="hospital"
            ></font-awesome-icon>
          </v-btn>
          <v-btn icon small flat
            @click="viewDetail(rprops.rprops.item.id)">
            <font-awesome-icon
              class="green--text text-lighten-1"
              icon="eye"
            ></font-awesome-icon>
          </v-btn>
          <v-btn icon small flat
            @click="$router.push(`/app/rekammedik/update/rekammedik/${rprops.rprops.item.id}`)">
            <font-awesome-icon
              class="blue--text text-lighten-1"
              icon="pencil-alt"
            ></font-awesome-icon>
          </v-btn>
          <v-btn icon small flat>
            <font-awesome-icon
              class="red--text text-lighten-1"
              icon="trash"
            ></font-awesome-icon>
          </v-btn>
        </td>
      </template>
    </listing>
    <v-dialog
      v-model="dialogIsVisible"
      max-width="500"
    >
      <v-card>
        <v-layout justify-center align-center row wrap>
          <v-flex sm8 xs12 justify-center flex class="mx-auto">
            <v-layout justify-center flex>
              <v-btn block color="primary" dark>
                Kunjungan Member
              </v-btn>
            </v-layout>
            <v-layout justify-center flex>
              <v-btn block color="info" dark>
                Pasien Lama, Pemilik Baru
              </v-btn>
            </v-layout>
            <v-layout justify-center flex>
              <v-btn block color="warning" dark>
                Pasien Baru, Pemilik Baru
              </v-btn>
            </v-layout>
          </v-flex>
        </v-layout>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import Listing from '@/components/app/commons/Listing'
import Service from '@/services'
import moment from 'moment'

export default {
  components: {
    Listing
  },
  name: 'RekamMedikList',
  data () {
    return {
      name: 'Kunjungan',
      icon: 'folder-open',
      routePath: 'rekammedik',
      headers: [
        {
          text: '',
          value: 'norek',
          sortable: false
        },
        {
          text: 'Penyakit',
          value: '',
          sortable: false
        },
        {
          text: '',
          value: 'waktu',
          sortable: false
        },
        {
          text: 'Pasien',
          value: 'pasien_id',
          sortable: false
        },
        {
          text: 'Pemilik',
          value: 'pemilik_id',
          sortable: false
        },
        {
          text: 'Aksi',
          width: '300',
          align: 'right',
          sortable: false
        }
      ],
      service: Service.RekamMedik,
      dialogIsVisible: false
    }
  },
  methods: {
    viewDetail (id) {
      this.$router.push('/app/rekammedik/detail/' + id)
    },
    formatTanggal (s) {
      return moment(s).fromNow()
    },
    openPerawatan (id) {
      this.$router.push('/app/perawatan/rm/' + id)
    },
    openResep (id) {
      this.$router.push('/app/resep/rm/' + id)
    }
  }
}
</script>

<style>

</style>
