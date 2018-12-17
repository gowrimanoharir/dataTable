<script>
import '@/assets/main.css';
import dataTable from './components/dataTable.vue';
import loader from './components/loader.vue';
import customizeTable from './data/customizeTable';

export default {
  name: 'app',
  components: {
    'data-table': dataTable,
    'loader': loader,
  },
  data() {
    return {
      tableData: {},
      status: '',
    };
  },
  computed: {
    customizeTable() {
      return customizeTable;
    },
    tableRowKeys() {
      const { tableData = {} } = this;
      return Object.keys(tableData) || [];
    },
    hasData() {
      return this.status==='resolved' && this.tableRowKeys.length > 0;
    },
    hasNoData() {
      return this.status==='resolved' && this.tableRowKeys.length === 0;
    },
    isLoading() {
      return this.status==='loading';
    },
    isError() {
      return this.status==='error';
    },    
  },
  mounted() {
    this.status = 'loading';
    fetch('/payments').then(response => {
      if(response.status===200) {
        return response.json()
      }
      throw response.statusText;
    }).then(data => {
      this.tableData = data;
      this.status = 'resolved';
    }).catch(() => {
      this.status = 'error';
    });
  },
}
</script>

<template>
  <div id="app" class="mh-36">
    <loader v-if="isLoading" class="mv-24"></loader>
    <data-table v-if="hasData" class="mv-24" v-bind:tableData="tableData" v-bind:customizeTable="customizeTable" v-bind:tableRowKeys="tableRowKeys"></data-table>
    <div v-if="hasNoData">No payments to display</div>
    <div v-if="isError">There was an error retrieving data, please try later or contact customer service</div>
  </div>
</template>
