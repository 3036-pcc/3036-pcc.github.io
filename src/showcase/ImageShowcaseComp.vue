<script setup lang="ts">
import type ImageShowcase from './ImageShowcase';

defineProps<{
  showcase: ImageShowcase;
}>();
</script>

<template>
  <img alt="" :src="showcase.imageSrc" />
</template>

<style scoped lang="css">
img {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
}
</style>
