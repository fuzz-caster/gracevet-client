 <template>
  <div>
    <v-toolbar dark color="purple darken-1">
      <v-text-field
        placeholder="keyword"
        hide-details
        box
        solo-inverted
        v-model="keyword"
        @keyup="search(keyword)"
      >
      </v-text-field>
      <v-spacer/>
      <div>
        <v-chip>{{ selectedPemilik.nama }}</v-chip>
      </div>
      <v-btn color="primary"
        :disabled="selectedId === null"
        @click="$emit('done', selectedId)"
      >
        Ok
      </v-btn>
    </v-toolbar>
    <v-container fluid class="pa-0 mt-4">
      <v-layout row v-for="(it, i) in items" :key="i" class="py-2" style="border-bottom: 1px solid #DDD;">
        <v-flex md1>
          <v-checkbox
            @click="selectedId = it.id"
            :value="selectedId == it.id"
            small class="my-0 ml-2"
            hide-details></v-checkbox>
        </v-flex>
        <v-flex md2>
          <v-layout row align-center fill-height>
            <div class="body-2">{{ it.nama }}</div>
          </v-layout>
        </v-flex>
        <v-flex md2>
          <div>
            <v-chip small class="my-0">{{ it.alamat }}</v-chip> 
            <v-chip small class="my-0">{{ it.no_telp }}</v-chip></div>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
 </template>
 
<script>
import Services from '@/services'

export default {
  data () {
    return {
      items: [],
      keyword: '',
      selectedId: null
    }
  },
  computed: {
    selectedPemilik () {
      let defPemilik = {
        nama: '---',
        alamat: '---',
        no_telp: '---'
      }
      if (this.selectedId === null) {
        return defPemilik
      }
      let selId = this.selectedId
      let it = this.items.find(it => it.id === selId)
      return it
    }
  },
  methods: {
    search (keyword) {
      this.selectedId = null
      Services.Pemilik.list(1, keyword)
        .then(items => {
          this.items = items.items
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
}
</script>
 
<style>
 
</style>
 