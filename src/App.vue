<script>
import dataTable from './components/dataTable.vue'

export default {
  name: 'app',
  components: {
    'data-table': dataTable,
  },
  data() {
    return {
      tableData: {},
    }
  },
  mounted() {
    fetch('/payments').then(response => response.json()).then(data => {
      this.tableData = data;
    });
  },
}
</script>

<template>
  <div id="app">
    <data-table v-bind:table-data="tableData"></data-table>
  </div>
</template>
