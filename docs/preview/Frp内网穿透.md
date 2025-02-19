---
title: Frp内网穿透
createTime: 2025/02/16
tags:
  - FRP
  - 内网穿透
---
## 什么是 FRP？

**FRP**（Fast Reverse Proxy）是一款可以用于**内网穿透**的开源工具，  
支持 **TCP/UDP/HTTP/HTTPS 协议**，可以将 **内网服务** 暴露到 **公网**  
**实现**从任意网络环境访问到你的服务器或电脑。

**Frp官网**：[https://github.com/fatedier/frp](https://github.com/fatedier/frp)

## 安装

前往 [GitHub FRP Releases](https://github.com/fatedier/frp/releases) 下载最新版本：

**下载frp**
```bash
wget https://github.com/fatedier/frp/releases/download/v0.61.1/frp_0.61.1_linux_amd64.tar.gz
```
Linux查看系统架构的指令： **`uname -m`**
- 输出示例：
    - `x86_64`: 表示 64 位 x86 架构（也称为 AMD64）。
    - `i686` 或 `i386`: 表示 32 位 x86 架构。
    - `aarch64`: 表示 64 位 ARM 架构。
    - `mips`: 表示 MIPS 架构。

**解压文件**

```bash
tar -zxvf frp_0.61.0_linux_amd64.tar.gz -C /usr/local
```
> 解压文件到指定目录

**进入解压目录**

```bash
cd /usr/local/frp_0.61.1_linux_amd64
```

## 服务器端配置

服务器端通常称为 **frps**，即 FRP **服务端**。  通俗点来说就是**有公网IP的服务器**。

**官方参数文档**：[frps_full_example.toml](https://github.com/fatedier/frp/blob/dev/conf/frps_full_example.toml) 

### 服务器端 `frps.toml` 配置

打开`frps.toml`
```bash
nano frps.toml 
```
里面只有一行`bindPort=7000`，无需理会，将以下内容覆盖原有内容：
`
```properties
# ==============================
# FRP 服务器端（frps.ini）配置
# ==============================

# 绑定监听地址（默认 `0.0.0.0` 代表监听所有 IP）
bindAddr = "0.0.0.0"

#  服务器监听端口（客户端需要通过该端口连接 FRP 服务器）
bindPort = 7000

# HTTP 端口（用于内网 HTTP 代理穿透）
vhostHTTPPort = 80

# HTTPS 端口（用于内网 HTTPS 代理穿透）
vhostHTTPSPort = 443

# 子域名支持
# 可以通过 `subDomainHost` 解析动态子域名
# 例如：如果 `subDomainHost` 配置为 "example.com"
# 那么客户端可以使用 `test.example.com` 访问内网服务
# 如果你没有域名或不使用此功能，请删除此行！
# 如果你要用IP直连例如:168.0.0.1:8848，就把这行删掉，不要配置！
subDomainHost = "xxxx.com"  # 请替换为你的真实域名

# =============================================
# Web 控制台（Dashboard）配置
# =============================================

# 监控界面监听地址（`0.0.0.0` 代表所有 IP 可访问）
webServer.addr = "0.0.0.0"

# Web 管理面板端口（可在浏览器访问，默认 7500）
# 你可以通过 `http://你的公网IP:7500` 访问 FRP 管理面板
webServer.port = 7500

# Web 控制台管理账号（可自定义）
webServer.user = "admin"

# Web 控制台密码（请自行修改）
webServer.password = "xxxx"

# =============================================
# 身份验证（Authentication）配置
# =============================================

#  认证方式（防止未经授权的客户端连接）
# 目前 FRP 支持 `token` 和 `oidc` 方式，我们选用token
auth.method = "token"

#  Token 认证（客户端需要匹配相同 token 才能连接）
# 通俗来说就是密码，写一个你能记住的，尽量长一点
# 示例: 123-abc-123abc 
auth.token = "123-abc-123abc"   # 请自行修改，不要用我的
```
### 启动服务端frps

```bash
screen -S frps ./frps -c frps.toml
```
或者
```bash
nohup ./frps -c frps.toml &
```
>**注意**：启动指令必须在frp文件目录下执行！


## 客户端配置

客户端用于连接服务器，一般是内网服务器的代理。
你的客户端也要下载相同版本的`frp`压缩包并且解压，过程同[[#安装]]步骤一样

### 客户端 `frpc.toml` 配置

**官方参数文档**：[frpc_full_example.toml](https://github.com/fatedier/frp/blob/dev/conf/frpc_full_example.toml)

同样，将以下内容覆盖原有内容：

```properties
# 服务端地址（这里要填你有公网IP的服务器的IP或者是服务器的域名）
serverAddr = "192.xxx.x.x"
# 服务器端口（Frp 服务端监听的端口）
serverPort = 7000

# 连接协议
transport.protocol = "tcp"

# 认证方式
auth.method = "token"
# 认证所使用的 Token（要和你刚才配置的服务端token完全一样！）
auth.token = "123-abc-123abc"

# 代理配置
[[proxies]]
# 代理名称(标识该代理的名称，根据你的喜好填写）
name = "rocketcat"
# 代理类型（http、https、tcp等）
# 这里要根据你的需求来填写，如果你有域名，就用http
# 如果你没有域名，那就用IP直连，例如:165.0.0.1:8848,此时这里应该写tcp协议
# 如果你用tcp协议就必须把刚才服务端上subDomainHost = "xxxx.com"的配置删除！
# type = "tcp"   # IP+端口直连用这个
type = "http"
# 本地 IP（Frp 客户端需要将流量转发到的本地地址）
localIP = "127.0.0.1"
# 本地端口（Frp 客户端需要将流量转发到的本地端口，根据你要穿透的端口来填写）
localPort = 8848
# 访问此代理的子域名
# 如果你没有域名要用IP直连，请把这句删除掉，否则会导致无法连接！
subdomain = "rocket" # 子域名请根据你拥有的域名配置，配置后通过rocket.xxx.com格式访问

# 如果你不用域名，要用ip+端口直连，请必须加上这句！
# 并且删除 subdomain = "rocket" 
# remotePort = 8848    # 这个端口和localPort 配置的一模一样，这样才能正常访问！
```

### 启动客户端frpc

```bash
screen -S frpc ./frpc -c frpc.toml
```
或者
```bash
nohup ./frpc -c frpc.toml &
```
>**注意**：启动指令必须在frp文件目录下执行！

## 拓展：配置 systemd 守护进程

### 服务端frps.service

**创建 frps.service 文件**

```
nano etc/systemd/system/frps.service
```

内容如下：
```bash
[Unit]
# 服务名称，可自定义
Description = frp server
After = network.target syslog.target
Wants = network.target

[Service]
Type = simple
# 启动frps的命令，需修改为您的frps的安装路径,即上面第3步的路径
ExecStart = /usr/local/frp_0.61.1_linux_amd64/frps -c /usr/local/frp_0.61.1_linux_amd64/frps.toml

[Install]
WantedBy = multi-user.target

```
### 客户端frpc.service

**创建 frps.service 文件**

```
nano etc/systemd/system/frps.service
```

内容如下：
```bash
[Unit]
# 服务名称，可自定义
Description = frp server
After = network.target syslog.target
Wants = network.target

[Service]
Type = simple
# 启动frps的命令，需修改为您的frps的安装路径,即上面第3步的路径
ExecStart = /usr/local/frp_0.61.1_linux_amd64/frpc -c /usr/local/frp_0.61.1_linux_amd64/frpc.toml

[Install]
WantedBy = multi-user.target
```

### **使用 systemd 命令管理 frps 服务**

```bash
# 启动frp
sudo systemctl start frps
# 停止frp
sudo systemctl stop frps
# 重启frp
sudo systemctl restart frps
# 查看frp状态
sudo systemctl status frps
```
## **常见问题 & 注意事项**

- 端口占用问题
	如果启用了`nginx`或其他占用了`80`、`443`端口的应用，则需要将`vhostHTTPPort`、`vhostHTTPSPort`修改为其他端口。
- 无法访问问题
	是否开放了端口，以阿里云为例，需要登录云服务器控制台，配置响应的安全组规则。