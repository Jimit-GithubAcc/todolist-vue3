<script setup lang="ts">
import router from "./router";
</script>

<template>
  <div class="container mx-auto pb-10">
    <h1
      class="text-xl sm:text-3xl text-center font-bold h-24 place-content-center bg-[#ffd859] cursor-pointer"
      @click="router.push(`/`)"
    >
      To Do List App
    </h1>

    <main>
      <router-view />
    </main>
  </div>
</template>

<style scoped></style>
