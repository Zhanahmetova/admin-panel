<template>
  <form @submit.prevent="submit" class="space-y-4">
    <input
      v-model="truck.registeredPlate"
      placeholder="Registered Plate"
      class="w-full border p-2"
    />
    <select v-model="truck.type" class="w-full border p-2">
      <option value="construction">Construction</option>
      <option value="general">General</option>
    </select>
    <input v-model="truck.vin" placeholder="VIN" class="w-full border p-2" />
    <button type="submit" class="bg-blue-500 text-white py-2 px-4 rounded">Save</button>
  </form>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import type { Truck } from '@/types'
import { useDataStore } from '@/store/data'

const props = defineProps<{ modelValue?: Truck }>()
const emit = defineEmits(['update:modelValue'])
const store = useDataStore()
const truck = ref<Truck>(
  props.modelValue || { id: Date.now(), registeredPlate: '', type: 'construction', vin: '' },
)

watch(truck, () => emit('update:modelValue', truck.value), { deep: true })
function submit() {
  store.trucks.push(truck.value)
}
</script>
