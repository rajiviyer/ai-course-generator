# AI Course Generator

AI Course Generator is a web application that leverages modern web development frameworks and AI to generate personalized educational content. The app consists of three main components:

- **Frontend**: Built with Next.js, providing a dynamic and responsive user interface.
- **Backend**: Powered by FastAPI, serving as the RESTful API for handling requests and running AI models.
- **Database**: Uses PostgreSQL to store and manage data.

## Prerequisites

Make sure you have Docker installed on your system. You can verify the installation with the following command:

```bash
docker --version
```
## Setup
Before starting the application, follow these steps to ensure proper setup:
1. Clone the repository and navigate to the project directory:
```bash
git clone <repository-url>
cd ai-course-generator
```
2. Ensure you have the docker-compose.yml file correctly set up in the project root. This file is used to define and manage multi-container Docker applications.
3. Create the .env files:
You need to create .env files for both the frontend and backend components.
### Frontend .env File
Create a file named .env inside the frontend directory and add the following environment variables:
```bash
NEXT_PUBLIC_SECRET_KEY=
NEXT_PUBLIC_SERVER_URL=
NEXT_PUBLIC_GEMINI_API_KEY=
NEXT_PUBLIC_API_URL=
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_YOUTUBE_API_KEY=
```
Make sure to replace the placeholder values with the appropriate secrets and URLs.

### Backend .env File
Create a file named .env inside the backend directory and add the following environment variables:
```bash
DB_URL="postgresql://postgres:welcome1@77.237.241.186:5437/coursedb"
SECRET_KEY=
ACCESS_EXPIRY_TIME=60
REFRESH_EXPIRY_TIME=10
ALGORITHM="HS256"
```
Make sure to replace the placeholder values, especially SECRET_KEY, with your actual secret values.
4. Make the scripts executable:
Make sure the stop_docker.sh and restart_docker.sh scripts have executable permissions:
```bash
chmod +x stop_docker.sh
chmod +x restart_docker.sh
``` 

## Starting and Stopping the Application
### Start the Application
To start the application, run the restart_docker.sh script:
```bash
./restart_docker.sh
``` 
This command will start the application in detached mode, allowing it to run in the background. If you need to rebuild the Docker images before starting, run:
```bash
./restart_docker.sh build
``` 
This will rebuild the Docker images and start the containers.

### Stop the Application
To stop the application, run the stop_docker.sh script:
```bash
./stop_docker.sh
``` 
This command stops and removes the containers associated with the AI Course Generator.

## Checking Docker Status
You can verify if the Docker containers are running by using:
```bash
docker ps
``` 
This command lists all running containers. If the containers associated with AI Course Generator are listed, the application is running.

## Additional Commands
* Check logs for a specific service:
```bash
docker-compose logs <service-name>
```
Replace <service-name> with frontend, backend, or db to view logs for the respective service.
* Enter a running container:
```bash
docker exec -it <container-id> /bin/bash
```
Replace <container-id> with the ID of the running container.
* List all Docker containers (running and stopped):
```bash
docker ps -a
```
* Remove all stopped containers:
```bash
docker container prune
```

## Troubleshooting
If you encounter issues, follow these troubleshooting steps:
1. Rebuild the Docker images:
Use the build option to rebuild the images:
```bash
./restart_docker.sh build
```
2. Check Docker Compose logs:
View the logs to identify potential issues:
```bash
docker-compose logs
```
3. Verify Docker installation and permissions:
Ensure Docker is installed correctly and you have permissions to run Docker commands.
4. Restart the Docker service:
```bash
sudo systemctl restart docker
```

## License
This project is licensed under the MIT License. See the LICENSE file for more details.

```css
This `README.md` file includes all the information about the app, setup instructions, starting and stopping the Docker containers, additional useful commands, troubleshooting steps, and licensing details, all in one comprehensive markdown file.
```