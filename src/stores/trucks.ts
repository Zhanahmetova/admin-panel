import { defineStore } from 'pinia'
import type { Truck } from '@/types/models'

export const useTrucksStore = defineStore('trucks', {
  state: () => ({
    trucks: [
      {
        id: 1,
        registeredPlate: 'ABC123',
        type: 'construction',
        vin: '1HGBH41JXMN109186',
      },
    ] as Truck[],
    nextId: 2,
  }),
  actions: {
    addTruck(truck: Omit<Truck, 'id'>) {
      this.trucks.push({ ...truck, id: this.nextId++ })
    },
    updateTruck(updatedTruck: Truck) {
      const index = this.trucks.findIndex((t) => t.id === updatedTruck.id)
      if (index >= 0) this.trucks.splice(index, 1, updatedTruck)
    },
    deleteTruck(id: number) {
      this.trucks = this.trucks.filter((t) => t.id !== id)
    },
    getTruckById(id: number) {
      return this.trucks.find((t) => t.id === id)
    },
  },
})
