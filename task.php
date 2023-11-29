<?php
// Include the configuration file to establish a database connection.
include("session.php");
include("task.html");

// Check if the request method is POST, indicating that the form has been submitted.
if ($_SERVER["REQUEST_METHOD"] == "POST") {

    // Information sent from the signup form.
    // Escape and sanitize user input to prevent SQL injection.
    $myTask = mysqli_real_escape_string($db, $_POST['new-task-input']);

    $sqlInsert = "INSERT INTO tasks (description) VALUES ('$myTask')";

        if (mysqli_query($db, $sqlInsert)) {
            // Successful insertion message.
            echo "Task successfully added.";
        } else {
            // Failed insertion message.
            echo "Task not added.";
        }
}
?>
