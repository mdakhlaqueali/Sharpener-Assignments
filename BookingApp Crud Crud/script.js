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

    newRow.append(nameCell, emailCell);
    parent.appendChild(newRow);
    });
}