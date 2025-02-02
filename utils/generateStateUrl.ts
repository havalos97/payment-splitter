import type { PaymentsFormComponentProps } from "~/types/payments-form.types";
import { encodeState } from "./encodeState";

export const generateStateUrl = async (state: PaymentsFormComponentProps) => {
  const encodedState = await encodeState(state);
  const baseURL = new URL(`${window.location.origin}${window.location.pathname}`);
  if (encodedState) {
    baseURL.searchParams.append('state', encodedState);
  }
  return decodeURIComponent(baseURL.toString());
}
