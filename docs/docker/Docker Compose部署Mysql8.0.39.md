---
title: Docker Compose部署Mysql8.0.39
createTime: 2024/11/16 15:14:20
permalink: /article/f3c33ly1/
tags:
  - Mysql
  - Docker
---

## 镜像文档地址

[mysql - Official Image | Docker Hub](https://hub.docker.com/_/mysql)

## Dockerfile

```shell
FROM mysql:8.0.39
ENV TZ=Asia/Shanghai
RUN ln -sf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone
```
## docker-componse.yml

```shell
services:
  db:
    build:
      context: ./
    image: mysql:8.0.39
    container_name: mysql
    restart: always
    environment:
      - MYSQL_ROOT_PASSWORD=DlhNjSJT1NO_JwI_ikFc2iKxtpvX
      - MYSQL_ROOT_HOST=%
      - TZ=Asia/Shanghai
    ports:
      - 3306:3306
    command:
      - --lower_case_table_names=1
      - --character_set_server=utf8mb4
      - --collation_server=utf8mb4_general_ci
      - --explicit_defaults_for_timestamp=true
      - --max_allowed_packet=128M
      - --default_authentication_plugin=caching_sha2_password
    volumes:
      - /usr/docker/mysql/docker/conf.d:/etc/mysql/conf.d
      - /usr/docker/mysql/docker/volumn:/var/lib/mysql
      - /usr/docker/mysql/docker/volumn_logs:/var/log/mysql
```
> 目录需要提前创建好
## 启动

```shell
docker-compose up -d
```

## 日志

使用以下命令查看容器日志
```shell
docker logs <container_id>
```
## 问题

`/var/lib/mysql/mysql.sock -> /var/run/mysqld/mysqld.sock`

解决方案
```shell
docker system prune -a
```
> 清除服务器docker中未使用的镜像缓存，可能有用。