<script setup lang="ts">
import type BaseShowcase from '@/showcase/BaseShowcase';
import { getShowcases } from '@/showcase/loader';
import NotFoundShowcase from '@/showcase/NotFoundShowcase';
import { computed, defineAsyncComponent, onMounted, onUnmounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();

const showcaseList = ref<BaseShowcase[]>([]);
getShowcases().then((list) => (showcaseList.value = list));

const showcaseIndex = computed(() => Number.parseInt(route.params.index as string));

const current = computed(() => showcaseList.value[showcaseIndex.value]);

function onKeyDown(e: KeyboardEvent) {
  if (e.key == 'Escape') {
    router.back();
  }
}

onMounted(() => document.addEventListener('keydown', onKeyDown));
onUnmounted(() => document.removeEventListener('keydown', onKeyDown));
</script>

<template>
  <div class="container" v-if="showcaseList.length >= showcaseIndex - 1" :key="showcaseIndex">
    <nav>
      <h1>{{ (current ?? NotFoundShowcase).metadata.name }}</h1>
      <button><span @click="router.back()" class="material-symbols-outlined"> close </span></button>
    </nav>
    <div class="showcase-view">
      <component
        :is="defineAsyncComponent((current ?? NotFoundShowcase).getComponent())"
        :showcase="current ?? NotFoundShowcase"
      />
    </div>
  </div>
</template>

<style scoped lang="css">
.container {
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
}

nav {
  display: flex;
  align-items: center;
  gap: 24px;
  font-size: 1.5em;
}

a, button {
  border: none;
  background-color: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
  aspect-ratio: 1 / 1;
  color: var(--black-2);
  transition: 100ms ease-out;

  &:hover {
    transform: scale(1.025);
    color: var(--black-1);
  }
}

span {
  font-size: 3em;
  user-select: none;
}

.showcase-view {
  width: min(80vw, 800px);
}
</style>
