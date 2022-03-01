import {
  UNCATEGORIZED_BUDGET_ID,
  useBudgets,
} from "../contexts/BudgetsContext";
import BudgetCard from "./BudgetCard";

export const UncategorizedBudgetCard = (props) => {
  const { getBudgetExpenses } = useBudgets();
  const amount = getBudgetExpenses(UNCATEGORIZED_BUDGET_ID).reduce(
    (total, expense) => total + expense.amount,
    0
  );

    if (amount === 0) return null; // don't show this card if we don't have any amount

  return <BudgetCard amount={amount} name="Uncategorized" gray {...props} />;
};
