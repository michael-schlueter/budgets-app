import React, { useState } from "react";
import BudgetCard from "./components/BudgetCard";
import AddBudgetModal from "./components/AddBudgetModal";
import AddExpenseModal from "./components/AddExpenseModal";
import { useBudgets } from "./contexts/BudgetsContext";
import { isExpressionStatement } from "typescript";
import { UncategorizedBudgetCard } from "./components/UncategorizedBudgetCard";
import { TotalBudgetCard } from "./components/TotalBudgetCard";

function App() {
  const [showAddBudgetModal, setShowAddBudgetModal] = useState(false);
  const [showAddExpenseModal, setShowAddExpenseModal] = useState(false);
  const [addExpenseModalBudgetId, setAddExpenseModalBudgetId] = useState();
  const { budgets, getBudgetExpenses } = useBudgets();

// @ts-ignore
const openAddExpenseModal = (budgetId) => {
  setShowAddExpenseModal(true)
  setAddExpenseModalBudgetId(budgetId)
}

  return (
    <>
      <div className="container border-2 m-auto">
        <header className="flex justify-between items-center my-10">
          <h1 className="font-semibold text-4xl mr-1">Budgets</h1>
          <div>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white mr-2 py-2 px-3 rounded"
              onClick={() => setShowAddBudgetModal(true)}
            >
              Add Budget
            </button>
            <button className="bg-transparent hover:bg-blue-500 text-blue-700 hover:text-white py-2 px-2 border border-blue-500 hover:border-transparent rounded" onClick={openAddExpenseModal} >
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
          {/* @ts-ignore */}
          {budgets.map(budget => {
            // @ts-ignore
            const amount = getBudgetExpenses(budget.id).reduce((total, expense) => total + expense.amount, 0)
            return (
            // @ts-ignore
            <BudgetCard
              key={budget.id}
              name={budget.name}
              amount={amount}
              max={budget.max}
              // @ts-ignore
              onAddExpenseClick={() => openAddExpenseModal(budget.id)}
            ></BudgetCard>
          )})}
          <UncategorizedBudgetCard onAddExpenseClick={openAddExpenseModal} />
          <TotalBudgetCard />
        </div>
      </div>
      {/* @ts-ignore */}
      <AddBudgetModal
        show={showAddBudgetModal}
        handleClose={() => setShowAddBudgetModal(false)}
      />
      {/* @ts-ignore */}
            <AddExpenseModal
        show={showAddExpenseModal}
        defaultBudgetId={addExpenseModalBudgetId}
        handleClose={() => setShowAddExpenseModal(false)}
      />
    </>
  );
}

export default App;
