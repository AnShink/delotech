<script setup>
import { ref, onMounted } from "vue"

const finalData = ref([])
const finalDataColumns = ([])
const types = ([])

const getCellClass = (cellIndex) => {
  switch (types.value[cellIndex]) {
    case 'boolean':
      return {
        class: 'boolean',
        content: (cellValue) => ''
      };
    case 'timestamptz':
      return {
        class: 'timestamptz',
        content: (cellValue) => formattedDate(cellValue)
      };
    default:
      return {
        class: '',
        content: (cellValue) => `${cellValue}`
      };
  }
};

const getCellContent = (cellValue, cellClass) => {
  const cellContent = getCellClass(cellClass);
  return cellContent.content(cellValue);
};

const formattedDate = (cellValue) => {
  if(cellValue) {
    const dateStr = cellValue;
    const year = dateStr.substr(0, 4);
    const month = dateStr.substr(5, 2);
    const day = dateStr.substr(8, 2);
    return `от ${day}.${month}.${year}`;
  }
};

onMounted(async () => {
  try {
    const response = await fetch('/response.json');
    const jsonData = await response.json();
    finalData.value = jsonData.resultSets[0].records;
    finalDataColumns.value = jsonData.resultSets[0].columns;
    types.value = finalDataColumns.value.map((item) => {
        return item[Object.keys(item)[4]];
    });
  } catch (error) {
    console.error(error);
  }
})
</script>

<template>
  <div class="wrp">
    <div class="table-responsive">
      <table ref="table" class="table">
        <thead>
          <tr>
            <th v-for="(item, index) in finalData[0]" :key="index">{{ index + 1 }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(row, rowIndex) in finalData" :key="rowIndex">
            <td v-for="(cell, cellIndex) in row" :key="cellIndex" :class="getCellClass(cellIndex).class">
              <template v-if="getCellClass(cellIndex).class === 'boolean'">
                <input
                    class="checkbox disabled"
                    type="checkbox"
                    :id="`checkbox-${rowIndex}${cellIndex}`"
                    disabled
                >
                <label :for="`checkbox-${rowIndex}${cellIndex}`"></label>
              </template>
              <template v-else>
                {{ getCellContent(cell, cellIndex) }}
              </template>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped lang="scss">
.table-responsive{
  overflow: auto;
  position: relative;
}
.table{
  display: inline-block;
  vertical-align: top;
  max-width: 100%;
  border: 0.0625rem solid var(--border-2);
  table-layout: fixed;
  width: 100%;
  margin-bottom: 1.25rem;
  text-align: left;
  th {
    font-weight: bold;
    padding: 0.3125rem;
    background: var(--success);
    border: 0.0625rem solid var(--border-1);
  }
  td{
    padding: 0.3125rem 0.625rem;
    border: 0.0625rem solid var(--border-2);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  tbody tr:nth-child(odd){
    background: var(--white);
  }
  tbody tr:nth-child(even){
    background: var(--success-light);
  }
}
.checkbox {
  position: absolute;
  z-index: -1;
  opacity: 0;
  & + label {
    display: inline-flex;
    align-items: center;
    user-select: none;
  }
  & + label::before {
    content: '';
    display: inline-block;
    width: 1.5rem;
    height: 1.5rem;
    flex-shrink: 0;
    flex-grow: 0;
    border: 0.0625rem solid var(--grey);
    border-radius: 0.4375rem;
    margin-right: 0.625rem;
    background-repeat: no-repeat;
    background-position: center center;
    background-size: 50% 50%;
  }
  &:checked + label::before {
    border-color: var(--second);
    background-color: var(--second);
    background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 8 8'%3e%3cpath fill='%23fff' d='M6.564.75l-3.59 3.612-1.538-1.55L0 4.26 2.974 7.25 8 2.193z'/%3e%3c/svg%3e");
  }
}
</style>