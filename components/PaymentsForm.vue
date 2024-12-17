<template>
  <div class="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow">
    <h2 class="text-2xl font-semibold mb-4">
      Lista de personas
    </h2>
    <div
      v-for="(person, index) in people"
      :key="index"
      class="flex flex-wrap sm:flex-nowrap items-center mb-4 gap-4"
    >
      <input
        v-model="person.name"
        placeholder="Nombre"
        class="border rounded p-2 flex-1 min-w-[150px]"
        type="text"
        maxlength="25"
      />
      <div class="flex">
        <span class="inline-flex items-center px-3 text-sm text-gray-400 bg-gray-100 border rounded-e-0 border-gray-200 border-e-0 rounded-s-md dark:bg-gray-100 dark:text-gray-400 dark:border-gray-200">
          <svg class="w-6 h-6 text-black dark:text-black" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 17.345a4.76 4.76 0 0 0 2.558 1.618c2.274.589 4.512-.446 4.999-2.31.487-1.866-1.273-3.9-3.546-4.49-2.273-.59-4.034-2.623-3.547-4.488.486-1.865 2.724-2.899 4.998-2.31.982.236 1.87.793 2.538 1.592m-3.879 12.171V21m0-18v2.2"/>
          </svg>
        </span>
        <input
          v-model.number="person.amount"
          placeholder="Cantidad (MXN)"
          class="border rounded p-2 w-full md:w-36"
          type="number"
          min="0"
          @keydown="formatAmount"
        />
        <fab @click="emits('removePerson', index)">
          <trash-icon class="w-4 h-4 text-white" />
        </fab>
      </div>
    </div>
    <cta @click="emits('addPerson')">
      Añadir persona
    </cta>
    <div class="mt-4 text-lg font-semibold">
      Total: <span class="text-green-600">${{ total }}</span> MXN
    </div>
    <cta full-width @click="emits('calculateDebts')">
      Calcular
    </cta>
    <cta-outlined @click="emits('reset', true)">
      Limpiar datos
    </cta-outlined>
  </div>
</template>

<script lang="ts" setup>
import type { Person } from '~/types';

const emits = defineEmits([
  'reset',
  'calculateDebts',
  'addPerson',
  'removePerson'
]);

const props = defineProps<{
  people: Person[];
  total: number;
}>();

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
</script>
