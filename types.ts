export type Person = {
  name:   string;
  amount: number;
};

export type DebtorType = {
  from:   string;
  to:     string;
  amount: string;
};

export type CalculationType = {
  people:     Person[],
  totalSpent: number,
};
