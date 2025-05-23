<template>
  <button
    :class="[
      'font-medium px-4 py-2 rounded-md focus:outline-none',
      primary ? 'bg-primary text-white' : 'bg-surface text-primary',
      'hover:bg-primary-light',
    ]"
  >
    <slot />
  </button>
</template>

<script setup lang="ts">
const props = defineProps<{ primary?: boolean }>()
</script>
