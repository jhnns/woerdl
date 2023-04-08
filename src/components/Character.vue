<script setup lang="ts">
import { ValidationState } from "../game.js";

const props = defineProps<{
  character: string;
  validationState?: ValidationState;
  isFocused?: boolean;
  isActive?: boolean;
}>();
</script>

<template>
  <div
    class="character"
    :class="{
      'character--is-focused': props.isFocused,
      'character--is-active': props.isActive,
      'character--position-and-character-correct':
        props.validationState === ValidationState.PositionAndCharacterCorrect,
      'character--character-correct':
        props.validationState === ValidationState.CharacterCorrect,
      'character--incorrect':
        props.validationState === ValidationState.Incorrect,
    }"
  >
    {{ props.character }}
  </div>
</template>

<style scoped>
.character {
  width: 6rem;
  height: 6rem;
  font-size: 4rem;
  text-align: center;
  background-color: hsla(199, 85%, 66%, 0.2);
  border: 2px solid hsla(199, 85%, 66%, 0.4);
  transition: background-color 0.2s ease-out, border-color 0.2s ease-out;
}

.character--is-focused {
  background-color: hsla(199, 85%, 66%, 0.4);
  border-color: hsla(199, 85%, 66%, 0.6);
}

.character--is-active {
  background-color: hsla(199, 83%, 84%, 0.4);
  border-color: hsla(199, 83%, 84%, 0.6);
}

.character--position-and-character-correct {
  background-color: hsla(141, 85%, 66%, 0.2);
  border-color: hsla(141, 85%, 66%, 0.4);
}

.character--character-correct {
  background-color: hsla(54, 85%, 66%, 0.2);
  border-color: hsla(54, 85%, 66%, 0.4);
}

.character--incorrect {
  background-color: hsla(0, 52%, 36%, 0.2);
  border-color: hsla(0, 52%, 36%, 0.4);
}
</style>
