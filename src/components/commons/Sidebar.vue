<template>
  <div>
    <v-navigation-drawer
      :mini-variant="miniVariant"
      :value="true"
      app
      fixed
      width=220
      class="grey lighten-4"
    >
      <v-toolbar
        clipped
        dark
        color="indigo darken-1"
      >
        <v-toolbar-title>
          <v-btn color="purple lighten-1" icon class="ml-0" @click="miniVariant = !miniVariant">
            <font-awesome-icon class="white--text" icon="cogs"></font-awesome-icon>
          </v-btn>
          <span class="white--text">Gracevet</span>
        </v-toolbar-title>
      </v-toolbar>

      <v-list avatar dense>
        <v-list-tile class="my-2">
          <v-list-tile-content>
            <v-btn
              @click="dialogIsVisible = true"
              dark small color="purple">Tambah Kunjungan</v-btn>
          </v-list-tile-content>
        </v-list-tile>
        <v-subheader>
          Menu
        </v-subheader>
        <template v-for="(item, i) in navs">
          <v-list-tile
            ripple
            :key="item.name"
            @click="$router.push(item.link)"
            style="height: 38px;"
          >
            <v-list-tile-avatar>
              <v-avatar color="grey lighten-2" size=28>
                <font-awesome-icon 
                  :icon="item.icon" v-bind:class="item.iconColor + '--text  text--darken-2'" ></font-awesome-icon>
              </v-avatar>
            </v-list-tile-avatar>
            <v-list-tile-title class="caption">{{ item.name }}</v-list-tile-title>
          </v-list-tile>
        </template>
      </v-list>
    </v-navigation-drawer>
    <v-dialog
      v-model="dialogIsVisible"
      max-width="800"
    >
      <add-form-wrapper
        @open-add-form="openAddForm"/>
    </v-dialog>
  </div>
</template>

<script>
import sidebar from './sidebar'
import AddFormWrapper from './AddFormWrapper'

export default {
  name: 'Sidebar',
  components: {
    AddFormWrapper
  },
  data () {
    return {
      navs: sidebar.navs,
      miniVariant: false,
      dialogIsVisible: false
    }
  },
  methods: {
    openAddForm (path) {
      this.$router.push(path)
      this.dialogIsVisible = false
    }
  }
}
</script>

<style lang="scss" scoped>
  .main-sidebar {
  }
</style>
