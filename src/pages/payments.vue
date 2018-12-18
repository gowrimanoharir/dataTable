<script>
import dataTable from './../components/dataTable.vue';
import loader from './../components/loader.vue';
import customizeTable from './../data/customizeTable';
import orderBy from 'lodash.orderby';

export default {
  name: 'payments',
  components: {
    'data-table': dataTable,
    'loader': loader,
  },
  data() {
    return {
      lookUpData: {},
      tableData: [],
      status: '',
      currentSort: {
        fieldKey: 'Date',
        sortOrder: 'desc'
      },
    };
  },
  computed: {
    customizeTable() {
      return customizeTable;
    },
    hasData() {
      return this.status==='resolved' && this.tableData.length > 0;
    },
    hasNoData() {
      return this.status==='resolved' && this.tableData.length === 0;
    },
    isLoading() {
      return this.status==='loading';
    },
    isError() {
      return this.status==='error';
    },    
  },
  watch: {
    lookUpData: {
      deep: true,
      handler() {
        this.updateTableData();
      },
    }
  },
  mounted() {
    this.status = 'loading';
    fetch('/payments').then(response => {
      if(response.status===200) {
        return response.json()
      }
      throw response.statusText;
    }).then(data => {
      this.lookUpData = data;
      this.status = 'resolved';
    }).catch(() => {
      this.status = 'error';
    });
  },
  methods: {
    updateTableData() {
      const { currentSort = {} , lookUpData = {} } = this;
      const { fieldKey = 'Name', sortOrder = 'asc' } = currentSort;
      this.tableData = orderBy(lookUpData, [fieldKey], [sortOrder]);
    },
    sortColumn(key) {
      const { tableData = [], currentSort = {} } = this;
      const { fieldKey = '', sortOrder = 'asc' } = currentSort;
      const newSortOrder = fieldKey === key && sortOrder === 'asc' ? 'desc' : 'asc';
      const sortedData = orderBy(tableData, [key], [newSortOrder]);
      this.tableData = sortedData;
      this.currentSort = {
        fieldKey: key,
        sortOrder: newSortOrder
      }
    },
    itemUpdate(updatedData) {
      const { ID = '' } = updatedData;
      if(this.lookUpData[ID]) {
        this.lookUpData[ID] = updatedData;
      }
    }
  }
}
</script>

<template>
  <div class="mh-36">
    <loader v-if="isLoading" class="mv-24"></loader>
    <data-table 
      v-if="hasData" 
      class="mv-24" 
      v-bind:tableData="tableData" 
      v-bind:customizeTable="customizeTable" 
      v-bind:currentSort="currentSort"
      v-on:sortColumn="sortColumn"
      v-on:itemUpdate="itemUpdate">
    </data-table>
    <div v-if="hasNoData">No payments to display</div>
    <div v-if="isError">There was an error retrieving data, please try later or contact customer service</div>
  </div>
</template>
