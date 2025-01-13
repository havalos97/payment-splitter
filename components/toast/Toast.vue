<template>
  <div
    class="fixed z-50 flex items-center md:max-w-md lg:max-w-lg mx-4 p-4 text-gray-500 bg-white border rounded-lg shadow-lg border-gray-200 dark:text-gray-400 dark:bg-gray-800 dark:border-gray-700"
    :class="toastClasses"
    role="alert"
  >
    <div class="flex-shrink-0">
      <info-icon class="w-6 h-6" />
    </div>
    <div v-if="message && !isLink" class="ml-3 text-sm font-normal">
      {{ message }}
    </div>
    <div v-if="isLink" class="ml-3 text-sm font-normal">
      <a
        :href="message"
        class="text-blue-500 hover:underline dark:text-blue-400"
        @click.prevent="$emit('close')"
      >
        {{ props.linkMessage }}
      </a>
    </div>
    <button
      type="button"
      class="ml-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg p-1.5 hover:bg-gray-100 dark:hover:bg-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:text-white"
      aria-label="Cerrar"
      @click="$emit('close')"
    >
      <span class="sr-only">
        Cerrar
      </span>
      <close-icon class="w-3 h-3" />
    </button>
  </div>
</template>

<script lang="ts" setup>
import { ToastPosition } from '~/types/toast.types';

const props = defineProps<{
  message: string;
  position: ToastPosition;
  isLink?: boolean;
  linkMessage?: string;
}>();

const positionClasses = {
  [ToastPosition.bottomLeft]: 'w-full max-w-full bottom-4 left-4',
  [ToastPosition.bottomCenter]: 'w-full max-w-full bottom-4 left-1/2 transform -translate-x-1/2',
  [ToastPosition.bottomFullWidth]: 'bottom-4 left-4 right-4',
  [ToastPosition.bottomRight]: 'w-full max-w-full bottom-4 right-4',
  [ToastPosition.topLeft]: 'w-full max-w-full top-4 left-4',
  [ToastPosition.topRight]: 'w-full max-w-full top-4 right-4',
};

const toastClasses = computed(() =>
  positionClasses[props.position as ToastPosition],
);
</script>
