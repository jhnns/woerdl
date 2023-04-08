<script setup lang="ts">
import { ref, watchEffect } from "vue";
import Character from "./Character.vue";
import { ValidationState } from "../game.js";

const props = defineProps<{
  wantedWord: string;
  validationStates?: Array<ValidationState>;
  disabled?: boolean;
}>();
const emit = defineEmits<{
  (e: "submit", event: { word: string }): void;
}>();

const input = ref<HTMLInputElement | undefined>(undefined);

watchEffect(
  () => {
    if (props.disabled === false) {
      input.value?.focus();
    }
  },
  { flush: "post" }
);

const indices = ref(Array.from(props.wantedWord, (_, i) => i));
const word = ref("");
const isFocused = ref(false);
const handleInput = (event: Event) => {
  word.value = (event.target as HTMLInputElement).value.toUpperCase();
};
const handleSubmit = () => {
  if (word.value.length === props.wantedWord.length) {
    emit("submit", { word: word.value });
  }
};
</script>

<template>
  <form @submit.prevent="handleSubmit">
    <label class="word">
      <Character
        v-for="index in indices"
        :character="word.charAt(index)"
        :validation-state="props.validationStates?.[index]"
        :is-focused="isFocused"
        :is-active="isFocused && index === word.length"
      />
      <input
        ref="input"
        class="word-input"
        v-model="word"
        @focus="isFocused = true"
        @blur="isFocused = false"
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
