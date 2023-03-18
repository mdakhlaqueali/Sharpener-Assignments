//TRAVERSING THE DOM
let itemList = document.querySelector("#items");
//parentNode
// console.log(itemList.parentElement);
// console.log(itemList.parentNode);
// console.log(itemList.parentNode.parentNode)
// itemList.parentNode.style.backgroundColor= "red";

//childNodes
// console.log(itemList.childNodes);
// console.log(itemList.children);
// console.log(itemList.children[1]);
// itemList.children[1].style.backgroundColor="yellow";

//firstChild
// console.log(itemList.firstChild)
// //firstElementChild
// console.log(itemList.firstElementChild)
// itemList.firstElementChild.textContent="Hello"

//lastChild
// console.log(itemList.lastChild)
// //lastElementChild
// console.log(itemList.lastElementChild)
// itemList.lastElementChild.textContent="Hello1"

// //nextSibling
// console.log(itemList.nextSibling)
// //nextElementSibling
// console.log(itemList.nextElementSibling)

// //previousSibling
// console.log(itemList.previousSibling)
// //previousElementSibling
// console.log(itemList.previousElementSibling)
// itemList.previousElementSibling.style.color="green";

//createElement
//create a div
let newDiv= document.createElement("div");
//Add class
newDiv.className = "hello";
//Add id
newDiv.id = "ID";
//Add Attribute
newDiv.setAttribute("title","Hello Div")
//Create a text node
let newDivText = document.createTextNode("Hello World");
//Add text to the div
newDiv.appendChild(newDivText);

let container = document.querySelector('header .container');
let h1 = document.querySelector('header h1');

console.log(newDiv);

container.insertBefore(newDiv, h1)