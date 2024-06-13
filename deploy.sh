#!/bin/bash

set -e

# Переменные
REPO_URL="https://github.com/BGalymbek/FrontAmazon.git"
APP_DIR="/var/www/html/myapp"
NGINX_CONFIG="/etc/nginx/sites-available/default"

echo "Deleting old app..."
sudo rm -rf /var/www/html/*

echo "Creating app folder..."
sudo mkdir -p $APP_DIR
sudo chown -R $EC2_USERNAME:$EC2_USERNAME $APP_DIR

echo "Cloning the latest version of the code..."
sudo git clone $REPO_URL $APP_DIR

cd $APP_DIR

echo "Installing Node.js and npm..."
if ! command -v node > /dev/null; then
    curl -sL https://deb.nodesource.com/setup_16.x | sudo -E bash -
    sudo apt-get install -y nodejs
fi

echo "Installing project dependencies..."
sudo rm -rf node_modules
sudo rm -f package-lock.json
sudo npm install
sudo npm install pm2@latest -g
sudo npm install react-scripts@latest

echo "Building the project..."
sudo npm run build

echo "Serving the build with PM2..."
sudo pm2 serve build/ 80 --spa

echo "Moving build to root directory..."
sudo mv build/* /var/www/html/

echo "Configuring Nginx..."
if ! command -v nginx > /dev/null; then
    echo "Installing Nginx..."
    sudo apt-get update
    sudo apt-get install -y nginx
fi

echo "Removing old Nginx configuration..."
sudo rm -f $NGINX_CONFIG

echo "Creating new Nginx configuration..."
sudo bash -c "cat > $NGINX_CONFIG <<EOF
server {
    listen 80;
    server_name _;

    location / {
        root /var/www/html;
        index index.html index.htm;
        try_files \$uri \$uri/ /index.html;
    }
}
EOF"

echo "Restarting Nginx..."
sudo systemctl restart nginx

# Очистка Docker, чтобы освободить место
echo "Pruning Docker system to free up space..."
sudo docker system prune -a -f

echo "Saving PM2 process list and enabling startup..."
cd $APP_DIR
sudo pm2 save
sudo pm2 startup

echo "Deployment is completed 🚀"
