**Manual deployment**

Get the code from GitHub If you haven’t done so, get the code from the repository with the below command:
git clone https://github.com/fharris/curiosityfrontendmicroservice

***1-Create the curiosityevents namespace***
You can start by running the housekeeping-k8s script first to clean everything if this is not the first time you are doing the set-up. Change to the curiositymonolith folder and run the following commands:

```
./housekeeping-k8s.sh
```

If you just want to see the app running and leave the manual steps to study later just run the following script:

```
./deploy-curiosityfrontend.sh
```

If all goes well, you may jump to step 5 to run the application and ignore the rest of the steps.

If you want to install things step by step, then, once everything is cleaned with the housekeeping script, try to create the namespace with the following command:

```
kubectl apply -f appconfig/curiosityevents-namespace.yaml
```

***2-Deploy the application***
Deploy the application with the following command:

```
kubectl apply -f ./appconfig/.
```

***5-Run the application***
If all goes well, check that you have successfully deployed the application and the database with the following command:

```
kubectl get pods -n curiositymonolith
```

You should be able to see the curiosity frontend pods running. We are running this example on a K3s Kubernetes local cluster with a Traefik ingress. 
So you should be able to access the application if you open your browser at *http://localhost:3000*


