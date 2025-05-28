<script setup lang="ts">
import { ref, h, resolveComponent, computed } from 'vue'
import { useDriversStore } from '@/stores/drivers'
import { useTrucksStore } from '@/stores/trucks'
import type { TruckDriver } from '@/types/models'
import type { TableColumn } from '@nuxt/ui/components/Table.vue'
import type { Row } from '@tanstack/vue-table'

const UButton = resolveComponent('UButton')
const UDropdownMenu = resolveComponent('UDropdownMenu')
const UModal = resolveComponent('UModal')
const USelect = resolveComponent('USelect')

const driverStore = useDriversStore()
const truckStore = useTrucksStore()
const showModal = ref(false)
const editedDriver = ref<Partial<TruckDriver>>({})
const isEditing = ref(false)

const truckOptions = computed(() =>
  truckStore.trucks.map((truck) => ({
    label: `#${truck.id} - ${truck.registeredPlate}`,
    value: truck.id,
  })),
)

const columns: TableColumn<TruckDriver>[] = [
  {
    accessorKey: 'id',
    header: 'ID',
    cell: ({ row }) => `#${row.getValue('id')}`,
  },
  {
    accessorKey: 'name',
    header: 'Name',
  },
  {
    accessorKey: 'surname',
    header: 'Surname',
  },
  {
    accessorKey: 'phoneNumber',
    header: 'Phone Number',
  },
  {
    accessorKey: 'assignedTruckIds',
    header: 'Assigned Trucks',
    cell: ({ row }) => {
      const ids = row.getValue('assignedTruckIds') as number[]
      if (!Array.isArray(ids) || ids.length === 0) return '—'

      const labels = ids
        .map((id) => {
          const truck = truckStore.trucks.find((t) => t.id === id)
          return truck ? `#${truck.id} - ${truck.registeredPlate}` : null
        })
        .filter(Boolean)

      return labels.join(', ')
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      return h(
        'div',
        { class: 'text-right' },
        h(UDropdownMenu, { items: getRowItems(row) }, () =>
          h(UButton, {
            icon: 'i-heroicons-ellipsis-vertical',
            color: 'gray',
            variant: 'ghost',
            'aria-label': 'Actions',
          }),
        ),
      )
    },
  },
]

function getRowItems(row: Row<TruckDriver>) {
  return [
    [
      {
        label: 'Edit',
        icon: 'i-heroicons-pencil',
        onSelect() {
          openEdit(row.original)
        },
      },
      {
        label: 'Delete',
        icon: 'i-heroicons-trash',
        onSelect() {
          driverStore.deleteDriver(Number(row.original.id))
        },
      },
    ],
  ]
}

function openEdit(driver?: TruckDriver) {
  editedDriver.value = driver ? { ...driver } : {}
  isEditing.value = !!driver
  showModal.value = true
}

function saveDriver() {
  if (isEditing.value) {
    driverStore.updateDriver(editedDriver.value as TruckDriver)
  } else {
    driverStore.addDriver(editedDriver.value as Omit<TruckDriver, 'id'>)
  }
  showModal.value = false
}
</script>

<template>
  <div class="p-4">
    <UTable :data="driverStore.drivers" class="mt-4" :columns="columns" />

    <UModal v-model:open="showModal">
      <UButton label="Add Driver" />

      <template #content>
        <UCard>
          <template #header> {{ isEditing ? 'Edit' : 'Add' }} Driver </template>

          <form @submit.prevent="saveDriver">
            <div class="space-y-4">
              <UFormField label="Name" name="name">
                <UInput v-model="editedDriver.name" required />
              </UFormField>

              <UFormField label="Surname" name="surname">
                <UInput v-model="editedDriver.surname" required />
              </UFormField>

              <UFormField label="Phone Number" name="phoneNumber">
                <UInput v-model="editedDriver.phoneNumber" required />
              </UFormField>

              <UFormField label="Assigned Truck" name="assignedTruckIds">
                <USelect
                  class="w-64"
                  v-model="editedDriver.assignedTruckIds"
                  :items="truckOptions"
                  multiple
                  required
                />
              </UFormField>
            </div>

            <div class="flex justify-end gap-2 mt-4">
              <UButton type="submit">Save</UButton>
              <UButton color="ghost" @click="showModal = false">Cancel</UButton>
            </div>
          </form>
        </UCard>
      </template>
    </UModal>
  </div>
</template>
