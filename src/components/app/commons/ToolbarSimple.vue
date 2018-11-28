<template>
  <v-toolbar
    flat
  >
    <v-toolbar-side-icon>
      <font-awesome-icon
        :icon="icon"
        size="lg"
      ></font-awesome-icon>
    </v-toolbar-side-icon>
    <v-toolbar-title>{{ name }}</v-toolbar-title>
  </v-toolbar>
</template>

<script>
export default {
  name: 'ToolbarSimple',
  props: ['icon', 'name']
}
</script>

<style>

</style>
