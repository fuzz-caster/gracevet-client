<script>
import AddForm from '../AddEditor'
import { ras } from './structures'
import Service from '@/services'

export default {
  extends: AddForm,
  name: 'RasAddForm',
  data () {
    return {
      structures: ras,
      name: 'Ras',
      saver: it => {
        return Service.Ras.add(it)
      }
    }
  }
}
</script>

<style>

</style>
