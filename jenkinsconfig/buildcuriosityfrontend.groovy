#!/usr/bin/env groovy

pipeline {
  environment {
    registry = "172.18.0.6:5000/curiosityfrontendms"
    imageLatest = ''
    //MYSQL_CREDENTIALS = credentials('id-mysql')
    //MYSQL_HOST = credentials('id-mysql-host')
    //mysql_network_host = '172.18.0.2'
    //mysql_port = '3306'
    //mysql_database_name = 'curiositydb'
    gogs_network_host = '172.18.0.3'
    gogs_port = '3000'
    
  }
  agent any

  stages{
      stage('Get source code') {
      steps {
        git branch: 'main', 
            url: 'http://gogs:3000/gogs-user/curiosityfrontendmicroservice.git'
      }
    }

    stage('Checkout code') {
        steps {
            checkout scm
        }
    }

      stage('List source code') {
      steps {
        sh 'ls -ltra'
      }
    }
    
     stage('Building image') {
      steps{
        script {
          imageLatest = docker.build(registry ,  " ." )
        }
      }
    }

    stage('Pushing image to local registry ') {
      steps{
        script {
          //docker.withRegistry( '', registryCredential ) {
            docker.withRegistry( '' ) {
            imageLatest.push()
          }
        }
      }
    }
  
  }
  post {
        // Clean after build
        always {
            cleanWs(cleanWhenNotBuilt: false,
                    deleteDirs: true,
                    disableDeferredWipeout: true,
                    notFailBuild: true,
                    patterns: [[pattern: '.gitignore', type: 'INCLUDE'],
                               [pattern: '.propsfile', type: 'EXCLUDE']])
        }
    }
}
