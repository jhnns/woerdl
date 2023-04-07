<script setup lang="ts">
import { ref } from "vue";
import Character from "./Character.vue";

const props = defineProps<{
  wantedWord: string;
  disabled?: boolean;
}>();
const emit = defineEmits<{
  (e: "submit", word: string): void;
}>();

const indices = ref(Array.from({ length: 5 }, (_, i) => i));
const word = ref("");
const handleInput = (event: Event) => {
  word.value = (event.target as HTMLInputElement).value.toUpperCase();
};
const handleSubmit = () => {
  if (word.value.length === props.wantedWord.length) {
    emit("submit", word.value);
  }
};
</script>

<template>
  <form @submit.prevent="handleSubmit">
    <label class="word">
      <Character v-for="index in indices" :character="word.charAt(index)" />
      <input
        class="word-input"
        v-model="word"
        @input="handleInput"
        :disabled="props.disabled ?? false"
        minlength="5"
        maxlength="5"
      />
    </label>
  </form>
</template>

<style scoped>
.word {
  display: flex;
  gap: 8px;
}
.word-input {
  position: absolute;
  right: 100vw;
  bottom: 100vh;
}
</style>
