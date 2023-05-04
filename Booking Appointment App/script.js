let booking_arr = JSON.parse(localStorage.getItem('booking')) || [];

    function saveToCrudCrud(event){
        event.preventDefault();
        let name = document.querySelector("#name").value;
        let email = document.querySelector("#email").value;

        let obj = {
            name,
            email
        }
        booking_arr.push(obj);
        localStorage.setItem("booking", JSON.stringify(booking_arr))

        display();
    }

function display(){
    let parent = document.querySelector("tbody");
    let newRow;
    parent.innerHTML = '';
    booking_arr.forEach(function(el, index){
        newRow = document.createElement("tr");
        let nameCell = document.createElement("td");
        nameCell.textContent = el.name;
        let emailCell = document.createElement("td");
        emailCell.textContent = el.email;

        let deleteCell = document.createElement('td');
        
        let editCell = document.createElement('td');
        

        let deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.addEventListener("click", deleteExpense);
        deleteCell.append(deleteButton);
        
        
        let editButton = document.createElement("button");
        editButton.textContent = "Edit";
        editButton.addEventListener("click", editExpense);
        editCell.append(editButton);
        
        

        

        newRow.append(nameCell, emailCell, deleteCell, editCell);
        parent.appendChild(newRow);
    });
}


function deleteExpense(event) {
let index = event.target.parentNode.parentNode.rowIndex;
booking_arr.splice(index, 1); // remove the object from the array
localStorage.setItem("booking", JSON.stringify(booking_arr)); // update local storage
display(); // update the display
}

function editExpense(event) {

let index = event.target.parentNode.parentNode.rowIndex;
let booking = booking_arr[index]; // get the booking object from the array

// update the form inputs with the expense object properties
document.querySelector("#name").value = booking.name;
document.querySelector("#email").value = booking.email;

// remove the expense object from the array
booking_arr.splice(index, 1);

localStorage.setItem("booking", JSON.stringify(booking_arr)); // update local storage
display(); // update the display
}