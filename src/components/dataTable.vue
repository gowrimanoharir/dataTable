<script>
  export default {
    name: 'dataTable',
    props: {
      tableData: {
        type: Object,
        required: true,
        default: () => ({})
      },
      customizeTable: {
        type: Array,
        required: false,
        default: () => []
      },
      tableRowKeys: {
        type: Array,
        required: true,
        default: () => []
      },
      theme: {
        type: String,
        required: false,
        default: 'base'
      }
    },
    computed: {
      tableHeader() {
        //if column details are provided use that to create column headers, column style etc
        const { customizeTable = [], tableData = {}, tableRowKeys = [] } = this;
        if(customizeTable.length > 0) {
          return customizeTable.map(item => item.label)
        }
        //if column details are not provided the keys of the data will be applied as header
        const header = tableRowKeys[0];
        return Object.keys(tableData[header]);
      }
    }
  }
</script>

<template>
  <div>
    <table class="bds-s bdc-gray bdw-1 w-100">
      <thead>
        <tr>
          <th v-for="(column, index) in tableHeader" v-bind:key="column" v-bind:class="[{'cur-p-hv': customizeTable[index].sortable}, 'fw-b p-6', customizeTable[index].columnStyle]">{{column}}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="rowKey in tableRowKeys" v-bind:key="rowKey" class="bdts-s bdc-gray bdw-1">
          <td v-for="(item,index) in tableHeader" v-bind:key="`${rowKey}-col${index}`" v-bind:class="['p-6', customizeTable[index].columnStyle]">{{tableData[rowKey][item] || '-'}}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>

</style>