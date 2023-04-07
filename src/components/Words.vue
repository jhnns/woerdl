<script setup lang="ts">
import { reactive, ref } from "vue";
import Word from "./Word.vue";
import { ValidationState } from "../game.js";

const wantedWord = ref("DAMPF");

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
const handleSubmit = (wordRow: WordRow, word: string) => {
  currentIndex.value = wordRow.index + 1;
  wordRow.word = word;
  wordRow.validationStates = validateWordRow(wordRow);
};
</script>

<template>
  <Word
    v-for="wordRow of wordRows"
    :wanted-word="wantedWord"
    :disabled="currentIndex !== wordRow.index"
    :validation-states="wordRow.validationStates"
    @submit="({ word }) => handleSubmit(wordRow, word)"
  />
</template>

<style scoped></style>
