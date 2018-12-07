<template>
  <div>
    <loading-view v-if="state == 'loading'"/>
    <error-view v-if="state == 'error'" @reload="state = 'idle'"
      :message="errorMessage"/>
    <success-view v-if="state == 'success'"
      :message="'Sukses mengubah data ' + name"
      :actions="successActions"/>
    <div v-if="state == 'idle'" style="height: 100%;">
      <v-container app fluid class="ma-0 pa-0 white pt-4" fill-height>
        <v-layout row wrap>
          <v-flex md6 offset-md3 fill-height>
            <v-card raised>
              <v-toolbar
                flat
                dark
                color="pink darken-1"
              >
                <v-toolbar-title>Edit Data {{ name }}</v-toolbar-title>
                <v-spacer/>
                <v-toolbar-items>
                  <v-btn color="indigo" icon @click="update">
                    <font-awesome-icon icon="download" color="white"></font-awesome-icon>
                  </v-btn>
                  <v-btn color="red" icon @click="$router.back()">
                    <font-awesome-icon icon="times" color="white"></font-awesome-icon>
                  </v-btn>
                </v-toolbar-items>
              </v-toolbar>
              <v-card-text>
                <template v-for="(x, index) in structures">
                  <v-text-field
                    v-if="x.type == 'string'"
                    :key="x.field + index"
                    :label="x.name"
                    v-model="x.value"
                    :rules="x.required ? [x.rules] : []"
                  >
                  </v-text-field>

                  <v-menu
                    v-if="x.type == 'date'"
                    :key="x.field + index"
                    lazy
                    transition="scale-transition"
                    offset-y
                    full-width
                    min-width="290px"
                  >
                    <v-text-field
                      slot="activator"
                      v-model="x.value"
                      :label="x.name"
                      readonly
                    ></v-text-field>
                      <v-date-picker v-model="x.value" no-title scrollable
                      :rules="x.required ? [x.rules] : []">
                    </v-date-picker>
                  </v-menu>

                  <v-menu
                    v-if="x.type == 'time'"
                    :key="x.field + index"
                    lazy
                    transition="scale-transition"
                    offset-y
                    full-width
                    min-width="290px"
                  >
                    <v-text-field
                      slot="activator"
                      v-model="x.value"
                      :label="x.name"
                      readonly
                    ></v-text-field>
                      <v-time-picker
                      v-model="x.value"
                      full-width
                      :rules="x.required ? [x.rules] : []"
                    ></v-time-picker>
                  </v-menu>

                  <v-text-field
                    v-if="x.type == 'number'"
                    :key="x.field + index"
                    :label="x.name"
                    v-model="x.value"
                    type="number"
                    v-bind:step="x.step"
                    v-bind:min="x.min"
                    v-bind:max="x.max"
                    :rules="x.required ? [x.rules] : []"
                  >
                  </v-text-field>
                  <v-select
                    v-if="x.type == 'select'"
                    :key="x.field + index"
                    :label="x.name"
                    :items="x.options"
                    v-model="x.value"
                    :rules="x.required ? [x.rules] : []"
                  >
                  </v-select>
                </template>
              </v-card-text>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </div>
  </div>
</template>

<script>
import ToolbarSimple from '../ToolbarSimple'
import ErrorView from '../ErrorView'
import SuccessView from '../SuccessView'
import LoadingView from '../LoadingView'
import { transformerForSave, rules, setInitialValuesFromObject } from './dynamic-form'

export default {
  name: 'UpdateFormBase',
  props: ['id', 'listPath'],
  components: {
    ToolbarSimple,
    LoadingView,
    ErrorView,
    SuccessView
  },
  data () {
    return {
      state: 'idle',
      name: null,
      icon: null,
      service: null,
      errorMessage: '',
      rules,
      structures: null,
      successActions: [
        {
          name: 'Ulangi',
          doIt: () => {
            this.reload()
          }
        },
        {
          name: 'List',
          doIt: () => {
            this.$router.back()
          }
        }
      ]
    }
  },

  computed: {
    validForm () {
      var result = true
      this.structures.forEach(x => {
        if (x.hasOwnProperty('required') && x.required) {
          result = result && !!x.value
        }
      })
      return result
    }
  },

  methods: {
    getById () {
      return this.service.getById(this.id)
        .then(it => {
          // Fuckt this line!!! I spent two fucking hours trying
          // to figured out why the structures i generate differ from the structures
          // inside child component. Fuck Me!! Fuck My Ancestor!!
          this.structures = setInitialValuesFromObject(this.structures, it)
        })
        .catch(err => {
          console.log(err)
          throw err
        })
    },
    resolveFormReferences () {
      for (let index = 0; index < this.structures.length; index++) {
        const x = this.structures[index]
        if (x.type === 'select' && x.options.length === 0) {
          x.resolver()
            .then(options => {
              this.structures[index].options = options
            })
            .catch(err => {
              console.log(err)
              console.log(`Fail to get options for field ${x}`)
              throw err
            })
        }
      }
    },
    update () {
      let result = transformerForSave(this.structures)
      this.state = 'loading'
      this.service.update(this.id, result)
        .then(() => {
          this.state = 'success'
        })
        .catch(err => {
          console.log(err)
          this.state = 'error'
          this.errorMessage = `Gagal mengubah data ${name}`
        })
    },
    reload () {
      this.state = 'loading'
      this.getById()
        .then(() => this.resolveFormReferences())
        .then(() => {
          this.state = 'idle'
        })
        .catch(err => {
          console.log(err)
          this.errorMessage = `Gagal mengambil data ${name}`
          this.state = 'error'
        })
    }
  },

  mounted () {
    this.reload()
  }
}
</script>

<style>

</style>
