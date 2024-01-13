import React, { useState, useEffect } from "react";
import ExpenseDetails from "./ExpenseDetails";
import styles from "./Expenses.module.css";
import axios from "axios";

const Expenses = () => {
  const [expense, setExpense] = useState([]);
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Grocery");
  const [editingExpense, setEditingExpense] = useState(null);

  useEffect(() => {
    fetchExpenses();
  }, []);

  const addExpenesHandler = async (event) => {
    event.preventDefault();

    if (editingExpense) {
      // Handle editing expense
      const editedExpense = {
        amount: +amount,
        description,
        category,
      };
      const url = `https://expense-tracker-20439-default-rtdb.firebaseio.com/expenses/${editingExpense.id}.json`;

      try {
        await axios.put(url, editedExpense);
        setEditingExpense(null);
        fetchExpenses();
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
        "https://expense-tracker-20439-default-rtdb.firebaseio.com/expenses.json";

      try {
        await axios.post(url, newExpense);
        fetchExpenses();
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
    const url = `https://expense-tracker-20439-default-rtdb.firebaseio.com/expenses/${expenseId}.json`;

    try {
      await axios.delete(url);
      fetchExpenses();
    } catch (error) {
      console.log(error);
    }
  };

  const fetchExpenses = async () => {
    const url =
      "https://expense-tracker-20439-default-rtdb.firebaseio.com/expenses.json";
    try {
      const response = await axios.get(url);
      if (response.status === 200) {
        const expenseData = response.data;

        const expenseArray = Object.keys(expenseData).map((key) => ({
          id: key,
          ...expenseData[key],
        }));

        console.log("expenseArray", expenseArray);
        console.log("response-data", response.data);
        setExpense(expenseArray);
      } else {
        console.log("failed to fetch");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles["expenses-container"]}>
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
        expenses={expense}
        onDeleteExpense={deleteExpenseHandler}
        onEditExpense={editExpenseHandler}
      />
    </div>
  );
};

export default Expenses;
