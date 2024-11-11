## Update System

```shell
# Update existing package list
sudo apt update

sudo apt list --upgradable
# Install prerequisites
sudo apt install apt-transport-https ca-certificates curl software-properties-common -y

# Add Docker's official GPG key
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg

# Add Docker repository
echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null


# Update package list to include Docker packages
sudo apt update

# Install Docker
sudo apt install docker-ce docker-ce-cli containerd.io -y

## check version
docker --version
Docker version 27.3.1, build ce12230
```

## ignite

```shell
# must sudo
sudo docker pull apacheignite/ignite:2.16.0

sudo docker run -d --name ignite-node -p 10800:10800 -p 8080:8080 apacheignite/ignite:2.16.0

sudo docker run -d --name ignite-node -p 10800:10800 -p 8080:8080 apacheignite/ignite:2.16.0 -e "IGNITE_REST_ENABLED=true"

sudo docker run -d --name ignite-node -p 10800:10800 -p 8080:8080 -e IGNITE_REST_ENABLED=true apacheignite/ignite:2.16.0


docker inspect -f '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' cfaeab41d4ab
172.17.0.2

curl 'http://172.17.0.2:8080/ignite?cmd=version'
curl 'http://localhost:8080/ignite?cmd=version'
```



```shell
pip3 install pyignite
```

```shell

```