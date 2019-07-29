import Service from '@/services'

const required = true

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

export const pemilik = [
  {
    name: 'Nama',
    field: 'nama',
    value: '',
    required
  },
  {
    name: 'Alamat',
    field: 'alamat',
    value: '',
    required
  },
  {
    name: 'No. Telp',
    field: 'no_telp',
    value: '',
    required
  }
].map(transformStructure)

export const pasien = [
  {
    name: 'Tipe Rekam Medik',
    field: 'tipe_norek',
    value: 'GA',
    required,
    type: 'select',
    options: [
      'GA', 'GB', 'GC', 'GD'
    ]
  },
  {
    name: 'Rekam Medik',
    field: 'norek',
    value: '',
    required,
    type: 'number'
  },
  {
    name: 'Nama',
    field: 'nama',
    value: '',
    required
  },
  {
    name: 'Lahir',
    field: 'lahir',
    value: null,
    type: 'date',
    required
  },
  {
    name: 'Jenis Kelamin',
    field: 'jk',
    value: '',
    type: 'select',
    options: [
      {
        value: '0',
        text: 'Betina'
      },
      {
        value: '1',
        text: 'Jantan'
      }
    ]
  },
  {
    name: 'Tatto/Chip',
    field: 'tatto_chip',
    value: ''
  },
  {
    name: 'Signalemen',
    field: 'signalemen',
    value: '',
    required
  },
  {
    name: 'Ras',
    field: 'id_ras',
    fromField: 'ras_id',
    type: 'select',
    value: null,
    resolver: () => Service.Options.get('ras'),
    required
  }
].map(transformStructure)

export const ras = [
  {
    name: 'Nama',
    field: 'nama',
    value: '',
    required
  },
  {
    name: 'Jenis Hewan',
    field: 'id_jenis_hewan',
    type: 'select',
    fromField: 'id_jh',
    value: null,
    resolver: () => Service.Options.get('jenis_hewan'),
    required
  }
].map(transformStructure)

export const penKhusus = [
  {
    name: 'Nama',
    field: 'nama',
    value: '',
    required
  }
].map(transformStructure)

export const jenisHewan = [
  {
    name: 'Nama',
    field: 'nama',
    value: '',
    required
  }
].map(transformStructure)

export const penyakit = [
  {
    name: 'Nama',
    field: 'nama',
    value: '',
    required
  }
].map(transformStructure)
