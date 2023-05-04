    function saveToCrudCrud(event){
        event.preventDefault();
        let name = document.querySelector("#name").value;
        let email = document.querySelector("#email").value;

        let obj = {
            name,
            email
        }
        
        axios.post("https://crudcrud.com/api/7cf69902ed0f444093b231ab233fe539/appointData", obj)
            .then(function(response){
                display(response.data);
                console.log(response);
            })
            .catch(function(error){
                document.innerHTML = document.body.innerHTML + "<h4>Something went wrong<h4>"
                console.log(error)
            })
    }

function display(res){
    let parent = document.querySelector("tbody");
    let newRow;
    parent.innerHTML = '';
    
    newRow = document.createElement("tr");
    let nameCell = document.createElement("td");
    nameCell.textContent = res.name;
    let emailCell = document.createElement("td");
    emailCell.textContent = res.email;

        newRow.append(nameCell, emailCell);
        parent.appendChild(newRow);
}