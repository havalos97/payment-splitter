<template>
  <div class="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow">
    <h2 class="text-2xl font-semibold mb-4">
      ¿Quién le debe a quién?
    </h2>
    <p v-if="!results.length" class="mb-4">
      No hay deudas pendientes
    </p>
    <ul v-else class="list-disc pl-6">
      <li
        v-for="(debt, index) in results"
        :key="index"
        class="mb-2"
      >
        <strong>{{ debt.from }}</strong> le debe a <strong>{{ debt.to }}</strong> ${{ debt.amount }} MXN
      </li>
    </ul>
    <cta full-width @click="emits('reset', false)">
      Volver
    </cta>
  </div>
</template>

<script lang="ts" setup>
import type { DebtorType } from '~/types';

const emits = defineEmits(['reset']);

defineProps<{
  results: DebtorType[];
}>();
</script>
