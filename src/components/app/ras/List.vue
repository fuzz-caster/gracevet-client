<template>
  <listing
    :name="name"
    :icon="icon"
    :headers="headers"
    :service="service"
    :route-path="routePath"
  >
    <template slot="row-content" slot-scope="rprops">
      <td style="min-width: 80%;">
        <div class="font-weight-bold body-1">{{ rprops.rprops.item.nama }}</div>
        <div class="caption">{{ rprops.rprops.item.nama_jh }}</div>
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
      name: 'Ras',
      icon: 'flask',
      routePath: 'ras',
      headers: [
        {
          text: '',
          value: ''
        },
        {
          text: 'Aksi',
          width: '300',
          align: 'center'
        }
      ],
      service: Service.Ras
    }
  }
}
</script>

<style>

</style>
