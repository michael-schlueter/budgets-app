import React, { useState } from "react";
import BudgetCard from "./components/BudgetCard";
import AddBudgetModal from "./components/AddBudgetModal";
import { useBudgets } from "./contexts/BudgetsContext";

function App() {
  const [showAddBudgetModal, setShowAddBudgetModal] = useState(false);
  const { budgets } = useBudgets();

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
            <button className="bg-transparent hover:bg-blue-500 text-blue-700 hover:text-white py-2 px-2 border border-blue-500 hover:border-transparent rounded">
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
          {budgets.map((budget) => (
            // @ts-ignore
            <BudgetCard
              key={budget.id}
              name={budget.name}
              amount={budget.amount}
              max={budget.max}
            ></BudgetCard>
          ))}
        </div>
      </div>
      {/* @ts-ignore */}
      <AddBudgetModal
        show={showAddBudgetModal}
        handleClose={() => setShowAddBudgetModal(false)}
      />
    </>
  );
}

export default App;
