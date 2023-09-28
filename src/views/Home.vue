<template>
  <div class="wrp">
      <router-link to="/first" class="btn btn-success">First Task</router-link>
      <router-link to="/second" class="btn btn-warning">Second Task</router-link>
  </div>
</template>

<style scoped lang="scss">
.wrp{
  .btn{
    &:not(:last-child){
      margin-right: 0.625rem;
    }
  }
}
</style>