const todoInput=document.querySelector(".todo-input");
const todoButton=document.querySelector(".todo-button");
const todoList=document.getElementById("todoList");
const filterOption=document.querySelector(".filter-todo");

document.addEventListener("DOMContentLoaded",getLocalTodos);
todoButton.addEventListener("click",addTodo);
todoList.addEventListener("click",deleteCheck);
filterOption.addEventListener("change",filterTodo);

let index = 0

function addTodo(event){
    event.preventDefault();
    const todoDiv=document.createElement("div");
    todoDiv.classList.add(`todo`, `${index++}`);
    const newTodo=document.createElement("li");
    newTodo.innerText = todoInput.value; 
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);
    saveLocalTodos(todoInput.value);    

    const completedButton=document.createElement("button");
    completedButton.innerHTML='<i class="fas fa-check-circle"></li>';
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);

    const trashButton=document.createElement("button");
    trashButton.innerHTML='<i class="fas fa-trash"></li>';
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);

    todoList.appendChild(todoDiv);
    todoInput.value="";
}

function deleteCheck(e){
    const item=e.target;
    if(item.classList[1]==="fa-trash"){
        const todo=item.parentElement;
        console.log(todo);
        todo.classList.add("slide");

        removeLocalTodos(todo);
        todo.addEventListener("transitionend",function(){
            todo.remove();
        });
    }
    if(item.classList[0]==="complete-btn"){
        const todo=item.parentElement;
        todo.classList.toggle("complete");
    }
}

function filterTodo(e){
    const todos=todoList.childNodes;
    console.log(e.target.value)
    
    todos.forEach(function(todo){
        switch(e.target.value){
            case "all":
                todo.style.display="flex";
                break;
            case "complete":
                if(todo.classList.contains("complete")){
                    todo.style.display="flex";
                }else{
                    todo.style.display="none";
                }
                break;
            case "incomplete":
                if(!todo.classList.contains("complete")){
                    todo.style.display="flex";
                }else{
                    todo.style.display="none";
                }
                break;
        }
    });

    
}

function saveLocalTodos(todo){
    let todos;
    if(localStorage.getItem("todos")===null){
        todos=[];
    }else{
        todos=JSON.parse(localStorage.getItem("todos"));
    }
    todos.push(todo);
    localStorage.setItem("todos",JSON.stringify(todos));
}

function getLocalTodos(){
    let todos;
    if(localStorage.getItem("todos")===null){
        todos=[];
    }else{
        todos=JSON.parse(localStorage.getItem("todos"));
    }
    todos.forEach(function(todo){
        const todoDiv=document.createElement("div");
        todoDiv.classList.add(`todo`, `${index++}`);
        const newTodo=document.createElement("li");
        newTodo.innerText=todo;
        newTodo.classList.add("todo-item");
        todoDiv.appendChild(newTodo);

        const completedButton=document.createElement("button");
        completedButton.innerHTML='<i class="fas fa-check-circle"></i>';
        completedButton.classList.add("complete-btn");
        todoDiv.appendChild(completedButton);

        const trashButton=document.createElement("button");
        trashButton.innerHTML='<i class ="fas fa-trash"></i>';
        trashButton.classList.add("trash-btn");
        todoDiv.appendChild(trashButton);

        todoList.appendChild(todoDiv);
    });
}

function removeLocalTodos(todo){
    let todos;
    if(localStorage.getItem("todos")===null){
        todos=[];

    }else{
        todos=JSON.parse(localStorage.getItem("todos"));
    }
    const todoDiv = todo.parentElement
    const todoIndex=todo.parentElement.classList[1]
    todos.splice(todos.indexOf(todoIndex),1);
    todoDiv.remove()
    localStorage.setItem("todos",JSON.stringify(todos));

}