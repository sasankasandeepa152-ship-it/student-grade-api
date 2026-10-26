pipeline {
    agent any

    environment {
        APP_NAME = 'student-grade-api'
        APP_VERSION = "${env.BUILD_NUMBER}"
        DEPLOY_ENV = "${env.BRANCH_NAME == 'main' ? 'production' : 'staging'}"
    }

    parameters {
        booleanParam(
            name: 'SKIP_TESTS',
            defaultValue: false,
            description: 'Skip test stage'
        )

        choice(
            name: 'LOG_LEVEL',
            choices: ['info', 'debug', 'warn'],
            description: 'Application log level'
        )
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
                echo "Building ${APP_NAME} v${APP_VERSION} for ${DEPLOY_ENV}"
            }
        }

        stage('Install Dependencies') {
            steps {
                bat 'npm ci'
            }
        }

        stage('Quality Checks') {
            parallel {
                stage('Lint') {
                    steps {
                        bat 'npm run lint'
                    }
                }

                stage('Unit Tests') {
                    when {
                        expression {
                            return !params.SKIP_TESTS
                        }
                    }

                    steps {
                        bat 'npm test'
                    }

                    post {
                        always {
                            junit allowEmptyResults: true,
                                  testResults: '**/junit.xml'
                        }
                    }
                }
            }
        }

        stage('Build') {
            steps {
                bat 'npm run build'
                echo "Build ${APP_VERSION} complete"
            }
        }

        stage('Archive Artifacts') {
            steps {
                archiveArtifacts(
                    artifacts: 'package.json,server.js',
                    fingerprint: true
                )
            }
        }

        stage('Deploy to Staging') {
            when {
                branch 'develop'
            }

            steps {
                echo "Deploying v${APP_VERSION} to STAGING..."
                // sh 'deploy-script.sh staging'
            }
        }

        stage('Approval Gate') {
            when {
                branch 'main'
            }

            steps {
                input(
                    message: "Deploy v${APP_VERSION} to PRODUCTION?",
                    ok: 'Approve Deployment'
                )
            }
        }

        stage('Deploy to Production') {
            when {
                branch 'main'
            }

            steps {
                echo "Deploying v${APP_VERSION} to PRODUCTION..."
                // sh 'deploy-script.sh production'
            }
        }
    }

    post {
        success {
            echo "Pipeline succeeded for ${APP_NAME} v${APP_VERSION}"
        }

        failure {
            echo "Pipeline failed for ${APP_NAME} v${APP_VERSION}"
        }

        always {
            cleanWs()
        }
    }
}