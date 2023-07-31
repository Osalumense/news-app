# news-app

The News Aggregator app gets news from multiple sources and displays them on a react frontend.
It was designed using Laravel for the backend and React + Tailwind for the frontend
It was also dockerized 

## Structure of the application

The app is split into two:
- The frontend
- The backend

Each of them are dockerized separately

### Starting the frontend

All configurations have been made in the Docker and dcker-cmpose.yml files
 To start the React app in a container:
- cd into the frontend directory and run the command: `docker-compose up` to start the react app in a docker container
- cd into the backend directory and run the command: `docker-compose up` to start the laravel app in a docker container





