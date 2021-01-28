---
title: 🏁 Store Git credentials permanently
tags:
  - git
---

A convenient way for saving your git credentials is enabling the git-credential-store through the following command this is helpful especially when you are using 2FA to authincate and passwords don't work.

```bash
git config credential.helper store
```

> 🚨 The credentials will be saved unencrypted on a file inside your home directory at `~/.git-credentials`, therefore it's less secure.
