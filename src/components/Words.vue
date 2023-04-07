<script setup lang="ts">
import { ref } from "vue";
import Word from "./Word.vue";

const wantedWord = ref("Dampf");

const indices = ref(Array.from({ length: 6 }, (_, i) => i));
const currentIndex = ref(0);
</script>

<template>
  <Word
    v-for="index of indices"
    :wanted-word="wantedWord"
    :disabled="currentIndex !== index"
    @submit="currentIndex = index + 1"
  />
</template>

<style scoped></style>
