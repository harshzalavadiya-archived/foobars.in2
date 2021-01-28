---
title: 📨 Setup Postfix w/ SPF verification
tags:
  - postfix
  - spf
  - email
---

send bulk emails like a pro on your own using `postfix`

## ⚙ Installation

```bash
sudo apt install postfix mailutils
```

📝 adding SPF record to your DNS

```text
xyz.com. 1799 IN TXT "v=spf1 ip4:x.x.x.x a mx ~all"
```

&nbsp;

## 🔧 Commands

✉ Sending test mail

```bash
echo "body" | mail -s "subject" -a "From: Harsh Z <sender@example.com>" receiver@example.com
```

📤 Check Mail Queue

```bash
mailq
```

🗑 Clear Mail Queue

```bash
postsuper -d ALL
```

&nbsp;

## ✅ Verifying Mail in Gmail

1. Open Email
2. More (three dots on top right)
3. Show Original
4. Look for SPF (Pass with IP x.x.x.x)

&nbsp;

## 🧰 Google Toolbox

https://toolbox.googleapps.com/apps/dig/
