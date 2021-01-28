---
title: 📁 Shared Folder Permissions by Group
tags:
  - shared
  - folder
  - linux
---

Share some folder with multiple users and allow all of them to read and write without sudo everytime

```bash
# Create group
sudo groupadd data-dir-write

# Add users to group
sudo usermod -a -G data-dir-write user1
sudo usermod -a -G data-dir-write user2

# Assign group to that directory
sudo chgrp -R data-dir-write /shared-dir

# add write permission to group
sudo chmod -R g+w /shared-dir

# To Preserve group permissions afterwards
sudo chmod g+s /shared-dir

# To preserve group permission on subfolders recursively
sudo find ./shared-dir -type d -exec chmod g+s {} \;

# Don't forget to logout and login again for final test
```

> 💡 Still getting permission denied?
> verify it by running `ls -lth` and then ensure that directory has `drwxrwsr-x`

| Flag | Description |
| :--- | :---------- |
| -R   | Recursive   |
| +r   | Read        |
| +w   | Write       |
| +x   | Execution   |
