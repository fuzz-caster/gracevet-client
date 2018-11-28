<template>
  <div>
    <div v-if="state == 'loading'">Loading</div>
    <v-container
      v-if="state == 'error' || state == 'success'"
      fluid
      style="padding-top: 120px;"
    >
      <v-layout row justify-center align-center>
        <font-awesome-icon v-if="state == 'error'" icon="paper-plane" size="8x" class="red--text"></font-awesome-icon>
        <font-awesome-icon v-if="state == 'success'" icon="paper-plane" size="8x" class="blue--text"></font-awesome-icon>
      </v-layout>
      <v-layout row justify-center align-center class="my-4">
        <div v-if="state == 'error'" class="title">Oops, terjadi kesalahan</div>
        <div v-if="state == 'success'" class="title">Sukses menambahkan data</div>
      </v-layout>
      <v-layout row justify-center align-center>
        <v-btn class="blue lighten-1" dark @click="state = 'idle'"
          v-bind:disable="!validForm">
          Ulangi
        </v-btn>
        <v-btn class="blue lighten-1" dark @click="$router.back()">
          Kembali
        </v-btn>
      </v-layout>
    </v-container>
    <v-container v-if="state == 'idle'" fluid class="mx-0 px-0 mt-0 pt-0">
      <v-toolbar color="white" flat>
        <v-toolbar-title>{{ name }}</v-toolbar-title>
        <v-spacer/>
        <v-btn icon color="indigo"  @click="onSave">
          <font-awesome-icon icon="download" color="white"></font-awesome-icon>
        </v-btn>
        <v-btn icon color="red">
          <font-awesome-icon icon="times" color="white"></font-awesome-icon>
        </v-btn>
      </v-toolbar>
      <v-divider class="mb-4"/>
      <v-layout row>
        <v-flex md8 offset-md2>
          <v-card>
            <v-card-text light>
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
</template>

<script>
import ToolbarSimple from './ToolbarSimple'

const rules = {
  required: v => !!v || 'Harus diisi'
}

function transformStructure (s) {
  let x = Object.assign({}, s)
  if (!x.hasOwnProperty('type')) {
    x.type = 'string'
  }
  if (x.hasOwnProperty('required')) {
    x.required = true
    x.rules = rules.required
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

const required = true
const exampleStructure = [
  {
    name: 'Nama',
    field: 'nama',
    value: '',
    required
  },
  {
    name: 'Tanggal',
    field: 'tanggal',
    value: null,
    type: 'date',
    split: true,
    combiner: 'datetime',
    required
  },
  {
    name: 'Waktu',
    field: 'tanggal',
    value: null,
    type: 'time',
    split: true,
    combiner: 'datetime',
    required
  },
  {
    name: 'Umur',
    field: 'age',
    value: 0,
    type: 'number',
    step: 0.2,
    required
  },
  {
    name: 'Jenis Hewan',
    field: 'id_jenis_hewan',
    type: 'select',
    value: null,
    resolver: exampleSelectResolver,
    required
  }
]

const combiners = {
  datetime (a, b) {
    if (a === null || b === null) {
      return null
    }
    return `${a} ${b}:00`
  }
}

const transformer = (items) => {
  var x = {}
  var combineResult = {}
  items.forEach(t => {
    if (t.hasOwnProperty('split') && t.split) {
      // Check if there is field in combineResult
      if (!combineResult.hasOwnProperty(t.field)) {
        Object.defineProperty(combineResult, t.field, {
          writable: true,
          value: {
            combiner: combiners[t.combiner],
            values: []
          },
          configurable: true,
          enumerable: true
        })
      }
      // Push value to combine result
      combineResult[t.field].values.push(t.value)
    } else {
      Object.defineProperty(x, t.field, {
        writable: true,
        value: t.value,
        configurable: true,
        enumerable: true
      })
    }
  })
  // console.log(combineResult)
  // Combine the result
  Object.getOwnPropertyNames(combineResult).forEach(y => {
    let z = combineResult[y].combiner(...combineResult[y].values)
    Object.defineProperty(x, y, {
      writable: true,
      value: z,
      configurable: true,
      enumerable: true
    })
  })
  return x
}

export default {
  components: {
    ToolbarSimple
  },
  data () {
    return {
      state: 'idle',
      name: 'Ras',
      icon: 'paw',
      saver: (item) => {
        console.log(item)
        return Promise.reject(new Error('Fuck it'))
      },
      rules,
      structures: exampleStructure.map(transformStructure)
    }
  },

  computed: {
    validForm () {
      var result = true
      this.structures.forEach(x => {
        if (x.hasOwnProperty(required) && x.required) {
          result = result && !!x.value
        }
      })
      return result
    }
  },

  methods: {
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
    onSave () {
      let result = transformer(this.structures)
      this.state = 'loading'
      this.saver(result)
        .then(() => {
          this.state = 'success'
        })
        .catch(err => {
          console.log(err)
          this.state = 'error'
        })
    },
    async customMounted () {
      console.log('Custom')
    }
  },

  mounted () {
    this.resolveFormReferences()
    this.customMounted()
  }
}
</script>

<style>

</style>
