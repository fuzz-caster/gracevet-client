<template>
  <div style="height: 100%;">
    <sidebar :mini-variant="miniVariant" :clipped="clipped" :drawer="drawer"/>
    <!-- <v-toolbar
      app
      color="white"
    >
      <v-toolbar-side-icon @click.stop="miniVariant = !miniVariant"></v-toolbar-side-icon>
      <v-text-field
        class="mx-3 white--text"
        flat
        label="Search"
        prepend-inner-icon="search"
      ></v-text-field>
      <v-btn
        icon
        flat
        @click.stop="rightDrawer = !rightDrawer">
        <font-awesome-icon icon="user" class="pink--text"></font-awesome-icon>
      </v-btn>
    </v-toolbar> -->
    <router-view/>
    <v-navigation-drawer
      temporary
      :right="right"
      v-model="rightDrawer"
      fixed
      app
    >
      <v-list>
        <v-list-tile @click="right = !right">
          <v-list-tile-action>
            <v-icon>compare_arrows</v-icon>
          </v-list-tile-action>
          <v-list-tile-title>Switch drawer (click me)</v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
import Sidebar from '@/components/commons/Sidebar'

export default {
  components: {
    Sidebar
  },
  data () {
    return {
      clipped: false,
      drawer: true,
      fixed: false,
      items: [{
        icon: 'bubble_chart',
        title: 'Inspire'
      }],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Vuetify.js'
    }
  },
  name: 'Dashboard'
}
</script>

<style lang="scss">
</style>
