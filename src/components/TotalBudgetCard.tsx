import { useBudgets, Expenses, Budgets } from "../contexts/BudgetsContext";
import BudgetCard from "./BudgetCard";

export const TotalBudgetCard = () => {
  // @ts-ignore
  const { expenses, budgets } = useBudgets();
  const amount = expenses.reduce(
    (total: number, expense: Expenses) => total + expense.amount,
    0
  );
  const max = budgets.reduce(
    (total: number, budget: Budgets) => total + budget.max,
    0
  );

  if (max === 0) return null; // don't show this card if we don't have any max

  return <BudgetCard amount={amount} name="Total" gray max={max} hideButtons />;
};
