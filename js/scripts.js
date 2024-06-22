const inputElement = document.querySelector('.new-task-input');
const addTaskButton = document.querySelector('.new-task-button');
const taskContainer = document.querySelector('.tasks-container');

const validateInput = () => {
    /*if (inputElement.value.trim().length > 0) {
        return true;
    } else {
        return false;
    }*/
   return inputElement.value.trim().length > 0;
};

const handleAddTask = () => {
    const inputIsValid = validateInput();

    if (!inputIsValid) {
        return inputElement.classList.add('error');
    }

    const taskItemContainer = document.createElement('div');
    taskItemContainer.classList.add('task-item');

    const taskContent = document.createElement('p');
    taskContent.innerText = inputElement.value;

    taskContent.addEventListener('click', () => handleClick(taskContent));

    const deleteItem = document.createElement('i');
    deleteItem.classList.add('fa-thin');
    deleteItem.classList.add('fa-trash');

    deleteItem.addEventListener('click', () => handleDeleteClick(taskItemContainer, taskContent));

    taskItemContainer.appendChild(taskContent);
    taskItemContainer.appendChild(deleteItem);

    taskContainer.appendChild(taskItemContainer);
    inputElement.value = '';

    updateLocalStorage();
};

const handleClick = (taskContent) => {
    const tasks = taskContainer.childNodes;

    // percorrendo os items
    for (const task of tasks) {
        const currentTaskIsBeingClicked = task.firstChild.isSameNode(taskContent);
        // verificando se o item actual eh o mesmo que esta sendo clicado
        if (currentTaskIsBeingClicked) {
            task.firstChild.classList.toggle('completed');
        }
    }

    updateLocalStorage();
};

const handleDeleteClick = (taskItemContainer, taskContent) => {
    const tasks = taskContainer.childNodes;

    for (const task of tasks) {
        const currentTaskIsBeingClicked = task.firstChild.isSameNode(taskContent);
        // verificando se o item actual eh o mesmo que esta sendo clicado
        if (currentTaskIsBeingClicked) {
            taskItemContainer.remove();
        }
    }

    updateLocalStorage();
};

const handleInputChange = () => {
    const inputIsValid = validateInput();

    if (inputIsValid) {
        return inputElement.classList.remove('error');
    }
};

const updateLocalStorage = () => {
    const tasks = taskContainer.childNodes;

    const localStorageTasks = [...tasks].map(task => {
        const content = task.firstChild;
        const isCompleted = content.classList.contains('completed');

        // isCompleted: isCompleted
        return { description: content.innerText, isCompleted };
    });

    localStorage.setItem('tasks', JSON.stringify(localStorageTasks));
};

addTaskButton.addEventListener('click', () => handleAddTask());

inputElement.addEventListener('change', () => handleInputChange());
