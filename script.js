const btnShow = document.getElementById("btnShow");
const btnHide = document.getElementById("btnHide");
const form = document.getElementById("form");


const taskContainer = document.getElementById("task-container")



// initialize class for creation of new tasks
class Task{
    constructor(title,time,date,place){
        this.title = title;
        this.time = time;
        this.date = date;
        this.place = place;
    }
    addTask(){ //add task to html
        const div = document.createElement("div");
        div.classList.add('task');
        taskContainer.appendChild(div);
        div.innerHTML = `Title: ${this.title} ${"<br>"} Time: ${this.time} ${"<br>"} Date${this.date} ${"<br>"} Location: ${this.place}`;
        // Create a delete button
        const deleteButton = document.createElement("button");
        deleteButton.classList.add("delete-btn")
        deleteButton.textContent = "-";

        // Attach a click event listener to delete the div
        deleteButton.addEventListener("click", function () {
            div.remove();
        });

        // Append the delete button to the new div
        div.appendChild(deleteButton);
    }
   
}




//function to create task
const createTask=()=>{
    // get values from form
    console.log('creating task')
    const title = document.getElementById("title").value;
    const time = document.getElementById("time").value;
    const date = document.getElementById("date").value;
    const place = document.getElementById("place").value;

    //create task
    let newTask= new Task(title,time,date,place);
    newTask.addTask();
}

// submition of form
const submit = document.getElementById("submit")
submit.addEventListener('click',function(event){
    event.preventDefault();
    createTask();
    form.reset()
})

const showForm = () => {
    console.log('showing form')
    form.style.display = 'flex';
};

const hideForm = () => {
    console.log('hiding form')
    form.style.display = 'none';
};


//show form
btnShow.addEventListener('click', showForm);
//hide form
btnHide.addEventListener('click', hideForm);



console.log('test')