# Budgets App
> This budgets app enables the user to get an overview of her / his expenses and budgets by adding / deleting budgets / expenses and giving visual feedback of how much of the budget is available.



## General Information
- I undertook this project in order to familiarize myself more with using React in combination with TypeScript and TailwindCSS (e.g., creating Modals)
- In particular I wanted to learn how to use TypeScript in combination with React hooks like useState, useRef and useContext
- The challenge was to take a full functioning JavaScript app and migrate it to TS
- I also intended to get more comfortable working with git branches and the process of making pull requests and merging branches in repositories



## Technologies Used
- React 17.0.2
- TypeScript 4.5.4
- TailwindCSS 3.0.15
- UUID 8.3.2



## Features
- Displaying an overview of different budgets
- Each budget displays an overview of expenses
- Adding & Removing budgets and expenses
- Re-categorize / un-categorize expenses from budgets
- Visual feedback for budget-utilization
- Using local storage for data to persist



## Screenshots
![Example screenshot](https://i.ibb.co/9tXJcLp/budgets-app.jpg)



## Demo
Live demo [_here_](https://objective-ride-63b3d6.netlify.app/).



## Setup
The dependencies which are necessary to run this app can be found in the package.json file.

1. Clone the repo
2. Navigate to the project folder in the terminal and install the necessary NPM dependencies
```
npm install
```
3. Run the app typing
```
npm start
```
in your terminal and visit localhost:3000 in your browser.



## Learnings
- Creating a currency formatter
- Creating a dynamic progress bar with TailwindCSS
- Creating custom hooks (useLocalStorage, useBudgets) for local storage / context API
- Creating Modals with TailwindCSS
- Typing of React Hooks / props / event-handler
- Cloning a repository, creating branches, making pull requests, merging branches
- Identifying and fixing various bugs in relation to TS
- Thinking in TS (planning types beforehand, having a good understanding of what you want to achieve with your code before writing it)



## Project Status
The project is finished. 


## Acknowledgements
- This project was based in parts on [this tutorial](https://www.youtube.com/watch?v=yz8x71BiGXg) from [WebDevSimplified](https://www.youtube.com/channel/UCFbNIlppjAuEX4znoulh0Cw).



