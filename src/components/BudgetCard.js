import React from "react";
// import { currencyFormatter } from "../utils";

export default function BudgetCard({ name, max, amount, gray, onAddExpenseClick }) {

  const classNames = ["border", "border-gray-200", "rounded", "flex", "flex-col"]
  if (amount > max) {
    classNames.push("bg-red-500 bg-opacity-20");
  } else if (gray) {
    classNames.push("bg-gray-100")
  }

  return (
    <div className={classNames.join(" ")}>
      <div className="mt-4 mx-4 title flex justify-between">
        <div>
          <h2 className="text-xl">{name}</h2></div>
        <div className="text-xl">{amount} $ <span className="text-sm text-gray-500">/ {max} $</span></div>
      </div>
      <div className="bg-gray-400 h-3 rounded-lg mx-4 mt-4 overflow-hidden">
        <div className={`${getProgressBarColor(amount, max)} h-full rounded-lg shadow-md`} style={{width: `${(amount / max).toFixed(2) * 100}%`}}></div>
      </div>
      <div className="mr-4 ml-auto mt-6 mb-4">
        <button className="mr-2 bg-transparent hover:bg-blue-500 text-blue-700 hover:text-white py-2 px-2 border border-blue-500 hover:border-transparent rounded" onClick={onAddExpenseClick}>
          Add Expense
        </button>
        <button className="bg-transparent hover:bg-gray-500 text-gray-700 hover:text-white py-2 px-2 border border-gray-500 hover:border-transparent rounded">
          View Expenses
        </button>
      </div>
    </div>
  );
}

// Set background-color depending on how much of the budget is used
function getProgressBarColor(amount, max) {
  const ratio = amount / max
  if (ratio < .5) return "bg-blue-500"
  if (ratio < .75) return "bg-yellow-400"
  return "bg-red-500"
}
