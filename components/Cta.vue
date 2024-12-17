<template>
  <button
    class="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700"
    :class="{ 'mt-6 w-full text-white': fullWidth }"
  >
    <slot></slot>
  </button>
</template>

<script lang="ts" setup>
defineProps<{
  fullWidth?: boolean;
}>();
</script>
