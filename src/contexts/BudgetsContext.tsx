import { createContext, ReactNode, useContext } from "react";
import { v4 as uuidV4 } from "uuid";
import { useLocalStorage } from "../hooks/useLocalStorage";

type BudgetsContextProps = {
  children: ReactNode;
}

export type DeleteBudgetType = {
  id: string
}

export type AddBudgetType = {
  name: string
  max: number
}

export type BudgetType = DeleteBudgetType & AddBudgetType

export type DeleteExpenseType = {
  id: string
}

export type AddExpenseType = {
  budgetId: string
  description: string
  amount: number
}

export type ExpenseType = DeleteExpenseType & AddExpenseType


interface IBudgetsContext {
  budgets: BudgetType[]
  expenses: ExpenseType[]
  addBudget: ({ name, max}: AddBudgetType) => void
  addExpense: ({ budgetId, amount, description }: AddExpenseType) => void
  deleteBudget: ({ id }: DeleteBudgetType) => void
  deleteExpense: ({ id }: DeleteExpenseType) => void
  getBudgetExpenses: (budgetId: string) => ExpenseType[]
}

const BudgetsContext = createContext({} as IBudgetsContext)

export const UNCATEGORIZED_BUDGET_ID = "Uncategorized";

export function useBudgets() {
  return useContext(BudgetsContext);
}

export const BudgetsProvider = ({ children }: BudgetsContextProps) => {
  const [budgets, setBudgets] = useLocalStorage<BudgetType[]>("budgets", []);
  const [expenses, setExpenses] = useLocalStorage<ExpenseType[]>("expenses", []);

  // return expenses only for the relevant budget
  function getBudgetExpenses(budgetId: string) {
    return expenses.filter(
      (expense: ExpenseType) => expense.budgetId === budgetId
    );
  }

  function addExpense({ budgetId, amount, description }: AddExpenseType) {
    setExpenses((prevExpenses: ExpenseType[]) => {
      return [...prevExpenses, { id: uuidV4(), description, amount, budgetId }];
    });
  }

  function addBudget({ name, max }: AddBudgetType) {
    setBudgets((prevBudgets: BudgetType[]) => {
      // don't add the budget if there already exists a budget with the same name
      if (prevBudgets.find((budget) => budget.name === name)) {
        return prevBudgets;
      }
      return [...prevBudgets, { id: uuidV4(), name, max }];
    });
  }

  function deleteBudget({ id }: DeleteBudgetType) {
    // when removing a budget, transfer its expenses to uncategorized
    setExpenses((prevExpenses: ExpenseType[]) => {
      return prevExpenses.map((expense) => {
        if (expense.budgetId !== id) return expense;
        return { ...expense, budgetId: UNCATEGORIZED_BUDGET_ID };
      });
    });
    setBudgets((prevBudgets: BudgetType[]) => {
      return prevBudgets.filter((budget) => budget.id !== id);
    });
  }

  function deleteExpense({ id }: DeleteExpenseType) {
    setExpenses((prevExpenses: ExpenseType[]) => {
      return prevExpenses.filter((expense) => expense.id !== id);
    });
  }

  return (
    <BudgetsContext.Provider
      value={{
        budgets,
        expenses,
        getBudgetExpenses,
        addExpense,
        addBudget,
        deleteBudget,
        deleteExpense,
      }}
    >
      {children}
    </BudgetsContext.Provider>
  );
};
