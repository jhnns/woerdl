<script setup lang="ts">
import { computed, reactive, ref } from "vue";
import Word from "./Word.vue";
import { ValidationState } from "../game.js";
import { solvedWords, wantedWord } from "../lib/words.js";

type WordRow = {
  index: number;
  word: string;
  validationStates?: Array<ValidationState>;
};

const wordRows = reactive(
  Array.from(
    { length: 6 },
    (_, index): WordRow => ({
      index,
      word: "",
      validationStates: undefined,
    })
  )
);
const currentIndex = ref(0);
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
const currentWordRow = computed(() => wordRows[currentIndex.value]);
const isFinished = computed(() => {
  return (
    currentWordRow.value.validationStates?.every(
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
  currentIndex.value = wordRow.index + 1;
};
</script>

<template>
  <Word v-if="isFinished" :wanted-word="wantedWord" disabled />
  <Word
    v-else
    v-for="wordRow of wordRows"
    :wanted-word="wantedWord"
    :disabled="currentIndex !== wordRow.index"
    :validation-states="wordRow.validationStates"
    @submit="({ word }) => handleSubmit(wordRow, word)"
  />
</template>

<style scoped></style>
