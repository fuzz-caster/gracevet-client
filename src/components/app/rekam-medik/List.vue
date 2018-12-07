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
          <div class="body-1">{{ rprops.rprops.item.tipe_norek }} -- {{ rprops.rprops.item.norek }}</div>
        </td>
        <td>
          <div class="body-1">{{ rprops.rprops.item.pasien_nama }}</div>
        </td>
        <td>
          <div class="body-1">{{ rprops.rprops.item.tanggal }}</div>
        </td>
        <td>
          <div class="body-1">{{ rprops.rprops.item.ras_nama }}</div>
        </td>
        <td>
          <div class="body-1">{{ rprops.rprops.item.pasien_format_jk }}</div>
        </td>
        <td>
          <div class="body-1">{{ formatUmur(rprops.rprops.item.pasien_lahir) }}</div>
        </td>
        <td class="text-md-left">
          <div class="body-1">{{ rprops.rprops.item.berat }}</div>
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
          <v-btn icon small flat
            @click="openDelConfirm(rprops.rprops.item.id)">
            <font-awesome-icon
              class="red--text text-lighten-1"
              icon="trash"
            ></font-awesome-icon>
          </v-btn>
        </td>
      </template>
    </listing>

    <v-dialog
      v-model="delConfirmIsVisible"
      max-width=600
    >
      <v-card>
        <v-container fluid>
          <v-layout row justify-center align-center>
            <div class="title">Apakah anda yakin ingin menghapus data?</div>
          </v-layout>
          <v-layout row justify-center align-center>
            <v-btn @click="delItem(delId)" color="red" dark>Ya</v-btn>
            <v-btn @click="delConfirmIsVisible = false" color="blue" dark>Tidak</v-btn>
          </v-layout>
        </v-container>
      </v-card>
    </v-dialog>
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
          text: 'NO.RM',
          value: 'norek',
          sortable: false
        },
        {
          text: 'Nama Hewan',
          value: '',
          sortable: false
        },
        {
          text: 'Tanggal',
          value: 'waktu',
          sortable: false
        },
        {
          text: 'Ras',
          value: 'ras_nama',
          sortable: false,
          align: 'left'
        },
        {
          text: 'Sex',
          value: 'pasien_format_jk',
          sortable: false,
          align: 'left'
        },
        {
          text: 'Umur',
          value: 'pasien_format_jk',
          sortable: false,
          align: 'left'
        },
        {
          text: 'Berat (Kg)',
          value: 'berat',
          sortable: false,
          align: 'left'
        },
        {
          text: 'Aksi',
          width: '300',
          align: 'right',
          sortable: false
        }
      ],
      service: Service.RekamMedik,
      delConfirmIsVisible: false,
      delId: null
    }
  },
  methods: {
    viewDetail (id) {
      this.$router.push('/app/rekammedik/detail/' + id)
    },
    formatTanggal (s) {
      return moment(s).fromNow()
    },
    formatUmur (s) {
      return moment(s).fromNow(true)
    },
    openPerawatan (id) {
      this.$router.push('/app/perawatan/rm/' + id)
    },
    openResep (id) {
      this.$router.push('/app/resep/rm/' + id)
    },
    async delItem (id) {
      let result = await Service.RekamMedik.remove(id)
      console.log(result)
      this.delConfirmIsVisible = false
      this.$router.go()
    },
    openDelConfirm (id) {
      console.log(id)
      this.delId = id
      this.delConfirmIsVisible = true
    }
  }
}
</script>

<style>

</style>
