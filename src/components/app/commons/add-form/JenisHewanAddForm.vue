<script>
import AddForm from '../AddEditor'
import { jenisHewan } from './structures'
import Service from '@/services'

export default {
  extends: AddForm,
  name: 'JenisHewanAddForm',
  data () {
    return {
      structures: jenisHewan,
      name: 'Jenis Hewan',
      saver: it => {
        return Service.JenisHewan.add(it)
      }
    }
  }
}
</script>

<style>

</style>
