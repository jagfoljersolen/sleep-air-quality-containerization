# Sleep & Air Quality Comparative Analysis – Containerized

A web application for analyzing the correlation between air quality and sleep quality for residents of a city (Kraków) and a rural area (Szarów). The platform enables doctors to browse and analyze patient data, providing insights into how environmental factors affect sleep patterns.

## My Role

I was responsible for the containerization and orchestration of the entire application stack. This included designing and implementing Dockerfiles for both the backend (Node.js/Express) and frontend (React.js), as well as creating a compose.yaml file to manage the multi-container environment. My work ensured a seamless, reproducible, and portable development and deployment workflow.

## Project Architecture

  - Backend: Node.js/Express server (located in the server folder)

  - Frontend: React.js application

  - Database: MongoDB with Mongo Express for administration

  - Monitoring: Prometheus and Grafana for metrics and visualization

  - Orchestration: Docker Compose for container management

# How to Run the Project
## 1. Clone the repository:
    git clone https://github.com/jagfoljersolen/sleep-air-quality-containerization.git
## 2. Navigate to the project root:
    cd sleep-air-quality-containerization
## 3. Set up environment variables for the server:
  - In the server folder, you will find an .env.example file.
  - Copy .env.example to .env
      ```bash
      cp server/.env.example server/.env
  - Edit the .env file and fill in the required values for your environment.
  - Example .env structure (replace placeholders with your own values):
    ```bash
    PORT=5000
    MONGO_URI=mongodb://<username>:<password>@mongodb:27017/Projekt?authSource=admin
    JWT_SECRET=<your_jwt_secret_here>
    MONGO_INITDB_ROOT_USERNAME=<admin_username>
    MONGO_INITDB_ROOT_PASSWORD=<admin_password>

## 4. Start the application:
    docker compose up --build
This command will build and start all containers defined in compose.yaml.
You can test the app in your browser at **http://localhost:3000/**

