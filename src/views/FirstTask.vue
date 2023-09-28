<script setup>
import { reactive, ref, onMounted } from 'vue';

const formData = reactive({
  nameValue: '',
  surnameValue: '',
  dateValue: '',
  frameworkValue: 'Vue',
  messageValue: '',
  agreementValue: false,
})
const isFilled = ref(false)

const clearForm = () => {
  for (const item in formData) {
    formData[item] = '';
  }
};
const saveData = () => {
  localStorage.setItem('formData', JSON.stringify(formData));
  if (saveData){
    isFilled.value = true;
  }
};

const fillForm = () => {
  const savedData = localStorage.getItem('formData');
    const newFormData = JSON.parse(savedData);
    for (const item in newFormData) {
      if (formData.hasOwnProperty(item)) {
        formData[item] = newFormData[item];
      }
    }
};

onMounted(() => {
  if('formData' in localStorage){
    isFilled.value = true
  }
})

const submitForm = () =>{
  console.log('Form is ready')
}
</script>

<template>
  <div class="wrp">
    <form ref="Form" @submit.prevent="submitForm">
      <div class="form-input">
        <label class="input-label" for="name">Name:</label>
        <input
            class="input-text"
            id="name"
            type="text"
            v-model="formData.nameValue"
        />
      </div>
      <div class="form-input">
        <label class="input-label" for="surname">Surname: </label>
        <input
            class="input-text"
            id="surname"
            type="text"
            v-model="formData.surnameValue"
        />
      </div>
      <div class="form-date">
        <label for="date">Select date:</label>
        <input
            class="date"
            id="date"
            type="date"
            v-model="formData.dateValue"
        />
      </div>
      <div class="form-select">
        <select class="select" v-model="formData.frameworkValue">
          <option value="Vue">Vue</option>
          <option value="React">React</option>
          <option value="Svelte">Svelte</option>
        </select>
      </div>
      <div class="form-checkbox">
        <input
            class="checkbox"
            type="checkbox"
            id="agreement"
            v-model="formData.agreementValue"
        />
        <label for="agreement">I'm agree</label>
      </div>
      <div class="form-textarea">
        <label for="textarea">Message:</label>
        <textarea
            id="textarea"
            class="textarea"
            v-model="formData.messageValue"
        />
      </div>
      <div class="form-btn">
        <button class="btn btn-primary" @click="clearForm">Clear Form</button>
        <button class="btn btn-warning" @click="saveData">Save Data</button>
        <button
            class="btn btn-success"
            :class="{ 'btn-disabled' : !isFilled }"
            @click="fillForm"
        >
          Fill Form
        </button>
      </div>
    </form>
  </div>
</template>

<style scoped lang="scss">
.form-input {
    margin-bottom: 0.625rem;
}
.input {
  &-text {
    border: 0.0625rem solid var(--primary);
    padding: 0 0.625rem;
    height: 2.5rem;
    border-radius: 0.4375rem;
    width: 100%;
    position: relative;
  }
}
.form-date{
  margin-bottom: 0.625rem;
  .date{
    border: 0.0625rem solid var(--primary);
    padding: 0 0.625rem;
    height: 2.5rem;
    border-radius: 0.4375rem;
    width: 100%;
    position: relative;
  }
}
.form-checkbox{
  margin-bottom: 0.625rem;
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
    border-color: var(--primary);
    background-color: var(--primary);
    background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 8 8'%3e%3cpath fill='%23fff' d='M6.564.75l-3.59 3.612-1.538-1.55L0 4.26 2.974 7.25 8 2.193z'/%3e%3c/svg%3e");
  }
}
.form-textarea{
  margin-bottom: 0.625rem;
}
.textarea{
  border: 0.0625rem solid var(--primary);
  padding: 0.625rem;
  min-height: 3.75rem;
  border-radius: 0.4375rem;
  width: 100%;
  position: relative;
}
.form-select{
  margin-bottom: 0.625rem;
}
.select{
  border: 0.0625rem solid var(--primary);
  padding: 0 0.375rem;
  height: 2.5rem;
  border-radius: 0.4375rem;
  width: 100%;
  position: relative;
  margin-bottom: 0.625rem;
}
.form-btn{
  display: flex;
  .btn{
    &:not(:last-child){
      margin-right: 0.625rem;
    }
  }
}
</style>