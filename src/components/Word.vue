<script setup lang="ts">
import { ref } from "vue";
import Character from "./Character.vue";
import WordInput from "./WordInput.vue";
import { ValidationState } from "../game.js";
import { ChangeEvent } from "./WordInput.vue.js";

const props = defineProps<{
  wantedWord: string;
  validationStates?: Array<ValidationState>;
  disabled?: boolean;
}>();
const emit = defineEmits<{
  (e: "submit", event: { word: string }): void;
}>();

const indices = ref(Array.from(props.wantedWord, (_, i) => i));
const word = ref("");
const isFocused = ref(false);
const position = ref(0);

const selectCharacter = (index: number) => {
  position.value = index;
};

const handleWordChange = (event: ChangeEvent) => {
  word.value = event.word;
  position.value = event.position;
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
      <div class="word-input">
        <WordInput
          :length="wantedWord.length"
          :position="position"
          :disabled="props.disabled"
          @change="handleWordChange"
        />
      </div>
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
          :is-active="index === position"
        />
      </button>
    </label>
  </form>
</template>

<style scoped>
.word {
  position: relative;
  display: flex;
  gap: 8px;
}
.word-input {
  position: absolute;
  opacity: 0;
  font-size: 16px;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
}
.character-button {
  border: none;
  background: none;
  padding: 0;
  margin: 0;
  cursor: pointer;
}
</style>
