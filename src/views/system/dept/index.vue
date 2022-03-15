<template>
  <div>
    <h2>{{ message }}</h2>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const message = ref('Hello dept')
</script>

<style scoped></style>
