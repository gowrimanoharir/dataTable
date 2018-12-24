<script>
import customizeTable from '../data/customizeTable';
import buttonIcon from './buttonIcon.vue';
import svgIcons from './icons/svgIcons'

  export default {
    name: 'dataTable',
    components: {
      'button-icon': buttonIcon,
    },    
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
    data() {
      return {
        currentlyEditing: {
          rowIndex: null,
          columnIndex: null,
        },
        editedItemValue: '',
        svgIcons: svgIcons,
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
      },
      isEditing() {
        return this.currentlyEditing.rowIndex !== null && this.currentlyEditing.columnIndex !== null;
      }
    },
    directives: {
      focus: {
        inserted(el) {
          el.focus();
        },
      },
    },
    methods: {
      sortColumn(index) {
        this.$emit('sortColumn', customizeTable[index].key);
      },
      editItem(rowIndex, columnIndex) {
        const { tableData = [], customizeTable = [] } = this;
        const currentEditKey = customizeTable[columnIndex].key;
        this.currentlyEditing = {
          rowIndex: rowIndex,
          columnIndex: columnIndex
        }
        this.editedItemValue = tableData[rowIndex][currentEditKey];
      },
      saveEdit() {
        const { tableData = [], customizeTable = [], editedItemValue = '', currentlyEditing = {} } = this;
        const { rowIndex = null, columnIndex = null } = currentlyEditing;
        const currentEditKey = customizeTable[columnIndex].key;

        let updatedData = Object.assign({}, tableData[rowIndex]);
        if(updatedData[currentEditKey]!==editedItemValue) {
          updatedData[currentEditKey] = editedItemValue
          this.$emit('itemUpdate', updatedData);
        }
        this.resetEdit();
      },
      resetEdit() {
        this.currentlyEditing = {
          rowIndex: null,
          columnIndex: null
        };
        this.editedItemValue = '';
      },
    }
  }
</script>

<template>
  <div>
    <table class="bds-s bdc-gray bdw-1 w-100">
      <thead>
        <tr class="bgc-light-blue-dim">
          <td 
            v-for="(column, index) in tableHeader" 
            v-bind:key="column" 
            v-bind:class="[{'pr-12': customizeTable[index].columnStyle === 'ta-r'},'fw-b p-6 va-m', customizeTable[index].columnStyle]">
            <button-icon
              v-if="customizeTable[index].sortable"
              v-bind:isIcon="customizeTable[index].key === currentSort.fieldKey"
              v-bind:class="[{'jc-fe': customizeTable[index].columnStyle === 'ta-r'}, 'ai-c']"
              v-bind:path="svgIcons[`${isAscSort ? 'caret-up' : 'caret-down'}`].path"
              height="16px"
              width="16px"              
              v-on:btnClick="sortColumn(index)">
              <div class="pl-3" slot="textAfter">{{column}}</div>
            </button-icon>
            <div v-else>
              {{column}}
            </div>
          </td> 
        </tr>
      </thead>
      <tbody>
        <tr 
          v-for="(rowItem, rowIndex) in tableData" 
          v-bind:key="rowItem.ID" class="bdts-s bdc-gray bdw-1 bgc-light-blue-dim-hv">
            <td 
              v-for="(item,columnIndex) in tableHeader" 
              v-bind:key="`${item.ID}-col${columnIndex}`" 
              v-bind:class="[{'pr-12': customizeTable[columnIndex].columnStyle === 'ta-r'}, 'p-6 va-m', customizeTable[columnIndex].columnStyle]">
                <input 
                  v-if="currentlyEditing.rowIndex === rowIndex && currentlyEditing.columnIndex === columnIndex"                 
                  v-focus
                  v-on:keyup.enter="saveEdit"
                  v-on:keyup.esc="resetEdit"
                  v-on:blur="resetEdit"
                  class="w-100"
                  v-model="editedItemValue"/>
                <button-icon
                  v-else-if="customizeTable[columnIndex].editable"
                  v-bind:isIcon="true"
                  v-bind:path="svgIcons['edit'].path"
                  height="16px"
                  width="16px"
                  class="ai-c"
                  v-on:btnClick="editItem(rowIndex, columnIndex)">
                    <div class="pl-3" slot="textAfter">{{tableData[rowIndex][item]}}</div>
                </button-icon>
                <div v-else>
                  {{tableData[rowIndex][item] || '-'}}
                </div>          
            </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>