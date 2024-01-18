document.addEventListener("DOMContentLoaded", function () {
    const btnShow = document.getElementById("btnShow");
    const btnHide = document.getElementById("btnHide");
    const form = document.getElementById("form");
    const taskContainer = document.getElementById("task-container");

    // Retrieve tasks from local storage
    const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];

    // initialize class for creation of new tasks
    class Task {
        constructor(title, time, date, place) {
            this.title = title;
            this.time = time;
            this.date = date;
            this.place = place;
            this.completed = false; // New property for checkbox state
        }

        addTask() {
            // add task to html
            const div = document.createElement("div");
            div.classList.add('task');
            taskContainer.appendChild(div);
            div.innerHTML = `Title: ${this.title} <br> Time: ${this.time} <br> Date: ${this.date} <br> Location: ${this.place}`;

            // Create a delete button
            const deleteButton = document.createElement("button");
            deleteButton.classList.add("delete-btn");
            deleteButton.textContent = "-";

            //create checkbox
            const checkBox = document.createElement('input');
            checkBox.type = 'checkbox';
            checkBox.checked = this.completed;

            // Attach a change event listener to update the completed state
            checkBox.addEventListener('change', () => {
                this.completed = checkBox.checked;

                // Update local storage
                localStorage.setItem("tasks", JSON.stringify(storedTasks));
            });

            // Attach a click event listener to delete the div and remove from local storage
            deleteButton.addEventListener("click", () => {
                // Remove the task from the array
                const index = storedTasks.findIndex(task => task.title === this.title);
                if (index !== -1) {
                    storedTasks.splice(index, 1);

                    // Update local storage
                    localStorage.setItem("tasks", JSON.stringify(storedTasks));
                }

                // Remove the div from the UI
                div.remove();
            });

            // Append the delete button and checkbox to the new div
            div.appendChild(checkBox);
            div.appendChild(deleteButton);
        }
    }

    // function to create task
    const createTask = () => {
        // get values from form
        const title = document.getElementById("title").value;
        const time = document.getElementById("time").value;
        const date = document.getElementById("date").value;
        const place = document.getElementById("place").value;

        // create task
        let newTask = new Task(title, time, date, place);
        newTask.addTask();

        // Add the task to the array
        storedTasks.push(newTask);

        // Update local storage
        localStorage.setItem("tasks", JSON.stringify(storedTasks));

        form.reset();
    };

    // submission of form
    const submit = document.getElementById("submit");
    submit.addEventListener('click', function (event) {
        event.preventDefault();

        createTask();
    });

    const showForm = () => {
        form.style.display = 'flex';
    };

    const hideForm = () => {
        form.style.display = 'none';
    };

    // show form
    btnShow.addEventListener('click', showForm);
    // hide form
    btnHide.addEventListener('click', hideForm);

    // Display stored tasks on page load
    storedTasks.forEach(taskData => {
        let storedTask = new Task(taskData.title, taskData.time, taskData.date, taskData.place);
        storedTask.addTask();
    });
});
