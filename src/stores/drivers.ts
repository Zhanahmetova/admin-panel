import { defineStore } from 'pinia'
import type { TruckDriver } from '@/types/models'
import { useTrucksStore } from './trucks'

export const useDriversStore = defineStore('truckDrivers', {
  state: () => ({
    drivers: [
      {
        id: 1,
        name: 'John',
        surname: 'Doe',
        phoneNumber: '+1234567890',
        assignedTruckIds: null, // Initially no truck assigned
      },
    ] as TruckDriver[],
    nextId: 2,
  }),
  actions: {
    addDriver(driver: Omit<TruckDriver, 'id'>) {
      this.drivers.push({ ...driver, id: this.nextId++ })
    },
    updateDriver(updatedDriver: TruckDriver) {
      const index = this.drivers.findIndex((d) => d.id === updatedDriver.id)
      if (index >= 0) this.drivers.splice(index, 1, updatedDriver)
    },
    deleteDriver(id: number) {
      this.drivers = this.drivers.filter((d) => d.id !== id)
    },
  },
})
