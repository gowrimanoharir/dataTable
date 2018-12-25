<script>
export default {
  name: 'loader',
  props: {
    columns: {
      type: Number,
      required: false,
      default: 4
    },
    rows: {
      type: Number,
      required: false,
      default: 0
    },    
  },
  computed: {
    numRows() {
      if(this.rows > 0) return this.rows;
      return Math.floor(window.innerHeight/20);
    }
  }
}
</script>

<template>
  <div>
    <table class="w-100">
      <tr v-for="row in numRows" v-bind:key="row">
        <td v-for="column in columns" v-bind:key="column" class="animated-background w-25 h-20px">
        </td>
      </tr>
    </table>
  </div>
</template>

<style scoped>
/* source: https://cloudcannon.com/deconstructions/2014/11/15/facebook-content-placeholder-deconstruction.html */
@keyframes placeHolderShimmer{
    0%{
        background-position: -468px 0
    }
    100%{
        background-position: 468px 0
    }
}

.animated-background {
    animation-duration: 1s;
    animation-fill-mode: forwards;
    animation-iteration-count: infinite;
    animation-name: placeHolderShimmer;
    animation-timing-function: linear;
    background: #f6f7f8;
    background: linear-gradient(to right, #eeeeee 8%, #dddddd 18%, #eeeeee 33%);
    background-size: 800px 104px;
    height: 96px;
    position: relative;
}
</style>
