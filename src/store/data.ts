import { defineStore } from 'pinia'
import { api } from '@/mock/api'
import type { Truck, TruckDriver } from '@/types'

export const useDataStore = defineStore('data', {
  state: () => ({
    trucks: [] as Truck[],
    drivers: [] as TruckDriver[],
  }),
  actions: {
    async loadData() {
      this.trucks = await api.getTrucks()
      this.drivers = await api.getDrivers()
    },
  },
})
