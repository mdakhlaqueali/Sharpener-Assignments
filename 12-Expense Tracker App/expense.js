// Get references to the form and table elements
const form = document.querySelector('form');
const tableBody = document.querySelector('tbody');

// Load the expenses data from local storage
let expenses = JSON.parse(localStorage.getItem('expenses')) || [];

// Render the expenses data in the table
renderExpenses();

// Add an event listener to the form for the submit event
form.addEventListener('submit', (event) => {
  // Prevent the default form submission behavior
  event.preventDefault();

  // Get the values of the form inputs
  const amount = document.querySelector('#amnt').value;
  const description = document.querySelector('#desc').value;
  const category = document.querySelector('#catg').value;

  // Add the new expense to the expenses array
  expenses.push({
    amount,
    description,
    category
  });

  // Save the expenses data to local storage
  localStorage.setItem('expenses', JSON.stringify(expenses));

  // Render the updated expenses data in the table
  renderExpenses();

  // Reset the form inputs
  form.reset();
});

function renderExpenses() {
  // Clear the table body
  tableBody.innerHTML = '';

  // Render each expense in the table
  expenses.forEach((expense, index) => {
    const newRow = document.createElement('tr');
    const amountCell = document.createElement('td');
    const descriptionCell = document.createElement('td');
    const categoryCell = document.createElement('td');
    const deleteCell = document.createElement('td');
    const editCell = document.createElement('td');
    amountCell.textContent = expense.amount;
    descriptionCell.textContent = expense.description;
    categoryCell.textContent = expense.category;

    // Create the delete and edit buttons
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', () => {
      // Remove the expense from the expenses array
      expenses.splice(index, 1);

      // Save the expenses data to local storage
      localStorage.setItem('expenses', JSON.stringify(expenses));

      // Render the updated expenses data in the table
      renderExpenses();
    });
    const editButton = document.createElement('button');
    editButton.textContent = 'Edit';
    editButton.addEventListener('click', () => {
      // Set the form inputs to the values in the expense being edited
      document.querySelector('#amnt').value = expense.amount;
      document.querySelector('#desc').value = expense.description;
      document.querySelector('#catg').value = expense.category;

      // Remove the expense from the expenses array
      expenses.splice(index, 1);

      // Save the expenses data to local storage
      localStorage.setItem('expenses', JSON.stringify(expenses));

      // Render the updated expenses data in the table
      renderExpenses();
    });

    // Add the delete and edit buttons to the new row
    deleteCell.appendChild(deleteButton);
    editCell.appendChild(editButton);
    newRow.appendChild(amountCell);
    newRow.appendChild(descriptionCell);
    newRow.appendChild(categoryCell);
    newRow.appendChild(deleteCell);
    newRow.appendChild(editCell);

    // Add the new row to the table body
    tableBody.appendChild(newRow);
  });
}
