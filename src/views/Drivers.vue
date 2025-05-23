<template>
  <div class="p-6">
    <h1 class="text-xl font-bold mb-4">Drivers</h1>
    <DriverForm @update:modelValue="(d) => (currentDriver = d)" :modelValue="currentDriver" />
    <DataTable
      :headers="['ID', 'Name', 'Surname', 'Phone', 'Assigned Truck']"
      :rows="store.drivers"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useDataStore } from '@/store/data'
import DriverForm from '@/components/DriverForm.vue'
import DataTable from '@/components/DataTable.vue'
import type { TruckDriver } from '@/types'

const store = useDataStore()
const currentDriver = ref<TruckDriver>()
onMounted(() => store.loadData())
</script>
