---
title: ☕ Switching Java versions on Linux
tags:
  - java
---

Linux has built in system for managing multiple version of same application and same thing can be used to switch between multiple versions for java

```bash
sudo update-alternatives --config java
sudo update-alternatives --config javac
```

If you run above command you will get something like this dialog where you can choose java versions

```text
  Selection    Path                                             Priority   Status
------------------------------------------------------------
* 0            /usr/lib/jvm/jdk1.8.0/bin/java                   20000      auto mode
  1            /usr/lib/jvm/java-11-openjdk-amd64/bin/java      1101       manual mode

Press <enter> to keep the current choice[*], or type selection number:
```

Just select your choice and you are good to go

If you can't find your java directory listed below or if you want to install your on zipped Java version use below command to add

```bash
sudo update-alternatives --install "/usr/bin/java" "java" "/home/harsh/jdk_1.8/bin/java" 1
```
