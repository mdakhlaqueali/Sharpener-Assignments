    function saveToCrudCrud(event){
        event.preventDefault();
        let name = document.querySelector("#name").value;
        let email = document.querySelector("#email").value;

        let obj = {
            name,
            email
        }
        
        axios.post("https://crudcrud.com/api/3b2934afab514f36824a66b7135edb7a/myData", obj)
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
    axios.get("https://crudcrud.com/api/3b2934afab514f36824a66b7135edb7a/myData")
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
    let nameCell = document.createElement("td");
    nameCell.textContent = el.name;
    let emailCell = document.createElement("td");
    emailCell.textContent = el.email;

    let deleteCell = document.createElement('td');
        
    let editCell = document.createElement('td');
        

    let deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.addEventListener("click", deleteUser);
    deleteCell.append(deleteButton);
        
        
    let editButton = document.createElement("button");
    editButton.textContent = "Edit";
    // editButton.addEventListener("click", editUser);
    editCell.append(editButton);

    newRow.append(nameCell, emailCell, deleteCell, editCell);
    newRow.setAttribute("data-id", el._id);//set the unique id from api to the row as attribute
    parent.appendChild(newRow);
    });
}
function deleteUser(event) {
    let row = event.target.parentNode.parentNode;
    let userId = row.getAttribute("data-id");

    axios.delete(`https://crudcrud.com/api/3b2934afab514f36824a66b7135edb7a/myData/${userId}`)
        .then(function(response) {
            row.remove();
            console.log(response);
        })
        .catch(function(error) {
            console.log(error);
        })
}