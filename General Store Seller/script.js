function saveToCrudCrud(event){
    event.preventDefault();
    let item = document.querySelector("#item").value;
    let description = document.querySelector("#desc").value;
    let price = document.querySelector("#price").value;
    let quantity = document.querySelector("#quant").value;

    let obj = {
        item,
        description,
        price,
        quantity
    }
    
    axios.post("https://crudcrud.com/api/6f31214203914f419d43f074d847bd16/myData", obj)
        .then(function(response){
            display([obj])
            console.log(response);
        })
        .catch(function(error){
            document.innerHTML = document.body.innerHTML + "<h4>Something went wrong<h4>"
            console.log(error)
        })
}
//to get the data every time page is loaded, we add a event
//listener to the window or to the DOM you can say

window.addEventListener("DOMContentLoaded", function(){
axios.get("https://crudcrud.com/api/6f31214203914f419d43f074d847bd16/myData")
.then(function(response){
    console.log(response.data);
    display(response.data)
})
.catch(function(error){
    console.log(error)
})
})


function display(res){
let parent = document.querySelector("tbody");
let newRow;

res.forEach(function(el) {
newRow = document.createElement("tr");
let itemCell = document.createElement("td");
itemCell.textContent = el.item;

let descriptionCell = document.createElement("td");
descriptionCell.textContent = el.description;

let priceCell = document.createElement("td");
priceCell.textContent = el.price;

let quantityCell = document.createElement("td");
quantityCell.textContent = el.quantity;

let buy1Cell = document.createElement('td');
    
let buy2Cell = document.createElement('td');

let buy3Cell = document.createElement('td');

let deleteCell = document.createElement('td');
    

let buy1 = document.createElement("button");
buy1.textContent = "Buy1";
buy1.addEventListener("click", buyOne);
buy1Cell.append(buy1);
    
    
let buy2 = document.createElement("button");
buy2.textContent = "Buy2";
buy2.addEventListener("click", buyTwo);
buy2Cell.append(buy2);

let buy3 = document.createElement("button");
buy3.textContent = "Buy3";
buy3.addEventListener("click", buyThree);
buy3Cell.append(buy3);

let deleteButton = document.createElement("button");
deleteButton.textContent = "Delete";
deleteButton.addEventListener("click", deleteRow);
deleteCell.append(deleteButton);


newRow.append(itemCell, descriptionCell, priceCell, quantityCell, buy1Cell, buy2Cell, buy3Cell, deleteCell);
newRow.setAttribute("data-id", el._id);//set the unique id from api to the every row as attribute
parent.appendChild(newRow);
});
}

function deleteRow(event){
    let row = event.target.parentNode.parentNode;
    let id = row.getAttribute("data-id");

    axios.delete(`https://crudcrud.com/api/6f31214203914f419d43f074d847bd16/myData/${id}`)
        .then(function(response) {
            row.remove();
            console.log(response);
        })
        .catch(function(error) {
            console.log(error);
        })
}
/*The event.target refers to the button that was clicked, 
and .parentNode refers to the immediate parent element of the 
button, which is the <td> element that contains the button.
Since we want to get the index of the row that contains this 
button, we need to go one level higher in the HTML hierarchy, 
so we add another .parentNode to refer to the parent of the 
<td> element, which is the <tr> element that represents the row.*/

function buyOne(event) {
    let row = event.target.parentNode.parentNode;
    let id = row.getAttribute("data-id");
    let quantityCell = row.querySelector("td:nth-child(4)");
    let quantity = Number(quantityCell.textContent);
  
    if (quantity > 0) {
      quantity--;
      quantityCell.textContent = quantity;
  
      const itemCell = row.querySelector("td:nth-child(1)");
      const descriptionCell = row.querySelector("td:nth-child(2)");
      const priceCell = row.querySelector("td:nth-child(3)");
  
      axios
        .put(`https://crudcrud.com/api/6f31214203914f419d43f074d847bd16/myData/${id}`, {
          item: itemCell.textContent,
          description: descriptionCell.textContent,
          price: priceCell.textContent,
          quantity: quantity
        })
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }
  
  function buyTwo(event) {
    const row = event.target.parentNode.parentNode;
    const id = row.getAttribute("data-id");
    const quantityCell = row.querySelector("td:nth-child(4)");
    let quantity = Number(quantityCell.textContent);
  
    if (quantity > 1) {
      quantity -= 2;
      quantityCell.textContent = quantity;
  
      const itemCell = row.querySelector("td:nth-child(1)");
      const descriptionCell = row.querySelector("td:nth-child(2)");
      const priceCell = row.querySelector("td:nth-child(3)");
  
      axios
        .put(`https://crudcrud.com/api/6f31214203914f419d43f074d847bd16/myData/${id}`, {
          item: itemCell.textContent,
          description: descriptionCell.textContent,
          price: priceCell.textContent,
          quantity: quantity
        })
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }
  
  function buyThree(event) {
    const row = event.target.parentNode.parentNode;
    const id = row.getAttribute("data-id");
    const quantityCell = row.querySelector("td:nth-child(4)");
    let quantity = Number(quantityCell.textContent);
  
    if (quantity > 2) {
      quantity -= 3;
      quantityCell.textContent = quantity;
  
      const itemCell = row.querySelector("td:nth-child(1)");
      const descriptionCell = row.querySelector("td:nth-child(2)");
      const priceCell = row.querySelector("td:nth-child(3)");
  
      axios
        .put(`https://crudcrud.com/api/6f31214203914f419d43f074d847bd16/myData/${id}`, {
          item: itemCell.textContent,
          description: descriptionCell.textContent,
          price: priceCell.textContent,
          quantity: quantity
        })
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }
  