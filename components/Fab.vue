<template>
  <button class="text-white bg-red-600 hover:bg-red-700 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center me-2 dark:bg-red-600 dark:hover:bg-red-700 ml-4">
    <slot></slot>
    <span class="sr-only">{{ srContent ?? "Sin descripción" }}</span>
  </button>
</template>

<script lang="ts" setup>
defineProps<{
  srContent?: string;
}>();
</script>
