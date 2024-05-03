

echo "############################"
echo "############################"
echo "############################"
echo "############################"
echo "Deploying Curiosity Frontend Microservice"
echo "############################"
kubectl apply -f appconfig/curiosity-frontend-namespace.yaml;
echo "############################"
echo "############################"
echo "############################"
kubectl apply -f ./appconfig/. ;
echo "updating for a public accessible image of the application"
kubectl -n curiosityevents set image deployment/curiosity-frontend-deployment-ms curiosityfrontend=fharris/curiosityfrontendms:latest
echo ".... waiting for the application to get deployed..."
sleep 20;
kubectl get pods -n curiosityevents;
echo "############################"
echo "Done... Have fun!"
echo "############################"

