'use strict';

const todoControl = document.querySelector('.todo-control');
const headerInput = document.querySelector('.header-input');
const todoList = document.querySelector('.todo-list');
const todoCompleted = document.querySelector('.todo-completed');

const toDoData = [];
let locStor = localStorage.getItem('myKey');
let locParce = JSON.parse(locStor);


const render = function(){

    todoList.textContent = '';
    todoCompleted.textContent = '';

    toDoData.forEach(function(item, index){
        const li = document.createElement('li');
        li.classList.add('todo-item');
        li.innerHTML = `
        <span class="text-todo">${item.value}</span>
		<div class="todo-buttons">
			<button class="todo-remove"></button>
			<button class="todo-complete"></button>
		</div>`;
        if(item.value !== ''){
           if(item.completed){
            todoCompleted.append(li);
            } else {
                todoList.append(li);
            } 
        }
            
        const btnToDoCompleted = li.querySelector('.todo-complete');
        btnToDoCompleted.addEventListener('click', function(){
            item.completed = !item.completed;
            render();
        });

        const todoRemoveBtn = li.querySelector('.todo-remove');
        todoRemoveBtn.addEventListener('click', function(){
            toDoData.splice(index, 1);
            li.remove();
            render();
        });

    });
    headerInput.value = '';
    
    let jsonConver = function() {
        return JSON.stringify(toDoData);
    };
    
    localStorage.myKey = jsonConver();

};

todoControl.addEventListener('submit' , function(event){
    event.preventDefault();

    const li = {
        value: headerInput.value,
        completed: false,
    };
    if(li !== ''){
        toDoData.push(li);
        render();
    }
    
});

const showLocStor = function() {
    locParce.forEach(function(item, index){
        
        const li = {
            value: item.value,
            completed: item.completed,
        };
        toDoData.push(li);
        render();
    });
};
showLocStor();