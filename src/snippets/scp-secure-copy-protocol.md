---
title: 📃 SCP (secure copy protocol)
tags:
  - copy
  - remote
  - linux
  - scp
---

```bash
# From client to server
scp localfile.zip remoteuser@server:/home/remoteuser

# From server to client
scp remoteuser@server:/home/remoteuser/remotefile.zip /home/localuser
```

> 💡 Use `-r` Recursively copy entire directories
