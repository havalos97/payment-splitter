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
    <confirmation-modal
      v-if="groupNotFound"
      message="This group was not found. Please check the link or create a new group."
      yes-text="Create new group"
      no-text="Go back"
      @confirm="createGroupModalCb"
      @close="groupNotFound = false"
    />
  </div>
</template>

<script lang="ts" setup>
import type { DebtorType, Person } from '~/types';
import { ToastPosition } from '~/types/toast.types';

const initialPersonData = () => ({
  name: "",
  amount: 0,
} as Person);

const {
  createGroupInDb,
  updatePeopleListInDb,
  getGroupById,
} = useGroup();

const people = ref<Person[]>([
  initialPersonData(),
]);
const groupNotFound = ref(false);
const showResults = ref(false);
const results = ref<DebtorType[]>([]);
const displayOverwriteDataModal = ref(false);

const { show, isLink, message, position, hideToast } = useToast();
const route = useRoute();
const router = useRouter();
const rootStore = useRootStore();

const createGroup = async () => {
  const data = await createGroupInDb();
  if (!data) return;
  rootStore.groupId = data.id;
  router.replace({
    path: route.path,
    query: {
      ...route.query,
      groupId: rootStore.groupId,
    },
  });
};

const addPerson = async () => {
  people.value.push(initialPersonData());
  if (people.value.length > 1) {
    await updatePeopleListInDb({
      groupId: rootStore.groupId ?? '',
      people: people.value.filter((person) => person.name !== ''),
    });
  }
};

const removePerson = async (index: number) => {
  updatePeopleListInDb({
    groupId: rootStore.groupId ?? '',
    people: people.value.filter((person) => person.name !== ''),
  });
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
  updatePeopleListInDb({
    groupId: rootStore.groupId ?? '',
    people: people.value.filter((person) => person.name !== ''),
  });
  showResults.value = true;
};

const createGroupModalCb = () => {
  createGroup();
  groupNotFound.value = false;
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

onMounted(async () => {
  dataOriginManager();
  if (route.query.groupId) {
    const groupId = route.query?.groupId as string ?? '';
    const response = await getGroupById(groupId);
    if (!response) {
      groupNotFound.value = true;
      return;
    };
    rootStore.groupId = response.id;
    rootStore.people = response.people;
    if (response.people.length > 0) {
      people.value = response.people;
    }
  } else if (!rootStore.groupId) {
    createGroup();
  }
});
</script>
