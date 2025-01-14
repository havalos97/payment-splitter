import type { PaymentsFormComponentProps } from "~/types/payments-form.types";
import { encodeState } from "./encodeState";

export const generateStateUrl = (state: PaymentsFormComponentProps) => {
  const encodedState = encodeState(state);
  const baseURL = new URL(`${window.location.origin}${window.location.pathname}`);
  if (encodedState) {
    baseURL.searchParams.append('state', encodedState);
  }
  return baseURL.toString();
}
