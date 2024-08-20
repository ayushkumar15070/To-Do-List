let savebtn = document.querySelector('#Save');
let list = document.querySelector('.list');
let Input = document.querySelector('#Input-field');
let warning = document.createElement('div'); // Create a warning message element
warning.style.color = 'red';
warning.style.display = 'none'; // Hide the warning message initially
warning.innerText = 'You have to write a minimum of three characters';
Input.insertAdjacentElement('afterend', warning); // Insert the warning message after the input field
let editElement = null;

// Load tasks from local storage
document.addEventListener('DOMContentLoaded', loadTasks);

savebtn.addEventListener('click', function () {
    let content = Input.value.trim();

    if (content.length < 3) {
        warning.style.display = 'block'; // Show the warning message
        return; // Do not proceed with saving
    } else {
        warning.style.display = 'none'; // Hide the warning message if content is valid
    }

    if (editElement) {
        // Update the existing li
        editElement.innerHTML = content;
        editElement = null;
    } else {
        // Create a new to-do item
        let div = document.createElement('div');
        div.classList = "lists";
        div.innerHTML = `  
            <ul>
                <li>${content}</li>
            </ul>
            <div class="buttons">
                <button class="edit">Edit</button>
                <button class="delete">Delete</button>
            </div>
        `;
        list.appendChild(div);
    }

    updateLocalStorage();
    Input.value = '';
});

// Event delegation for edit and delete buttons
list.addEventListener('click', function (event) {
    if (event.target.classList.contains('edit')) {
        let li = event.target.closest('.lists').querySelector('li');
        Input.value = li.innerHTML;
        editElement = li; // Store the li element being edited
        Input.focus(); // Autofocus the input field
    } else if (event.target.classList.contains('delete')) {
        let div = event.target.closest('.lists');
        div.remove();
        updateLocalStorage();
    }
});

// Load tasks from local storage
function loadTasks() {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => {
        let div = document.createElement('div');
        div.classList = "lists";
        div.innerHTML = `  
            <ul>
                <li>${task}</li>
            </ul>
            <div class="buttons">
                <button class="edit">Edit</button>
                <button class="delete">Delete</button>
            </div>
        `;
        list.appendChild(div);
    });
}

// Update local storage
function updateLocalStorage() {
    let tasks = [];
    document.querySelectorAll('.lists li').forEach(li => {
        tasks.push(li.innerHTML);
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}
