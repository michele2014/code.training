# Task Manager - Server

This module manages the daily task of your work, specifically, it handles the following activities: 

1.  **C**reate a new task 
2.  **R**ead the list of task
3.  **U**pdate a task
4.  **D**elete a task

# Models
Task - fields

    0.  Id
    1.  Title
    2.  Description
    3.  StartDate
    4.  EndDate
    5.  Status
    6.  Notes
    7.  Tags
    8.  Assignee
    9.  Creator

User - fields

    0.  ID
    1.  userName
    2.  isAdmin 

# Rest API - Endpoints

- /api/login
    - post: executes login access
    - get:  check if the user is already logged in
- /api/logout
    - get:  executes logout of the user
- /api/tasks
    - post: create the new task
    - get:  retrieves a list of tasks based on a list of filters
- /api/tasks/:id
    - get:  retrieves a task using its the id
    - put:  update a task using its the id
    - delete:   delete a task using its the id

##  Global Package

Install `npm install express-generator -g`
If you want to change the default PORT you need to open the file **nodejs/task-manager/bin/www** and change the variable **port** 