---
title: 🔪 Kill Port
tags:
  - copy
  - remote
  - linux
  - scp
---

```text
kill -9 $(lsof -t -i:8080 -sTCP:LISTEN)
```
