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
      </td>
      <td>
        <div class="body-1">{{ rprops.rprops.item.satuan }}</div>
      </td>
      <td>
        <div class="body-1">{{ rprops.rprops.item.harga }}</div>
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
  name: 'ObatListing',
  data () {
    return {
      name: 'Obat',
      icon: 'heart-beat',
      routePath: 'obat',
      headers: [
        {
          text: 'Nama',
          value: 'nama'
        },
        {
          text: 'Satuan',
          value: 'satuan'
        },
        {
          text: 'Harga',
          value: 'harga'
        },
        {
          text: 'Aksi',
          width: '300',
          align: 'center'
        }
      ],
      service: Service.Obat
    }
  }
}
</script>

<style>

</style>
