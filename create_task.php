<?php
// Include the configuration file to establish a database connection.
include("session.php");

// Check if the request method is POST, indicating that the form has been submitted.
if ($_SERVER["REQUEST_METHOD"] == "POST") {

    // Information sent from the signup form.
    // Escape and sanitize user input to prevent SQL injection.
    $myEmail = $_SESSION['login_user'];
    $myTask = mysqli_real_escape_string($db, $_POST['new-task-input']);
    $taskId = mysqli_real_escape_string($db, $_POST['new-taskId-input']);

    $sqlInsert = "INSERT INTO tasks (email, ID, description) VALUES ('$myEmail','$taskId','$myTask')";

        if (mysqli_query($db, $sqlInsert)) {
            // Successful insertion message.
            echo "Task successfully added.";
        } else {
            // Failed insertion message.
            echo "Task not added.";
        }
}
?>
