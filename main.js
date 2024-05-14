import 'bulma/css/bulma.css';
import './style.css'


const page = {
    headDate : document.querySelector(".date"),
    addTaskButton : document.querySelector('#add-task'),
    taskInput : document.querySelector('#task-input'),
    taskList : document.querySelector('#task-list'),
    tasks : localStorage.getItem("tasks") ? JSON.parse(localStorage.getItem("tasks")) : [],
    agree : document.querySelectorAll(".fa-check"),
    edit : document.querySelectorAll(".fa-edit"),


    init() {
        this.addTaskButton.addEventListener('click', () => this.addTask());
        window.onload = () => {
            this.displayDate();
            this.displayTask();
            this.taskList.addEventListener('click', (event) => {
                if (event.target.classList.contains('fa-check')) {
                    const index = parseInt(event.target.dataset.index);
                    this.deleteTask(index);
                }
            });
        };
    },
    
    addTask(){
        const task = this.taskInput.value;
        if(!task){
            this.alert();
            return;
        }
        this.clearAlert();
        this.tasks.push(task);
        localStorage.setItem("tasks",JSON.stringify(this.tasks));
        this.displayTask();
        this.activeAgre();
        this.taskInput.value = '';
        
    },

    displayDate () {
        let date = new Date();
        date = date.toString().split(" ");
        this.headDate.innerHTML =`<p class="heading">${date[2]} ${date[1]} ${date[3]}</p>`;
    },

    
    displayTask() {
        this.taskList.innerHTML = '';
        let listTask = '';
        this.tasks.forEach((task,index) => {
             listTask += ` <div class="box todo-item">
            <div class="input-control">
                <textarea class="textarea"  readonly>${task}</textarea>
            </div>
            <div class="edit-controlle">
                <i class="fas fa-check" id ="agree"></i>
                <i class="fas fa-edit" id ="edit"></i>
            </div>
        </div>`;
            
            this.taskList.innerHTML=listTask;
        });
    },
    activeAgre(){
        this.agree.forEach((btn,i) =>{
            btn.addEventListener("click",() =>{ this.deleteTask(i)})
        })
    },
    deleteTask(i){
           this.tasks.splice(i,1);
           localStorage.setItem("tasks", JSON.stringify(this.tasks));
           this.displayTask();
          

    },
    alert(){
        this.taskInput.classList.add('is-danger');
        this.taskInput.placeholder = 'ЗАДАЧА НЕ ВВЕДЕНА......';
        this.taskInput.focus();
        

    },
    clearAlert() {
        this.taskInput.classList.remove('is-danger');
        this.taskInput.placeholder = 'Добавить задачу';
        
    },



    
}





page.init()