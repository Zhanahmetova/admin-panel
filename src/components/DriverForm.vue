<template>
  <form @submit.prevent="submit" class="space-y-4">
    <input v-model="driver.name" placeholder="Name" class="w-full border p-2" />
    <input v-model="driver.surname" placeholder="Surname" class="w-full border p-2" />
    <input v-model="driver.phoneNumber" placeholder="Phone Number" class="w-full border p-2" />
    <select v-model="driver.assignedTruckId" class="w-full border p-2">
      <option v-for="truck in store.trucks" :key="truck.id" :value="truck.id">
        {{ truck.registeredPlate }}
      </option>
    </select>
    <button type="submit" class="bg-blue-500 text-white py-2 px-4 rounded">Save</button>
  </form>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
import type { TruckDriver } from '@/types'
import { useDataStore } from '@/store/data'

const props = defineProps<{ modelValue?: TruckDriver }>()
const emit = defineEmits(['update:modelValue'])
const store = useDataStore()

const driver = ref<TruckDriver>(
  props.modelValue || {
    id: Date.now(),
    name: '',
    surname: '',
    phoneNumber: '',
    assignedTruckId: store.trucks[0]?.id || 0,
  },
)

onMounted(() => store.loadData())
watch(driver, () => emit('update:modelValue', driver.value), { deep: true })
function submit() {
  store.drivers.push(driver.value)
}
</script>
