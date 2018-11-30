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
          <v-chip
            small
            dark
            v-bind:class="{ 'blue': rprops.rprops.item.tipe_norek == 'GA',
                            'red': rprops.rprops.item.tipe_norek == 'GB',
                            'green': rprops.rprops.item.tipe_norek == 'GC',
                            'purple': rprops.rprops.item.tipe_norek == 'GD'
                          }"
          >
            <span class="body-2 white--text">{{ rprops.rprops.item.tipe_norek }}</span>
          </v-chip>
          <span>-</span>
          <v-chip small><span>{{ rprops.rprops.item.norek }}</span></v-chip>
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
            @click="viewDetail(rprops.rprops.item.id)">
            <font-awesome-icon
              class="green--text text-lighten-1"
              icon="eye"
            ></font-awesome-icon>
          </v-btn>
          <v-btn small flat icon
            @click="$router.push(`/app/rekammedik/update/rekammedik/${rprops.rprops.item.id}`)">
            <font-awesome-icon
              class="blue--text"
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
  </div>
</template>

<script>
import Listing from '@/components/app/commons/Listing'
import AddFormWrapper from './AddFormWrapper'
import Service from '@/services'
import moment from 'moment'

export default {
  components: {
    Listing,
    AddFormWrapper
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
