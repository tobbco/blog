---
title: Linux目录权限
createTime: 2023/01/16 15:14:45
permalink: /article/a241mt55/
tags:
  - linux
---

## 给用户组分配目录权限

要让 `test` 组下的成员对目录 `/usr/java` 具有读、写、可执行权限，可以通过以下步骤实现：
### 1. **更改目录的组归属**

首先，将目录 `/usr/java` 的组更改为 `test`，这样 `test` 组的成员可以对该目录进行操作。

使用 `chown` 命令：
```bash
sudo chown :test /usr/java
```

这将把 `/usr/java` 目录的组归属更改为 `test`，但不会更改目录的所有者。

### 2. **设置目录权限**

使用 `chmod` 命令，为 `test` 组分配读、写、执行权限。目录的执行权限允许进入目录，而写权限允许在目录内创建文件。

```bash
sudo chmod 770 /usr/java
```

解释：

- `7` 对应所有者权限（读、写、执行）。
- `7` 对应组权限（读、写、执行）。
- `0` 对应其他用户权限（无权限）。

这样一来，目录的所有者和 `test` 组的成员将拥有完全的权限（读、写、执行），而其他用户将没有任何权限。

### 3. **递归应用权限（如果有子目录和文件）**

如果 `/usr/java` 目录下已经存在子目录和文件，并且希望 `test` 组的成员对它们也具有相同的权限，可以递归地设置权限。


```bash
sudo chmod -R 770 /usr/java 
sudo chown -R :test /usr/java
```

这将递归地更改目录及其所有子文件和子目录的组归属为 `test`，并设置读、写、执行权限。

### 4. **确保新创建的文件也继承组权限**

为了确保 `test` 组的成员在 `/usr/java` 目录内新创建的文件自动继承组权限，您可以设置目录的 SGID (Set Group ID) 位。

```bash
sudo chmod g+s /usr/java
```

这样，任何在该目录中创建的文件或目录都将自动继承 `test` 组，而不必手动更改其组归属。

### 总结

- **更改组归属**：`sudo chown :test /usr/java`
- **设置权限**：`sudo chmod 770 /usr/java`
- **递归应用权限**（如果有子目录和文件）：`sudo chmod -R 770 /usr/java` 和 `sudo chown -R :test /usr/java`
- **设置 SGID**（使新创建的文件和目录继承组）：`sudo chmod g+s /usr/java`

这样，`test` 组下的所有成员将对 `/usr/java` 目录及其内容具有读、写和执行权限。