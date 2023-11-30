// Regex for Name and Email
document.getElementById("signupForm").addEventListener("submit", function (event) {

    // Get the name and password values from the form field
    const password = document.getElementById("password").value;

    // Define a regex pattern to match a valid name and password (e.g., at least 8 characters)
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    let errorMsg = ""

    // Check if the password matches the pattern
    if (!passwordRegex.test(password)) {
        // Password doesn't match the pattern, prevent form submission
        errorMsg += "Password contain at least one uppercase letter, one digit, one special character and must be at least 8 characters."
    }
    if (errorMsg !== "") {
        alert(errorMsg)
        event.preventDefault();
    }
});

//Form Handling
// This event listener runs the provided function when the DOM content is fully loaded.
document.addEventListener("DOMContentLoaded", function () {
    // Get references to the HTML elements with specific IDs.
    const signupForm = document.getElementById("signupForm"); // Form element
    const responseDiv = document.getElementById("responseS"); // Div for displaying response message

    // Add an event listener to the form to handle its submission.
    signupForm.addEventListener("submit", function (e) {
        e.preventDefault(); // Prevent the default form submission behavior (which would refresh the page).

        // Create a FormData object to collect form data from the signupForm.
        const formData = new FormData(signupForm);

        // Create a new XMLHttpRequest object for making an asynchronous HTTP request.
        const xhr = new XMLHttpRequest();

        // Configure the request.
        xhr.open("POST", "signup.php", true); // Specify the HTTP method, URL, and enable asynchronous mode.
        xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest"); // Set a custom request header.

        // Define a callback function to handle the response when it's received.
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                // If the request is complete and successful (status 200), update the content of the responseDiv.
                responseDiv.innerHTML = xhr.responseText; // Display the response from the server.
            }
        };

        // Log messages to the browser's console for debugging purposes.
        //console.log("Sending form data."); // Log a message indicating that form data is being sent.
        //console.log(formData); // Log the FormData object to see its contents.

        // Send the form data to the server using the POST request.
        xhr.send(formData);
    });
});

