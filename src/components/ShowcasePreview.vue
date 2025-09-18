<script setup lang="ts">
import BaseShowcase from '@/showcase/BaseShowcase';
import LinkShowcase from '@/showcase/LinkShowcase';
import getMaterialSymbolIcon from '@/showcase/loader';
import { useRouter } from 'vue-router';

const props = defineProps<{
  index: number;
  showcase: BaseShowcase;
}>();

const router = useRouter();

function onClick() {
  if (props.showcase instanceof LinkShowcase) {
    window.open(props.showcase.href, '_blank')?.focus();
  } else {
    router.push(`/showcase/${props.index.valueOf()}`);
  }
}
</script>

<template>
  <div>
    <h3>{{ showcase.metadata.name }}</h3>
    <div class="container" @click="onClick">
      <img alt="" :src="showcase.metadata.thumbnailSrc" fetchpriority="low" loading="lazy" />
      <span class="material-symbols-outlined">{{ getMaterialSymbolIcon(showcase.metadata.icon) }}</span>
    </div>
  </div>
</template>

<style scoped lang="css">
.container {
  position: relative;
  margin-top: 0;
}

img {
  aspect-ratio: 4 / 3;
  object-fit: cover;
  margin: 0;
  padding: 0;
  cursor: pointer;
  transition: 150ms;

  &:hover {
    box-shadow: 0 0 12px var(--color-1);
    transform: scale(1.005);
  }
}

span {
  position: absolute;
  left: 8px;
  top: 8px;
  padding: 4px;
  user-select: none;
  pointer-events: none;
  text-shadow:
    0.05em 0 white,
    0 0.05em white,
    -0.05em 0 white,
    0 -0.05em white,
    -0.05em -0.05em white,
    -0.05em 0.05em white,
    0.05em -0.05em white,
    0.05em 0.05em white,
    0 0 0.25em black;
}
</style>
