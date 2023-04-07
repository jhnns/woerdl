<script setup lang="ts">
import { ValidationState } from "../game.js";

const props = defineProps<{
  character: string;
  validationState?: ValidationState;
}>();
</script>

<template>
  <div
    class="character"
    :class="props.validationState && `character--${props.validationState}`"
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
