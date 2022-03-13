// Selectionner les elements dans le DOM
const todoInput = document.querySelector('.insert');
const addBtn = document.querySelector('.add');
const filterOption = document.querySelector('.topics');
const todoList = document.querySelector('.todo-list');

// ECouteurs
document.addEventListener('DOMContentLoaded',getTodos);
addBtn.addEventListener('click',setTodo);
todoList.addEventListener('click',action);
filterOption.addEventListener('input',filterTodo);


// Fonctions
function setTodo(event) {
    event.preventDefault();
    // Création du div
    const todoDiv = document.createElement("div");
    todoDiv.classList.add('todo')
    // créer le li
    const newTodo = document.createElement('li');
    newTodo.classList.add('todo-item');
    newTodo.innerText = todoInput.value;
    todoDiv.appendChild(newTodo);
    // Ajout de la todo dans localStorage
    let tache = {
        content:todoInput.value,
        action:"undone"
    }
    saveTodo(tache);
    // Creation du bouton check
    const completeButton  = document.createElement('button');
    completeButton.classList.add('complete-btn');
    completeButton.innerHTML = "<i class='fa fa-check'></i>";
    todoDiv.appendChild(completeButton);
    // Creation du bouton delete
    const trashButton  = document.createElement('button');
    trashButton.classList.add('trash-btn');
    trashButton.innerHTML = "<i class='fa fa-trash'></i>";
    todoDiv.appendChild(trashButton);
    // Add div to todo list
    todoList.appendChild(todoDiv);
    todoInput.value="";
    
}

function saveTodo(todo) {
    // Vérifier l'existance des tâches dans local
    let todos =[];
    if (localStorage.getItem("todos") != null) {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.push(todo);
    localStorage.setItem("todos",JSON.stringify(todos));

}

function getTodos() {
    // Vérifier l'existance des tâches dans local
    let todos =[];
    if (localStorage.getItem("todos") != null) {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    
    todos.forEach(todo => {
        // Création du div
    const todoDiv = document.createElement("div");
    todoDiv.classList.add('todo')
    // créer le li
    const newTodo = document.createElement('li');
    newTodo.classList.add('todo-item');
    newTodo.innerText = todo.content;
    todoDiv.appendChild(newTodo);
    // Creation du bouton check
    const completeButton  = document.createElement('button');
    completeButton.classList.add('complete-btn');
    completeButton.innerHTML = "<i class='fa fa-check'></i>";
    todoDiv.appendChild(completeButton);
    // Creation du bouton delete
    const trashButton  = document.createElement('button');
    trashButton.classList.add('trash-btn');
    trashButton.innerHTML = "<i class='fa fa-trash'></i>";
    todoDiv.appendChild(trashButton);
    // Verifier si la tâche est achévée ou non
    if (todo.action == "done") {
        todoDiv.classList.add("done");
    }
    // Add div to todo list
    todoList.appendChild(todoDiv);
    });
}

function action(event) {
    const item = event.target;
    // Delete todo
    if (item.classList[0] === "trash-btn") {
        item.parentNode.classList.add('fail')
        removeTodo(item.parentNode);
        item.parentNode.addEventListener('transitionend',event=>{
            item.parentNode.remove();
        })
    }
    // Check todo 
    if (item.classList[0] === "complete-btn") {
        item.parentNode.classList.toggle('done')
        let todos = JSON.parse(localStorage.getItem("todos"));
        todos.forEach((todo,index) =>{
            if (todo.content == item.parentNode.firstChild.innerText) {
                if (item.parentNode.classList.contains("done")) {
                    todos[index].action = "done"
                    return;
                } else {
                    todos[index].action = "undone"
                    return;
                }
            }
        });
        localStorage.setItem("todos",JSON.stringify(todos));
    }
}
function removeTodo(tododiv) {
   // Vérifier l'existance des tâches dans local
   let todos =[];
   if (localStorage.getItem("todos") != null) {
       todos = JSON.parse(localStorage.getItem("todos"));
   }
   const todoText = tododiv.firstChild.innerText;
   todos.forEach((todo,index)=>{
       if (todo.content === todoText) {
            todos.splice(index,1);
       }
   })
   localStorage.setItem('todos',JSON.stringify(todos));

}
function filterTodo(event) {
    const todos =  todoList.childNodes;
    let i = 0;
     todos.forEach((todo)=>{
        if (i!=0) {
            switch (event.target.value) {
                case "all":
                    todo.style.display = "flex"
                    break;
                case "done":
                    if (todo.classList.contains("done")) {
                        todo.style.display = "flex";
                    } else {
                        todo.style.display = "none";
                    }
                    break;
            
                case "undone":
                    if (!todo.classList.contains("done")) {
                        todo.style.display = "flex";
                    } else {
                        todo.style.display = "none";
                    }
                    break;
            }
        }
        i++;
     })
}