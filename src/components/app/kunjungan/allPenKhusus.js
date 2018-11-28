import { Axios } from '@/services/Axios'

export async function all () {
  let basePath = 'tipe-pen-khusus/api_dao_tipe_pen_khusus.php'
  let command = 'all'
  let params = { command }
  let config = { params }
  let result = await Axios.get(basePath, config).then(resp => resp.data)

  return result
}
