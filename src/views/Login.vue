<template>
  <div>
    <main class="flex flex-col items-center justify-center p-4">
      <h1 class="text-3xl">Welcome to the Login Page</h1>
      <p class="mt-1">Please enter your credentials to log in.</p>
      <UForm :validate="validate" :state="state" class="mt-10 space-y-4" @submit="onSubmit">
        <UFormField label="Email" name="username">
          <UInput v-model="state.username" />
        </UFormField>

        <UFormField label="Password" name="password">
          <UInput v-model="state.password" type="password" />
        </UFormField>

        <UButton type="submit"> Submit </UButton>
      </UForm>
    </main>
  </div>
</template>
<script setup lang="ts">
import type { FormError, FormSubmitEvent } from '@nuxt/ui'
import { reactive } from 'vue'
import { useAuth } from '@/stores/auth.ts'
import type { ICredentials } from '@/types'
import { useRouter } from 'vue-router'

const router = useRouter()
const auth = useAuth()
const state = reactive<ICredentials>({
  username: '',
  password: '',
})

const validate = (state: ICredentials): FormError[] => {
  const errors = []
  if (!state.username) errors.push({ name: 'username', message: 'Required' })
  if (!state.password) errors.push({ name: 'password', message: 'Required' })
  return errors
}

async function onSubmit(event: FormSubmitEvent<typeof state>) {
  await auth.login({
    username: event.data.username,
    password: event.data.password,
  })
  if (auth.isAuthorised) {
    await router.replace('/')
  }
}
</script>
