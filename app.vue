<template>
  <VitePwaManifest />
  <div class="min-h-screen print:bg-transparent bg-gray-100 p-6">
    <h1 class="text-3xl font-bold text-center mb-4">
      PaySplit
    </h1>
    <payments-form
      v-if="!showResults"
      :people="people"
      :total="total"
      @add-person="addPerson"
      @remove-person="removePerson"
      @calculate-debts="calculateDebts"
      @reset="reset"
      @state-from-query="setStateFromQuery"
    />
    <payment-results
      v-else
      :results="results"
      @reset="reset(false)"
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

const { show, isLink, message, position, hideToast } = useToast();

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

const reset = (wipePeople: boolean) => {
  if (wipePeople) {
    people.value = [initialPersonData()];
    results.value = [];
  }
  showResults.value = false;
};

const setStateFromQuery = (query: string) => {
  const state = decodeQueryData(query);
  people.value = state.people as Person[];
};
</script>
