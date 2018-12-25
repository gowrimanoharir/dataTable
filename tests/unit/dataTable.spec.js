import { mount, createLocalVue } from '@vue/test-utils';
import dataTable from '@/components/dataTable.vue';
import Tooltip from 'vue-directive-tooltip';

describe('dataTable.vue', () => {
  const payments = [
    {
        "ID": "3471DA17-401F-9633-BF81-4CADA6FD5C79",
        "Name": "Kyra Lester",
        "Description": "Curabitur dictum. Phasellus in",
        "Date": "2017-07-23T04:24:49-07:00",
        "Amount": 345.54
    },
    {
        "ID": "9F5C9912-936A-FB85-1EDB-9DA87BE7FF1E",
        "Name": "Buckminster Alvarado",
        "Description": "dui, in sodales elit erat vitae risus. Duis a mi",
        "Date": "2018-11-08T05:44:15-08:00",
        "Amount": 677.08
    },
    {
        "ID": "B743AC82-3613-13A2-2E42-E0C1F5CBF8A6",
        "Name": "Athena Smith",
        "Description": "massa lobortis ultrices. Vivamus rhoncus.",
        "Date": "2018-11-11T06:19:57-08:00",
        "Amount": 73.67
    },
    {
        "ID": "74749D4F-A43F-34E8-A687-D54924B17251",
        "Name": "Cameron Thompson",
        "Description": "dolor. Fusce mi lorem, vehicula et, rutrum eu,",
        "Date": "2019-09-30T06:56:15-07:00",
        "Amount": 807.6
    },
    {
        "ID": "DB983FEF-AF70-7D2E-86BA-0C2AE749E729",
        "Name": "Dawn Alford",
        "Description": "Pellentesque ut ipsum",
        "Date": "2019-03-06T13:24:31-08:00",
        "Amount": 820.96
    },
  ];

  const customize = [
    {
      key: 'Date',
      label: 'Date',
      columnStyle: 'ta-l',
      sortable: true,
    },  
    {
      key: 'Name',
      label: 'Name',
      columnStyle: 'ta-l',
      sortable: true,
    },
    {
      key: 'Amount',
      label: 'Amount',
      columnStyle: 'ta-r',
      sortable: true,
    },   
    {
      key: 'Description',
      label: 'Description',
      columnStyle: 'ta-l',
      editable: true,
    },     
  ]
  
  
  const localVue = createLocalVue()

  localVue.directive('tooltip',  Tooltip)

  const createComp = props => mount(dataTable, { propsData: props, localVue });

  it('computes table header when customize table is NOT passed', () => {
    const table = createComp({ tableData: payments })
    expect(table.vm.tableHeader).toEqual(['ID', 'Name', 'Description', 'Date', 'Amount'])
  });

  it('computes table header when customize table IS passed', () => {
    const table = createComp({ tableData: payments, customizeTable: customize })
    expect(table.vm.tableHeader).toEqual(['Date', 'Name', 'Amount', 'Description'])
  });
  
  it('emits sorting when clicked on sortable column', () => {
    const table = createComp({ tableData: payments, customizeTable: customize })

    const numFields = customize.length;
    const selectIndex = Math.floor(Math.random(numFields)*numFields);
    const selectedColumn = customize[selectIndex];

    if(selectedColumn.sortable) {
      table.find(`thead > tr:nth-child(1) td:nth-child(${selectIndex+1}) button`).trigger('click');      
      expect(table.emitted('sortColumn')).toBeTruthy();
      expect(table.emitted('sortColumn')[0]).toEqual([selectedColumn.key]);
    } 
  });

  it('on editing a field corresponding input value contains correct value', () => {
    const table = createComp({ tableData: payments, customizeTable: customize })

    const columnIndex = customize.findIndex(item => item.editable);
    const rowIndex = Math.floor(Math.random(payments.length));
    const selectedItem = payments[rowIndex];    

    table.find(`tbody > tr:nth-child(${rowIndex+1}) td:nth-child(${columnIndex+1}) button`).trigger('click');      
    expect(table.vm.currentlyEditing.rowIndex).toEqual(rowIndex);
    expect(table.vm.currentlyEditing.columnIndex).toEqual(columnIndex);
    expect(table.vm.editedItemValue).toEqual(selectedItem.Description);  
  }); 

  it('Edit am item and esc item update should NOT be emitted', () => {
    const table = createComp({ tableData: payments, customizeTable: customize })

    const columnIndex = customize.findIndex(item => item.editable);
    const rowIndex = Math.floor(Math.random(payments.length));

    table.find(`tbody > tr:nth-child(${rowIndex+1}) td:nth-child(${columnIndex+1}) button`).trigger('click');      
    table.find(`tbody > tr:nth-child(${rowIndex+1}) td:nth-child(${columnIndex+1}) input`).trigger('keyup.esc');  
    expect(table.emitted('itemUpdate')).toBeFalsy();
    expect(table.vm.editedItemValue).toEqual(''); 
  });

  it('Edit am item and Enter item update should BE emitted', () => {
    const table = createComp({ tableData: payments, customizeTable: customize })

    const columnIndex = customize.findIndex(item => item.editable);
    const rowIndex = Math.floor(Math.random(payments.length));
    const updateText = 'updated description';
    
    let selectedItem = Object.assign({}, payments[rowIndex]);    
    const selectedField = customize[columnIndex].key;

    table.find(`tbody > tr:nth-child(${rowIndex+1}) td:nth-child(${columnIndex+1}) button`).trigger('click');      
    const editEl = table.find(`tbody > tr:nth-child(${rowIndex+1}) td:nth-child(${columnIndex+1}) input`);
    editEl.setValue(updateText);
    expect(table.vm.editedItemValue).toEqual(updateText); 
    selectedItem[selectedField] = updateText; 

    table.find(`tbody > tr:nth-child(${rowIndex+1}) td:nth-child(${columnIndex+1}) input`).trigger('keyup.enter');    
    expect(table.emitted('itemUpdate')).toBeTruthy();
    expect(table.emitted('itemUpdate')[0]).toEqual([selectedItem]);   
  });  

})
