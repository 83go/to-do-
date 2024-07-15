document.addEventListener('DOMContentLoaded', () => {
    const taskForm = document.getElementById('task-form');
    const titleInput = document.getElementById('title');
    const descriptionInput = document.getElementById('description');
    const pendingTasksList = document.getElementById('pending-tasks');
    const completedTasksList = document.getElementById('completed-tasks');

    taskForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const title = titleInput.value.trim();
        const description = descriptionInput.value.trim();

        if (title && description) {
            addTask(title, description);
            titleInput.value = '';
            descriptionInput.value = '';
        } else {
            alert('Please fill out both fields');
        }
    });

    function addTask(title, description) {
        const task = {
            id: Date.now(),
            title,
            description,
            completed: false,
            createdAt: new Date().toLocaleString()
        };
        const taskItem = createTaskItem(task);
        pendingTasksList.appendChild(taskItem);
    }

    function createTaskItem(task) {
        const taskItem = document.createElement('li');
        taskItem.innerHTML = `
            <span>
                <strong>${task.title}</strong><br>
                ${task.description}<br>
                <small>Added on: ${task.createdAt}</small>
            </span>
            <div>
                <button class="edit">Edit</button>
                <button class="complete">Complete</button>
                <button class="delete">Delete</button>
            </div>
        `;
        taskItem.querySelector('.delete').addEventListener('click', () => {
            taskItem.remove();
        });
        taskItem.querySelector('.complete').addEventListener('click', () => {
            task.completed = true;
            task.completedAt = new Date().toLocaleString();
            pendingTasksList.removeChild(taskItem);
            completedTasksList.appendChild(createCompletedTaskItem(task));
        });
        taskItem.querySelector('.edit').addEventListener('click', () => {
            editTask(task, taskItem);
        });
        return taskItem;
    }

    function createCompletedTaskItem(task) {
        const taskItem = document.createElement('li');
        taskItem.innerHTML = `
            <span>
                <strong>${task.title}</strong><br>
                ${task.description}<br>
                <small>Added on: ${task.createdAt}</small><br>
                <small>Completed on: ${task.completedAt}</small>
            </span>
            <button class="delete">Delete</button>
        `;
        taskItem.querySelector('.delete').addEventListener('click', () => {
            taskItem.remove();
        });
        return taskItem;
    }

    function editTask(task, taskItem) {
        titleInput.value = task.title;
        descriptionInput.value = task.description;
        taskItem.remove();
    }
});
