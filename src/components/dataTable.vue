<script>
  export default {
    name: 'dataTable',
    props: {
      tableData: {
        type: Object,
        required: true,
        default: () => ({})
      },
      columnDetails: {
        type: Array,
        required: false,
        default: () => []
      },
      theme: {
        type: String,
        required: false,
        default: 'base'
      }
    },
    computed: {
      tableRowKeys() {
        const { tableData = {} } = this;
        return Object.keys(tableData) || [];
      },
      tableHeader() {
        const { columnDetails = [], tableData = {}, tableRowKeys = [] } = this;
        if(columnDetails.length > 0) {
          return columnDetails.map(item => item.label)
        }
        const header = tableRowKeys[0];
        return header ? Object.keys(tableData[header]) : [];
      }
    }
  }
</script>

<template>
  <div>
    <table v-if="tableRowKeys.length > 0">
      <thead>
        <td v-for="column in tableHeader" v-bind:key="column">{{column}}</td>
      </thead>
      <tbody>
        <tr v-for="rowKey in tableRowKeys" v-bind:key="rowKey">
          <td v-for="(item,index) in tableData[rowKey]" v-bind:key="`${rowKey}-col${index}`">{{item}}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>

</style>