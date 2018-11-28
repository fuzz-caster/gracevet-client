<script>
import PemilikAddForm from '@/components/app/commons/add-form/PemilikAddForm'

export default {
  extends: PemilikAddForm,
  data () {
    return {
      saver: it => {
        console.log(it)
      }
    }
  }
}
</script>

<style>

</style>
