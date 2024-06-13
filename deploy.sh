#!/bin/bash

set -e

# Переменные
IMAGE_NAME="***/frontamazon:latest"
CONTAINER_NAME="myapp"

echo "Pulling the latest image..."
docker pull $IMAGE_NAME

echo "Stopping the existing container..."
docker stop $CONTAINER_NAME || true

echo "Removing the existing container..."
docker rm $CONTAINER_NAME || true

# Очистка Docker для освобождения места
echo "Pruning Docker system to free up space..."
docker system prune -a -f

echo "Running the new container..."
docker run -d --name $CONTAINER_NAME -p 3000:3000 $IMAGE_NAME

echo "Deployment is completed 🚀"
