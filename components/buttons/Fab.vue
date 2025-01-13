<template>
  <button class="text-white font-medium rounded-full text-xl p-2.5 text-center inline-flex items-center me-2 ml-4">
    <slot></slot>
    <span class="sr-only">{{ srContent ?? "Sin descripción" }}</span>
  </button>
</template>

<script lang="ts" setup>
defineProps<{
  srContent?: string;
}>();
</script>
