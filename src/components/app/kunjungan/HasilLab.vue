<template>
  <div>
    <loading-view v-if="false"/>
    <error-view v-if="false"/>
    <action-bar
      @save="save"
      @clear="clear"
    />
    <v-divider/>
    <v-container fluid class="pa-0">
      <v-layout row>
        <v-flex md4>
          <v-list dense>
            <template v-for="(it, index) in items">
              <v-list-tile :key="it.nama">
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
              <v-divider :key="'divider' + it.nama"/>
            </template>
          </v-list>
        </v-flex>
        <v-divider vertical/>
        <v-flex md8 v-if="activeIndex !== null">
          <v-card flat>
            <v-card-title class="title">
              {{ items[activeIndex].nama }}
            </v-card-title>
            <v-card-text>
              <template v-for="(it, index) in items[activeIndex].struktur">
                <v-text-field
                  :key="`${it.nama}${index}`"
                  v-model="it.value"
                  :label="it.nama"
                  :type="it.type"
                  color="white"
                >
                </v-text-field>
              </template>
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
      <v-divider/>
    </v-container>
  </div>
</template>

<script>
import ErrorView from '@/components/app/commons/ErrorView'
import ActionBar from './ActionBar'
import LoadingView from '@/components/app/commons/LoadingView'
import { all } from './allHasilLab'

const components = {
  ErrorView,
  LoadingView,
  ActionBar
}

const data = {
  state: 'loading',
  items: [],
  activeIndex: null
}

export default {
  components,
  data () {
    return data
  },
  methods: {
    async load () {
      try {
        let result = await all()
        let selected = false
        let f = x => Object.assign({}, x, { selected })
        result = result.map(f)
        this.items = result
        let n = this.items.length
        let stored = this.$store.state.kunjungan.hasilLab
        for (let i = 0; i < n; i++) {
          if (i > stored.length) {
            break
          }
          if (stored[i].selected) {
            this.items[i].selected = true
            this.items[i].struktur = stored[i].struktur
          }
        }
      } catch (err) {
        console.log(err)
      }
    },
    setActiveIndex (index) { this.activeIndex = index },
    save () {
      let result = this.items
      console.log(result)
      this.$store.commit('kunjungan/hasilLab', result)
      this.$router.push('/app/kunjungan/penkhusus')
    },
    clear () {
      this.$store.commit('kunjungan/hasilLab', [])
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
