export enum ExpenseType {
  RECURRING = "Recurring",
  ONE_TIME = "One-time",
}

export enum Category {
  FOOD = "Food",
  ENTERTAINMENT = "Entertainment",
  HEALTH = "Health",
  TRAVEL = "Travel",
  OTHER = "Other",
}

export interface Expense {
  id: number;
  name: string;
  amount: number;
  type: ExpenseType;
  category: Category;
  date: string;
}

export type ExpenseFormData = Omit<Expense, "id">;
