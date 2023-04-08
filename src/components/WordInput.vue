<script lang="ts">
export type ChangeEvent = {
  word: string;
  position: number;
};
</script>
<script setup lang="ts">
import { ref, watchEffect } from "vue";

const props = defineProps<{
  length: number;
  position?: number;
  disabled?: boolean;
}>();
const emit = defineEmits<{
  (name: "change", event: ChangeEvent): void;
}>();

const normalizeWord = (word: string) => {
  return word.toUpperCase().padEnd(props.length, " ").slice(0, props.length);
};

const input = ref<HTMLInputElement | undefined>(undefined);
const word = ref(normalizeWord(""));
const internalPosition = ref(props.position ?? 0);

watchEffect(() => {
  const { position = 0 } = props;

  internalPosition.value = position;
});

const focus = () => {
  const { value: position } = internalPosition;

  input.value?.focus();
  setTimeout(() => {
    const limitedPosition = limitPosition(position);
    input.value?.setSelectionRange(limitedPosition, limitedPosition + 1);
  }, 0);
};

watchEffect(focus, { flush: "post" });

const limitPosition = (position: number) => {
  return Math.min(Math.max(position, 0), props.length - 1);
};

const handleInput = (event: Event) => {
  const input = event.target as HTMLInputElement;
  let { value } = input;
  let position = limitPosition(internalPosition.value + 1);

  word.value = normalizeWord(value);
  internalPosition.value = position;

  emit("change", {
    word: word.value,
    position,
  });
};

const handleKey = (event: Event) => {
  const inputEvent = event as KeyboardEvent;

  if (inputEvent.key !== "Backspace") return;

  event.preventDefault();

  let { value } = event.target as HTMLInputElement;
  let { value: position } = internalPosition;

  value = value
    .split("")
    .map((character, index) => (index === position ? " " : character))
    .join("");
  position = limitPosition(position - 1);

  word.value = normalizeWord(value);
  internalPosition.value = position;

  emit("change", {
    word: word.value,
    position,
  });
  focus();
};
</script>

<template>
  <input
    ref="input"
    class="word-input"
    v-model="word"
    @keydown="handleKey"
    @input="handleInput"
    @blur="focus"
    :disabled="props.disabled"
  />
</template>
