<script setup lang="ts">
import { ref, h, resolveComponent } from 'vue'
import { useTrucksStore } from '@/stores/trucks'
import type { Truck } from '@/types/models'
import type { TableColumn } from '@nuxt/ui/components/Table.vue'
import type { Row } from '@tanstack/vue-table'

const UButton = resolveComponent('UButton')
const UDropdownMenu = resolveComponent('UDropdownMenu')
const UModal = resolveComponent('UModal')
const UChip = resolveComponent('UChip')

const store = useTrucksStore()
const showModal = ref(false)
const editedTruck = ref<Partial<Truck>>({})
const isEditing = ref(false)

const columns: TableColumn<Truck>[] = [
  {
    accessorKey: 'id',
    header: 'ID',
    cell: ({ row }) => `#${row.getValue('id')}`,
  },
  {
    accessorKey: 'registeredPlate',
    header: 'Plate',
  },
  {
    accessorKey: 'type',
    header: 'Type',
    cell: ({ row }) => {
      const type = row.getValue('type') as string
      const color = type === 'construction' ? 'orange' : 'blue'
      return h(
        UChip,
        {
          class: 'capitalize',
          variant: 'subtle',
          color,
        },
        () => type,
      )
    },
  },
  {
    accessorKey: 'vin',
    header: 'VIN',
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

function getRowItems(row: Row<Truck>) {
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
          store.deleteTruck(Number(row.original.id))
        },
      },
    ],
  ]
}

function openEdit(truck?: Truck) {
  console.log('asd')
  editedTruck.value = truck ? { ...truck } : {}
  isEditing.value = !!truck
  showModal.value = true
}

function saveTruck() {
  if (isEditing.value) {
    store.updateTruck(editedTruck.value as Truck)
  } else {
    store.addTruck(editedTruck.value as Omit<Truck, 'id'>)
  }
  showModal.value = false
}
</script>

<template>
  <div class="p-4">
    <UTable :data="store.trucks" class="mt-4" :columns="columns" />

    <UModal v-model:open="showModal">
      <UButton label="Add Truck" />

      <template #content>
        <UCard>
          <template #header> {{ isEditing ? 'Edit' : 'Add' }} Truck </template>

          <form @submit.prevent="saveTruck">
            <div class="space-y-4">
              <UFormField label="Registered Plate" name="registeredPlate">
                <UInput v-model="editedTruck.registeredPlate" required />
              </UFormField>

              <UFormField label="Type" name="type">
                <USelect
                  class="w-44"
                  v-model="editedTruck.type"
                  :items="['construction', 'general']"
                  required
                />
              </UFormField>

              <UFormField label="VIN" name="vin">
                <UInput v-model="editedTruck.vin" required />
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
