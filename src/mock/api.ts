import type { Truck, TruckDriver } from '@/types'

let trucks: Truck[] = [
  { id: 1, registeredPlate: 'ABC123', type: 'construction', vin: '1HGCM82633A004352' },
  { id: 2, registeredPlate: 'XYZ789', type: 'general', vin: '2T1BURHE0FC123456' },
]

let drivers: TruckDriver[] = [
  { id: 1, name: 'John', surname: 'Doe', phoneNumber: '1234567890', assignedTruckId: 1 },
  { id: 2, name: 'Jane', surname: 'Smith', phoneNumber: '0987654321', assignedTruckId: 2 },
]

export const api = {
  getTrucks: async (): Promise<Truck[]> => trucks,
  getDrivers: async (): Promise<TruckDriver[]> => drivers,
  createTruck: async (truck: Truck) => {
    trucks.push(truck)
  },
  createDriver: async (driver: TruckDriver) => {
    drivers.push(driver)
  },
  updateTruck: async (truck: Truck) => {
    const index = trucks.findIndex((t) => t.id === truck.id)
    if (index !== -1) trucks[index] = truck
  },
  updateDriver: async (driver: TruckDriver) => {
    const index = drivers.findIndex((d) => d.id === driver.id)
    if (index !== -1) drivers[index] = driver
  },
}
