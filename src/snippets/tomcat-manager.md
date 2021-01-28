---
title: ⬆️ Tomcat Manger
tags:
  - tomcat
  - manager
---

Create user inside `tomcat/bin/tomcat-users.xml`

```xml
<?xml version="1.0" encoding="UTF-8"?>
<tomcat-users xmlns="http://tomcat.apache.org/xml"
              xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
              xsi:schemaLocation="http://tomcat.apache.org/xml tomcat-users.xsd"
              version="1.0">
  <role rolename="manager-gui"/>
  <role rolename="manager-script"/>
  <user username="username" password="password" roles="manager-gui, manager-script"/>
</tomcat-users>
```

Uploading WAR file via curl request

```bash
curl --upload-file path/to/foo.war http://username:password@localhost:8080/manager/text/deploy?path=/foo&update=true
```
