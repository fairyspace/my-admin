<script lang="ts" setup>
  defineProps({
    prefix: {
      type: String,
      default: '#icon-'
    },
    name: {
      type: String,
      required: true
    },
    color: {
      type: String,
      default: '#000'
    },
    width: {
      type: String,
      default: '30px'
    },
    height: {
      type: String,
      default: '30px'
    }
  })
</script>

<template>
  <svg :style="{ width, height }">
    <use :xlink:href="prefix + name" :fill="color"></use>
  </svg>
</template>

<style scoped lang="scss"></style>
