<script setup lang="ts">
import type ScratchShowcase from './ScratchShowcase';

defineProps<{
  showcase: ScratchShowcase;
}>();
</script>

<template>
  <iframe
    title="Embedded Scratch Project"
    class="element-border"
    :src="showcase.getEmbedUrl()"
    allowtransparency="true"
    width="485"
    height="402"
    scrolling="no"
    allowfullscreen
  ></iframe>
</template>

<style scoped lang="css">
iframe {
  border: 0;
}
</style>
