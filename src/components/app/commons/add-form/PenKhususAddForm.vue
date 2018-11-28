<script>
import AddForm from '../AddEditor'
import { penKhusus } from './structures'
import Service from '@/services'

export default {
  extends: AddForm,
  name: 'RasAddForm',
  data () {
    return {
      structures: penKhusus,
      name: 'Penanganan Khusus',
      saver: it => {
        return Service.PenKhusus.add(it)
      }
    }
  }
}
</script>

<style>

</style>
