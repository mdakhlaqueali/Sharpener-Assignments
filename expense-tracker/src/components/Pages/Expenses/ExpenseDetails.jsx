const ExpenseDetails = (props) => {
  const expenseList = props.expenses.map((expense) => (
    <li key={expense.id}>
      {expense.amount} - {expense.description} - {expense.category}
      <div style={{ display: "flex" }}>
        <button onClick={() => props.onEditExpense(expense)}>Edit</button>
        <button onClick={() => props.onDeleteExpense(expense.id)}>
          Delete
        </button>
      </div>
    </li>
  ));

  return <ul>{expenseList}</ul>;
};

export default ExpenseDetails;
