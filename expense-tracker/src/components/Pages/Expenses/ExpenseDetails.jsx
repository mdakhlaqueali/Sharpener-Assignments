const ExpenseDetails = (props) => {
  const expenseList = props.expenses.map((expense) => (
    expense.id ? (
    <li key={expense.id}>
      {expense.amount} - {expense.description} - {expense.category}
      <div style={{ display: "flex" }}>
        <button onClick={() => props.onEditExpense(expense)} style={{backgroundColor:"blue"}}>Edit</button>
        <button onClick={() => props.onDeleteExpense(expense.id)} style={{backgroundColor:"red"}}>
          Delete
        </button>
      </div>
    </li>):null
  ));

  return <ul>{expenseList}</ul>;
};

export default ExpenseDetails;
