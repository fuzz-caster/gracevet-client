<template>
  <div id="paging" class="paging">
    <v-btn small icon @click="prev">
      <font-awesome-icon
        icon="caret-left"
      ></font-awesome-icon>
    </v-btn>
    <v-menu
      offset-y>
      <div class="title" slot="activator">{{ current }}/{{ total }}</div>
      <v-list>
        <v-list-tile v-for="i in total" :key="i" @click="goto(i)">
          <v-list-tile-title>{{i}}</v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-menu>
    <v-btn small icon @click="next">
      <font-awesome-icon
        icon="caret-right"
      ></font-awesome-icon>
    </v-btn>
  </div>
</template>

<script>
export default {
  name: 'Paging',
  props: ['current', 'total'],
  methods: {
    prev () {
      if (this.current > 1) {
        this.$emit('paging-prev', this.current - 1)
      }
    },
    next () {
      if (this.current < this.total) {
        this.$emit('paging-next', this.current + 1)
      }
    },
    goto (target) {
      if (target >= 1 && target <= this.total) {
        this.$emit('paging-goto', target)
      }
    }
  }
}
</script>

<style lang="scss">
  #paging {
    margin-left: 30px;
    margin-right: 30px;
    min-width: 90px;
    padding-left: 10px;
    padding-right: 10px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
</style>
