document.addEventListener('DOMContentLoaded',()=>{
    const input = document.getElementById('todo-input');
    const addTask = document.getElementById('add-task');
    const todoList = document.getElementById('todo-list');
    // const status = document.getElementById('status');
    // let totalTask = 0;
    // let completedTask = 0;

    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    tasks.forEach((task)=>{
        renderTask(task);
    })

    addTask.addEventListener('click',()=>{
        let todoInput = input.value.trim();
        if(todoInput === ''){
            alert("please enter a valid input")
        }
        const newTask  = {
            id: Date.now(),
            isCompleted: false,
            task: todoInput,
        }
        tasks.push(newTask)
        saveTask();
        renderTask(newTask);
        input.value = '';
    })

    function saveTask(){
        localStorage.setItem('tasks', JSON.stringify(tasks))
        // totalTask = tasks.length;
        // completedTask = 0;
        // tasks.forEach(task => {
        //     if(task.isCompleted === true){
        //         completedTask++;
        //     }
        // })
        // console.log(totalTask);
        // console.log(completedTask);
    }

    function renderTask(task){
        const li = document.createElement('li')
        li.setAttribute('data-id', task.id);
        li.innerHTML = `<span>${task.task}</span><button>Delete</button>`;
        li.addEventListener('click',(e)=>{
            if(e.target.tagName === 'BUTTON') return;
            task.isCompleted = !task.isCompleted // there is no need to do this 
            li.classList.toggle('done');
            saveTask();
        })
        
        // if(task.isCompleted) li.classList.add('done');
        li.querySelector('button').addEventListener('click',(e)=>{
            e.stopPropagation();
            tasks = tasks.filter(t => t.id !== task.id)
            li.remove()
            saveTask();
        })
        // const span = document.createElement('span');
        // span.innerHTML = `Total Task = ${totalTask} | Complete Task = ${completedTask} | Pending Task = ${totalTask - completedTask}`
        // status.removeChild(span);
        // status.appendChild(span);
        todoList.appendChild(li);
        console.log(task);
    }

})
