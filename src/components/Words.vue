<script setup lang="ts">
import { computed, onMounted, reactive } from "vue";
import Word from "./Word.vue";
import Fireworks from "./Fireworks.vue";
import { ValidationState } from "../game.js";
import { solvedWords, wantedWord } from "../lib/words.js";

type WordRow = {
  word: string;
  validationStates?: Array<ValidationState>;
};

const wordRows = reactive<Array<WordRow>>([]);
const addWord = () => {
  wordRows.push({
    word: "",
  });
};
onMounted(() => {
  addWord();
});

const validateWordRow = ({ word }: WordRow) => {
  const validationStates = word.split("").map((character, index) => {
    const wantedCharacter = wantedWord.value.charAt(index);

    return character === wantedCharacter
      ? ValidationState.PositionAndCharacterCorrect
      : wantedWord.value.includes(character)
      ? ValidationState.CharacterCorrect
      : ValidationState.Incorrect;
  });

  return validationStates;
};
const isFinished = computed(() => {
  const lastWordRow = wordRows.at(-1);

  return (
    lastWordRow?.validationStates?.every(
      (validationState) =>
        validationState === ValidationState.PositionAndCharacterCorrect
    ) === true
  );
});
const handleSubmit = (wordRow: WordRow, word: string) => {
  wordRow.word = word;
  wordRow.validationStates = validateWordRow(wordRow);
  if (isFinished.value) {
    solvedWords.add(word);
    return;
  }
  addWord();
};
</script>

<template>
  <div class="words">
    <Word
      v-for="(wordRow, index) in wordRows"
      :wanted-word="wantedWord"
      :disabled="index < wordRows.length - 1"
      :validation-states="wordRow.validationStates"
      @submit="({ word }) => handleSubmit(wordRow, word)"
    />
    <Fireworks :intensity="isFinished ? (1 / wordRows.length) * 2 : 0" />
  </div>
</template>

<style scoped>
.words {
  display: flex;
  flex-flow: column-reverse;
  justify-content: center;
  align-items: center;
  height: 100vh;
  gap: 8px;
}
</style>
