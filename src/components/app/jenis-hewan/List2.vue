<template>
  <div>
    <v-container
      v-if="state == 'loading'"
      fluid
    >
      <v-layout row justify-center align-center>
        Loading..
      </v-layout>
    </v-container>
    <v-container
      v-if="state == 'error'"
      fluid
      style="padding-top: 120px;"
    >
      <v-layout row justify-center align-center>
        <font-awesome-icon icon="paper-plane" size="8x" class="red--text"></font-awesome-icon>
      </v-layout>
      <v-layout row justify-center align-center class="my-4">
        <div class="title">Oops, terjadi kesalahan</div>
      </v-layout>
      <v-layout row justify-center align-center>
        <v-btn class="blue lighten-1" dark @click="reload">
          reload!!
        </v-btn>
      </v-layout>
    </v-container>
    <v-container
      v-if="state == 'success'"
      fluid
      class="px-0"
    >
      <v-divider/>
      <v-toolbar
        flat
      >
        <v-toolbar-side-icon>
          <font-awesome-icon
            icon="paw"
            size="lg"
          ></font-awesome-icon>
        </v-toolbar-side-icon>
        <v-toolbar-title>{{ name }}</v-toolbar-title>
        <v-spacer/>
        <v-toolbar-items class="more-space">
          <v-text-field
            v-model="keyword"
            @input="$emit('keyword-change', keyword)"
            class="mx-3 search-field"
            flat
            label="Search"
            append-icon="search"
            @click:append="reload"
          ></v-text-field>
          <paging :current="paging.current" :total="paging.total"
            @paging-next="onPagingChange($event)"
            @paging-prev="onPagingChange($event)"
            @paging-goto="onPagingChange($event)"
          />
          <v-btn
            icon
            dark
            color="red"
          >
            <font-awesome-icon
              icon="plus"
              size="lg"
            ></font-awesome-icon>
          </v-btn>
        </v-toolbar-items>
      </v-toolbar>
      <v-divider/>
      <v-container fluid class="white">
        <v-data-table
          :headers="headers"
          :items="items"
          :total-items="items.length"
        >
          <template slot="items" slot-scope="props">
            <tr>
              <td>
                <div class="font-weight-bold body-1">{{ props.item.nama }}</div>
              </td>
              <td>
                <div class="body-1">{{ props.item.kunj_terakhir }}</div>
                <div class="caption">{{ props.item.elapsed }}</div>
              </td>
              <td class="body-1 text-xs-center">
                {{ props.item.total_kunjungan }}
              </td>
              <td class="text-xs-center">
                <v-btn icon color="blue lighten-1" small>
                  <font-awesome-icon
                    icon="pencil-alt"
                    color="white"
                  ></font-awesome-icon>
                </v-btn>
                <v-btn icon color="red lighten-2" small>
                  <font-awesome-icon
                    icon="trash"
                    color="white"
                  ></font-awesome-icon>
                </v-btn>
              </td>
            </tr>
          </template>
        </v-data-table>
      </v-container>
    </v-container>
  </div>
</template>

<script>
import Service from '@/services'
import { tableColumns } from './jenis_hewan'
import Paging from '@/components/app/commons/Paging'

export default {
  name: 'JenisHewanList',
  components: {
    Paging
  },
  data () {
    return {
      name: 'Jenis Hewan',
      icon: 'paw',
      keyword: '',
      paging: {
        current: 1,
        total: 23
      },
      error: {
        value: false,
        message: ''
      },
      items: [],
      headers: tableColumns,
      state: 'loading'
    }
  },
  methods: {
    prev () {
      if (this.paging.current === 1) {
        return
      }
      this.paging.current--
    },
    next () {
      if (this.paging.current === this.paging.total) {
        return
      }
      this.paging.current++
    },
    goto (page) {
      if (page <= this.paging.total && page >= 1) {
        this.paging.current = page
      }
    },
    count () {
      return Service.JenisHewan.count(this.keyword)
        .then(data => {
          this.paging.total = data.pages
          this.paging.current = 1
        })
        .catch(err => {
          this.error.value = true
          this.error.message = 'Gagal mengambil total data'
          console.log(err)
          throw err
        })
    },
    load (targetPage, keyword) {
      return Service.JenisHewan.list(targetPage, keyword)
        .then(data => {
          this.items = data.items
        })
        .catch(err => {
          this.error.value = true
          this.error.message = 'Gagal mengambil data'
          console.log(err)
          throw err
        })
    },
    async onPagingChange (target) {
      try {
        await this.changeReload(target, this.keyword)
        this.paging.current = target
      } catch (err) {
        console.log(err)
      }
    },
    async changeReload (page, keyword) {
      this.state = 'loading'
      try {
        await this.count()
        await this.load(page, keyword)
        this.state = 'success'
      } catch (err) {
        this.error.value = true
        this.error.message = 'Gagal mengambil data'
        this.state = 'error'
        console.log(err)
      }
    },
    async reload () {
      this.state = 'loading'
      try {
        await this.count()
        await this.load(this.paging.current, this.keyword)
        this.state = 'success'
      } catch (err) {
        this.error.value = true
        this.error.message = 'Gagal mengambil data'
        this.state = 'error'
        console.log(err)
      }
    }
  },
  mounted () {
    this.reload()
  }
}
</script>

<style lang="scss">
</style>
