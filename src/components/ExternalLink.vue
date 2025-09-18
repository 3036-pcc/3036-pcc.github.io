<script setup lang="ts">
import { useSlots } from 'vue';

const props = defineProps<{
  href: string;
}>();

useSlots();
</script>

<template>
  <div>
    <h2><slot></slot></h2>
    <a :href="props.href" target="_blank">
      <span class="material-symbols-outlined"> open_in_new </span>
      <span class="text">公式サイト</span>
    </a>
  </div>
</template>

<style scoped lang="css">
div {
  display: flex;
  align-items: baseline;
}

span {
  font-size: 1em;
}

h2 {
  text-align: left;
  font-size: 2rem;
  margin-top: 8px;
}

a {
  display: flex;
  align-items: center;
  font-size: 1.5rem;
  margin-left: 16px;
  color: slateblue;
  text-decoration: none;
  transform: translateY(3px);
}

.material-symbols-outlined {
  user-select: none;
}

.text {
  margin-left: 4px;
}
</style>
