interface Props {
  name: string;
  max: number;
  amount: number;
  gray?: boolean;
  hideButtons?: boolean;
  onAddExpenseClick?: React.MouseEventHandler<HTMLButtonElement>;
  onViewExpensesClick?: React.MouseEventHandler<HTMLButtonElement>;
}

export default function BudgetCard({
  name,
  max,
  amount,
  gray,
  hideButtons,
  onAddExpenseClick,
  onViewExpensesClick,
}:Props) {
  const classNames = [
    "border",
    "border-gray-200",
    "rounded",
    "flex",
    "flex-col",
    "mb-4",
  ];
  if (amount > max && max !== 0) {
    classNames.push("bg-red-500 bg-opacity-20");
  } else if (gray) {
    classNames.push("bg-gray-100");
  }

  return (
    <div className={classNames.join(" ")}>
      <div className="mt-4 mb-4 mx-4 title flex justify-between">
        <div>
          <h2 className="text-xl">{name}</h2>
        </div>
        <div className="text-xl">
          {amount} ${" "}
          {max !== 0 && <span className="text-sm text-gray-500">/ {max} $</span>}
        </div>
      </div>
      {max !== 0 && (
        <div className="bg-gray-400 h-3 rounded-lg mx-4 overflow-hidden mb-6">
          <div
            className={`${getProgressBarColor(
              amount,
              max
            )} h-full rounded-lg shadow-md`}
            style={{ width: `${((amount / max) * 100).toFixed(2)}%` }}
          ></div>
        </div>
      )}
      {!hideButtons && (
        <div className="mr-4 ml-auto mb-4">
          <button
            className="mr-2 bg-transparent hover:bg-blue-500 text-blue-700 hover:text-white py-2 px-2 border border-blue-500 hover:border-transparent rounded"
            onClick={onAddExpenseClick}
          >
            Add Expense
          </button>
          <button
            className="bg-transparent hover:bg-gray-500 text-gray-700 hover:text-white py-2 px-2 border border-gray-500 hover:border-transparent rounded"
            onClick={onViewExpensesClick}
          >
            View Expenses
          </button>
        </div>
      )}
    </div>
  );
}

// Set background-color depending on how much of the budget is used
function getProgressBarColor(amount: number, max: number) {
  const ratio = amount / max;
  if (ratio < 0.5) return "bg-blue-500";
  if (ratio < 0.75) return "bg-yellow-400";
  return "bg-red-500";
}
