function SaveToLocalStorage(event)
        {
            event.preventDefault();
            const names=event.target.username.value;
            const emails=event.target.email.value;
            const telps=event.target.telp.value;
            const times=event.target.time.value;

        //    localStorage.setItem('name',names);
        //    localStorage.setItem('email',emails);
        //    localStorage.setItem('telp',telps);
        //    localStorage.setItem('time',times);
           
           const obj={
            names,
            emails,
            telps,
            times

           } 
           const strinobj=JSON.stringify(obj);
           localStorage.setItem(emails,strinobj);
           ShowUserOnScreen(obj);}
          function ShowUserOnScreen(obj)
          {
            const parentrele= document.getElementById('listOfitems');
            const childele=document.createElement('li');
            childele.textContent=childele.textContent+obj.names+" "+obj.emails+" "+obj.telps+" "+obj.times;

            const deletbtn=document.createElement("input");
            deletbtn.type="button";
            deletbtn.value='delete';
            const editbtn=document.createElement('input');
            editbtn.type='button';
            editbtn.value='edit';

            deletbtn.onclick = () => {
                localStorage.removeItem(obj.emails);
                parentrele.removeChild(childele);
            }
            editbtn.onclick =() => {
                parentrele.removeChild(childele);
                document.getElementById('username').value=obj.names;
                document.getElementById('email').value=obj.emails;
                document.getElementById('telp').value=obj.telps;
                document.getElementById('datetime-local').value=obj.times;
              }
            childele.appendChild(deletbtn);
            childele.appendChild(editbtn);

              parentrele.appendChild(childele);
            
          }