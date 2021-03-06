import {
  UNCATEGORIZED_BUDGET_ID,
  useBudgets,
  ExpenseType,
} from "../contexts/BudgetsContext";
import BudgetCard from "./BudgetCard";

interface Props {
  onAddExpenseClick?: React.MouseEventHandler<HTMLButtonElement>;
  onViewExpensesClick?: React.MouseEventHandler<HTMLButtonElement>;
}

export const UncategorizedBudgetCard = (props: Props) => {
  const { getBudgetExpenses } = useBudgets();
  const amount = getBudgetExpenses(UNCATEGORIZED_BUDGET_ID).reduce(
    (total: number, expense: ExpenseType) => total + expense.amount,
    0
  );

  if (amount === 0) return null; // don't show this card if we don't have any amount

  return (
    <BudgetCard {...props} amount={amount} name="Uncategorized" max={0} gray />
  );
};
