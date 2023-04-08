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

const indices = ref(Array.from(props.wantedWord, (_, i) => i));
const word = ref(" ".repeat(props.wantedWord.length));
const isFocused = ref(false);
const activeIndex = ref(0);
watchEffect(
  () => {
    if (props.disabled === false) {
      const index = activeIndex.value;

      input.value?.focus();
      requestAnimationFrame(() => {
        input.value?.setSelectionRange(index, index + 1);
      });
    }
  },
  { flush: "post" }
);
const handleInput = (event: Event) => {
  word.value = (event.target as HTMLInputElement).value.toUpperCase();
  activeIndex.value++;
};
const selectCharacter = (index: number) => {
  activeIndex.value = index;
  input.value?.focus();
  input.value?.setSelectionRange(index, index + 1);
};
const handleSubmit = () => {
  if (word.value.trim().length === props.wantedWord.length) {
    emit("submit", { word: word.value });
  }
};
</script>

<template>
  <form @submit.prevent="handleSubmit">
    <label class="word">
      <button
        v-for="index in indices"
        class="character-button"
        type="button"
        :disabled="props.disabled"
        @click="selectCharacter(index)"
      >
        <Character
          :character="word.charAt(index)"
          :validation-state="props.validationStates?.[index]"
          :is-focused="isFocused"
          :is-active="index === activeIndex"
        />
      </button>
      <input
        ref="input"
        class="word-input"
        v-model="word"
        @input="handleInput"
        :disabled="props.disabled"
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

.character-button {
  border: none;
  background: none;
  padding: 0;
  margin: 0;
  cursor: pointer;
}
</style>
