import React, { useState, useEffect } from "react";
import ExpenseDetails from "./ExpenseDetails";
import styles from "./Expenses.module.css";
import axios from "axios";
import { addExpense, deleteExpense, editExpense, setExpenses, activatePremium } from "../../../store/expenseReducer";
import { toggleTheme } from "../../../store/themeReducer";
import { useDispatch,useSelector } from "react-redux";

const Expenses = () => {

  const dispatch = useDispatch();
  const isDarkTheme = useSelector((state) => state.theme.isDarkTheme);
  const expenses = useSelector((state) => state.expense.expenses);
  const isPremium = useSelector((state)=> state.expense.isPremium);
  const email = useSelector((state)=> state.auth.email);
  const totalAmount = expenses.reduce((acc, expense) => acc + expense.amount, 0);
  const premiumAmount = totalAmount>10000;

  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Grocery");
  const [editingExpense, setEditingExpense] = useState(null);

  const username = email.split('@')[0];

  const handleThemeToggle = () => {
    dispatch(toggleTheme());
  }

  useEffect(() => {
    fetchExpenses();
  }, [username]);


  useEffect(() => {
    // Check if totalAmount is less than 10000 and remove the dark theme
    if (totalAmount < 10000 && isDarkTheme) {
      dispatch(toggleTheme()); // Assuming this toggles the theme
    }
  }, [totalAmount, dispatch, isDarkTheme]);

  const addExpenesHandler = async (event) => {
    event.preventDefault();

    if (editingExpense) {
      // Handle editing expense
      const editedExpense = {
        amount: +amount,
        description,
        category,
      };

      const url = `https://expense-tracker-20439-default-rtdb.firebaseio.com/${username}/${editingExpense.id}.json`;

      try {
        await axios.put(url, editedExpense);
        dispatch(editExpense({ id: editingExpense.id, editedExpense }));
        setEditingExpense(null);
      } catch (error) {
        console.log(error);
      }
    } else {
      const newExpense = {
        amount: +amount,
        description,
        category,
      };

      const url =
        `https://expense-tracker-20439-default-rtdb.firebaseio.com/${username}.json`;

      try {
        const response = await axios.post(url, newExpense);
        if (response.status === 200) {
          dispatch(addExpense({newExpense, id:response.data.name}));
          console.log(newExpense)
        }
      } catch (error) {
        console.log(error);
      }
    }
    setAmount("");
    setCategory("Grocery");
    setDescription("");
  };

  const editExpenseHandler = (expense) => {
    setEditingExpense(expense);
    setAmount(expense.amount.toString());
    setDescription(expense.description);
    setCategory(expense.category);
  };

  const cancelEditHandler = () => {
    setEditingExpense(null);
    setAmount("");
    setDescription("");
    setCategory("Grocery");
  };

  const deleteExpenseHandler = async (expenseId) => {
    dispatch(deleteExpense(expenseId));

    const url = `https://expense-tracker-20439-default-rtdb.firebaseio.com/${username}/${expenseId}.json`;

    try {
      await axios.delete(url);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchExpenses = async () => {
    console.log("Fetching expenses for username:", username);
    const url =
      `https://expense-tracker-20439-default-rtdb.firebaseio.com/${username}.json`;

    try {
      const response = await axios.get(url);
      if (response.status === 200) {
        const expenseData = response.data;

        if(expenseData){
          const expenseArray = Object.keys(expenseData).map((key) => ({
            id: key,
            ...expenseData[key],
          }));
          dispatch(setExpenses(expenseArray));
        }
      } else {
        console.log("failed to fetch");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const activatePremiumHandler = () => {
    dispatch(activatePremium());

  };

  const downloadCSV = () => {
    const csvContent = "data:text/csv;charset=utf-8," +
      "Amount,Description,Category\n" +
      expenses.map(expense => `${expense.amount},"${expense.description}",${expense.category}`).join("\n");
  
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "expenses.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className={`${styles['expenses-container']} ${isDarkTheme ? styles['dark-theme'] : styles['light-theme']}`}>
      {isPremium && totalAmount>10000 && <button onClick={handleThemeToggle}>Toggle Theme</button>}
      <button onClick={downloadCSV}>Download Expense</button>
      <form onSubmit={addExpenesHandler}>
        <input
          type="number"
          placeholder="Enter Expense Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <input
          type="text"
          placeholder="Description of Expense"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="Grocery">Grocery</option>
          <option value="Petrol">Petrol</option>
          <option value="Rent">Rent</option>
          <option value="Electricity">Electricity</option>
        </select>
        <button type="submit">
          {editingExpense ? "Update Expense" : "Add Expense"}
        </button>
        {editingExpense && (
          <button type="button" onClick={cancelEditHandler}>
            Cancel Edit
          </button>
        )}
      </form>
      <ExpenseDetails
        expenses={expenses}
        onDeleteExpense={deleteExpenseHandler}
        onEditExpense={editExpenseHandler}
      />
      <div>Total Amount: {totalAmount}</div>
      {premiumAmount && <button onClick={activatePremiumHandler} style={{backgroundColor:"gold"}}>{isPremium ? 'Premium Activated' : 'Activate Premium'}</button>}
    </div>
  );
};

export default Expenses;
