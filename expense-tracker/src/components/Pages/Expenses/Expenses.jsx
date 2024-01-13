import { useState } from "react";
import ExpenseDetails from "./ExpenseDetails";
import styles from "./Expenses.module.css";

const Expenses = () => {
  const [expense, setExpense] = useState([]);
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Grocery");
  const addExpenesHandler = (event) => {
    event.preventDefault();

    const amountData = {
      id: Math.random().toString(),
      amount: +amount,
      description,
      category,
    };

    setExpense((prevAmount) => [...prevAmount, amountData]);

    setAmount("");
    setCategory("Grocery");
    setDescription("");
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
        <button>Add Expenes</button>
      </form>
      <ExpenseDetails expenses={expense} />
    </div>
  );
};

export default Expenses;
