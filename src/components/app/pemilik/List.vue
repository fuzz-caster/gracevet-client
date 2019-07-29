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
        <div class="font-weight-bold body-1">{{ rprops.rprops.item.nama }}</div>
      </td>
      <td>
        <div class="caption">{{ rprops.rprops.item.alamat }}</div>
      </td>
      <td>
        <div class="caption">{{ rprops.rprops.item.no_telp }}</div>
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
      name: 'Pemilik',
      icon: 'heart',
      routePath: 'pemilik',
      headers: [
        {
          text: 'Nama',
          value: 'nama'
        },
        {
          text: 'Alamat',
          value: 'alanat'
        },
        {
          text: 'No. Telp',
          value: 'no_telp'
        },
        {
          text: 'Aksi',
          width: '200',
          align: 'center'
        }
      ],
      service: Service.Pemilik
    }
  }
}
</script>

<style>

</style>
