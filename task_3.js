document.addEventListener("DOMContentLoaded", function () {
    // Function to fetch and display tasks
    function fetchAndDisplayTasks() {
      var xhr = new XMLHttpRequest();
      xhr.open("POST", "read_task.php", true);
      xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
      xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
          // Handle the response from the server
          var response = xhr.responseText;
  
          // Parse the JSON response
          var tasks = JSON.parse(response);
  
          // Clear the existing task list
          var tasksContainer = document.getElementById("tasks");
          tasksContainer.innerHTML = "";
  
          // Display each task
          tasks.forEach(function (task) {
            var taskElement = document.createElement("div");
            taskElement.className = "task";
  
            // Set the content of the task element
            taskElement.innerHTML = `
            <div class="content">
                <input type="text" class="text" value="${task.description}" name="currentTask" readonly>
                <input type="text" class="text" value="${task.ID}" name="currentTaskId" hidden>
            </div>
            <div class="actions">
                <button class="edit" data-task-id="${task.ID}">Edit</button>
                <button class="delete" data-task-id="${task.ID}">Delete</button>
            </div>
            `;
  
            // Append the task element to the task list
            tasksContainer.appendChild(taskElement);
          });
        }
      };
      xhr.send(); // No need to send additional data for reading tasks
    }
  
    // Fetch and display tasks on page load
    fetchAndDisplayTasks();
  
    // Function to handle the form submission for adding a new task
    document.getElementById("new-task-form").addEventListener("submit", function (event) {
      event.preventDefault(); // Prevent the form from submitting in the traditional way
  
      var newTaskInput = document.getElementById("new-task-input").value;
      var newTaskIdInput = Math.floor(Math.random() * 1000000); // Adjust the range as needed;
  
      // Make an AJAX request to add the new task
      var xhr = new XMLHttpRequest();
      xhr.open("POST", "create_task.php", true);
      xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
      xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
          // Handle the response from the server
          var response = xhr.responseText;
  
          // Update the responseT div with the server response
          document.getElementById("responseT").innerHTML = response;
  
          // If the response indicates success, fetch and display tasks
          if (response.includes("Task successfully added")) {
            fetchAndDisplayTasks();
  
            // Clear the input field after adding the task
            document.getElementById("new-task-input").value = "";
          }
        }
      };
      xhr.send("new-task-input=" + encodeURIComponent(newTaskInput) + "&new-taskId-input=" + encodeURIComponent(newTaskIdInput));
    });
  
    // Function to handle the edit and delete button click
    document.addEventListener("click", function (event) {
      var taskId = event.target.dataset.taskId;
      var currentTaskElement = event.target.closest(".task");
  
      if (!currentTaskElement) {
        return; // If no task element found, exit the function
      }
  
      var currentTaskInput = currentTaskElement.querySelector(".text");
  
      if (event.target.classList.contains("edit") || event.target.classList.contains("save")) {
        if (currentTaskInput) {
          var taskDescription = currentTaskInput.value;
  
          if (event.target.classList.contains("edit")) {
            // Change the button text and behavior to Save
            event.target.innerHTML = "Save";
            event.target.classList.remove("edit");
            event.target.classList.add("save");
  
            // Enable the input field for editing
            currentTaskInput.removeAttribute("readonly");
  
            // Remove the Delete button
            var deleteButton = currentTaskElement.querySelector(".delete");
            if (deleteButton) {
              deleteButton.parentNode.removeChild(deleteButton);
            }
          } else if (event.target.classList.contains("save")) {
            // Change the button text and behavior to Edit
            event.target.innerHTML = "Edit";
            event.target.classList.remove("save");
            event.target.classList.add("edit");
  
            // Disable the input field for editing
            currentTaskInput.setAttribute("readonly", "readonly");
  
            // Make an AJAX request to update the task
            var xhr = new XMLHttpRequest();
            xhr.open("POST", "update_task.php", true);
            xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            xhr.onreadystatechange = function () {
              if (xhr.readyState == 4 && xhr.status == 200) {
                // Handle the response from the server
                alert(xhr.responseText); // You can replace this with more user-friendly handling
              }
            };
            xhr.send("taskId=" + encodeURIComponent(taskId) + "&currentTask=" + encodeURIComponent(taskDescription));
  
            // Add the Delete button back
            var deleteButton = document.createElement("button");
            deleteButton.className = "delete";
            deleteButton.innerHTML = "Delete";
            deleteButton.dataset.taskId = taskId;
            var actionsDiv = currentTaskElement.querySelector(".actions");
            if (actionsDiv) {
              actionsDiv.appendChild(deleteButton);
            }
          }
        }
      } else if (event.target.classList.contains("delete")) {
        if (currentTaskInput) {
          var taskDescription = currentTaskInput.value;
  
          // Make an AJAX request to delete the task
          var xhr = new XMLHttpRequest();
          xhr.open("POST", "delete_task.php", true);
          xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
          xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && xhr.status == 200) {
              // Handle the response from the server
              alert(xhr.responseText); // You can replace this with more user-friendly handling
  
              // Remove the task element from the HTML DOM
              currentTaskElement.parentNode.removeChild(currentTaskElement);
            }
          };
          xhr.send("taskId=" + encodeURIComponent(taskId) + "&currentTask=" + encodeURIComponent(taskDescription));
        }
      }
    });
  });
  