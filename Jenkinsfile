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
                    // Clear old files
                    sh 'rm -rf /var/www/html/myapp/*'
                    // Copy new files
                    sh 'cp -r * /var/www/html/myapp/'
                    echo 'Deployment complete!'
                }
            }
        }
    }

    post {
        success {
            echo "✅ Build & Deploy Successful!"
            mail to: 'shivmaptil2309@gmail.com',
                 subject: "✅ SUCCESS: ${env.JOB_NAME} #${env.BUILD_NUMBER}",
                 body: """Good news!  
The pipeline succeeded for ${env.JOB_NAME} #${env.BUILD_NUMBER}.  
Check details: ${env.BUILD_URL}"""
        }
        failure {
            echo "❌ Build Failed! Check logs."
            mail to: 'shivmaptil2309@gmail.com',
                 subject: "❌ FAILED: ${env.JOB_NAME} #${env.BUILD_NUMBER}",
                 body: """Uh oh!  
The pipeline failed for ${env.JOB_NAME} #${env.BUILD_NUMBER}.  
Check logs: ${env.BUILD_URL}"""
        }
    }
}
