<?php
// Include the configuration file to establish a database connection.
include("session.php");

// Check if the request method is POST, indicating that the form has been submitted.
if ($_SERVER["REQUEST_METHOD"] == "POST") {

    // Information sent from the signup form.
    // Escape and sanitize user input to prevent SQL injection.
    $myEmail = $_SESSION['login_user'];

    $sqlRead = "SELECT * FROM tasks WHERE email='$myEmail'";
    $result = mysqli_query($db, $sqlRead);

    if ($result) {
        $tasks = array();
        while ($row = mysqli_fetch_assoc($result)) {
            $tasks[] = $row;
        }
        // print_r($tasks);
        header('Content-Type: application/json');
        echo json_encode($tasks);
    } else {
        // Failed insertion message.
        echo "You have no tasks available";
    }
}
?>
