<template>
  <div>
    <base-edit-form
        :valid="true"
        :id="id"
        @save="save"/>
  </div>
</template>

<script>
import BaseEditForm from './BaseEditForm'

export default {
  props: ['id'],
  components: {
    BaseEditForm
  },
  methods: {
    save () {
      console.log('save')
    }
  }
}
</script>

<style>

</style>
