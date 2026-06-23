let rootContE1= document.getElementById("rootCont");
let msgE1 = document.getElementById("msg") ;
let msgE2 = document.getElementById("savemsg") ;

function getDataFromLocalStorage(){
   let data = localStorage.getItem("myList");
   if(data === null){
      return[];
   }
   else{
      return JSON.parse(data);
   }

}

let todoList = getDataFromLocalStorage();

  function changeStatusOfTodo(isChecked,titleId){
     let titleE1 = document.getElementById(titleId);
     let todoListId = parseInt(titleId.slice(5));
     if( isChecked){
        titleE1.style.textDecoration= "line-through";
        
     }
     else{
         titleE1.style.textDecoration= "none";
     }

     todoList.map(each =>{
      if(each.id === todoListId){
         if(each.isChecked ){
            each.isChecked= false;
         }
         else{
            each.isChecked = true;
         }

      }
     })
   
     
  }

  function onDeleteTodo(todoId){
   rootContE1.removeChild(document.getElementById(todoId));

   for(let i = 0; i < todoList.length; i++){
      if("todo" + todoList[i].id === todoId){
         todoList.splice(i, 1);
         break;
      }
   }
}

 

function CreateAndAppendTodo(todo){
    let checkboxId= "checkbox" + todo.id;
    let titleId ="title" + todo.id;
    let todoId ="todo" + todo.id;
    
    let listItem= document.createElement("li");
    listItem.classList.add("list-cont");
    listItem.id=todoId;
    rootContE1.appendChild(listItem);

    let checkBox= document.createElement("input");
    checkBox.type="checkbox";
    checkBox.id= checkboxId;
    if(todo.isChecked){checkBox.checked= true};

     checkBox.onclick= function(){
        changeStatusOfTodo(checkBox.checked,titleId)
    }

    listItem.appendChild(checkBox);

    let labelE1= document.createElement("label");
    labelE1.classList.add("label-cont");
    labelE1.htmlFor= checkboxId;
   
    listItem.appendChild(labelE1);

    let titleE1= document.createElement("h4");
    titleE1.textContent= todo.title;
    titleE1.id= titleId;

    if(todo.isChecked){titleE1.style.textDecoration ="line-through" };
    labelE1.appendChild(titleE1);

    let delBtn = document.createElement("button");
    delBtn.classList.add("del-btn");
    delBtn.onclick = function(){
      onDeleteTodo(todoId)
    }
    labelE1.appendChild(delBtn);

    let delIcon = document.createElement("i");
    delIcon.classList.add("fa-solid","fa-trash");
    delBtn.appendChild(delIcon);
}

for(todo of todoList){
   CreateAndAppendTodo(todo);
}

 

function onAddTodo() {
    let todoTitle= document.getElementById("userIn");
    let userVal = todoTitle.value;

     let newTodo = {
      id: todoList.length + 1,
      title: userVal,
      isChecked:false
      }

       if(userVal === ""){
       msgE1.textContent= "please provide valid input!!!";
       msgE1.style.color= "red";
        }
       else{
       CreateAndAppendTodo(newTodo); 
        msgE1.textContent= "" ;
       todoList.push(newTodo);
        
    }
  
   todoTitle.value= "";

}    

function onSaveTodo() {

   localStorage.setItem("myList",JSON.stringify(todoList));
  

}
    
    

