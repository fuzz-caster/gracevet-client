<script>
import AddForm from '../AddEditor'
import { pasien } from './structures'
import Services from '@/services'

export default {
  extends: AddForm,
  name: 'PasienAddForm',
  data () {
    return {
      structures: pasien,
      name: 'Pasien',
      saver: it => {
        return Services.Pasien.add(it)
      }
    }
  },
  methods: {
    async customMounted () {
      let norek = await Services.Custom.newRekamMedikId()
      this.structures[1].value = norek
    }
  }
}
</script>

<style>

</style>
