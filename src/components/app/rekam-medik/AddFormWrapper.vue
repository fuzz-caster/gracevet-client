<template>
  <div>
    <v-layout
      v-if="state == 'pilih_tipe'"
      justify-center align-center row wrap>
      <v-flex sm8 xs12 justify-center flex class="mx-auto">
        <v-layout justify-center flex>
          <v-btn block color="primary" dark
            @click="$router.push('/app/rekammedik/tambah/PemilikLamaPasienLama')"
          >
            Kunjungan Member (Pemilik Lama, Pasien Lama)
          </v-btn>
        </v-layout>
        <v-layout justify-center flex>
          <v-btn block color="info" dark
            @click="$router.push('/app/rekammedik/tambah/PemilikBaruPasienLama')"
          >
            Pasien Lama, Pemilik Baru
          </v-btn>
        </v-layout>
        <v-layout justify-center flex>
          <v-btn block color="warning" dark
            @click="$router.push('/app/rekammedik/tambah/PemilikBaruPasienBaru')"
          >
            Pasien Baru, Pemilik Baru
          </v-btn>
        </v-layout>
        <v-layout justify-center flex>
          <v-btn block color="success" dark
            @click="$router.push('/app/rekammedik/tambah/PemilikLamaPasienBaru')"
          >
            Pasien Baru, Pemilik Lama
          </v-btn>
        </v-layout>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
export default {
  data () {
    return {
      state: 'pilih_tipe'
    }
  }
}
</script>

<style>

</style>
