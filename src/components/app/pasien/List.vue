<template>
  <listing
    :name="name"
    :icon="icon"
    :headers="headers"
    :service="service"
    :route-path="routePath"
  >
    <template slot="row-content" slot-scope="rprops">
      <td>
        <div class="font-weight-bold body-1">{{ rprops.rprops.item.tipe_norek }}</div>
        <div class="caption">{{ rprops.rprops.item.norek }}</div>
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
          width: '140'
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
