import { useBudgets } from "../contexts/BudgetsContext";
import BudgetCard from "./BudgetCard";

export const TotalBudgetCard = () => {
  const { expenses, budgets } = useBudgets();
  const amount = expenses.reduce((total, expense) => total + expense.amount, 0);
  const max = budgets.reduce((total, budget) => total + budget.max, 0);

  if (max === 0) return null; // don't show this card if we don't have any max

  return <BudgetCard amount={amount} name="Total" gray max={max} hideButtons />;
};
