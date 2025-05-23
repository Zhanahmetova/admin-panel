<template>
  <div class="flex h-screen items-center justify-center bg-background">
    <form
      class="bg-surface rounded-lg shadow-card p-8 w-full max-w-sm"
      @submit.prevent="handleLogin"
    >
      <h2 class="text-2xl font-semibold mb-6 text-center">Вход</h2>

      <label class="block mb-4">
        <span class="text-sm text-secondary">Имя пользователя</span>
        <input
          v-model="username"
          type="text"
          class="mt-1 w-full p-2 border border-border rounded-md focus:ring-primary focus:border-primary"
          placeholder="admin"
        />
      </label>

      <label class="block mb-6">
        <span class="text-sm text-secondary">Пароль</span>
        <input
          v-model="password"
          type="password"
          class="mt-1 w-full p-2 border border-border rounded-md focus:ring-primary focus:border-primary"
          placeholder="••••••••"
        />
      </label>

      <BaseButton primary class="w-full">Войти</BaseButton>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useAuthStore } from '@/store/auth'
import { useRouter } from 'vue-router'
import BaseButton from '@/components/BaseButton.vue'

const username = ref('')
const password = ref('')
const auth = useAuthStore()
const router = useRouter()

function handleLogin() {
  if (auth.login(username.value, password.value)) {
    router.push('/dashboard')
  } else {
    alert('Неверные учётные данные')
  }
}
</script>
