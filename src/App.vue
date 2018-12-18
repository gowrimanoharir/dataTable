<script>
import '@/assets/main.css';
import payments from './pages/payments.vue';

export default {
  name: 'app',
  components: {
    'payments': payments,
  },
}
</script>

<template>
  <div id="app" class="mh-36 w-1920px">
    <payments></payments>
  </div>
</template>
