<template>
  <div>
    <div class='background'>
      <div class="top indigo"></div>
      <div class="bottom"></div>
    </div>
    <div class="login-container">
      <div class='login-card'>
        <font-awesome-icon icon="female" size="8x"></font-awesome-icon>
        <h3 class="display-3 purple--text text--darken-4">Gracevet</h3>
        <v-text-field
          label="Username"
          v-model="username"
          single-line>
        </v-text-field>
        <v-text-field
          label="Password"
          type="password"
          v-model="password"
          single-line>
        </v-text-field>
        <v-layout row>
          <v-btn dark color="blue">Login</v-btn>
        </v-layout>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      username: '',
      password: ''
    }
  }
}
</script>

<style lang='scss' scoped>
  .background {
    position: fixed;
    height: 100vh;
    width: 100vw;

    .top, .bottom {
      height: 50vh;
      width: 100vw;
    }
  }
  .login-container {
    position: fixed;
    height: 100vh;
    width: 100vw;
    display: flex;
    justify-content: center;
    align-items: center;

    .login-card {
      min-width: 500px;
      background-color:  white;
      border-radius: 12px;
      padding: 32px 18px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;

      .v-text-field {
        min-width: 300px;
      }
    }
  }
</style>
