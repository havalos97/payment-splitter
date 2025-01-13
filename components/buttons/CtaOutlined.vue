<template>
  <button
    type="button"
    :disabled="loading || (disabled ?? false)"
    class="text-blue-500 bg-transparent hover:bg-blue-100 border border-blue-500 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:bg-transparent dark:hover:text-white dark:hover:bg-blue-500"
    :class="{ 'w-full': fullWidth }"
  >
    <slot></slot>
  </button>
</template>

<script lang="ts" setup>
defineProps<{
  fullWidth?: boolean;
  loading?: boolean;
  disabled?: boolean;
}>();
</script>
