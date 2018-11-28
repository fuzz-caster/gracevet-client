import { Axios } from '@/services/Axios'

export async function all () {
  let basePath = 'tipe-hasil-lab/api_dao_tipe_hasil_lab.php'
  let command = 'all'
  let params = { command }
  let config = { params }
  let result = await Axios.get(basePath, config).then(resp => resp.data)

  // Parse struktur from string
  let g = t => Object.assign({}, t, { struktur: JSON.parse(t.struktur) })

  let f = t => {
    // Add value field
    let f1 = x => Object.assign({}, x, { value: null })

    // Change the type 'string' to text
    let f2 = u => {
      let type = u.type === 'string' ? 'text' : u.type
      return Object.assign({}, u, { type })
    }

    let struktur = t.struktur.map(f1).map(f2)
    return Object.assign({}, t, { struktur })
  }

  let transformed = result.map(g).map(f)
  return transformed
}
