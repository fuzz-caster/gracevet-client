<template>
    <div id="sh-wrapper" v-bind:class="activeBgString">
        <div class="display-3 font-weight-bold white--text mr-4">Gracevet</div>
        <v-btn fab dark color="indigo darken-2" large @click="$router.push('/app/rekammedik/list')">
            <font-awesome-icon class="white--text" icon="pencil-alt" size="lg"></font-awesome-icon>
        </v-btn>
    </div>
</template>

<script>
export default {
  data () {
    return {
      bg: 'purple',
      bgList: ['purple', 'orange', 'brown', 'indigo', 'green', 'pink'],
      activeBg: 0,
      intId: null
    }
  },
  computed: {
    activeBgString () {
      return this.bgList[this.activeBg % this.bgList.length]
    }
  },
  mounted () {
    this.intId = setInterval(() => {
      this.activeBg = (this.activeBg + 1) % this.bgList.length
    }, 1000)
  },
  beforeDestroy () {
    if (this.intId !== null) {
      clearInterval(this.intId)
    }
  }
}
</script>

<style lang="scss">
#sh-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    width: 100vw;
    position: fixed;
    top: 0;
}
</style>
