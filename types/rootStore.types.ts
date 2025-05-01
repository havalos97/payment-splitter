import type { Person } from "~/types";

export type RootStoreType = {
  groupId: string | null;
  people: Person[];
}
