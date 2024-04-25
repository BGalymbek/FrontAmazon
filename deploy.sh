#!/bin/bash

echo "Deleting old app..."
sudo rm -rf /var/www/

echo "deleting old app"
sudo rm -rf /var/www/html/*

echo "creating app folder"
sudo mkdir -p /var/www/html/myapp

echo "cloning the latest version of the code"
# Убедитесь, что у вас есть доступ к вашему репозиторию
sudo git clone https://github.com/BGalymbek/FrontAmazon.git /var/www/html/myapp

cd /var/www/html/myapp

echo "installing node and npm"
# Установка Node.js и npm, если они еще не установлены
if ! command -v node > /dev/null; then
    curl -sL https://deb.nodesource.com/setup_16.x | sudo -E bash -
    sudo apt-get install -y nodejs

fi

echo "installing project dependencies"
sudo npm install

echo "building the project"
sudo npm run build

echo "moving build to root directory"
sudo mv build/* /var/www/html/

# Настройка Nginx для раздачи статических файлов
if ! command -v nginx > /dev/null; then
    echo "installing nginx"
    sudo apt-get update
    sudo apt-get install -y nginx
fi

sudo rm -f /etc/nginx/sites-available/default

# Конфигурация сервера Nginx
if [ ! -f /etc/nginx/sites-available/default ]; then
    sudo bash -c 'cat > /etc/nginx/sites-available/default <<EOF
server {
    listen 80;
    server_name _;

    location / {
        root /var/www/html;
        index index.html index.htm;
        try_files \$uri \$uri/ /index.html;
    }
}
EOF'

    sudo systemctl restart nginx
    sudo systemctl status nginx

else
    echo "Nginx configuration already exists."
fi

echo "Deployment is completed 🚀"

