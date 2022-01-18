import React from "react";

export default function BudgetCard() {
  return (
    <div className="border border-gray-200 rounded flex flex-col">
      <div className="mt-4 mx-4 title flex justify-between">
        <div>
          <h2 className="text-xl">Sports</h2></div>
        <div className="text-xl">0 $ <span className="text-sm text-gray-500">/ 250 $</span></div>
      </div>
      <div className="bg-gray-400 h-3 rounded-lg mx-4 mt-4 overflow-hidden">
        <div className="bg-blue-700 w-3/4 h-full rounded-lg shadow-md"></div>
      </div>
      <div className="mr-4 ml-auto mt-6 mb-4">
        <button className="mr-2 bg-transparent hover:bg-blue-500 text-blue-700 hover:text-white py-2 px-2 border border-blue-500 hover:border-transparent rounded">
          Add Expense
        </button>
        <button className="bg-transparent hover:bg-gray-500 text-gray-700 hover:text-white py-2 px-2 border border-gray-500 hover:border-transparent rounded">
          View Expenses
        </button>
      </div>
    </div>
  );
}
