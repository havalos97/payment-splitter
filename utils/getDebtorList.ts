import type { DebtorType } from "~/types";
import type { PaymentsFormComponentProps } from "~/types/payments-form.types";

export const getDebtorList = ({ people, total }: PaymentsFormComponentProps) => {
  // Removes empty names from people list
  const filteredPeopleList = people.filter((person) => person.name.trim() !== "");

  const totalSpent = total;
  const numberOfPeople = filteredPeopleList.length;

  // If there's only one person or total is zero, return;
  if (numberOfPeople < 2 || totalSpent === 0) return null;

  // Calculates the share of each person
  const share = totalSpent / numberOfPeople;

  // Creates a list of people with their balances
  const balances = filteredPeopleList.map((person, idx) => ({
    name: person.name || `Persona ${idx + 1}`,
    balance: (person.amount || 0) - share,
  }));

  const creditors = balances.filter((p) => p.balance > 0);
  const debtors = balances.filter((p) => p.balance < 0);

  return debtors.reduce((acc, debtor) => {
    if (debtor.balance === 0) return acc;

    creditors.reduce((_, creditor) => {
      if (debtor.balance === 0) return acc;

      const amount = Math.min(Math.abs(debtor.balance), creditor.balance);

      if (amount > 0) {
        acc.push({
          from: debtor.name,
          to: creditor.name,
          amount: formater(amount),
        });

        debtor.balance += amount;
        creditor.balance -= amount;
      }

      return acc;
    }, acc);

    return acc;
  }, [] as DebtorType[]);
}
