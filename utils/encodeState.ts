import type { PaymentsFormComponentProps } from "~/types/payments-form.types";

export const encodeState = (params: PaymentsFormComponentProps) => {
  const { people, total } = params;
  const route = useRoute();

  const query = route.query;
  const state = {
    people,
    total,
  };
  // If there is a state in the query, merge it with the current state
  if ('state' in query) {
    const stateFromQuery = decodeQueryData(query.state as string);
    return encodeQueryData({
      ...stateFromQuery,
      ...state,
    });
  }
  return encodeQueryData(state);
}
