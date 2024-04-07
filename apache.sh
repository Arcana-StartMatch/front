sudo yum install httpd -y
sudo systemctl start httpd
sudo systemctl enable httpd

#####################certbot###############
#remove
sudo yum remove certbot
#install 
sudo snap install --classic certbot
#prepare
sudo ln -s /snap/bin/certbot /usr/bin/certbot
#TODO
sudo certbot --apache or $sudo certbot certonly --apache