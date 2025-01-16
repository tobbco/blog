---
title: Windows 查看端口占用及占用的程序
createTime: 2023/02/16 15:14:36
permalink: /article/enkrejjz/
tags:
  - windows
  - 端口
---
## 查看端口占用

```bash
netstat -ao
```
> 查看所有占用的端口

## 查看指定端口是否被占用

```bash
netstat -ao |findstr 7979
```
输出：
```bash
 协议    本地地址                外部地址                状态             PID
 TCP    0.0.0.0:7979           DESKTOP-5Q2TTKE:0      LISTENING       18392
```

如果端口被占用，可以查看占用端口的进程ID，例如 `18392`

## 查看进程

```bash
tasklist | findstr 18392
```
输出
```bash

映像名称                       PID 会话名              会话#       内存使用
========================= ======== ================ =========== ============
java.exe                     18392 Console                    1  1,813,304 K
```
