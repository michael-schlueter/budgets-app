import React, { useRef } from "react";
import { useBudgets } from "../contexts/BudgetsContext";

interface Props {
  show?: boolean;
  handleBudgetClose: () => void;
}

export default function AddBudgetModal({ show, handleBudgetClose }:Props) {
  const nameRef = useRef<HTMLInputElement>(null!);
  const maxSpendingRef = useRef<HTMLInputElement>(null!);
  // @ts-ignore
  const { addBudget } = useBudgets();

  const handleSubmit = (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addBudget({
      name: nameRef.current.value,
      max: parseFloat(maxSpendingRef.current.value), // converting string into a float
    });
    handleBudgetClose();
  };

  return (
    <div>
      {show ? (
        <>
          <div className="border justify-center items-start flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-full my-6 mx-auto max-w-md">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="flex items-start justify-between p-5 mb-5 border-b border-solid border-gray-200 rounded-t">
                  <h3 className="text-3xl font-semibold">New Budget</h3>
                </div>
                <div className="relative p-3 flex-auto">
                  <form onSubmit={handleSubmit}>
                    <div className="flex flex-col">
                      <label
                        htmlFor="name"
                        className="text-base font-normal leading-3 text-gray-800 dark:text-gray-100 mb-2"
                      >
                        Name
                      </label>
                      <input
                        id="name"
                        type="text"
                        ref={nameRef}
                        className="text-base font-normal leading-3 text-gray-800 dark:text-gray-400 resize-none bg-gray-50 dark:bg-gray-700 border rounded-lg border-gray-200 dark:border-gray-700 focus:outline-none focus:border focus:border-blue-500 px-4 py-3 mt-2 mb-5"
                        required
                      />
                    </div>
                    <div className="flex flex-col">
                      <label
                        htmlFor="max-spending"
                        className="text-base font-normal leading-3 text-gray-800 dark:text-gray-100 mb-2"
                      >
                        Maximum Spending
                      </label>
                      <input
                        id="max-spending"
                        type="number"
                        ref={maxSpendingRef}
                        min="0"
                        step=".01"
                        className="text-base font-normal leading-3 text-gray-800 dark:text-gray-400 resize-none bg-gray-50 dark:bg-gray-700 border rounded-lg border-gray-200 dark:border-gray-700 focus:outline-none focus:border focus:border-blue-500 px-4 py-3 mt-2"
                        required
                      />
                    </div>
                    <button
                      type="submit"
                      className="bg-blue-500 hover:bg-blue-700 text-white mt-7 py-2 px-3 rounded float-right"
                    >
                      Add
                    </button>
                  </form>
                </div>
                <div
                  className="cursor-pointer absolute top-0 right-0 m-3 dark:text-gray-100 text-gray-400 hover:text-gray-800 transition duration-150 ease-in-out"
                  onClick={handleBudgetClose}
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

          <div className="opacity-50 fixed inset-0 z-40 bg-black border"></div>
        </>
      ) : (
        ""
      )}
    </div>
  );
}
