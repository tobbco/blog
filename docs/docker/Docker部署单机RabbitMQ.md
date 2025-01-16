---
pageLayout: doc
title: Docker部署单机RobbitMQ
createTime: 2024/11/16 11:41:25
cover: 
tags:
  - 中间件
  - 消息队列
  - MQ
  - RabbitMQ
permalink: /article/8qafx2le/
---
## 准备

是否已安装`docker`
```bash
docker -v
```

如未安装需要先安装`docker`，参考官方[Get Docker | Docker Docs](https://docs.docker.com/get-started/get-docker/)
## Docker部署

### 部署容器

```bash
docker run -d -p 5672:5672 -p 15672:15672 \
--name rabbitmq-dev
-v /usr/local/docker/rabbitmq:/var/lib/rabbitmq \
-e RABBITMQ_DEFAULT_USER=admin \
-e RABBITMQ_DEFAULT_PASS=admin  \
-e RABBITMQ_DEFAULT_VHOST=custom-vhost \
rabbitmq:management
```
### 命令解释

- `-id`：以交互模式启动容器并在后台运行。
- `--name=rabbitmq-dev`：为容器指定一个名称。
- `-v /usr/local/docker/rabbitmq:/var/lib/rabbitmq`：将主机目录挂载到容器内的 `/var/lib/rabbitmq`，用于持久化数据。
- `-p 15672:15672`：映射 RabbitMQ 管理页面端口。
- `-p 5672:5672`：映射 RabbitMQ 消息接收端口。
- `-e RABBITMQ_DEFAULT_USER=admin`：设置默认用户名。
- `-e RABBITMQ_DEFAULT_PASS=admin`：设置默认密码。
- `-e RABBITMQ_DEFAULT_VHOST`：虚拟主机

### 查看启动日志
```bash
docker logs -f rabbitmq-dev
```

### 验证

浏览器访问：`http://<你的服务器地址>:15672`，到达`RabbitMQ` 管理界面，输入前面设置的默认用户名密码进行登录。


## 添加延时队列插件

当需要延时队列时，需要额外添加插件`rabbitmq_delayed_message_exchange`

#### 查看`rabbitmq`版本

```bash
docker inspect rabbitmq:management
```
> 查看Env下的RABBITMQ_VERSION内容，然后去下载对应版本的插件
### 下载插件

插件地址
[Community Plugins | RabbitMQ](https://www.rabbitmq.com/community-plugins)

```bash
wget https://github.com/rabbitmq/rabbitmq-delayed-message-exchange/releases/download/v3.13.0/rabbitmq_delayed_message_exchange-3.13.0.ez
```

### 将插件拷贝到容器内

```bash
docker cp ./rabbitmq_delayed_message_exchange-3.13.0.ez <你的容器ID>:/plugins
```

### 启用插件

进入容器
```bash
sudo docker exec -it <你的容器ID> bash
```

### 查看是否已安装插件

```bash
cd plugins
```

```bash
ls | grep delay
```

开启插件
```bash
rabbitmq-plugins enable rabbitmq_delayed_message_exchange
```

### 重启RabbitMQ

```bash
docker restart rabbitmq-dev
```

### 验证

容器启动成功之后，登录`RabbitMQ`的管理界面（`IP:15672` 访问web界面），找到ExchangesTab页。点击`Add a new exchange`，在Type里面查看是否有`x-delayed-message`选项，如果存在就代表插件安装成功。
## 插件问题

在使用 RabbitMQ 时，可能会遇到一些常见问题。以下是一些排查方法：

- 无法访问管理界面：检查 `15672 `端口是否开放，确保防火墙未阻止该端口。
- 消息堆积：检查消费者是否正常工作，确保消息被及时处理。
- 内存不足：调整 `vm_memory_high_watermark` 参数，增加内存限制。
