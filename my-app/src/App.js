import ExpenseItem from "./components/ExpenseItem";
function App() {
  const expenses = [
    {title: "Car Insurance", amount: 287, date: new Date(2022, 2 , 21)},
    {title: "Medicine", amount: 1257, date: new Date(2019, 7 , 12)},
    {title: "Fuel", amount: 1987, date: new Date(2018, 5 , 9)},
    {title: "Electricity", amount: 2187, date: new Date(2020, 9 , 27)},
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
