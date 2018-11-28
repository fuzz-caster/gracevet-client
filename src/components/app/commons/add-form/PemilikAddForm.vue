<script>
import AddForm from '../AddEditor'
import { pemilik } from './structures'
import Service from '@/services'

export default {
  extends: AddForm,
  data () {
    return {
      structures: pemilik,
      name: 'Pemilik',
      saver: it => {
        return Service.Pemilik.add(it)
      }
    }
  }
}
</script>

<style>

</style>
