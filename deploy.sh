#!/bin/bash

echo "Deleting old app..."
sudo rm -rf /var/www/

echo "Creating app folder..."
sudo mkdir -p /var/www/frontamazon

echo "Moving files to app folder..."
sudo mv * /var/www/frontamazon

# Navigate to the app directory
cd /var/www/frontamazon/
sudo mv env .env

# Remove old Nginx and Node configurations
sudo rm -f /etc/nginx/sites-available/myapp
sudo apt-get remove --purge nodejs npm libnode-dev -y
sudo apt-get autoremove -y

# Clean APT cache and fix broken dependencies
sudo apt-get clean
sudo apt-get autoclean
sudo apt-get -f install

# Install Node.js from NodeSource
echo "Configuring NodeSource repository..."
curl -fsSL https://deb.nodesource.com/setup_14.x | sudo -E bash -
echo "Installing Node.js..."
sudo apt-get install -y nodejs

# Ensure npm is installed
echo "Installing npm..."
sudo apt-get install -y npm

# Install PM2 and Serve
echo "Installing PM2 and Serve..."
sudo npm install -g pm2 serve

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

echo "Building React application..."
sudo npm run build

echo "Stopping and deleting existing serves..."
sudo pm2 stop react-app
sudo pm2 delete react-app

# Start serving the React app with PM2
echo "Starting React app with PM2..."
sudo pm2 start serve --name "react-app" -- -s /var/www/frontamazon/build -l 3000

# Setup PM2 to restart on system boot
echo "Setting up PM2 to restart on system boot..."
sudo pm2 save
sudo pm2 startup

# Display pm2 managed processes
echo "PM2 managed processes:"
sudo pm2 ps

echo "Deployment is completed 🚀"
