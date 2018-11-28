<script>
import AddForm from '../AddEditor'
import { penyakit } from './structures'
import Service from '@/services'

export default {
  extends: AddForm,
  data () {
    return {
      structures: penyakit,
      name: 'Penyakit',
      saver: it => {
        return Service.Penyakit.add(it)
      }
    }
  }
}
</script>

<style>

</style>
