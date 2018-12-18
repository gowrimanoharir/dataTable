<script>
export default {
  name: 'buttonIcon',
  props:{
    isIcon: {
      type: Boolean,
      required: false,
      default: false,
    },
    path: {
      type: String,
      required: false,
      default: "",
    },
    viewBox: {
      type: String,
      required: false,
      default: "0 0 24 24",
    },    
    height: {
      type: String,
      required: false,
      default: "19px",
    },    
    width: {
      type: String,
      required: false,
      default: "19px",      
    }
  },
  methods: {
    btnClick() {
      this.$emit('btnClick')
    }
  }
}
</script>

<template>
  <button 
    v-on:click="btnClick"
    class="cur-p-hv d-f w-100">
    <slot name="textBefore"></slot>
    <svg 
      v-bind:viewBox="viewBox" 
      v-bind:width="width" 
      v-bind:height="height">
      <path v-bind:d="path"></path>
    </svg>
    <slot name="textAfter"></slot>
  </button>  
</template>