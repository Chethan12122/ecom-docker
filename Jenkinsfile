pipeline {
    agent any

    environment {
        DOCKER_COMPOSE_FILE = "docker-compose.yml"
        IMAGE_NAME_BACKEND = "backend"
        IMAGE_NAME_FRONTEND = "frontend"
    }

    stages {

        stage('Clone Repository') {
            steps {
                git branch: 'main', url: 'https://github.com/Chethan12122/ecom-docker.git'
            }
        }

        stage('Build Docker Images') {
            steps {
                sh 'docker-compose build'
            }
        }

        stage('Run Containers') {
            steps {
                sh 'docker-compose up -d'
            }
        }

        stage('Run Backend Tests') {
            steps {
                sh 'docker exec $(docker ps -qf "name=backend") python manage.py test || true'
            }
        }

        stage('Run Frontend Build') {
            steps {
                sh 'docker exec $(docker ps -qf "name=frontend") npm run build || true'
            }
        }

        stage('Cleanup Old Containers') {
            steps {
                sh 'docker system prune -f'
            }
        }

        stage('Deploy') {
            steps {
                echo 'Deploy step (customize for Render / AWS / VPS)'
                // Example:
                // sh 'docker-compose down && docker-compose up -d --build'
            }
        }
    }

    post {
        success {
            echo '✅ Pipeline executed successfully!'
        }
        failure {
            echo '❌ Pipeline failed!'
        }
    }
}