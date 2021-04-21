---
title: ☁️ Cloudflare Argo Tunnel
tags:
  - cloudflare
  - argo
  - localtunnel
---

## Install cloudflared

https://developers.cloudflare.com/cloudflare-one/connections/connect-apps/install-and-setup/installation

---

## simple tunnel

```bash
cloudflared tunnel --url localhost:8080
```

---

## configure with custom domain

```bash
cloudflared tunnel create {tunnelName}
cloudflared tunnel run --url localhost:8080 {tunnelName}
```
#### Add DNS entry record in your CF Panel

```txt
CNAME tunnelID.cfargotunnel.com
```

---

## Extras

```bash
cloudflared tunnel list
cloudflared tunnel delete {tunnelName}
```
