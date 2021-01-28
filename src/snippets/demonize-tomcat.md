---
title: 😈 Demonize Tomcat
tags:
  - tomcat
  - service
  - linux
---

Running tomcat as root can be dangerous so we will create tomcat user who will run demonized tomcat

```bash
sudo useradd -r -m -U -d /nonexistent -s /bin/false tomcat
```

downloading tomcat

```bash
cd /home/harsh/tomcats # If you are using it elsewhere make changes in service file accordingly

wget http://apachemirror.wuchna.com/tomcat/tomcat-8/v8.5.45/bin/apache-tomcat-8.5.45.zip
unzip apache-tomcat-8.5.45.zip
mv apache-tomcat-8.5.45 tomcat-01
```

Configuring tomcat

```bash
# Allow tomcat to access directory
sudo chown -RH tomcat: ./tomcat-01

# Make it executable
cd tomcat-01/bin
chmod +x *.sh
```

create service file at `/etc/systemd/system/tomcat-01.service`

```text
[Unit]
Description=Tomcat 01
After=syslog.target network.target

[Service]
Type=forking

User=tomcat
Group=tomcat

Environment=JAVA_HOME=/usr/lib/jvm/jre # Can be removed if your JAVA_HOME is set for all users
Environment='CATALINA_OPTS=-Xms512M -Xmx1024M -server -XX:+UseParallelGC'
Environment='JAVA_OPTS=-Djava.awt.headless=true -Djava.security.egd=file:/dev/./urandom'

ExecStart=/home/harsh/tomcats/tomcat-01/bin/startup.sh
ExecStop=/bin/kill -15 $MAINPID

[Install]
WantedBy=multi-user.target
```

so now service is created but to access it you need to reload systemctl

```bash
sudo systemctl daemon-reload
```

```bash
# Start Tomcat Service
sudo systemctl start tomcat-01
# Status of Tomcat Service
sudo systemctl status tomcat-01
```
