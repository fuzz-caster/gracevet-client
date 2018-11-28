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
        <div class="font-weight-bold body-1">{{ rprops.rprops.item.nama }}</div>
        <div class="caption">{{ rprops.rprops.item.nama_jh }}</div>
      </td>
      <td>
        <div class="body-1">{{ rprops.rprops.item.penggunaan_terakhir }}</div>
        <div class="caption">{{ rprops.rprops.item.elapsed }}</div>
      </td>
      <td class="body-1 text-xs-center">
        {{ rprops.rprops.item.total_kunjungan }}
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
  name: 'PenKhususList',
  data () {
    return {
      name: 'Penanganan Khusus',
      icon: 'folder-open',
      routePath: 'penkhusus',
      headers: [
        {
          text: '',
          value: ''
        },
        {
          text: 'Kunjungan Terakhir',
          value: 'penggunaan_terakhir',
          width: '300'
        },
        {
          text: 'Total Kunjungan',
          width: '50',
          value: 'total_kunjungan',
          align: 'center'
        },
        {
          text: 'Aksi',
          width: '300',
          align: 'center'
        }
      ],
      service: Service.PenKhusus
    }
  }
}
</script>

<style>

</style>
