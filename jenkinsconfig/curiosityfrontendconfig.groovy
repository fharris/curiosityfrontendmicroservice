#!/usr/bin/env groovy

pipeline {
  environment {
    dockerImageBuild = ''
    dockerImageLatest = ''
    kubernetes_proxy = "${env.KUBERNETES_ENDPOINT}"
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
   
    
      stage('Listing source code') {
      steps {
        sh 'ls -ltra'
      }
    }

    
      
      stage('Configuring Curiosity Frontend in Kubernetes') {
      steps {
        withKubeConfig( credentialsId: 'jenkins-token-kubernetes', serverUrl: kubernetes_proxy ) {
	          sh "kubectl apply -f appconfig/curiosity-frontend-namespace.yaml"
            sh "kubectl apply -f ./appconfig/."
            sh "kubectl -n curiosityevents rollout restart deployment/curiosity-frontend-deployment-ms"
        }
      }
    }
  

   

  
  }
  post {
        // Clean after build
        always {
            cleanWs(cleanWhenNotBuilt: true,
                    deleteDirs: true,
                    disableDeferredWipeout: false,
                    notFailBuild: false,
                    patterns: [[pattern: '.gitignore', type: 'INCLUDE'],
                               [pattern: '.propsfile', type: 'EXCLUDE']])
        }
    }
}
