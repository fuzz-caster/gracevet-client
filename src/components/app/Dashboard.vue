<template>
  <v-container fluid class="pa-0">
    <v-toolbar app dark color="teal darken-1" flat>
      <v-toolbar-title>Rangkuman Per Bulan</v-toolbar-title>
      <v-spacer/>
      <v-toolbar-items>
      </v-toolbar-items>
    </v-toolbar>

    <v-layout row>
      <v-flex md12>
        <v-tabs
          color="cyan darken-2"
          dark
          slider-color="yellow"
        >
          <v-tab
            ripple
            href="#jh"
          >
            Jenis Hewan
          </v-tab>
          <v-tab
            ripple
            href="#ras"
          >
            Ras
          </v-tab>
          <v-tab
            ripple
            href="#penyakit"
          >
            Penyakit
          </v-tab>
          <v-tabs-items>
            <v-tab-item id="jh">
              <v-data-table
                :headers="headers.jh"
                :items="items.jh"
                :hide-actions="true"
              >
                <template slot="items" slot-scope="props">
                  <td>
                    {{ props.item.nama }}
                  </td>
                  <td>
                    {{ props.item.total }}
                  </td>
                </template>
              </v-data-table>
            </v-tab-item>
            <v-tab-item id="ras">
              <v-data-table
                :headers="headers.ras"
                :items="items.ras"
                :hide-actions="true"
              >
                <template slot="items" slot-scope="props">
                  <td>
                    {{ props.item.nama }}
                  </td>
                  <td>
                    {{ props.item.jhNama }}
                  </td>
                  <td>
                    {{ props.item.total }}
                  </td>
                </template>
              </v-data-table>
            </v-tab-item>

            <v-tab-item id="penyakit">
              <v-data-table
                :headers="headers.penyakit"
                :items="items.penyakit"
                :hide-actions="true"
              >
                <template slot="items" slot-scope="props">
                  <td>
                    {{ props.item.nama }}
                  </td>
                  <td>
                    {{ props.item.total }}
                  </td>
                </template>
              </v-data-table>
            </v-tab-item>
          </v-tabs-items>

        </v-tabs>
      </v-flex>
    </v-layout>

  </v-container>
</template>

<script>
import Services from '@/services'

export default {
  name: 'Dashboard',
  data () {
    return {
      tahun: 2018,
      month: 11,
      active: true,
      headers: {
        jh: [
          {
            text: 'Jenis',
            value: 'nama',
            sortable: false
          },
          {
            text: 'Total',
            value: 'total',
            sortable: false
          }
        ],
        penyakit: [
          {
            text: 'Penyakit',
            value: 'nama',
            sortable: false
          },
          {
            text: 'Total',
            value: 'total',
            sortable: false
          }
        ],
        ras: [
          {
            text: 'Jenis',
            value: 'nama',
            sortable: false
          },
          {
            text: 'Ras',
            value: 'nama',
            sortable: false
          },
          {
            text: 'Total',
            value: 'total',
            sortable: false
          }
        ]
      },
      items: {
        jh: [],
        ras: [],
        penyakit: []
      }
    }
  },
  methods: {
    reload () {
      Services.Custom.summary()
        .then(items => {
          this.items.jh = items.jenis_hewan
          this.items.ras = items.ras
          this.items.penyakit = items.penyakit
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  mounted () {
    this.reload()
  }
}
</script>

<style>

</style>
