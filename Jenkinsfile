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
                    } else if (fileExists('requirements.txt')) {
                        sh 'pip install -r requirements.txt'
                    }
                }
            }
        }

        stage('Test') {
            steps {
                script {
                    if (fileExists('package.json')) {
                        sh 'npm test'
                    } else if (fileExists('requirements.txt')) {
                        sh 'pytest || exit 1'
                    }
                }
            }
        }

        stage('Deploy') {
            steps {
                sh """
                    sudo rm -rf /var/www/html/myapp/*
                    sudo cp -r * /var/www/html/myapp/
                """
            }
        }
    }

    post {
        success {
            echo "✅ Build Success!"
        }
        failure {
            echo "❌ Build Failed!"
        }
    }
}
