<template>
  <v-container class="py-4 white">
    <v-layout
      justify-center align-center row wrap>
      <v-flex sm8 xs12 justify-center flex class="mx-auto">
        <v-layout justify-center flex>
          <v-btn block color="primary" dark
            @click="$emit('open-add-form', '/app/rekammedik/tambah/PemilikLamaPasienLama')"
          >
            Kunjungan Member (Pemilik Lama, Pasien Lama)
          </v-btn>
        </v-layout>
        <v-layout justify-center flex>
          <v-btn block color="info" dark
            @click="$emit('open-add-form', '/app/rekammedik/tambah/PemilikBaruPasienLama')"
          >
            Pasien Lama, Pemilik Baru
          </v-btn>
        </v-layout>
        <v-layout justify-center flex>
          <v-btn block color="warning" dark
            @click="$emit('open-add-form', '/app/rekammedik/tambah/PemilikBaruPasienBaru')"
          >
            Pasien Baru, Pemilik Baru
          </v-btn>
        </v-layout>
        <v-layout justify-center flex>
          <v-btn block color="success" dark
            @click="$emit('open-add-form', '/app/rekammedik/tambah/PemilikLamaPasienBaru')"
          >
            Pasien Baru, Pemilik Lama
          </v-btn>
        </v-layout>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
}
</script>

<style>

</style>
