<template>
  <listing
    :name="name"
    :icon="icon"
    :headers="headers"
    :service="service"
    :route-path="routePath"
    :show-add="false"
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
        <div class="font-weight-bold body-1">{{ rprops.rprops.item.nama }}</div>
      </td>
      <td>
        <div class="caption">{{ rprops.rprops.item.format_jk }}</div>
      </td>
      <td>
        <div class="caption">{{ rprops.rprops.item.ras_nama }}</div>
      </td>
      <td>
        <div class="caption">{{ rprops.rprops.item.tatto_chip }}</div>
      </td>
      <td>
        <div class="caption">{{ rprops.rprops.item.jh_nama }}</div>
      </td>
    </template>
  </listing>
</template>

<script>
import Listing from '@/components/app/commons/Listing'
import Service from '@/services'

export default {
  components: {
    Listing
  },
  name: 'RasList',
  data () {
    return {
      name: 'Pasien',
      icon: 'heart-beat',
      routePath: 'pasien',
      headers: [
        {
          text: 'Rekam Medik',
          value: '',
          width: '200'
        },
        {
          text: 'Nama',
          value: ''
        },
        {
          text: 'Sex',
          value: 'format_jk',
          width: '120'
        },
        {
          text: 'Ras',
          value: 'ras_nama',
          width: '120'
        },
        {
          text: 'Tatto/Chip',
          value: '',
          width: '120'
        },
        {
          text: 'Jenis',
          value: 'jh_nama',
          width: '120'
        },
        {
          text: 'Aksi',
          width: '160',
          align: 'center'
        }
      ],
      service: Service.Pasien
    }
  }
}
</script>

<style>

</style>
