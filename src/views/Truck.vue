<template>
  <div class="p-6">
    <h1 class="text-xl font-bold mb-4">Trucks</h1>
    <TruckForm @update:modelValue="(t) => (currentTruck = t)" :modelValue="currentTruck" />
    <DataTable :headers="['ID', 'Plate', 'Type', 'VIN']" :rows="store.trucks" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useDataStore } from '@/store/data'
import TruckForm from '@/components/TruckForm.vue'
import DataTable from '@/components/DataTable.vue'
import type { Truck } from '@/types'

const store = useDataStore()
const currentTruck = ref<Truck>()
onMounted(() => store.loadData())
</script>
