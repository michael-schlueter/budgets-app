import React, { useState, useRef } from "react";
import { useBudgets } from "../contexts/BudgetsContext";

export default function AddBudgetModal({ show, handleClose }) {

const nameRef = useRef();
const maxSpendingRef = useRef();
const { addBudget } = useBudgets()

const handleSubmit = (e) => {
  e.preventDefault();
  addBudget(
    {
      name: nameRef.current.value,
      max: parseFloat(maxSpendingRef.current.value) // converting string into a float
    }
  )
  handleClose();
}

  return (
    <div>
    {show ? (
      <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-auto my-6 mx-auto max-w-sm">
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            <div className="flex items-start justify-between p-5 border-b border-solid border-gray-200 rounded-t">
              <h3 className="text-3xl font-semibold">New Budget</h3>
              <button className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none">
                <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                  ×
                </span>
              </button>
            </div>
            <div className="relative p-3 flex-auto">
              <form onSubmit={handleSubmit}>
                <div className="flex flex-col">
                  <label
                    htmlFor="name"
                    className="text-xs font-semibold leading-3 text-gray-800 dark:text-gray-100"
                  >
                    Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    ref={nameRef}
                    className="text-xs font-medium leading-3 text-gray-500 dark:text-gray-400 resize-none bg-gray-50 dark:bg-gray-700 border rounded-lg border-gray-200 dark:border-gray-700 focus:outline-none px-4 py-3 mt-2"
                    required
                  />
                </div>
                <div className="flex flex-col">
                  <label
                    htmlFor="max-spending"
                    className="text-xs font-semibold leading-3 text-gray-800 dark:text-gray-100"
                  >
                    Maximum Spending
                  </label>
                  <input
                    id="max-spending"
                    type="number"
                    ref={maxSpendingRef}
                    min="0"
                    step=".01"
                    className="text-xs font-medium leading-3 text-gray-500 dark:text-gray-400 resize-none bg-gray-50 dark:bg-gray-700 border rounded-lg border-gray-200 dark:border-gray-700 focus:outline-none px-4 py-3 mt-2"
                    required
                  />
                </div>
                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                  <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white mr-2 py-2 px-3 rounded">
                    Add
                  </button>
                </div>
              </form>
            </div>
            <div
              className="cursor-pointer absolute top-0 right-0 m-3 dark:text-gray-100 text-gray-400 transition duration-150 ease-in-out"
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

      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
    ) : ""}
    </div>    
  );
}
