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
pipeline {
    agent any

    stages {

        stage('Clone Repository') {
            steps {
                git branch: 'main', url: 'https://github.com/Chethan12122/ecom-docker.git'
            }
        }

        stage('Build Docker Images') {
            steps {
                bat 'docker-compose build'
            }
        }

        stage('Run Containers') {
            steps {
                bat 'docker-compose up -d'
            }
        }

        stage('Run Backend Tests') {
            steps {
                bat 'docker exec backend python manage.py test || exit 0'
            }
        }

        stage('Run Frontend Build') {
            steps {
                bat 'docker exec frontend npm run build || exit 0'
            }
        }

        stage('Cleanup Old Containers') {
            steps {
                bat 'docker system prune -f'
            }
        }

        stage('Deploy') {
            steps {
                echo 'Deploy step'
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
    post {
        success {
            echo '✅ Pipeline executed successfully!'
        }
        failure {
            echo '❌ Pipeline failed!'
        }
    }
}