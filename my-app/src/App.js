import ExpenseItem from "./components/ExepenseItem";
function App() {
  const expenses = [
    {title: "Car Insurance", amount: 287, date: new Date(2021, 2 , 22)},
    {title: "Medicine", amount: 1257, date: new Date(2021, 7 , 22)},
    {title: "Fuel", amount: 1987, date: new Date(2021, 5 , 22)},
    {title: "Electricity", amount: 2187, date: new Date(2021, 9 , 22)},
    {title: "Grocery", amount: 787, date: new Date(2021, 10 , 22)}

  ]
  return (
    <div className="App">
      <h2>Let's get started</h2>
      {expenses.map((expense) => (
        <ExpenseItem
          title={expense.title}
          amount={expense.amount}
          date={expense.date}
        />
      ))}
      
    </div>
  );
}

export default App;
