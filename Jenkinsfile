pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/Shivm-ops/devops-portfolio.git'
            }
        }

        stage('Build') {
            steps {
                script {
                    if (fileExists('package.json')) {
                        sh 'npm install'
                    } else {
                        echo 'No build required for static files'
                    }
                }
            }
        }

        stage('Test') {
            steps {
                script {
                    if (fileExists('package.json')) {
                        sh 'npm test || exit 1'
                    } else {
                        echo 'No tests defined'
                    }
                }
            }
        }

        stage('Deploy') {
            steps {
                script {
                    // Ensure folder exists
                    sh 'mkdir -p /var/www/html/myapp/'
                    // Copy files
                    sh 'cp -r * /var/www/html/myapp/'
                    echo 'Deployment complete!'
                }
            }
        }
    }

    post {
        success {
            echo "✅ Build & Deploy Successful!"
        }
        failure {
            echo "❌ Build Failed! Check logs."
        }
    }
}
