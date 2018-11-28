import moment from 'moment'

export const rules = {
  required: v => !!v || 'Harus diisi'
}

// eslint-disable-next-line
export function setInitialValuesFromObject (structure, o) {
  const setVal = t => {
    let x = Object.assign({}, t)
    if (t.split) {
      if (t.type === 'date' && t.combiner === 'datetime') {
        x.value = moment(o[t.field]).format('YYYY-MM-DD')
      }
      if (t.type === 'time' && t.combiner === 'datetime') {
        x.value = moment(o[t.field]).format('HH-mm-ss')
      }
    } else {
      x.value = o[t.field]
    }

    if (t.hasOwnProperty('fromField')) {
      x.value = o[t.fromField]
    }
    return x
  }
  return structure
    .map(setVal)
}

export function transformStructure (s) {
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

const combiners = {
  datetime (a, b) {
    if (a === null || b === null) {
      return null
    }
    return `${a} ${b}:00`
  }
}

export const transformerForSave = (items) => {
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
