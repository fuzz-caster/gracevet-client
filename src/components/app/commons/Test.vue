<template>
  <div>
    <h2>Foobar</h2>
  </div>
</template>

<script>

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
    name: 'Jenis Hewan',
    field: 'id_jenis_hewan',
    type: 'select',
    value: null,
    resolver: exampleSelectResolver
  }
]

export default {
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
  }
}
</script>

<style>

</style>
