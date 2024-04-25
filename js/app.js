let completeBtn = document.querySelector('.btn-success')
let deleteBtn = document.querySelector('.btn-delete')
let input = document.querySelector('#itemInput')
let addBtn = document.querySelector('.btn-primary')
let clearBtn = document.querySelector('.clearBtn')
let todoList = document.querySelector('#todoList') 
let todoArray = []


function removeInput(){
    input.value = ''

}

function addTodo(){
    let todo = input.value

    let newtodoObj = {
        title: todo,
        completed: false,
        id: todoArray.length + 1
    }
    removeInput()
    
    todoArray.push(newtodoObj)
    setlocalStorage(todoArray)
    generateNewtodo(todoArray)
}

function setlocalStorage(todoArray){
    localStorage.setItem('todos',JSON.stringify(todoArray))
}


function generateNewtodo(todoArray){
    todoList.innerHTML = ''
    todoArray.forEach(function(todo) {
        let newLi = document.createElement('li')
        newLi.classList.add('completed', 'well')
        let newLabel = document.createElement('label')
        newLabel.textContent = todo.title
        let newDeleteBtn = document.createElement('button')
        newDeleteBtn.classList.add('btn', 'btn-delete' , 'btn-danger')
        newDeleteBtn.innerHTML = 'Delete'
        newDeleteBtn.setAttribute('onclick', 'removeTodo(' + todo.id + ')')

        let newCompleteBtn = document.createElement('button')
        newCompleteBtn.classList.add('btn', 'btn-success')
        newCompleteBtn.innerHTML = 'complete'
        newCompleteBtn.setAttribute('onclick', 'editTodo(' + todo.id + ')')
        if (todo.completed) {
            newLi.className = 'uncompleted well'
            newCompleteBtn.innerHTML = 'UnComplete'
        }
        newLi.append(newLabel,newCompleteBtn,newDeleteBtn)

        console.log(newLi)
        todoList.appendChild(newLi)
    });
}

function editTodo(todoId) {

    let localStorageTodos = JSON.parse(localStorage.getItem('todos'))

    todoArray = localStorageTodos

    todoArray.forEach(function (todo) {
        if (todo.id === todoId) {
            todo.completed = !todo.completed
        }
    })

    setlocalStorage(todoArray)
    generateNewtodo(todoArray)
}

function removeTodo(todoID){
    let localStorageTodos = JSON.parse(localStorage.getItem('todos'))

    todoArray = localStorageTodos

    let mainTodoIndex = todoArray.findIndex(function (todo) {
        return todo.id === todoID
    })
    todoArray.splice(mainTodoIndex, 1)

    setlocalStorage(todoArray)
    generateNewtodo(todoArray)
}

function getLocalStorage () {
    let localStorageTodos = JSON.parse(localStorage.getItem('todos'))

    if (localStorageTodos) {
        todoArray = localStorageTodos
    } else {
        todoArray = []
    }

    generateNewtodo(todoArray)

}

function clearTodos () {
    todoArray = []
    generateNewtodo(todoArray)
    // localStorage.clear()
    localStorage.removeItem('todos')
}

// addBtn.addEventListener('click', function(){
//     let newLi = document.createElement('li')
//     newLi.classList.add('completed', 'well')
//     let newLabel = document.createElement('label')
//     newLabel.textContent = input.value
//     let newDeleteBtn = document.createElement('button')
//     newDeleteBtn.classList.add('btn', 'btn-delete' , 'btn-danger')
//     newDeleteBtn.innerHTML = 'Delete'
//     deleteBtn.addEventListener('click',function(event) {
//         event.target.parentNode.remove()
//     })
//     let newCompleteBtn = document.createElement('button')
//     newCompleteBtn.classList.add('btn', 'btn-success')
//     newCompleteBtn.innerHTML = 'complete'
//     completeBtn.addEventListener('click', function(event){
//         event.target.previousElementSibling.classList.add('done')
     
//     })
//     newLi.append(newLabel,newCompleteBtn,newDeleteBtn)

//     console.log(newLi)
//     todoList.appendChild(newLi)



// })


clearBtn.addEventListener('click', clearTodos)
addBtn.addEventListener('click', addTodo)
input.addEventListener('keydown', function (event) {
    if (event.code === 'Enter') {
        addTodo()
    }
})

