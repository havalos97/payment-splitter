<template>
  <VitePwaManifest />
  <div class="min-h-screen print:bg-transparent bg-[url('/bg_img.jpg')] p-6">
    <h1 class="text-3xl font-bold text-center mb-4">
      PaymentSplitter
    </h1>
    <payments-form
      v-if="!showResults"
      :people="people"
      :total="total"
      @add-person="addPerson"
      @remove-person="removePerson"
      @calculate-debts="calculateDebts"
      @reset="reset"
    />
    <payment-results
      v-else
      :results="results"
      @close-results="closeResults"
    />
    <Transition name="fade">
      <toast
        v-if="show"
        :message="message ?? ''"
        :position="position ?? ToastPosition.bottomCenter"
        :is-link="isLink"
        link-message="Clipboard API unavailable. Click and hold to copy."
        @close="hideToast"
      />
    </Transition>
    <confirmation-modal
      v-if="displayOverwriteDataModal"
      message="Looks like you already entered some data but someone shared a link with you. Do you want to overwrite the data with the shared one?"
      yesText="Yes"
      noText="No"
      @confirm="useDataFromQuery"
      @close="useDataFromStore"
    />
  </div>
</template>

<script lang="ts" setup>
import type { DebtorType, Person } from './types';
import { ToastPosition } from './types/toast.types';

const initialPersonData = () => ({
  name: "",
  amount: 0,
} as Person);

const people = ref<Person[]>([
  initialPersonData(),
]);
const showResults = ref(false);
const results = ref<DebtorType[]>([]);
const displayOverwriteDataModal = ref(false);

const { show, isLink, message, position, hideToast } = useToast();
const route = useRoute();
const rootStore = useRootStore();

const addPerson = () => {
  people.value.push(initialPersonData());
};

const removePerson = (index: number) => {
  if (people.value.length === 1) return;
  people.value.splice(index, 1);
};

const total = computed(() =>
  people.value.reduce(
    (sum, person) => sum + (person.amount || 0),
    0,
  ),
);

const calculateDebts = () => {
  const debtors = getDebtorList({
    people: people.value,
    total: total.value,
  });
  if (!debtors) return;
  results.value = debtors;
  showResults.value = true;
};

const closeResults = () =>
  showResults.value = false;

const reset = () => {
  people.value = [initialPersonData()];
  results.value = [];
};

const showOverwriteDataModal = () =>
  displayOverwriteDataModal.value = true;

const hideOverwriteDataModal = () =>
  displayOverwriteDataModal.value = false;

const useDataFromStore = () => {
  people.value = rootStore.people.slice();
  hideOverwriteDataModal();
}

const useDataFromQuery = () => {
  const state = decodeQueryData(route.query.state as string);
  people.value = state?.people as Person[] ?? [initialPersonData()];
  hideOverwriteDataModal();
};

const dataOriginManager = () => {
  const dataFromStore = rootStore.people.length > 0;
  const dataFromQuery = route.query.state;

  // If someone shared a link with data and the user already entered some data
  if (dataFromStore && dataFromQuery) {
    showOverwriteDataModal();
  }
  // If the user didn't enter any data and someone shared a link with data
  else if (!dataFromStore && dataFromQuery) {
    useDataFromQuery();
  }
  // If the user entered some data and no one shared a link with data
  else if (dataFromStore && !dataFromQuery) {
    useDataFromStore();
  }
};

onMounted(() => {
  dataOriginManager();
});
</script>
