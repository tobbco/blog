---
title命名: Nginx：高性能Web服务器详解
createTime: 2023/04/16 15:40:48
permalink: /article/g75aawe2/
tags:
  - linux
  - nginx
title: Nginx：高性能Web服务器详解
---
Nginx (engine x) 是一款轻量级、高性能的 HTTP 和反向代理服务器，也能够作为邮件代理服务器和 IMAP/POP3 代理服务器。其特点在于占用资源少、并发能力强，使其成为许多大型网站的首选服务器。本文将详细介绍 Nginx 的安装、配置以及一些关键指令的使用。
## 一、Nginx 的安装

Nginx 的安装方式主要有两种：使用包管理器安装和编译安装。

### 1. 使用包管理器安装 (推荐)

这是最简单快捷的安装方式，适用于大多数 Linux 发行版。
- **Debian/Ubuntu:**
```bash
sudo apt update
sudo apt install nginx
```
- **CentOS/RHEL/Fedora:**
```bash
sudo yum install nginx  # CentOS/RHEL 7
sudo dnf install nginx  # CentOS/RHEL 8, Fedora
```
### 2. 编译安装

编译安装需要一定的 Linux 知识，可以更灵活地定制 Nginx 的功能，但过程相对复杂。

#### 安装依赖

需要安装一些必要的编译工具和库，例如 `gcc`, `g++`, `make`, `autoconf`, `libpcre3-dev`, `zlib1g-dev`, `openssl` 等。 具体依赖项可能因系统和 Nginx 版本而异。 例如，在 Debian/Ubuntu 系统上，可以使用以下命令安装依赖：
```bash
sudo apt update sudo apt install build-essential libpcre3-dev zlib1g-dev libssl-dev
```
#### 下载源码

从 Nginx 官方网站下载源码包 (例如，`nginx-1.23.3.tar.gz`)。
#### **配置**

```bash
./configure --prefix=/usr/local/nginx --with-http_ssl_module
```
#### 编译及安装

```bash
sudo make 
sudo make install
```

## 二、Nginx 配置文件

Nginx 的主要配置文件通常位于 `/etc/nginx/nginx.conf`。 这个文件包含了全局设置以及各个虚拟主机的配置。 虚拟主机配置通常位于 `/etc/nginx/sites-available/` 目录下，启用虚拟主机需要创建符号链接到 `/etc/nginx/sites-enabled/` 目录。

### `root` 和 `alias` 指令

- **相同点:** 两者都可以指定资源文件所在磁盘位置。
- **不同点:** `root` 指令可以在 `server`、`http`、`location`、`if` 等上下文中使用；`alias` 指令只能在 `location` 上下文中使用。 `root` 指令在 `location` 中使用时，会将 `location` 的路径拼接在 `root` 指定的路径之后；`alias` 指令则不会拼接路径，而是直接使用 `alias` 指定的路径。 使用 `alias` 时，结尾通常需要添加反斜杠 `/`。
#### 示例
```nginx
location /test {
    root /opt/nginx/html;
}
```
> 访问 `www.test.com/test/smile.jpg` 时，实际查找路径为 `/opt/nginx/html/test/smile.jpg`

```nginx
location /test {
    alias /opt/nginx/html/;
}
```
> 访问 `www.test.com/test/smile.jpg` 时，实际查找路径为 `/opt/nginx/html/smile.jpg`。

### `proxy_pass` 指令

用于反向代理，将请求转发到后端服务器。 `proxy_pass` 后面是否带 `/` 会影响路径的处理方式：

- **不带 `/`:** 会将 `location` 的路径拼接在 `proxy_pass` 指定的服务器地址后面。
    
- **带 `/`:** 会将 `location` 路径删除。

#### 示例
```nginx
location /abc {
    proxy_pass http://127.0.0.1:8080;
}
```
> 访问 `https://test.baidu.com/abc/index.html`，代理后请求 `http://127.0.0.1:8080/abc/index.html`。

