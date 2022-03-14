import {
  UNCATEGORIZED_BUDGET_ID,
  useBudgets,
  Budgets,
  Expenses,
} from "../contexts/BudgetsContext";
import { currencyFormatter } from "../utils";

interface Props {
  budgetId: string;
  handleClose: () => void;
}

export default function ViewExpensesModal({ budgetId, handleClose }: Props) {
  // @ts-ignore
  const { getBudgetExpenses, budgets, deleteBudget, deleteExpense } =
    useBudgets();

  const expenses = getBudgetExpenses(budgetId);
  const budget =
    UNCATEGORIZED_BUDGET_ID === budgetId
      ? { name: "Uncategorized", id: UNCATEGORIZED_BUDGET_ID }
      : budgets.find((b:Budgets) => b.id === budgetId);

  return (
    <div>
      {budgetId != null ? (
        <>
          <div className="border justify-center items-start flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-full my-6 mx-auto max-w-md">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="flex items-start p-5 border-b border-solid border-gray-200 rounded-t">
                  <h3 className="text-3xl font-semibold mr-2">
                    Expenses - {budget?.name}
                  </h3>
                  {budgetId !== UNCATEGORIZED_BUDGET_ID && (
                    <button
                      className="bg-transparent hover:bg-red-500 text-red-700 hover:text-white py-2 px-2 border border-red-500 hover:border-transparent rounded"
                      onClick={() => {
                        deleteBudget(budget);
                        handleClose();
                      }}
                    >
                      Delete
                    </button>
                  )}
                </div>
                <div className="border text-2xl relative p-3">
                  {expenses.map((expense:Expenses) => (
                    <div className="flex justify-between items-center py-3">
                      <div>
                        <p>{expense.description}</p>
                      </div>
                      <div className="flex items-center">
                        <p className="text-xl mr-2">
                          {currencyFormatter.format(expense.amount)}
                        </p>
                        <div className="flex justify-center items-center">
                          <button
                            className="p-2 text-xl bg-transparent text-red-700 rounded"
                            onClick={() => deleteExpense(expense)}
                          >
                            &times;
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div
                  className="cursor-pointer absolute top-0 right-0 m-3 dark:text-gray-100 text-gray-400 hover:text-gray-800 transition duration-150 ease-in-out"
                  onClick={handleClose}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    aria-label="Close"
                    className="icon icon-tabler icon-tabler-x"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    strokeWidth="2.5"
                    stroke="currentColor"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" />
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          <div className="opacity-50 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : (
        ""
      )}
    </div>
  );
}
