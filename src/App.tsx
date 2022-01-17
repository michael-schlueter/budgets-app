import React from 'react';

function App() {
  return (
    <div className='container border-2 m-auto'>
      <header className='flex justify-between items-center my-10'>
        <h1 className='font-semibold text-4xl'>Budgets</h1>
        <div>
        <button className='bg-blue-500 hover:bg-blue-700 text-white mr-2 py-2 px-3 rounded'>Add Budget</button>
        <button className='bg-transparent hover:bg-blue-500 text-blue-700 hover:text-white py-2 px-2 border border-blue-500 hover:border-transparent rounded'>Add Expense</button>
        </div>
      </header>
    </div>


  );
}

export default App;
