# Task Manager - Server

This module manage the daily task of your work, specifically, it handles the following activities: 

1.  Create a new task 
2.  Remove a task
3.  Update a task
4.  Read the list of task

# Models
Task - fields

    0.  ID
    1.  Title
    2.  Description
    3.  StartDate
    4.  EndDate
    5.  Status
    6.  Notes
    7.  Tags

User - fields

    0.  ID
    1.  userName
    2.  isAdmin 

# Rest API - Endpoints - Verbs

- /api/login
    - post
    - get    
- /api/logout
    - get
- /tasks
    - post
    - get
- /tasks/:id
    - get
    - put
    - delete

* **get**: return a list of task
* Filter tasks   
* **post**: create a new task
* **put**: update an existing one
* remove the task we viewing