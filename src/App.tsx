import React from "react";
import BudgetCard from "./components/BudgetCard";

function App() {
  return (
    <div className="container border-2 m-auto">
      <header className="flex justify-between items-center my-10">
        <h1 className="font-semibold text-4xl mr-1">Budgets</h1>
        <div>
          <button className="bg-blue-500 hover:bg-blue-700 text-white mr-2 py-2 px-3 rounded">
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
        <BudgetCard name="Entertainment" amount={300} max={1000} gray={false}></BudgetCard>
      </div>
    </div>
  );
}

export default App;
