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
  name: 'PenyakitListing',
  data () {
    return {
      name: 'Penyakit',
      icon: 'heart-beat',
      routePath: 'penyakit',
      headers: [
        {
          text: 'Nama',
          value: 'nama'
        },
        {
          text: 'Aksi',
          width: '200',
          align: 'center'
        }
      ],
      service: Service.Penyakit
    }
  }
}
</script>

<style>

</style>
