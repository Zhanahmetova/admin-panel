export interface Truck {
  id: number
  registeredPlate: string
  type: 'construction' | 'general'
  vin: string
}

export interface TruckDriver {
  id: number
  name: string
  surname: string
  phoneNumber: string
  assignedTruckId: number
}
