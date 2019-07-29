<template>
  <div>
    <loading-view v-if="state == 'loading'" message="Loading" />
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
        <div v-if="state == 'success'" class="title">Sukses!!</div>
      </v-layout>
      <v-layout row justify-center align-center>
        <v-btn class="blue lighten-1" dark @click="reload">
          reload!!
        </v-btn>
      </v-layout>
    </v-container>
    <v-container
      v-if="state == 'idle'"
      fluid
      class="pa-0"
    >
      <v-toolbar
        flat
        id="listing-toolbar"
        class="mb-0"
        app
        fixed
        color="indigo"
        dark
      >
        <v-toolbar-side-icon>
          <font-awesome-icon
            :icon="icon"
            size="lg"
            class="white--text"
          ></font-awesome-icon>
        </v-toolbar-side-icon>
        <v-toolbar-title>{{ name }}</v-toolbar-title>
        <v-spacer/>
        <v-toolbar-items class="more-space">
          <v-text-field
            dark
            v-model="keyword"
            @input="$emit('keyword-change', keyword)"
            class="mx-3 search-field my-2"
            flat
            label="Search"
            append-icon="search"
            @click:append="reload"
            solo-inverted
          ></v-text-field>
          <paging :current="paging.current" :total="paging.total"
            @paging-next="onPagingChange($event)"
            @paging-prev="onPagingChange($event)"
            @paging-goto="onPagingChange($event)"
          />
          <v-btn
            v-if="showAdd"
            icon
            flat
            @click="onAddButtonClicked"
          >
            <font-awesome-icon
              icon="plus"
              size="lg"
              class="white--text"
            ></font-awesome-icon>
          </v-btn>
        </v-toolbar-items>
      </v-toolbar>
      <v-container fluid class="pa-0">
        <v-data-table
          :headers="headers"
          :items="items"
          :total-items="items.length"
        >
          <template slot="items" slot-scope="props">
            <tr>
              <slot name="row-content" v-bind:rprops="props">
              </slot>
              <slot name="action-content" v-bind:rprops="props">
                <td class="text-xs-center">
                  <v-btn icon small flat
                    @click="openEditForm(props.item.id)"
                  >
                    <font-awesome-icon
                      class="blue--text text-lighten-1"
                      icon="pencil-alt"
                    ></font-awesome-icon>
                  </v-btn>
                  <v-btn icon small flat @click="remove(props.item.id)">
                    <font-awesome-icon
                      class="red--text text-lighten-1"
                      icon="trash"
                    ></font-awesome-icon>
                  </v-btn>
                </td>
              </slot>
            </tr>
          </template>
        </v-data-table>
      </v-container>
    </v-container>
  </div>
</template>

<script>
import Paging from '@/components/app/commons/Paging'
import LoadingView from './LoadingView'

export default {
  name: 'BaseListing',
  props: {
    name: String,
    icon: String,
    headers: String,
    service: Object,
    routePath: String,
    addHandler: Function,
    showAdd: {
      type: Boolean,
      default: true
    }
  },
  components: {
    Paging,
    LoadingView
  },
  data () {
    return {
      keyword: '',
      paging: {
        current: 1,
        total: 23
      },
      error: {
        value: false,
        message: ''
      },
      state: 'loading',
      items: []
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
      return this.service.count(this.keyword)
        .then(data => {
          this.paging.total = data.pages
          if (this.paging.total === 0) {
            this.paging.total = 1
          }
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
      return this.service.list(targetPage, keyword)
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
    async remove (id) {
      this.state = 'loading'
      try {
        await this.service.remove(id)
        this.state = 'success'
      } catch (err) {
        console.log(err)
        this.state = 'error'
      }
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
        this.state = 'idle'
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
        this.state = 'idle'
      } catch (err) {
        this.error.value = true
        this.error.message = 'Gagal mengambil data'
        this.state = 'error'
        console.log(err)
      }
    },
    openEditForm (id) {
      console.log('HERE')
      this.$router.push('update/' + id)
    },
    onAddButtonClicked () {
      console.log(this.addHandler)
      if (this.addHandler !== null && this.addHandler !== undefined) {
        this.addHandler()
      } else {
        this.$router.push('/app/' + this.routePath + '/add')
      }
    }
  },
  mounted () {
    this.reload()
  }
}
</script>

<style lang="scss">
#listing-toolbar .v-text-field.v-text-field--enclosed .v-input__slot, .v-text-field.v-text-field--enclosed .v-text-field__details {
  // padding: 0;
}
</style>
