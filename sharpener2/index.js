let li = document.getElementsByClassName("list-group-item");
console.log(li);
for(let i=0; i<li.length; i++){
    li[i].style.fontSize="30px"
}

let li1 = document.getElementsByTagName("li");
console.log(li1);
for(let i=0; i<li1.length; i++){
    li1[i].style.backgroundColor="red"
}
