<script setup lang="ts">
import { onMounted, defineProps, watchEffect, ref } from "vue";
import { Explosion } from "./fireworks/explosion.js";
import { Render } from "./fireworks/render.js";

const props = defineProps<{
  intensity: number;
}>();
const isMounted = ref(false);
onMounted(() => {
  isMounted.value = true;
  Render._init();
});
watchEffect((onCleanup) => {
  if (isMounted.value && props.intensity) {
    let timeout: ReturnType<typeof setTimeout>;

    const renderExplosion = () => {
      Render.scene.push(new Explosion(Render.gl, 1));
      timeout = setTimeout(
        renderExplosion,
        Math.random() * (1000 / props.intensity)
      );
    };

    renderExplosion();
    onCleanup(() => {
      clearTimeout(timeout);
    });
  }
});
</script>
<template>
  <canvas id="fireworks"></canvas>
</template>
<style scoped>
#fireworks {
  position: absolute;
  inset: 0;
  z-index: -1;
}
</style>
