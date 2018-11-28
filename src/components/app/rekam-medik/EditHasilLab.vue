<template>
  <div>
    <loading-view v-if="state == 'loading'"/>
    <error-view v-if="state == 'error'" @reload="state = 'idle'"
      :message="errorMessage"/>
    <success-view v-if="state == 'success'"
      message="Sukses mengubah data hasil lab"
      :actions="successActions"/>
    <div v-if="state == 'idle'">
      <base-edit-form
        :valid="true"
        :id="id"
        @save="save"/>
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
  </div>
</template>

<script>
import ErrorView from '@/components/app/commons/ErrorView'
import LoadingView from '@/components/app/commons/LoadingView'
import SuccessView from '@/components/app/commons/SuccessView'
import { all } from '@/components/app/kunjungan/allHasilLab'
import Scoped from '@/services/Scoped'
import BaseEditForm from './BaseEditForm'

const components = {
  ErrorView,
  LoadingView,
  SuccessView,
  BaseEditForm
}

export default {
  components,
  props: ['id'],
  data () {
    return {
      state: 'idle',
      items: [],
      activeIndex: null,
      errorMessage: '',
      successActions: [
        {
          name: 'Ulangi',
          doIt: () => {
            this.load()
          }
        }
      ]
    }
  },
  methods: {
    async load () {
      this.state = 'loading'
      try {
        let result = await all()
        let selected = false
        let f = x => Object.assign({}, x, { selected })
        result = result.map(f)
        this.items = result
        let n = this.items.length
        let stored = await Scoped.RekamMedik.getHasilLab(this.id)
        for (let i = 0; i < n; i++) {
          for (let j = 0; j < stored.length; j++) {
            // eslint-disable-next-line
            if (this.items[i].id === stored[j].id_tipe_hasil_lab) {
              this.items[i].selected = true
              this.items[i].struktur = stored[j].struktur
            }
          }
        }
        this.state = 'idle'
      } catch (err) {
        console.log(err)
        this.state = 'error'
        this.errorMessage = 'Gagal mengambil data hasil lab'
      }
    },
    setActiveIndex (index) { this.activeIndex = index },
    save () {
      let result = this.items.filter(it => it.selected)
      this.state = 'loading'
      return Scoped.RekamMedik.setHasilLab(this.id, result)
        .then(resp => {
          if (resp.status !== 200) {
            throw new Error('Something bad happens in server')
          }
          this.state = 'success'
        })
        .catch(err => {
          console.log(err)
          this.state = 'error'
        })
    }
  },
  mounted () {
    this.load()
  }
}
</script>

<style>

</style>
