<template>
  <div class="p-8 min-h-screen">
    <h1 class="text-3xl font-semibold mb-6">Панель администратора</h1>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <!-- Счётчики -->
      <Card>
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-secondary uppercase">Грузовиков</p>
            <p class="text-2xl font-bold">{{ trucks.length }}</p>
          </div>
          <!-- Иконка можно заменить на SVG из Heroicons или SF Symbols -->
          <svg class="w-8 h-8 text-primary" fill="currentColor" viewBox="0 0 20 20">
            <path d="M3 3h14v10H3z" />
          </svg>
        </div>
      </Card>

      <Card>
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-secondary uppercase">Водителей</p>
            <p class="text-2xl font-bold">{{ drivers.length }}</p>
          </div>
          <svg class="w-8 h-8 text-primary" fill="currentColor" viewBox="0 0 20 20">
            <path d="M5 3h10v10H5z" />
          </svg>
        </div>
      </Card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useDataStore } from '@/store/data'
import Card from '@/components/Card.vue'

const store = useDataStore()
const { trucks, drivers } = store

onMounted(() => {
  store.loadData()
})
</script>
