<?php
// Include the configuration file to establish a database connection.
include("session.php");

// Check if the request method is POST, indicating that the form has been submitted.
if ($_SERVER["REQUEST_METHOD"] == "POST") {

    // Information sent from the form.
    // Escape and sanitize user input to prevent SQL injection.
    $myEmail = $_SESSION['login_user'];
    $myTask = mysqli_real_escape_string($db, $_POST['currentTask']);
    $taskId = mysqli_real_escape_string($db, $_POST['taskId']);

    $sqlUpdate = "UPDATE tasks SET description='$myTask' WHERE email='$myEmail' AND ID='$taskId'";
    $result = mysqli_query($db, $sqlUpdate);
    if ($result) {
        // Successful update message.
        echo "Task updated successfully";
    } else {
        // Failed update message.
        echo "Error updating task: " . mysqli_error($db);
    }
}
?>