```nginx
location /abc {
    proxy_pass http://127.0.0.1:8080/;
}
```
> 访问 `https://test.baidu.com/abc/index.html`，代理后请求 `http://127.0.0.1:8080/index.html`。

### 其他常用指令
- `proxy_request_buffering`: 请求缓存到 Nginx 内存，大于内存时存到磁盘，会增加磁盘 IO，默认值 `off`。
- `client_max_body_size`: 请求体大小，当有上传请求时需要调整，默认值 `1M`。
- `client_body_buffer_size`: 缓冲区大小，默认 `8k` 或 `16k`。
- `client_body_temp_path`: 缓冲区磁盘路径。
这些指令可以在 `http`、`server`、`location` 等上下文中使用。
## 三、常用命令

- `systemctl status nginx` 命令查看 Nginx 的状态
- `systemctl start nginx` 启动 Nginx
- `systemctl stop nginx` 停止 Nginx
- `systemctl restart nginx` 重启 Nginx
- `systemctl nginx -t` 检查配置

## 四、Nignx配置模版

```nginx
#user nobody nobody;  # 通常不需要修改，除非有特殊安全需求

worker_processes auto; # 自动根据CPU核心数设置worker进程数

error_log /var/log/nginx/error.log; # 错误日志路径
#error_log /var/log/nginx/error.log notice; # 设置日志级别为notice
#error_log /var/log/nginx/error.log info; # 设置日志级别为info

pid /run/nginx.pid; # nginx进程ID文件路径


events {
    worker_connections 1024; # 每个worker进程可以处理的最大并发连接数
}


http {
    include /etc/nginx/mime.types; # MIME类型定义文件
    default_type application/octet-stream; # 默认MIME类型

    #log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
    #                  '$status $body_bytes_sent "$http_referer" '
    #                  '"$http_user_agent" "$http_x_forwarded_for"';

    #access_log /var/log/nginx/access.log  main; # 访问日志路径

    sendfile        on; # 开启sendfile，提高性能
    tcp_nopush     on; # 开启tcp_nopush，减少网络延迟
    tcp_nodelay     on; # 开启tcp_nodelay，减少网络延迟
    keepalive_timeout  65; # keepalive超时时间

    #gzip  on; # 开启gzip压缩，提高性能，需根据实际情况调整
    #gzip_min_length  1000; # gzip压缩最小长度
    #gzip_buffers  4 16k; # gzip压缩缓冲区大小
    #gzip_http_version 1.1; # gzip压缩HTTP版本
    #gzip_comp_level 6; # gzip压缩级别
    #gzip_types text/plain text/css application/json application/x-javascript text/xml application/xml application/xml+rss text/javascript; # gzip压缩类型


    server {
        listen       80; # 监听端口
        listen       [::]:80; # 监听IPv6端口
        server_name  localhost; # 服务器名称

        #charset koi8-r; # 字符集

        #access_log /var/log/nginx/host.access.log  main; # 访问日志路径

        location / {
            root   /usr/share/nginx/html; # 网站根目录
            index  index.html index.htm; # 默认首页文件
        }

        #error_page  404              /404.html; # 404错误页面
        # redirect server error pages to the static page /50x.html
        #error_page   500 502 503 504  /50x.html;
        #location = /50x.html {
        #    root   /usr/share/nginx/html;
        #}

        #location ~ \.php$ {
        #    include snippets/fastcgi-php.conf;
        #    fastcgi_pass   127.0.0.1:9000;
        #}

        # pass the PHP scripts to FastCGI server listening on 127.0.0.1:9000
        #
        #location ~ \.php$ {
        #    include snippets/fastcgi-php.conf;
        #    #
        #    # With php7.0-cgi alone:
        #    # fastcgi_pass 127.0.0.1:9000;
        #    #
        #    # With php7.0-fpm:
        #    fastcgi_pass unix:/run/php/php7.0-fpm.sock;
        #}

        # deny access to .htaccess files, if Apache's document root
        # concurs with nginx's one
        #
        #location ~ /\.ht {
        #    deny all;
        #}
    }


    #include /etc/nginx/conf.d/*.conf; # 包含其他配置文件
}
```