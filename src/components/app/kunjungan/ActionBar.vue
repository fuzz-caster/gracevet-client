<template>
  <div class="app-btn-bar">
    <v-btn
      depressed
      color="primary"
      large
      @click="$emit('save')"
      class="my-2 mb-4 ml-0"
      :disabled="invalid">
      Simpan
    </v-btn>
    <v-btn
      depressed
      color="warning"
      large
      @click="$emit('clear')"
      class="my-2 mb-4 ml-4">
      Clear
    </v-btn>
  </div>
</template>

<script>
export default {
  props: {
    invalid: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style>
.app-btn-bar {
  display: flex;
  margin-left: 24px;
  margin-top: 24px;
}
</style>
