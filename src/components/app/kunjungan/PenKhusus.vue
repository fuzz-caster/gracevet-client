<template>
  <div>
    <loading-view v-if="false"/>
    <error-view v-if="false"/>
    <action-bar @save="save" @clear="clear" />
    <div>
      <v-divider/>
      <v-container fluid class="px-0 py-0">
        <v-layout row>
          <v-flex md4 class="px-0">
            <v-list dense class="px-0">
              <template v-for="(it, index) in items">
                <v-list-tile :key="`${it.nama}-${index}`">
                  <v-list-tile-avatar>
                     <v-checkbox v-model="it.selected" height=26></v-checkbox>
                  </v-list-tile-avatar>
                  <v-list-tile-title>{{ it.nama }}</v-list-tile-title>
                  <v-list-tile-action v-if="it.selected">
                    <v-btn flat icon small @click="setActiveIndex(index)">
                      <font-awesome-icon icon="pencil-alt" class="blue--text"></font-awesome-icon>
                    </v-btn>
                  </v-list-tile-action>
                </v-list-tile>
                <v-divider :key="'divider' + it.nama + index"/>
              </template>
            </v-list>
          </v-flex>
          <v-divider vertical/>
          <v-flex md8 v-if="activeIndex !== null" class="pa-0">
            <v-card flat>
              <v-card-title class="title">
                {{ items[activeIndex].nama }}
              </v-card-title>
              <v-card-text class="white">
                <v-textarea
                  color="black"
                  v-model="items[activeIndex].value"
                  full-width
                >
                </v-textarea>
              </v-card-text>
            </v-card>
          </v-flex>
        </v-layout>
        <v-divider/>
      </v-container>
    </div>
  </div>
</template>

<script>
import ErrorView from '@/components/app/commons/ErrorView'
import LoadingView from '@/components/app/commons/LoadingView'
import ActionBar from './ActionBar'
import { all } from './allPenKhusus'

const components = {
  ErrorView,
  LoadingView,
  ActionBar
}

const defData = {
  state: 'loading',
  items: [],
  activeIndex: null
}

export default {
  components,
  data () {
    return defData
  },
  methods: {
    load () {
      all().then(result => {
        let selected = false
        let f = x => Object.assign({}, x, { selected })
        let g = x => Object.assign({}, x, { value: '' })
        result = result.map(f).map(g)
        this.items = result
        let n = this.items.length
        let stored = this.$store.state.kunjungan.penKhusus
        for (let i = 0; i < n; i++) {
          if (i > stored.length) {
            break
          }
          if (stored[i].selected) {
            this.items[i].selected = true
            this.items[i].value = stored[i].value
          }
        }
      }).catch(err => {
        console.log(err)
      })
    },
    setActiveIndex (index) { this.activeIndex = index },
    save () {
      let result = this.items
      this.$store.commit('kunjungan/penKhusus', result)
    },
    clear () {
      this.$store.commit('kunjungan/penKhusus', [])
      this.load()
    }
  },
  mounted () {
    this.load()
  }
}
</script>

<style>

</style>
