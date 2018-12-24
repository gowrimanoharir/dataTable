<script>
import '@/assets/main.css';
import payments from './pages/payments.vue';
import appHeader from './components/appHeader.vue';

export default {
  name: 'app',
  components: {
    'payments': payments,
    'app-header': appHeader,
  },
}
</script>

<template>
  <div id="app" class="maw-1920">
    <app-header></app-header>
    <div class="mh-36">
      <payments></payments>
    </div>
  </div>
</template>
