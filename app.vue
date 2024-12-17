<template>
  <div class="min-h-screen bg-gray-50 p-6">
    <h1 class="text-3xl font-bold text-center mb-4">
      Repartir gastos
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
      @reset="reset"
    />
  </div>
</template>

<script lang="ts" setup>
import type { DebtorType, Person } from './types';

const initialPersonData = () => ({
  name: "",
  amount: 0,
});

const confirmWipeMessage = "Estas a punto de borrar todos los datos, ¿estás seguro?";
const confirmDeleteMessage = "Estas a punto de borrar a esta persona, ¿estás seguro?";
const people = ref<Person[]>([
  initialPersonData(),
]);
const showResults = ref(false);
const results = ref<DebtorType[]>([]);

const addPerson = () => {
  people.value.push(initialPersonData());
};

const formater = (amount: number) => Intl.NumberFormat("es-MX", {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
}).format(amount)

const removePerson = (index: number) => {
  if (people.value.length === 1) return;
  if (window.confirm(confirmDeleteMessage)) {
    people.value.splice(index, 1);
  }
};

const total = computed(() =>
  people.value.reduce(
    (sum, person) => sum + (person.amount || 0),
    0,
  ),
);

const calculateDebts = () => {
  // Removes empty names from people list
  people.value = people.value.filter((person) => person.name.trim() !== "");
  const totalSpent = total.value;
  const numberOfPeople = people.value.length;

  if (numberOfPeople < 2 || totalSpent === 0) return;

  const share = totalSpent / numberOfPeople;

  const balances = people.value.map((person, idx) => ({
    name: person.name || `Persona ${idx + 1}`,
    balance: (person.amount || 0) - share,
  }));

  const creditors = balances.filter((p) => p.balance > 0);
  const debtors = balances.filter((p) => p.balance < 0);

  const debtList = debtors.reduce((acc, debtor) => {
    if (debtor.balance === 0) return acc;

    creditors.reduce((_, creditor) => {
      if (debtor.balance === 0) return acc;

      const amount = Math.min(Math.abs(debtor.balance), creditor.balance);

      if (amount > 0) {
        acc.push({
          from: debtor.name,
          to: creditor.name,
          amount: formater(amount),
        });

        debtor.balance += amount;
        creditor.balance -= amount;
      }

      return acc;
    }, acc);

    return acc;
  }, [] as DebtorType[]);

  results.value = debtList;
  showResults.value = true;
};

const reset = (wipePeople: boolean) => {
  if (wipePeople && window.confirm(confirmWipeMessage)) {
    people.value = [initialPersonData()];
    results.value = [];
  }
  showResults.value = false;
};
</script>
