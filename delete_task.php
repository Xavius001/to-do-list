<?php
// Include the configuration file to establish a database connection.
include("session.php");

// Check if the request method is POST, indicating that the form has been submitted.
if ($_SERVER["REQUEST_METHOD"] == "POST") {

    // Information sent from the signup form.
    // Escape and sanitize user input to prevent SQL injection.
    $myEmail = $_SESSION['login_user'];
    $myTask = mysqli_real_escape_string($db, $_POST['currentTask']);
    $taskId = mysqli_real_escape_string($db, $_POST['taskId']);

    $sqlDelete = "DELETE FROM tasks WHERE email='$myEmail' and ID='$taskId'";

        if (mysqli_query($db, $sqlDelete)) {
            // Successful insertion message.
            echo "Task successfully deleted.";
        } else {
            // Failed insertion message.
            echo "Task not deleted.";
        }
}
?>
