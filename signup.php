<?php
// Include the configuration file to establish a database connection.
include("config.php");

// Check if the request method is POST, indicating that the form has been submitted.
if ($_SERVER["REQUEST_METHOD"] == "POST") {

    // Information sent from the signup form.
    // Escape and sanitize user input to prevent SQL injection.
    $myEmail = mysqli_real_escape_string($db, $_POST['signupUsername']);
    $myPassword = mysqli_real_escape_string($db, $_POST['signupPassword']);

    // Hash the user's password for security.
    $hashedPassword = password_hash($myPassword, PASSWORD_BCRYPT, ["cost" => 12]);

    // Check if the email already exists in the database.
    $sqlSelect = "SELECT * FROM users WHERE email = '$myEmail'";
    $result = mysqli_query($db, $sqlSelect);
    $row = mysqli_fetch_array($result, MYSQLI_ASSOC);

    $count = mysqli_num_rows($result);

    if ($count == 0) {
        // If the email is not found in the database, insert the user's information.

        $sqlInsert = "INSERT INTO users (email, password) VALUES ('$myEmail', '$hashedPassword')";

        if (mysqli_query($db, $sqlInsert)) {
            // Successful insertion message.
            echo "User successfully added.";
        } else {
            // Failed insertion message.
            echo "User not added.";
        }
    } else {
        // Email already exists in the database.
        echo "An account with that email already exists.";
    }
}
?>
