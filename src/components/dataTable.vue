<script>
import customizeTable from '../data/customizeTable';
  export default {
    name: 'dataTable',
    props: {
      tableData: {
        type: Array,
        required: true,
        default: () => []
      },
      customizeTable: {
        type: Array,
        required: false,
        default: () => []
      },
      currentSort: {
        type: Object,
        required: false,
        default: () => ({})
      }
    },
    computed: {
      tableHeader() {
        //if column details are provided use that to create column headers, column style etc
        const { customizeTable = [], tableData = [] } = this;
        if(customizeTable.length > 0) {
          return customizeTable.map(item => item.label)
        }
        //if column details are not provided the keys of the data will be applied as header
        const header = tableData[0];
        return Object.keys(header);
      },
      isAscSort() {
        return this.currentSort.sortOrder === 'asc';
      }
    },
    methods: {
      sortColumn(index) {
        if(customizeTable[index].sortable) {
          this.$emit('sortColumn', customizeTable[index].key);
        }        
      }
    }
  }
</script>

<template>
  <div>
    <table class="bds-s bdc-gray bdw-1 w-100">
      <thead>
        <tr>
          <td 
            v-for="(column, index) in tableHeader" 
            v-bind:key="column" 
            v-bind:class="['fw-b p-6', customizeTable[index].columnStyle]"
            v-on:click="sortColumn(index)">
            <button v-if="customizeTable[index].sortable" v-bind:class="[{'jc-fe': customizeTable[index].columnStyle === 'ta-r'},'ai-c cur-p-hv d-f w-100']">
              {{column}}
              <svg v-if="customizeTable[index].key === currentSort.fieldKey && isAscSort" viewBox="0 0 24 24" class="h-19px w-19px">
                <path d="m 6.5,17.5 14,0 -7,-11 z"></path>
              </svg>
              <svg v-if="customizeTable[index].key === currentSort.fieldKey && !isAscSort" viewBox="0 0 24 24" class="h-19px w-19px">
                <path d="m 20.5,6.5 -14,0 7,11 z"></path>
              </svg>
            </button>
            <div v-else>{{column}}</div>
          </td> 
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, rowIndex) in tableData" v-bind:key="item.ID" class="bdts-s bdc-gray bdw-1">
          <td v-for="(item,index) in tableHeader" v-bind:key="`${item.ID}-col${index}`" v-bind:class="['p-6', customizeTable[index].columnStyle]">{{tableData[rowIndex][item] || '-'}}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>

</style>