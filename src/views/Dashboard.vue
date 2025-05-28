<script setup lang="ts">
import { computed } from 'vue'
import { useDriversStore } from '@/stores/drivers'
import { useTrucksStore } from '@/stores/trucks'

const driverStore = useDriversStore()
const truckStore = useTrucksStore()

const trucksWithDrivers = computed(() => {
  return truckStore.trucks.map((truck) => {
    const drivers = driverStore.drivers.filter((d) => d.assignedTruckIds?.includes(truck.id))
    return { ...truck, drivers }
  })
})
</script>

<template>
  <div class="p-4">
    <h1 class="text-2xl mb-8">This is Your Dashboard</h1>

    <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      <UCard v-for="truck in trucksWithDrivers" :key="truck.id">
        <template #header>
          <div class="flex items-center justify-between">
            <div class="font-semibold">#{{ truck.id }} - {{ truck.registeredPlate }}</div>
            <UBadge :color="truck.type === 'construction' ? 'orange' : 'blue'" variant="subtle">
              {{ truck.type }}
            </UBadge>
          </div>
        </template>

        <div>
          <div class="text-sm text-gray-500 mb-2">VIN: {{ truck.vin }}</div>
          <div v-if="truck.drivers.length">
            <p class="font-medium mb-1">Drivers:</p>
            <ul class="list-disc list-inside text-sm">
              <li v-for="driver in truck.drivers" :key="driver.id">
                {{ driver.name }} {{ driver.surname }} - {{ driver.phoneNumber }}
              </li>
            </ul>
          </div>
          <div v-else class="text-sm text-gray-400">No drivers assigned</div>
        </div>
      </UCard>
    </div>
  </div>
</template>
