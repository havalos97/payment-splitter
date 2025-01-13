<template>
  <div tabindex="-1" class="fixed inset-0 z-50 flex justify-center items-center">
    <div
      class="fixed inset-0 bg-black bg-opacity-50"
      @click="closeOnOverlayClick"
    ></div>
    <div class="relative p-4 w-full max-w-md max-h-full">
      <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
        <button
          type="button"
          class="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
          @click="$emit('close')"
        >
          <close-icon />
          <span class="sr-only">Cerrar ventana emergente</span>
        </button>
        <div class="p-4 md:p-5 text-center">
          <error-icon class="mx-auto mb-4 text-blue-500 w-12 h-12 dark:text-blue-300" />
          <h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
            {{ message }}
          </h3>
          <div class="flex justify-end space-x-3">
            <cta-outlined @click="$emit('close')">
              {{ noText ?? 'No' }}
            </cta-outlined>
            <cta @click="$emit('confirm')">
              {{ yesText ?? 'Si' }}
            </cta>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps<{
  message: string;
  yesText: string;
  noText: string;
  closeOnEscape?: boolean;
  closeOnOverlayClick?: boolean;
}>();

const emits = defineEmits(['confirm', 'cancel', 'close']);

const closeOnOverlayClick = () => {
  if (props.closeOnOverlayClick) {
    emits('close');
  }
};

const allowCloseOnEsc = (event: KeyboardEvent) =>
  props.closeOnEscape && event.key === 'Escape';

const closeOnEscape = (event: KeyboardEvent) => {
  if (allowCloseOnEsc(event)) {
    emits('close');
  }
};

onMounted(() => {
  window.addEventListener('keydown', closeOnEscape);
});

onUnmounted(() => {
  window.removeEventListener('keydown', closeOnEscape);
});
</script>
