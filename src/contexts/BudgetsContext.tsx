import React, { useContext } from "react";
import { v4 as uuidV4 } from "uuid";
import useLocalStorage from "../hooks/useLocalStorage";

export interface Budgets {
  id: string;
  name: string;
  max: number;
}

export interface Expenses {
  id: string;
  budgetId: string;
  description: string;
  amount: number;
}

export interface IBudgetsContext {
  budgets: Budgets[];
  expenses: Expenses[];
  addBudget: Function;
  addExpense: Function;
  deleteBudget: Function;
  deleteExpense: Function;
}

const BudgetsContext = React.createContext<IBudgetsContext | {}>({});

export const UNCATEGORIZED_BUDGET_ID = "Uncategorized";

export function useBudgets() {
  return useContext(BudgetsContext);
}

export const BudgetsProvider: React.FC = ({ children }) => {
  const [budgets, setBudgets] = useLocalStorage("budgets", []);
  const [expenses, setExpenses] = useLocalStorage("expenses", []);

  // return expenses only for the relevant budget
  function getBudgetExpenses(budgetId:string) {
    return expenses.filter((expense:Expenses) => expense.budgetId === budgetId);
  }

  function addExpense({ budgetId, amount, description }:Expenses) {
    setExpenses((prevExpenses:Expenses[]) => {
      return [...prevExpenses, { id: uuidV4(), description, amount, budgetId }];
    });
  }

  function addBudget({ name, max }:Budgets) {
    setBudgets((prevBudgets:Budgets[]) => {
      // don't add the budget if there already exists a budget with the same name
      if (prevBudgets.find((budget) => budget.name === name)) {
        return prevBudgets;
      }
      return [...prevBudgets, { id: uuidV4(), name, max }];
    });
  }

  function deleteBudget({ id }:Budgets) {
    // when removing a budget, transfer its expenses to uncategorized
    setExpenses((prevExpenses:Expenses[]) => {
      return prevExpenses.map((expense) => {
        if (expense.budgetId !== id) return expense;
        return { ...expense, budgetId: UNCATEGORIZED_BUDGET_ID };
      });
    });
    setBudgets((prevBudgets:Budgets[]) => {
      return prevBudgets.filter((budget) => budget.id !== id);
    });
  }

  function deleteExpense({ id }:Expenses) {
    setExpenses((prevExpenses:Expenses[]) => {
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
