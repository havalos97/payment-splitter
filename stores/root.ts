import type { RootStoreType } from "~/types/rootStore.types";

export const rootStoreKey = 'root-store';

export const useRootStore = defineStore(rootStoreKey, {
  state: (): RootStoreType => ({
    people: [],
  }),
  persist: {
    storage: piniaPluginPersistedstate.localStorage(),
  }
})
