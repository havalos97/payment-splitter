import type { PaymentsFormComponentProps } from "~/types/payments-form.types";
import { encodeState } from "./encodeState";

type GenerateUrlToShareParams = PaymentsFormComponentProps & {
  groupId: string | null;
};

export const generateUrlToShare = async (state: GenerateUrlToShareParams) => {
  if (state.groupId) {
    const encodedGroupId = encodeString(state.groupId);
    return `${window.location.origin}${window.location.pathname}?groupId=${encodedGroupId}`;
  }
  const encodedState = await encodeState(state);
  const baseURL = new URL(`${window.location.origin}${window.location.pathname}`);
  if (encodedState) {
    baseURL.searchParams.append('state', encodedState);
  }
  return decodeURIComponent(baseURL.toString());
}
