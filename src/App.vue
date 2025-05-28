<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<template>
  <UApp>
    <header>
      <nav class="p-4 gap-4 flex">
        <router-link to="/">Home</router-link>
        <router-link to="/trucks">Trucks</router-link>
        <router-link to="/drivers">Drivers</router-link>
      </nav>
    </header>
    <div class="max-w-[1200px] mx-auto sm:px-4">
      <RouterView />
    </div>
  </UApp>
</template>
