// Event listener for the 'load' event, ensuring the entire page has loaded before executing the code.
window.addEventListener('load', () => {
    // Selecting the form, input, and task list elements from the DOM using their IDs.
    const form = document.querySelector("#new-task-form");
    const input = document.querySelector("#new-task-input");
    const list_el = document.querySelector("#tasks");

    // Adding an event listener to the form for the 'submit' event.
    form.addEventListener('submit', (e) => {
        e.preventDefault(); // Prevents the default form submission behavior (which would reload the page).

        // Extracting the task from the input field.
        const task = input.value;

        // Creating the DOM elements for the task and its components.
        const task_el = document.createElement('div');
        task_el.classList.add('task');

        const task_content_el = document.createElement('div');
        task_content_el.classList.add('content');

        task_el.appendChild(task_content_el);

        const task_input_el = document.createElement('input');
        task_input_el.classList.add('text');
        task_input_el.type = 'text';
        task_input_el.value = task;
        task_input_el.setAttribute('readonly', 'readonly');

        task_content_el.appendChild(task_input_el);

        const task_actions_el = document.createElement('div');
        task_actions_el.classList.add('actions');
        
        const task_edit_el = document.createElement('button');
        task_edit_el.classList.add('edit');
        task_edit_el.innerText = 'Edit';

        const task_delete_el = document.createElement('button');
        task_delete_el.classList.add('delete');
        task_delete_el.innerText = 'Delete';

        task_actions_el.appendChild(task_edit_el);
        task_actions_el.appendChild(task_delete_el);

        task_el.appendChild(task_actions_el);

        // Appending the task element to the task list.
        list_el.appendChild(task_el);

        input.value = ''; // Clearing the input field.

        // Adding event listener for the 'click' event on the 'Edit' button.
        task_edit_el.addEventListener('click', (e) => {
            if (task_edit_el.innerText.toLowerCase() == "edit") {
                task_edit_el.innerText = "Save";
                task_input_el.removeAttribute("readonly");
                task_input_el.focus();
            } else {
                task_edit_el.innerText = "Edit";
                task_input_el.setAttribute("readonly", "readonly");
            }
        });

        // Adding event listener for the 'click' event on the 'Delete' button.
        task_delete_el.addEventListener('click', (e) => {
            list_el.removeChild(task_el); // Removing the task element from the task list.
        });
    });
});
