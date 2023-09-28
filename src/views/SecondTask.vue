<script setup>
import { reactive, ref, onMounted, computed } from "vue";

const finalData = ref([]);
const tableHeaders = reactive([
  {id:100, text: 'Number'},
  {id:101, text: 'Name'},
  {id:102, text: 'Type'},
  {id:103, text: 'Number'},
  {id:104, text: 'Precision'},
  {id:105, text: 'Scale'},
])

onMounted(async () => {
  try {
      const response = await fetch('/response.json');
      const jsonData = await response.json();
      finalData.value = jsonData.resultSets[0].columns;
    } catch (error) {
      console.error(error);
  }
});

const initialDate = ref('28092023');

const formattedDate = computed(() => {
  const dateStr = initialDate.value;
  if (dateStr.length === 8) {
    const day = dateStr.substr(0, 2);
    const month = dateStr.substr(2, 2);
    const year = dateStr.substr(4, 4);

    return `${day}.${month}.${year}`;
  }
  return '';
});

</script>

<template>
  <div class="wrp">
    <table class="table">
      <thead>
      <tr>
        <th v-for="header in tableHeaders" :key="header.id">{{ header.text }}</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="row in finalData" :key="row.id">
        <td>{{ row.index }}</td>
        <td>{{ row.name }}</td>
        <td>
          <template v-if="row.type === 'timestamptz'">
            {{ formattedDate }}
          </template>
          <template v-else-if="row.type === 'boolean'">
            <input
                class="checkbox"
                type="checkbox"
                :id="`checkbox-${row.index}`"
            >
            <label :for="`checkbox-${row.index}`"></label>
          </template>
          <template v-else>
            {{ row.type }}
          </template>
        </td>
        <td>{{ row.length }}</td>
        <td>{{ row.precision }}</td>
        <td>{{ row.scale }}</td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped lang="scss">
.table{
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