#!/bin/bash

echo "deleting old app"
sudo rm -rf /var/www/

echo "Creating app folder..."
sudo mkdir -p /var/www/frontamazon

echo "Moving files to app folder..."
sudo mv * /var/www/frontamazon

# Navigate to the app directory
cd /var/www/frontamazon/
sudo mv env .env

# Remove old Nginx configuration if it exists
sudo rm -f /etc/nginx/sites-available/myapp

# Install Node.js from NodeSource
echo "Configuring NodeSource repository..."
curl -fsSL https://deb.nodesource.com/setup_14.x | sudo -E bash -
echo "Installing Node.js..."
sudo apt-get install -y nodejs

# Install PM2
echo "Installing PM2..."
sudo npm install -g pm2

echo "Installing application dependencies..."
sudo npm install

# Update system packages and install Nginx
echo "Updating system packages..."
sudo apt-get update
echo "Installing Nginx..."
sudo apt-get install -y nginx

# Configure Nginx to act as a reverse proxy
if [ ! -f /etc/nginx/sites-available/myapp ]; then
    sudo rm -f /etc/nginx/sites-enabled/default
    sudo bash -c 'cat > /etc/nginx/sites-available/myapp <<EOF
server {
    listen 80;
    server_name _;
    location / {
        include proxy_params;
        proxy_pass http://unix:/var/www/frontamazon/myapp.sock;
    }
}
EOF'
    sudo ln -s /etc/nginx/sites-available/myapp /etc/nginx/sites-enabled
    sudo systemctl restart nginx
else
    echo "Nginx reverse proxy configuration already exists."
fi

# Start the Node.js app with PM2
echo "Starting Node.js app with PM2..."
sudo pm2 start app.js --name "myapp"

# Start serving the React app with PM2
echo "Starting React app with PM2..."
sudo pm2 start serve --name "react-app" -- -s build -l 3000

# Setup PM2 to restart on system boot
echo "Setting up PM2 to restart on system boot..."
sudo pm2 save
sudo pm2 startup

echo "Starting pm2..."
sudo pm2 start npm -- start

echo "started pm2 containers"
sudo pm2 ps

echo "Deployment is completed 🚀"

