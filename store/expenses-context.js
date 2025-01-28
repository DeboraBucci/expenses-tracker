import { createContext, useReducer } from "react";

const ADD = "ADD";
const UPDATE = "UPDATE";
const DELETE = "DELETE";

const DUMMY_EXPENSES = [
  {
    id: "e1",
    description: "A pair of shoes",
    amount: 59.99,
    date: new Date("2021-12-19"),
  },
  {
    id: "e2",
    description: "A pair of trousers",
    amount: 89.99,
    date: new Date("2021-01-05"),
  },
  {
    id: "e3",
    description: "Bananas",
    amount: 5.23,
    date: new Date("2021-12-01"),
  },
  {
    id: "e4",
    description: "Book A",
    amount: 14.0,
    date: new Date("2022-02-19"),
  },
  {
    id: "e5",
    description: "Book B",
    amount: 18.59,
    date: new Date("2022-02-18"),
  },
  {
    id: "e6",
    description: "Book C",
    amount: 18.59,
    date: new Date("2025-01-26"),
  },
];

export const ExpensesContext = createContext({
  expenses: [],
  addExpense: ({ description, amount, date }) => {},
  deleteExpense: (id) => {},
  updateExpense: (id, { description, amount, date }) => {},
});

function expensesReducer(state, action) {
  switch (action.type) {
    case ADD:
      const id = new Date().toString() + Math.random().toString();
      return [{ ...action.payload.data, id: id }, ...state];

    case UPDATE:
      const updateExpenseIndex = state.findIndex(
        (expense) => expense.id === action.payload.id
      );

      const expensesCopy = [...state];
      expensesCopy[updateExpenseIndex] = {
        ...action.payload.data,
        id: action.payload.id,
      };

      return expensesCopy;

    case DELETE:
      const filteredExpenses = state.filter(
        (expense) => expense.id !== action.payload.id
      );

      return filteredExpenses;

    default:
      return state;
  }
}

function ExpensesContextProvider({ children }) {
  const [expensesState, dispatch] = useReducer(expensesReducer, DUMMY_EXPENSES);

  function addExpense(expenseData) {
    dispatch({
      type: ADD,
      payload: { data: expenseData },
    });
  }

  function updateExpense(id, expenseData) {
    dispatch({
      type: DELETE,
      payload: { id: id, data: expenseData },
    });
  }

  function deleteExpense(id) {
    dispatch({
      type: DELETE,
      payload: { id: id },
    });
  }

  const expenseValue = {
    expenses: expensesState,
    addExpense: addExpense,
    updateExpense: updateExpense,
    deleteExpense: deleteExpense,
  };

  return (
    <ExpensesContext.Provider value={expenseValue}>
      {children}
    </ExpensesContext.Provider>
  );
}

export default ExpensesContextProvider;
