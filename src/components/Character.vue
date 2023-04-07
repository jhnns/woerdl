<script setup lang="ts">
import { ref } from "vue";

const props = defineProps<{ character: string }>();

const count = ref(0);
</script>

<template>
  <div class="character">{{ props.character }}</div>
</template>

<style scoped>
.character {
  width: 6rem;
  height: 6rem;
  font-size: 4rem;
  text-align: center;
  background-color: hsla(199, 85%, 66%, 0.196);
  border: 2px solid hsla(199, 85%, 66%, 0.4);
}
</style>
