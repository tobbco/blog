---
title: Supervisor：进程管理利器
createTime: 2024/09/16 15:14:33
permalink: /article/9h8m9f26/
tags:
  - supervisor
  - 进程管理
---
Supervisor 是一个功能强大的进程控制系统，用于管理和监控多个进程。它能够在进程崩溃时自动重启，提供日志记录和状态监控等功能，是部署和管理服务器端应用程序的理想工具。本文将介绍 Supervisor 的安装和使用方法。
## Supervisor 的优势

- **自动重启:** 当进程崩溃时，Supervisor 会自动重启它，确保服务的持续可用性。
- **进程监控:** Supervisor 持续监控进程的状态，并提供日志记录功能，方便排查问题。
- **多进程管理:** Supervisor 可以同时管理多个进程，简化了服务器的管理工作。
- **灵活配置:** Supervisor 提供了丰富的配置选项，可以根据不同的需求进行定制
## 安装supervisor

```bash
sudo apt update
sudo apt install supervisor
```

安装后默认已经启动，可以通过`sudo ps -ef | grep supervisor`查看:
```bash
root     2676320       1  0 09:59 ?        00:00:00 /usr/bin/python3 /usr/bin/supervisord -n -c /etc/supervisor/supervisord.conf
```
## 常用命令

### Supervisor相关

#### 开机自启

```bash
sudo systemctl enable supervisord
```
#### 启动supervisord

```bash
sudo systemctl start supervisord
```
#### 重启supervisor

更新所有服务的配置文件，并重启所有服务

```bash
sudo supervisorctl reload
```
#### 查看supervisord状态

```bash
sudo  systemctl status supervisord
```

### 进程相关
#### 关闭进程

注意：不会重新读取配置文件

```bash
sudo  supervisorctl stop [进程名称]
```

#### 关闭所有进程

```bash
sudo supervisorctl stop all
```
#### 开启进程

```bash
sudo supervisorctl start [进程名称]
```
#### 开启所有进程

```bash
sudo supervisorctl start all
```

#### 重启进程

```bash
sudo supervisorctl restart [进程名称]
```
#### 重启所有进程

```bash
sudo supervisorctl restart all
```
#### 更新配置并重启

重启配置文件有更新的进程，相当于 reread + restart，服务会使用新配置

```bash
sudo supervisorctl update
```
#### 更新配置文件

只会更新配置文件，不会重启进程。

```bash
sudo supervisorctl reread
```
#### 查看进程状态

```bash
sudo supervisorctl status [进程名称]
```
##  Supervisor 配置

Supervisor 的主要配置文件是 `/etc/supervisor/supervisord.conf`。 您可以通过编辑此文件来配置要管理的进程。 通常，每个进程都应该在单独的配置文件中定义，这些文件通常放在 `/etc/supervisor/conf.d/` 目录下。
#### 配置描述

每个配置文件的格式如下：

```java
[program:myprogram]
command=/path/to/myprogram
autostart=true
autorestart=true
user=myuser
redirect_stderr=true
stdout_logfile=/path/to/myprogram.log
stderr_logfile=/path/to/myprogram.err.log
```
- `command`: 要运行的命令。
- `autostart`: 设置为 `true` 表示 Supervisor 启动时自动启动此进程。
- `autorestart`: 设置为 `true` 表示进程崩溃时自动重启。
- `user`: 运行进程的用户。 这有助于提高安全性。
- `redirect_stderr`: 将标准错误输出重定向到标准输出。
- `stdout_logfile`: 标准输出日志文件路径。
- `stderr_logfile`: 标准错误日志文件路径。
### 配置示例

在目录`/etc/supervisor/conf.d` 下新建进程配置文件，例如：app.conf

`sudo vim /etc/supervisor/conf.d/app.conf`

```ini
[program:app]
command=java -jar app.jar  ; 启动命令
numprocs=1
directory=/opt/app/server  ; 项目目录
user=app                   ; 运行应用的用户
autostart=true             ; Supervisor 启动时自动启动应用
autorestart=true           ; 如果应用崩溃，自动重启
startretries=3
exitcodes=0,2
stopsignal=KILL
stopwaitsecs=10
stdout_logfile=/opt/app/server/logs/app.out.log ; 输出日志路径
stderr_logfile=/opt/app/server/logs/app.err.log ; 错误日志路径
```
### 加载配置并启动

```bash             
sudo supervisorctl reread 
sudo supervisorctl update
```
# 总结
Supervisor 是一个强大的进程管理工具，可以显著提高服务器端应用程序的可靠性和可维护性。 通过合理的配置和使用，可以有效地管理和监控服务器上的进程，确保服务的稳定运行。 请务必参考 Supervisor 官方文档了解更多高级功能和配置选项。