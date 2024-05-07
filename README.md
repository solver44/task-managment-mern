# Task Management System

The Task Management System is a web application designed to streamline task assignment and tracking within an
organization. It is built using a modern tech stack comprising React.js for the frontend, Node.js with Express.js for
the backend, and MongoDB for the database. The system incorporates robust user authentication and role-based access
control to ensure data security and privacy.

## 🌐 Features

* __User Authentication:__
  * The system provides secure authentication for both Managers and Users.
  * Authentication is implemented using JSON Web Tokens (JWT) to ensure data integrity and confidentiality.

* __Role-based Access Control:__
  * Distinct roles (Manager and User) are defined with specific privileges.
  * Managers have the authority to assign tasks to users, while users can view assigned tasks and update their status.

* __Task Management:__
  * Managers can create tasks and assign them to individual users or teams.
  * Users have access to their assigned tasks, allowing them to track progress and mark tasks as completed.

* __Enhanced Security Measures:__
  * Rate limiters are implemented for authentication API endpoints to prevent brute-force attacks.
  * IP access control is enforced to restrict access to authorized users and devices.
  * SSL certificate generation and utilization ensure encrypted communication between the server and client, enhancing
    overall system security.

## 🖥️ Tech Stack

* __Frontend:__
  * React.js for building the user interface.
  * Utilizes CSS and Bootstrap for styling.
  * Incorporates React Bootstrap for enhanced UI components.

* __Backend:__
  * Node.js with Express.js for server-side development.
  * MongoDB serves as the data storage solution.
## 🎯 Getting Started

1. __Clone the Repository:__

       https://github.com/solver44/task-managment-mern.git
2. __Install all frontend and backend dependencies:__

       npm run install-all

4. __Configure Environment Variables:__

* Change a .env file and configure the following variables:

       PORT=3000
       dbName = data_base_name
       dbUrl = your_mongodb_connection_string
       SALT_ROUNDS = Number of rounds to use, defaults to 10 if omitted
       JWT_SECRET = your_jwt_secret_key
       JWT_EXPIRE = JWT expires session time
5. __Run the Application:__

       npm start

6. __Access the Application:__

* Open your browser and navigate to http://localhost:3000.


## Backend API

<pre>
- POST     /api/signup
- POST     /api/login

- GET      /api/tasks
- GET      /api/tasks/:taskId
- GET      /api/tasks/filter/byUser
- GET      /api/tasks/filter/byStatus
- GET      /api/tasks/data/dashboard
- POST     /api/tasks
- PUT      /api/tasks/:taskId
- PUT      /api/tasks/submit/:taskId
- DELETE   /api/tasks/:taskId

- GET      /api/users
- GET      /api/users/:userId
- POST     /api/users
- PUT      /api/users/:userId
- DELETE   /api/users/:userId
</pre>

## npm scripts

Located at the root directory:

- `npm start`: Initiates both backend and frontend servers concurrently.
- `npm run dev-server`: Initiates only the backend server.
- `npm run dev-client`: Initiates only the frontend development server.
- `npm run install-all`: Installs all dependencies and dev-dependencies required at the root, frontend, and backend.
- `npm run start-ssl`: Initiates client server with SSL certificates.
- `npm run generate-ssl`: Generates SSL certificates (requires installation
  of [mkcert](https://github.com/FiloSottile/mkcert)).

Inside frontend folder:

- `npm start`: Starts frontend in development mode
- `npm run build`: Builds the frontend for production to the build folder

Inside backend folder:

- `npm run dev`: Starts backend using nodemon.
- `npm start`: Starts backend without nodemon.

## 📌 Screenshots:

  ![admin dashboard](https://github.com/solver44/task-managment-mern/assets/74422066/6faa5e70-9188-4e19-b672-d07192de213f)
  ![tasks](https://github.com/solver44/task-managment-mern/assets/74422066/a9683fae-a4a2-4b14-a853-b5cf1b208dcb)
  ![users](https://github.com/solver44/task-managment-mern/assets/74422066/b7c35cff-3fe6-4e0b-b4f9-bd43a2a6c34c)
  ![create task](https://github.com/solver44/task-managment-mern/assets/74422066/94e13b44-2081-40e3-8027-e9eb0ca968d3)
  ![submitted tasks](https://github.com/solver44/task-managment-mern/assets/74422066/97332040-4cba-4348-bb1b-fe88b9f7fda3)
