<script setup lang="ts">
const str = 'hello world'

for (let i = 0; i < 10; i++) {
  console.log(i)
}
</script>

<template>
  <div class="box">

    <h1>App根组件</h1>
  </div>
</template>

<style scoped lang="scss">
.box {
  width: 600px;
  height: 400px;
  background: aqua;

  h1 {
    color: white;
  }
}
</style>
