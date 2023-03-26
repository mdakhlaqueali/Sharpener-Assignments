// USER FORM SCRIPT

// Put DOM elements into variables
let myForm = document.querySelector('#my-form');
let nameInput = document.querySelector('#name');
let emailInput = document.querySelector('#email');
let msg = document.querySelector('.msg');
let userList = document.querySelector('#users');

// Listen for form submit
myForm.addEventListener('submit', onSubmit);

// Load saved users from local storage
loadUsers();

function onSubmit(e) {
  e.preventDefault();
  
  if(nameInput.value === '' || emailInput.value === '') {
    // alert('Please enter all fields');
    msg.classList.add('error');
    msg.innerHTML = 'Please enter all fields';

    // Remove error after 3 seconds
    setTimeout(() => msg.remove(), 3000);
  } else {
    // Create new list item with user and delete button
    const li = document.createElement('li');
    const deleteBtn = document.createElement('button');

    // Add text node with input values
    li.appendChild(document.createTextNode(`${nameInput.value}: ${emailInput.value}`));
    deleteBtn.appendChild(document.createTextNode('Delete'));
    
    // Add delete button click listener
    deleteBtn.addEventListener('click', () => {
      li.remove();
      deleteFromLocalStorage(nameInput.value, emailInput.value);
    });

    // Append delete button to list item
    li.appendChild(deleteBtn);

    // Append list item to user list
    userList.appendChild(li);

    // Save user data to local storage
    saveToLocalStorage(nameInput.value, emailInput.value);

    // Clear fields
    nameInput.value = '';
    emailInput.value = '';
  }
}

function saveToLocalStorage(name, email) {
  let users = JSON.parse(localStorage.getItem('users')) || [];
  users.push({ name, email });
  localStorage.setItem('users', JSON.stringify(users));
}

function loadUsers() {
  let users = JSON.parse(localStorage.getItem('users')) || [];
  users.forEach(user => {
    let li = document.createElement('li');
    let deleteBtn = document.createElement('button');
    
    li.appendChild(document.createTextNode(`${user.name}: ${user.email}`));
    deleteBtn.appendChild(document.createTextNode('Delete'));

    deleteBtn.addEventListener('click', () => {
      li.remove();
      deleteFromLocalStorage(user.name, user.email);
    });

    li.appendChild(deleteBtn);
    userList.appendChild(li);
  });
}

function deleteFromLocalStorage(name, email) {
  let users = JSON.parse(localStorage.getItem('users')) || [];
  users = users.filter(user => user.name !== name || user.email !== email);
  localStorage.setItem('users', JSON.stringify(users));
}
