<template>
  <table class="min-w-full table-auto border border-gray-200">
    <thead class="bg-gray-100">
      <tr>
        <th
          v-for="header in headers"
          :key="header"
          class="px-4 py-2 text-left text-sm font-semibold"
        >
          {{ header }}
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="row in rows" :key="row.id" class="border-t">
        <td v-for="key in Object.keys(row)" :key="key" class="px-4 py-2 text-sm">{{ row[key] }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script setup lang="ts">
const props = defineProps<{ headers: string[]; rows: Record<string, any>[] }>()
</script>
