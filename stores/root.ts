import type { RootStoreType } from "~/types/rootStore.types";

export const rootStoreKey = 'root-store';

export const useRootStore = defineStore(rootStoreKey, {
  state: (): RootStoreType => ({
    people: [],
  }),
  actions: {
    resetStore() {
      this.$reset();
      localStorage.removeItem(rootStoreKey);
    },
  },
  persist: {
    storage: piniaPluginPersistedstate.localStorage(),
  }
})
