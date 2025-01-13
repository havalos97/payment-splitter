<template>
  <button
    type="button"
    :disabled="loading || (disabled ?? false)"
    class="text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-blue-500 dark:text-white dark:bg-blue-500 dark:hover:text-white dark:hover:bg-blue-600 dark:focus:ring-blue-800"
    :class="{
      'w-full': fullWidth,
      'border border-blue-500 bg-blue-500': !disabled,
      'hover:bg-blue-700': !disabled && !loading,
      'bg-blue-200 border-blue-200': disabled,
      'hover:bg-blue-200': !loading && disabled,
    }"
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
