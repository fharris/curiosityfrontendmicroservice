**Manual deployment**

If you are inside the curiosity microservice folder, change the directory or open a new terminal in a new location. Then, get the code from the repository with the below command in a new terminal:

```
git clone https://github.com/fharris/curiosityfrontendmicroservice
```

Move inside the curiosityfrontendmicroservice folder. 

***1-Create the curiosityevents namespace***


If you just want to see the app running and leave the manual steps to study later just run the following script:

```
./deploy-curiosityfrontend.sh
```

If all goes well, you may jump to step 3 to run the application and ignore the rest of the steps.

If you want to install things step by step, then, once everything is cleaned with the housekeeping script, try to create the namespace with the following command:

```
kubectl apply -f appconfig/curiosityevents-namespace.yaml
```

***2-Deploy the application***
Deploy the application with the following command:

```
kubectl apply -f ./appconfig/.
```

***3-Run the application***
If all goes well, check that you have successfully deployed the application and the database with the following command:

```
kubectl get pods -n curiosityevents
```

![image](https://github.com/fharris/curiosityfrontendmicroservice/assets/17484224/c2654116-cc71-47f2-8f62-7dd80e61b7a3)


Now, besides the pods resulting from the curiosity microservice installation, you should be able to see the curiosity frontend pods running as well. We are running this example on a K3s Kubernetes local cluster with a Traefik ingress. 
So you should be able to access the application if you open your browser at *http://localhost:3000*


![image](https://github.com/fharris/curiosityfrontendmicroservice/assets/17484224/14dee900-71b3-4d14-967a-6fe5ca7366ed)


You can use the application's core functionalities which are querying Wikipedia and keeping a record of the queries. But if you notice os the right side of the screen, the League table is not yet working, and that's because the Championship microservice wasn't installed yet.

![image](https://github.com/fharris/curiosityfrontendmicroservice/assets/17484224/23ae2750-64ec-46bd-870c-542a97111dce)

***4-Install the Championship Microservice***

[Championship Microservice Installation Page](https://github.com/fharris/curiositychampionship/blob/main/manual-deployment.md)
