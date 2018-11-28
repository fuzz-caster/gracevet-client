<template>
  <div>
    <div v-if="state == 'loading'">Loading</div>
    <div v-if="state == 'error'">Error</div>
    <v-container v-if="state == 'idle'" fluid class="mx-0">
      <toolbar-simple
        :name="name"
        :icon="icon"
      />
      <v-layout row>
        <v-flex md8 offset-md2>
          <v-card>
            <v-toolbar
              dark
              color="cyan">
              <v-toolbar-title>Input Data {{ name }}</v-toolbar-title>
            </v-toolbar>
            <v-card-text light>
              <template v-for="(x, index) in structures">
                <v-text-field
                  v-if="x.type == 'string'"
                  :key="x.field"
                  :label="x.name"
                  v-model="x.value"
                >
                </v-text-field>

                <v-menu
                  v-if="x.type == 'date'"
                  :key="x.field"
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
                   <v-date-picker v-model="x.value" no-title scrollable>
                  </v-date-picker>
                </v-menu>

                <v-menu
                  v-if="x.type == 'time'"
                  :key="x.field"
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
                  ></v-time-picker>
                </v-menu>

                <v-text-field
                  v-if="x.type == 'number'"
                  :key="x.field"
                  :label="x.name"
                  v-model="x.value"
                  type="number"
                  v-bind:step="x.step"
                  v-bind:min="x.min"
                  v-bind:max="x.max"
                >
                </v-text-field>
                <v-select
                  v-if="x.type == 'select'"
                  :key="x.field"
                  :label="x.name"
                  :items="x.options"
                  v-model="x.value"
                >
                </v-select>
              </template>
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import ToolbarSimple from './ToolbarSimple'

function transformStructure (s) {
  let x = Object.assign({}, s)
  if (!x.hasOwnProperty('type')) {
    x.type = 'string'
  }

  if (x.type === 'select') {
    if (!x.hasOwnProperty('options')) {
      x.options = []
    }
  }

  if (x.type === 'number') {
    if (!x.hasOwnProperty('min')) {
      x.min = 0
    }
    if (!x.hasOwnProperty('max')) {
      x.max = 1000
    }
    if (!x.hasOwnProperty('step')) {
      x.step = 1
    }
  }

  return x
}

const exampleSelectResolver = async () => {
  return [
    {
      value: 1,
      text: 'A'
    },
    {
      value: 2,
      text: 'B'
    }
  ]
}

const exampleStructure = [
  {
    name: 'Nama',
    field: 'nama',
    value: ''
  },
  {
    name: 'Tanggal',
    field: 'tanggal',
    value: null,
    type: 'date'
  },
  {
    name: 'Waktu',
    field: 'waktu',
    value: null,
    type: 'time'
  },
  {
    name: 'Umur',
    field: 'age',
    value: 0,
    type: 'number',
    step: 0.2
  },
  {
    name: 'Jenis Hewan',
    field: 'id_jenis_hewan',
    type: 'select',
    value: null,
    resolver: exampleSelectResolver
  }
]

export default {
  components: {
    ToolbarSimple
  },
  data () {
    return {
      state: 'idle',
      name: 'Ras',
      icon: 'paw',
      structures: exampleStructure.map(transformStructure)
    }
  },

  methods: {
    resolveFormReferences () {
      for (let index = 0; index < this.structures.length; index++) {
        const x = this.structures[index]
        if (x.type === 'select') {
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
    }
  },

  mounted () {
    this.resolveFormReferences()
  }
}
</script>

<style>

</style>
