<?php
// Include the configuration file to establish a database connection.
include("session.php");
?>
<html>
<head>
<meta charset="UTF-8">
    <meta name="viewport" content= "device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="stylesheet" href="style.css">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/css/bootstrap.min.css" integrity="sha384-TX8t27EcRE3e/ihU7zmQxVncDAy5uIKz4rEkgIXeMed4M0jlfIDPvg6uqKI2xXr2" crossorigin="anonymous">
    <title>To do List</title>
</head>
<body>
<nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <a class="navbar-brand" href="task.php">To Do List</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav">
            <!-- <li class="nav-item">
              <a class="nav-link" href="task.html">Home <span class="sr-only">(current)</span></a>
            </li> -->
            <li class="nav-item active">
              <a class="nav-link" href="about.php">About</a>
            </li>
            <!-- <li class="nav-item">
                <a class="nav-link" href="signup.html">SignUp</a>
            </li> -->
            <li class="nav-item">
              <a class="nav-link" href="logout.php">Logout</a>
          </li>
          </ul>
        </div>
      </nav>
    <header>
      <h1>To Do List</h1>
      <form id="new-task-form" method="post">
        <input 
          type="text" 
          name="new-task-input" 
          id="new-task-input" 
          placeholder="What are your plans for today?" />
        <input 
        type="text" 
        name="new-taskId-input" 
        id="new-taskId-input"
        hidden />
        <input 
          type="submit"
          id="new-task-submit" 
          value="Add task" />
      </form>
      <div id="responseT"></div>
    <script src="task_3.js"></script>
    </header>
    <main>

      <section class="task-list">
        <h2>Tasks</h2>
  
        <div id="tasks">
  
          <!-- <div class="task">
            <div class="content">
              <input 
                type="text" 
                class="text" 
                value="A new task"
                name = "currentTask"
                readonly>
                <input 
                type="text" 
                class="text" 
                value="A new task"
                name = "currentTaskId"
                readonly>
            </div>
            <div class="actions">
              <button class="edit" >Edit</button>
              <button class="delete">Delete</button>
            </div>
          </div> -->
  
        </div>
      </section>
    </main>
    <!-- <script src="task.js"></script> -->
    
  
    <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js" integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.1/dist/umd/popper.min.js" integrity="sha384-9/reFTGAW83EW2RDu2S0VKaIzap3H66lZH81PoYlFhbGU+6BZp6G7niu735Sk7lN" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/js/bootstrap.min.js" integrity="sha384-w1Q4orYjBQndcko6MimVbzY0tgp4pWB4lZ7lr30WKz0vr/aWKhXdBNmNb5D92v7s" crossorigin="anonymous"></script>
</body>
</html>