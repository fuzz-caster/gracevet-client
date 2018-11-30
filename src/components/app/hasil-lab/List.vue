<template>
  <listing
    :name="name"
    :icon="icon"
    :headers="headers"
    :service="service"
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
  name: 'HasilLabList',
  data () {
    return {
      name: 'Hasil Lab',
      icon: 'folder-open',
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
      service: Service.HasilLab
    }
  }
}
</script>

<style>

</style>
