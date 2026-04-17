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
                bat 'docker-compose down'
                bat 'docker-compose up -d'
            }
        }

        stage('Run Backend Tests') {
            steps {
                bat 'docker exec backend python manage.py test'
            }
        }

        stage('Run Frontend Build') {
            steps {
                bat 'docker exec frontend npm run build'
            }
        }

        stage('Deploy to Render') {
            steps {
                echo 'Triggering Render Deploy...'
                withCredentials([string(credentialsId: 'RENDER_DEPLOY_URL', variable: 'DEPLOY_URL')]) {
                    bat 'curl -X POST %DEPLOY_URL%'
                }
            }
        }

        stage('Cleanup') {
            steps {
                bat 'docker system prune -f'
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