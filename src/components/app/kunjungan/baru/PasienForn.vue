<script>
import PasienAddForm from '@/components/app/commons/add-form/PasienAddForm'

export default {
  extends: PasienAddForm,
  data () {
    return {
      saver: it => {
        console.log(it)
      }
    }
  }
}
</script>
