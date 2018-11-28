import { Axios } from './Axios'

export function ServiceFactory (basePath, tbname, mapper) {
  var _mapper = (t) => t
  if (mapper !== undefined && mapper !== null) {
    _mapper = mapper
  }
  return {
    list (page, keyword) {
      return Axios.get(basePath, {
        params: {
          command: 'load',
          page,
          keyword
        }
      })
        .then(resp => resp.data)
        .then(ts => {
          let items = ts.items.map(_mapper)
          return Object.assign({}, ts, { items })
        })
    },
    count (keyword) {
      return Axios.get('counter.php', {
        params: {
          command: 'count',
          tbname,
          keyword
        }
      })
        .then(resp => resp.data)
    },
    remove (id) {
      return Axios.get(basePath + `?command=delete&id=${id}`)
    },
    add (data) {
      console.log({ ...data })
      return Axios.post(basePath + `?command=add`, { ...data })
    },
    update (id, data) {
      data.id = id
      let url = `${basePath}?command=update&id=${id}`
      return Axios.post(url, data)
    },
    getById (id) {
      let url = `${basePath}?command=load_by_id&id=${id}`
      return Axios.get(url).then(resp => resp.data).then(data => _mapper(data))
    }
  }
}

export function OptionsFactory () {
  return {
    get (tbname) {
      return Axios.get('options.php?command=load&tbname=' + tbname)
        .then(resp => resp.data)
    }
  }
}

export const Kunjungan = {
  baru (item) {
    // Filter hasil lab and penanganan khusus
    item.hasilLab = item.hasilLab.filter(it => it.selected)
    item.penKhusus = item.penKhusus.filter(it => it.selected)
    return Axios.post('kunjungan/baru_api.php?command=kunjungan_baru', item)
      .then(resp => resp.data)
  },
  member (item) {
    // Filter hasil lab and penanganan khusus
    item.hasilLab = item.hasilLab.filter(it => it.selected)
    item.penKhusus = item.penKhusus.filter(it => it.selected)
    return Axios.post('kunjungan/member_api.php?command=kunjungan_baru', item)
      .then(resp => resp.data)
  }
}
