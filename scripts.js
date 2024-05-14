import 'bulma/css/bulma.css';
import './style.css';
import { alertInput, clearAlert } from './utilits.js';

const page = {
    headDate: document.querySelector(".date"),
    addTaskButton: document.querySelector('#add-task'),
    taskInput: document.querySelector('#task-input'),
    taskList: document.querySelector('#task-list'),
};

const tasks = localStorage.getItem('tasks') ? JSON.parse(localStorage.getItem('tasks')) : [];

function displayDate() {
    let date = new Date();
    date = date.toString().split(" ");
    page.headDate.innerHTML =`<p class="heading">${date[2]} ${date[1]} ${date[3]}</p>`;
}

function displayTask() {
    let tasksHtml = tasks.map((task, index) => `
        <div class="box todo-item" id="item-${index}">
            <div class="input-control">
                <textarea class="textarea" readonly id="textarea-${index}">${task}</textarea>
            </div>
            <div class="edit-controlle">
                <i class="fas fa-check agree" data-index="${index}"></i>
                <i class="fas fa-edit edit" data-index="${index}"></i>
            </div>
        </div>`).join('');
    page.taskList.innerHTML = tasksHtml;
}

function addEventListeners() {
    page.taskList.addEventListener('click', event => {
        const index = event.target.dataset.index;
        if (event.target.classList.contains('edit')) {
            editTask(index);
        } else if (event.target.classList.contains('agree')) {
            deleteTask(index);
        } else if (event.target.classList.contains('save')) {
            saveTask(index);
        } else if (event.target.classList.contains('cancel')) {
            cancelTask();
        }
    });
}

function editTask(index) {
    const textarea = document.getElementById(`textarea-${index}`);
    textarea.removeAttribute('readonly');
    textarea.focus();

    const item = document.getElementById(`item-${index}`);
    item.querySelector('.edit-controlle').innerHTML = `
        <i class="fas fa-save save" data-index="${index}"></i>
        <i class="fas fa-times cancel" data-index="${index}"></i>
    `;
}

function saveTask(index) {
    const textarea = document.getElementById(`textarea-${index}`);
    tasks[index] = textarea.value;
    localStorage.setItem("tasks", JSON.stringify(tasks));
    displayTask();
}

function cancelTask() {
    displayTask();
}

function addTask() {
    const task = page.taskInput.value.trim();
    if (!task) {
        alertInput();
        return;
    }
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    displayTask();
    page.taskInput.value = '';
    clearAlert();
}

function deleteTask(index) {
    tasks.splice(index, 1);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    displayTask();
}

page.addTaskButton.addEventListener('click', () => addTask());
window.onload = function() {
    displayDate();
    displayTask();
    addEventListeners();
}