import type { ToastPosition } from "~/types/toast.types";

const showRef = ref<boolean>(false);
const messageRef = ref<string | null>(null);
const timeoutRef = ref<number | null>(null);
const toastPositionRef = ref<ToastPosition | null>(null);

/**
 * Sets the visibility of the toast.
 *
 * @param visible - A boolean indicating whether the toast should be visible (true) or hidden (false).
 */
const setToastVisibility = (visible: boolean) => {
  showRef.value = visible;
};

/**
 * Sets the message of the toast.
 *
 * @param message - The message to display in the toast. If null, the toast will not display a message.
 */
const setToastMessage = (message: string | null) => {
  messageRef.value = message;
};

/**
 * Sets the number of seconds the toast will be shown before disappearing.
 * 
 * @param timeoutInSeconds - The timeout duration in seconds. If null, the timeout will be set to 0.
 */
const setToastTimeout = (timeoutInSeconds: number | null) =>
  timeoutRef.value = (timeoutInSeconds ?? 0) * 1000;

/**
 * Sets the position of the toast.
 *
 * @param position - The new position of the toast. If null, the toast will default to bottom-right.
 */
const setToastPosition = (position: ToastPosition | null) =>
  toastPositionRef.value = position;

/**
 * Displays the toast by setting its visibility to true.
 */
const showToast = () => setToastVisibility(true);

/**
 * Hides the toast by setting its visibility to false.
 */
const hideToast = () => setToastVisibility(false);

/**
 * Toggles the visibility of the toast.
 */
const toggleToast = () => setToastVisibility(!showRef.value);

/**
 * Resets the toast to its initial state.
 */
const resetToast = () => {
  setToastVisibility(false);
  setToastMessage(null);
  setToastTimeout(null);
  setToastPosition(null);
}

export const useToast = () => {
  return {
    show: showRef,
    message: messageRef,
    position: toastPositionRef,
    showToast,
    hideToast,
    toggleToast,
    setToastVisibility,
    setToastMessage,
    setToastTimeout,
    setToastPosition,
    resetToast,
  };
};

watch(() => showRef.value, (newValue) => {
  if (!newValue || !timeoutRef.value) {
    return;
  }
  setTimeout(() => {
    hideToast();
  }, timeoutRef.value);
}, { immediate: true });
