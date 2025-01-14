<template>
  <div class="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow print:shadow-none">
    <div class="grid grid-cols-2 gap-4 mb-4">
      <div>
        <h2 class="text-2xl font-semibold mb-4">
          Results
        </h2>
      </div>
      <div class="flex justify-end print:hidden">
        <fab
          class="bg-red-600 hover:bg-red-700 dark:bg-red-600 dark:hover:bg-red-700"
          data-tooltip-target="pdf-export-tooltip"
          @click="print"
        >
          <pdf-icon class="w-6 h-6" />
        </fab>
        <div
          id="pdf-export-tooltip"
          role="tooltip"
          class="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700"
        >
          Export to PDF
          <div class="tooltip-arrow" data-popper-arrow></div>
        </div>
      </div>
    </div>
    <p v-if="!results.length" class="mb-4">
      No debts to show
    </p>
    <ul v-else class="list-disc pl-6">
      <li
        v-for="(debt, index) in results"
        :key="index"
        class="mb-2"
      >
        <strong>{{ debt.from }}</strong> owes <strong>{{ debt.to }}</strong> ${{ debt.amount }}
      </li>
    </ul>
    <cta class="print:hidden" full-width @click="emits('closeResults')">
      Go back
    </cta>
  </div>
</template>

<script lang="ts" setup>
import type { DebtorType } from '~/types';
import { initFlowbite } from 'flowbite';

const emits = defineEmits(['closeResults']);

const print = () => window?.print();

defineProps<{
  results: DebtorType[];
}>();

onMounted(() => {
  initFlowbite();
});
</script>
