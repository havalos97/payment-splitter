<template>
  <div class="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow">
    <div class="grid grid-cols-2 gap-4 mb-4">
      <div>
        <h2 class="text-2xl font-semibold mb-4">
          People list
        </h2>
      </div>
      <div class="flex justify-end">
        <fab
          class="bg-green-600 hover:bg-green-700 dark:bg-green-600 dark:hover:bg-green-700"
          data-tooltip-target="add-person-tooltip"
          @click="emits('addPerson')"
        >
          <plus-icon class="w-6 h-6 text-red" />
        </fab>
        <div
          id="add-person-tooltip"
          role="tooltip"
          class="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700"
        >
          Add person
          <div class="tooltip-arrow" data-popper-arrow></div>
        </div>
        <fab
          class="bg-gray-400 hover:bg-gray-500 dark:bg-gray-400 dark:hover:bg-gray-700"
          data-tooltip-target="share-tooltip"
          @click="shareState"
        >
          <share-nodes-icon class="w-6 h-6 text-red" />
        </fab>
        <div
          id="share-tooltip"
          role="tooltip"
          class="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700"
        >
          Share link
          <div class="tooltip-arrow" data-popper-arrow></div>
        </div>
      </div>
    </div>
    <div
      v-for="(person, index) in people"
      :key="index"
      class="flex flex-wrap sm:flex-nowrap items-center mb-4 gap-4"
    >
      <input
        v-model="person.name"
        placeholder="Name"
        class="border rounded p-2 flex-1 min-w-[150px]"
        type="text"
        maxlength="25"
      />
      <div class="flex">
        <span class="inline-flex items-center px-3 text-sm text-gray-400 bg-gray-100 border rounded-e-0 border-gray-200 border-e-0 rounded-s-md dark:bg-gray-100 dark:text-gray-400 dark:border-gray-200">
          <dollar-icon class="w-6 h-6 text-black dark:text-black" />
        </span>
        <input
          v-model.number="person.amount"
          placeholder="Amount"
          class="border rounded p-2 w-full md:w-36"
          type="number"
          min="0"
          @keydown="formatAmount"
        />
        <fab
          class="bg-red-600 hover:bg-red-700 dark:bg-red-600 dark:hover:bg-red-700"
          @click="deletePersonAction(index)"
        >
          <trash-icon class="w-6 h-6 text-white" />
        </fab>
      </div>
    </div>
    <div class="mt-4 text-lg font-semibold">
      Total: <span class="text-green-600">${{ total }}</span>
    </div>
    <cta class="my-4" @click="emits('calculateDebts')" full-width>
      Calculate
    </cta>
    <cta-outlined class="my-4" @click="showResetConfirmationModal = true" full-width>
      Clear all
    </cta-outlined>
  </div>
  <confirmation-modal
    v-if="showResetConfirmationModal"
    :message="confirmWipeMessage"
    yesText="Yes"
    noText="No"
    @confirm="confirmReset"
    @close="showResetConfirmationModal = false"
  />
  <confirmation-modal
    v-if="showConfirmDeleteModal"
    :message="confirmDeleteMessage"
    yesText="Yes"
    noText="No"
    @confirm="confirmDeletePerson"
    @close="showConfirmDeleteModal = false"
  />
</template>

<script lang="ts" setup>
import type { PaymentsFormComponentProps } from '~/types/payments-form.types';
import { initFlowbite } from 'flowbite';
import { ToastPosition } from '~/types/toast.types';
import { generateStateUrl } from '~/utils/generateStateUrl';

const emits = defineEmits([
  'reset',
  'calculateDebts',
  'addPerson',
  'removePerson',
  'stateFromQuery',
]);

const props = defineProps<PaymentsFormComponentProps>();

const route = useRoute();
const { isSm } = useDevice();
const {
  showToast,
  setToastMessage,
  setToastPosition,
  setToastTimeout,
  setToastIsLink,
} = useToast();

const showConfirmDeleteModal = ref(false);
const showResetConfirmationModal = ref(false);
const selectedPersonIndex = ref(-1);

const selectedPersonName = computed(() => props.people.at(selectedPersonIndex.value)?.name);
const confirmDeleteMessage = computed(() =>
  `Are you sure you want to remove ${selectedPersonName.value} from the list?`,
);
const confirmWipeMessage = "This will remove all people from the list. Are you sure?";

const deletePersonAction = (index: number) => {
  selectedPersonIndex.value = index;
  if (selectedPersonName.value) {
    showConfirmDeleteModal.value = true;
  } else {
    confirmDeletePerson();
  }
};

const confirmDeletePerson = () => {
  emits('removePerson', selectedPersonIndex.value);
  showConfirmDeleteModal.value = false;
};

const confirmReset = () => {
  emits('reset', true);
  showResetConfirmationModal.value = false;
};

const total = computed(() =>
  props.people.reduce(
    (sum, person) => sum + (person.amount || 0),
    0,
  ),
);

const formatAmount = (e: KeyboardEvent) =>
  e.key.length === 1 &&
  isNaN(Number(e.key)) &&
  e.preventDefault();

const shareState = () => {
  const sharedUrl = generateStateUrl({
    people: props.people,
    total: total.value,
  });
  try {
    navigator.clipboard.writeText(sharedUrl);
    setToastMessage('Link copied to clipboard');
    setToastIsLink(false);
    setToastTimeout(5);
  } catch (error) {
    setToastMessage(sharedUrl);
    setToastIsLink(true);
    setToastTimeout(20);
  }
  setToastPosition(
    isSm.value
      ? ToastPosition.bottomFullWidth
      : ToastPosition.bottomRight,
  );
  showToast();
}

onMounted(() => {
  initFlowbite();
  if (route.query.state) {
    emits('stateFromQuery', route.query.state as string);
  }
});
</script>
