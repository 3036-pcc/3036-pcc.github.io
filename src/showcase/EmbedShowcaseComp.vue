<script setup lang="ts">
import type EmbedShowcase from './EmbedShowcase';

defineProps<{
  showcase: EmbedShowcase;
}>();
</script>

<template>
  <iframe :title="showcase.metadata.name" class="element-border" :src="showcase.src" allow="fullscreen"></iframe>
</template>

<style scoped lang="css">
iframe {
  border: 0;
  width: 100%;
  min-height: calc(100vh - 120px);
  max-height: calc(100vw);
}
</style>
