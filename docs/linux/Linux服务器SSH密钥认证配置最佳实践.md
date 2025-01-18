---
title: Linux服务器SSH密钥认证配置最佳实践
createTime: 2025/01/18 16:01:34
permalink: /article/n2jahb2j/
tags:
  - SSH
  - 服务器
---
SSH (Secure Shell) 是一种加密的网络协议，用于在网络上进行安全通信。 传统的 SSH 登录方式依赖于密码，存在安全风险，容易受到暴力破解攻击。 使用 SSH 密钥登录是一种更安全、更便捷的替代方案，本文将详细介绍如何在 Linux 服务器上配置 SSH 密钥登录。

## 一、 客户端密钥对生成
首先，在本地客户端生成一对 RSA 密钥，这包括一个私钥 (id_rsa) 和一个公钥 (id_rsa.pub)。 私钥必须保密，公钥则可以安全地分发给服务器。

使用以下命令生成密钥对
```bash
ssh-keygen -t rsa -b 4096 -C "your_email@example.com"
```
- `-t rsa`: 指定密钥类型为 RSA。
- `-b 4096`: 指定密钥长度为 4096 位，密钥长度越长，安全性越高。
- `-C "your_email@example.com"`: 添加注释，建议使用你的邮箱地址。

命令执行后，系统会提示你输入密钥文件保存路径（建议使用默认路径）和密码（建议设置一个强密码，但为了本文演示无密码登录，这里选择空密码，一路回车即可）。 这会在 `~/.ssh` 目录下生成三个文件：
- `id_rsa`: 私钥文件，绝对不能泄露。
- `id_rsa.pub`: 公钥文件，需要复制到服务器。
- `known_hosts`: 已知主机密钥文件，用于验证服务器身份。
使用以下命令查看公钥内容并复制：
```bash
cat ~/.ssh/id_rsa.pub
```
## 二、 服务端配置

接下来，将客户端生成的公钥添加到服务器的 `authorized_keys` 文件中。

### **创建 `.ssh` 目录**

如果服务器上不存在 `.ssh` 目录，则需要创建，已存在跳过此步。
```bash
mkdir /root/.ssh
```

### 创建 `authorized_keys` 文件

在 `.ssh` 目录下创建 `authorized_keys` 文件，已存在跳过此步。
```bash
touch ~/.ssh/authorized_keys
```
### 添加公钥
将客户端复制的公钥内容粘贴到 `authorized_keys` 文件中。 可以使用 `vim` 或其他文本编辑器进行编辑。 **注意：** 公钥内容应该直接粘贴，不要添加任何其他字符。

```bash
vim /root/.ssh/authorized_keys
```

### 设置权限
为了安全起见，需要设置 `.ssh` 目录和 `authorized_keys` 文件的权限
```bash
chmod 700 /root/.ssh
chmod 600 /root/.ssh/authorized_keys
```

## 三、 修改 SSH 配置文件
修改 SSH 服务器配置文件 `/etc/ssh/sshd_config`，启用基于密钥的认证并禁用密码认证：

```bash
vi /etc/ssh/sshd_config
```
找到以下几行，并进行如下修改：
- `PasswordAuthentication no`: 禁用密码认证。
- `PermitRootLogin yes`: 允许 root 用户使用密钥登录 (**谨慎使用，建议为普通用户创建密钥，并使用 `sudo` 命令执行管理员操作**)。
- `AuthorizedKeysFile .ssh/authorized_keys`: 指定公钥文件路径。
- `PubkeyAuthentication yes`: 启用公钥认证。
- `ClientAliveInterval 60`: 每 60 秒发送一个 keep-alive 消息到客户端。
- `ClientAliveCountMax 3`: 如果连续 3 次 keep-alive 消息没有收到回应，则关闭连接。

## 四、 重启 SSH 服务并测试
保存 `/etc/ssh/sshd_config` 文件后，重启 SSH 服务：
```bash
systemctl restart sshd
```
现在，你可以使用以下命令尝试无密码登录服务器
```bash
ssh root@ip
```

如果配置正确，你将可以直接登录服务器，无需输入密码。

**安全注意事项:**

- **私钥安全:** 妥善保管你的私钥文件 `id_rsa`，不要将其上传到任何公共服务器或与他人共享。
- **权限设置:** 正确设置 `.ssh` 目录和 `authorized_keys` 文件的权限至关重要，这可以防止未授权访问。
- **限制 root 登录:** 为了提高安全性，建议不要直接允许 root 用户使用密钥登录，而是创建一个普通用户，并使用 `sudo` 命令执行管理员操作。
- **定期更新密钥:** 定期生成新的密钥对，并更新服务器上的公钥，可以进一步增强安全性。

通过以上步骤，你可以安全地配置 SSH 密钥登录，提高服务器的安全性并简化登录流程。 记住，安全始终是第一位的，请谨慎操作并定期检查你的服务器安全配置。

## 五、SSH命令

### 1. 基本连接命令

```bash
ssh username@hostname
```
- `username`: 远程服务器上的用户名。
- `hostname`: 远程服务器的主机名或IP地址。

例如：`ssh john.doe@example.com` 或 `ssh user1@192.168.1.100`

### 2. 指定端口的连接命令

```bash 
ssh -p port username@hostname
```
- `-p port`: 指定 SSH 连接使用的端口号，默认端口为 22。
例如：`ssh -p 2222 user@server.example.com` (使用 2222 端口连接)

### 3. 使用密钥进行连接的命令
```bash
ssh -i /path/to/your/private_key username@hostname
```
- `-i /path/to/your/private_key`: 指定用于身份验证的私钥文件的路径。

例如：`ssh -i ~/.ssh/id_rsa user@server.example.com`

### 4. 跳板机连接命令


```bash
ssh -J jump_host_username@jump_host_address username@target_hostname
```
- `-J jump_host_username@jump_host_address`: 指定跳板机（中间服务器）的用户名和地址。
- `username@target_hostname`: 指定目标服务器的用户名和地址。

例如：`ssh -J gateway_user@gateway.example.com user@server.example.com` (通过 gateway.example.com 连接到 server.example.com)  
例如： `ssh -J gateway_user@gateway.example.com user@server.example.com` （通过 gateway.example.com 连接到 server.example.com）

### 5. 执行远程命令

```bash
ssh username@hostname "command"
```
- `"command"`: 在远程服务器上执行的命令，需要用双引号括起来，以防止本地 shell 解释特殊字符。
例如：`ssh user@server.example.com "ls -l /home"`

### 6. 将本地端口转发到远程服务器

```bash
ssh -L local_port:remote_host:remote_port username@hostname
```
- `-L local_port:remote_host:remote_port`: 将本地 `local_port` 转发到远程服务器 `remote_host` 的 `remote_port`。

例如：`ssh -L 8080:localhost:8080 user@server.example.com` (将本地 8080 端口转发到远程服务器的 8080 端口)

### 7. 将远程端口转发到本地服务器

```bash
ssh -R local_port:remote_host:remote_port username@hostname
```
- `-R local_port:remote_host:remote_port`: 将远程服务器 `remote_host` 的 `remote_port` 转发到本地 `local_port`。
例如：`ssh -R 8080:localhost:8080 user@server.example.com` (将远程服务器的 8080 端口转发到本地的 8080 端口)