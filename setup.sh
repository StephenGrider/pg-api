curl -sL https://deb.nodesource.com/setup_14.x | sudo -E bash -
sudo apt-get install -y nodejs

npm install -g forever
npm install

curl -OL "https://github.com/caddyserver/caddy/releases/latest/download/caddy_2.1.1_linux_amd64.tar.gz"
tar -zxvf caddy_2.1.1_linux_amd64.tar.gz
chmod +x caddy
mv caddy /usr/bin/caddy
