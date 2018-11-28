<template>
  <v-navigation-drawer
      :mini-variant="miniVariant"
      :clipped="clipped"
      v-model="drawer"
      enable-resize-watcher
      app
      fixed
      floating
      class="grey lighten-4"
    >
    <v-toolbar
      clipped
      flat
      color="teal darken-2"
    >
      <v-toolbar-title>
        <v-btn color="purple lighten-1" icon class="ml-0" @click="miniVariant = !miniVariant">
          <font-awesome-icon class="white--text" icon="cogs"></font-awesome-icon>
        </v-btn>
        <span class="white--text">Gracevet</span>
      </v-toolbar-title>
    </v-toolbar>

    <v-list avatar dense>
      <template v-for="(item, i) in navs">
        <v-subheader
          v-if="item.header"
          :key="item.header">
          {{ item.header }}
        </v-subheader>

        <v-list-tile
          v-else
          ripple
          :key="item.name"
          @click="$router.push(item.link)"
        >
          <v-list-tile-avatar>
            <font-awesome-icon 
              :icon="item.icon" v-bind:class="item.iconColor + '--text  text--darken-2'" ></font-awesome-icon>
          </v-list-tile-avatar>
          <v-list-tile-title class="caption">{{ item.name }}</v-list-tile-title>
        </v-list-tile>
      </template>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import sidebar from './sidebar'

export default {
  name: 'Sidebar',
  props: ['clipped', 'drawer'],
  data () {
    return {
      navs: sidebar.navs,
      miniVariant: false
    }
  }
}
</script>

<style lang="scss" scoped>
  .main-sidebar {
  }
</style>
