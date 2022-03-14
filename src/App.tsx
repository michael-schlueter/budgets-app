import React, { useState } from "react";
import BudgetCard from "./components/BudgetCard";
import AddBudgetModal from "./components/AddBudgetModal";
import AddExpenseModal from "./components/AddExpenseModal";
import { UNCATEGORIZED_BUDGET_ID, useBudgets, Budgets, Expenses } from "./contexts/BudgetsContext";
import { UncategorizedBudgetCard } from "./components/UncategorizedBudgetCard";
import { TotalBudgetCard } from "./components/TotalBudgetCard";
import ViewExpensesModal from "./components/ViewExpensesModal";

function App() {
  const [showAddBudgetModal, setShowAddBudgetModal] = useState(false);
  const [showAddExpenseModal, setShowAddExpenseModal] = useState(false);
  const [viewExpensesModalBudgetId, setViewExpensesModalBudgetId] = useState<string | null>();
  const [addExpenseModalBudgetId, setAddExpenseModalBudgetId] = useState<React.MouseEvent | string | undefined>();
  // @ts-ignore
  const { budgets, getBudgetExpenses } = useBudgets();

  const openAddExpenseModal = (budgetId:React.MouseEvent | string) => {
    setShowAddExpenseModal(true);
    setAddExpenseModalBudgetId(budgetId);
  };

  return (
    <>
      <div className="container m-auto">
        <header className="flex justify-between items-center my-10">
          <h1 className="font-semibold text-4xl mr-1">Budgets</h1>
          <div>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white mr-2 py-2 px-3 rounded"
              onClick={() => setShowAddBudgetModal(true)}
            >
              Add Budget
            </button>
            <button
              className="bg-transparent hover:bg-blue-500 text-blue-700 hover:text-white py-2 px-2 border border-blue-500 hover:border-transparent rounded"
              onClick={openAddExpenseModal}
            >
              Add Expense
            </button>
          </div>
        </header>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            gap: "1rem",
            alignItems: "flex-start",
          }}
        >
          {budgets.map((budget:Budgets) => {
            const amount = getBudgetExpenses(budget.id).reduce(
              (total:number, expense:Expenses) => total + expense.amount,
              0
            );
            return (
              <BudgetCard
                key={budget.id}
                name={budget.name}
                amount={amount}
                max={budget.max}
                onAddExpenseClick={() => openAddExpenseModal(budget.id)}
                onViewExpensesClick={() =>
                  setViewExpensesModalBudgetId(budget.id)
                }
              ></BudgetCard>
            );
          })}
          <UncategorizedBudgetCard
            onAddExpenseClick={openAddExpenseModal}
            onViewExpensesClick={() =>
              setViewExpensesModalBudgetId(UNCATEGORIZED_BUDGET_ID)
            }
          />
          <TotalBudgetCard />
        </div>
      </div>
      <AddBudgetModal
        show={showAddBudgetModal}
        handleClose={() => setShowAddBudgetModal(false)}
      />
      <AddExpenseModal
        show={showAddExpenseModal}
        // @ts-ignore
        defaultBudgetId={addExpenseModalBudgetId}
        handleClose={() => setShowAddExpenseModal(false)}
      />
      <ViewExpensesModal
        budgetId={viewExpensesModalBudgetId}
        handleClose={() => setViewExpensesModalBudgetId(null)}
      />
    </>
  );
}

export default App;
