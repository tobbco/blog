## 1.安装Linux

Nginx是一个高性能的 **HTTP 服务器** 和**反向代理服务器** ，同时它还可以作为**邮件代理服务器** 和**TCP/UDP 代理服务器** 。最初由 **俄罗斯工程师 Igor Sysoev** 开发，主要用于解决高并发连接问题，现在被广泛应用于各类 web 服务中。

**更新系统**

```bash
# 更新系统包列表
sudo apt update
# 升级系统包
sudo apt upgrade -y
```

**安装**

安装 Nginx Web 服务器
```bash
sudo apt install nginx -y
```

检查 Nginx 服务状态
```bash
sudo systemctl status nginx
```

检查Nginx是否开机自启
```bash
sudo systemctl is-enabled nginx
```

## 2.安装 acme.sh

**acme.sh** 是一个免费、轻量级的自动化 **SSL 证书** 申请与管理工具。

**安装必要的依赖**

```bash
sudo apt install socat curl wget -y
```
>socat: 用于处理SSL证书验证
>curl: 用于下载文件
>wget: 另一个下载工具

 **安装 acme.sh**

```bash
curl https://get.acme.sh | sh -s email=你的邮箱@xxx.com
```
>**注意**：其中参数 email=你的邮箱@xxx.com 要替换成你自己的邮箱！它是用来用于接收证书过期通知的。

**重新加载shell配置以使acme.sh命令生效**

```bash
source ~/.bashrc
```

## 3.配置 Nginx

**创建Nginx配置文件**

```bash
sudo nano /etc/nginx/sites-available/域名.com
```
>**注意**：之后**所有配置**里的 **`域名.com`** 都要替换成你自己的域名！  
  因为申请的是免费证书不能申请泛域名，所以把你的域名写全了，你用哪个就写哪个。  
  例如： `xxx.yyy.top` 或 `ttt.xxx.yyy.com` 必须都写上！  
  如果你要对你**frp穿透的网址**申请证书，要申请**完整的域名** 子域名+主域名，**切记！**

**配置示例：**
```nginx
server {
    # 监听80端口（HTTP）
    listen 80;
    # 指定域名
    server_name 域名.com;     #注意修改 域名.com 成你自己的域名
    
    # 网站根目录
    root /var/www/域名.com;   #注意修改 域名.com 成你自己的域名
    # 默认索引文件
    index index.html index.htm;

    location / {
        # 尝试查找请求的文件，如果不存在则返回404
        try_files $uri $uri/ =404;
    }
}
```
>**提示**：确认配置正确后，使用快捷键 `Ctrl+X` 来退出编辑窗口，期间会提示你是否要保存文件，你需要按 `Y` 键确认，随后按 `Enter` 来确认保存即可。


**创建网站目录并设置权限**

 创建网站根目录
```bash
sudo mkdir -p /var/www/域名.com
```
> **注意**：把指令里的 **`域名.com`** 替换成你自己的域名！

设置目录权限

在大多数基于Debian的Linux发行版（如Ubuntu）中 `www-data`是默认的Web服务运行用户，可以在`/etc/nginx/nginx.conf`配置文件中查看默认的运行用户`user`。
```bash
sudo chown -R www-data:www-data /var/www/域名.com
```
>**注意**：把指令里的 **`域名.com`** 替换成你自己的域名！

**启用网站配置**

创建符号链接到`sites-enabled`目录 注意修改 `域名.com `成你自己的域名 ！
```bash
sudo ln -s /etc/nginx/sites-available/域名.com /etc/nginx/sites-enabled/
```

验证配置
```bash
sudo nginx -t
```
>如配置正确则会出现：
>nginx: the configuration file /etc/nginx/nginx.conf syntax is ok 
>nginx: configuration file /etc/nginx/nginx.conf test is successful

重启Nginx
```bash
sudo systemctl restart nginx
```

## 4.申请 SSL 证书

**设置默认证书颁发机构为 Let’s Encrypt**

```bash
~/.acme.sh/acme.sh --set-default-ca --server letsencrypt
```

**申请证书**
```bash
~/.acme.sh/acme.sh --issue -d 域名.com --webroot /var/www/域名.com
```
>--issue： 表示申请新证书
>-d：指定域名
>--webroot：指定网站根目录，用于验证域名所有权
>**注意**：修改 域名.com 成你自己的域名 ！ 

申请成功后会出现以下内容：
```bash
Your cert is in: /root/.acme.sh/域名.com_ecc/域名.com.cer
Your cert key is in: /root/.acme.sh/域名.com_ecc/域名.com.key
The intermediate CA cert is in: /root/.acme.sh/域名.com_ecc/ca.cer
And the full-chain cert is in: /root/.acme.sh/域名.com_ecc/fullchain.cer
```

##  5.安装 SSL 证书

**创建存放 SSL 证书的目录**

```bash
sudo mkdir -p /etc/nginx/ssl/域名.com
```
> **注意**：把指令里的 **`域名.com`** 替换成你自己的域名！

**安装证书到指定位置**

```bash
~/.acme.sh/acme.sh --install-cert -d 域名.com \
--key-file /etc/nginx/ssl/域名.com/private.key \
--fullchain-file /etc/nginx/ssl/域名.com/cert.pem \
--reloadcmd "sudo systemctl reload nginx"
```
>--install-cert: 安装证书
>-d: 指定域名
>--key-file: 私钥存放路径
>--fullchain-file: 完整证书链存放路径
>--reloadcmd: 证书更新后重新加载Nginx的命令


## 6.配置 Nginx 使用 HTTPS

**更新 Nginx 配置**

```bash
sudo nano /etc/nginx/sites-available/域名.com
```
> **注意**：把指令里的 **`域名.com`** 替换成你自己的域名！

**配置示例：**
```nginx
# HTTP服务器块 - 将所有HTTP请求重定向到HTTPS
server {
    listen 80;
    server_name 域名.com;   # 替换你的域名！
    # 将所有HTTP请求301永久重定向到HTTPS
    return 301 https://$server_name$request_uri;
}

# HTTPS服务器块
server {
    # 监听443端口（HTTPS）
    listen 443 ssl;
    server_name 域名.com;  # 替换你的域名！
    
    # SSL证书配置
    ssl_certificate /etc/nginx/ssl/域名.com/cert.pem;          # 替换你的域名！
    ssl_certificate_key /etc/nginx/ssl/域名.com/private.key;   # 替换你的域名！
    
    # SSL协议版本配置
    # 只允许TLS 1.2和1.3版本，禁用不安全的SSL/TLS版本
    ssl_protocols TLSv1.2 TLSv1.3;
    
    # 加密算法配置
    # 使用强加密套件，按优先级排序
    ssl_ciphers ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-GCM-SHA384:ECDHE-ECDSA-CHACHA20-POLY1305:ECDHE-RSA-CHACHA20-POLY1305:DHE-RSA-AES128-GCM-SHA256:DHE-RSA-AES256-GCM-SHA384;
    
    # 禁用服务器端加密算法优先，使用客户端算法优先
    ssl_prefer_server_ciphers off;
    
    # HSTS配置
    # 强制客户端在指定时间内只使用HTTPS访问
    add_header Strict-Transport-Security "max-age=31536000" always;
    
    # 网站根目录
    root /var/www/域名.com;   # 替换为你的域名！
    index index.html index.htm;

    # 处理请求的location块
    location / {
        try_files $uri $uri/ =404;
    }
    
    # 性能优化配置
    # 开启SSL会话缓存
    ssl_session_cache shared:SSL:10m;
    ssl_session_timeout 10m;
    
    # 开启OCSP Stapling
    ssl_stapling on;
    ssl_stapling_verify on;
    resolver 8.8.8.8 8.8.4.4 valid=300s;
    resolver_timeout 5s;
}
```
>**提示**：确认配置正确后，使用快捷键 `Ctrl+X` 来退出编辑窗口，期间会提示你是否要保存文件，你需要按 `Y` 键确认，随后按 `Enter` 来确认保存即可。

**验证配置并重启**

验证配置
```bash
sudo nginx -t
```
>如配置正确则会出现：
>nginx: the configuration file /etc/nginx/nginx.conf syntax is ok 
>nginx: configuration file /etc/nginx/nginx.conf test is successful

重启Nginx
```bash
sudo systemctl restart nginx
```

## 7.证书自动续期

acme.sh **默认会自动续期**，你可以查看 `cron` 任务：
```bash
crontab -l
```

## 8.Nginx反向代理详细配置

我们配置Nginx的主要目的就是使用https来安全的访问我们的网站，所以这一步配置是必不可少的，接下来要配置的是/etc/nginx/sites-available/ 目录下`域名.com`。

**配置Nginx反向代理**

```bash
sudo nano /etc/nginx/sites-available/域名.com
```
> **注意**：把指令里的 **`域名.com`** 替换成你自己的域名！

 **HTTP服务器配置块**
```bash
# 这部分主要修改的是把http的请求全部重定向到https
server {
    # 监听80端口
    listen 80;
    server_name 域名.com;   # 替换你的域名！
    
    # 将所有HTTP请求重定向到HTTPS
    return 301 https://$server_name$request_uri;
}
```

**HTTPS服务器配置块**

```bash
server {
    # 监听443端口，启用SSL
    listen 443 ssl;
    server_name 域名.com;  # 替换你的域名！
    
    # SSL证书配置
    ssl_certificate /etc/nginx/ssl/域名.com/cert.pem;        # 替换你的域名！
    ssl_certificate_key /etc/nginx/ssl/域名.com/private.key;  # 替换你的域名！
    
    # SSL协议版本和加密套件配置
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-GCM-SHA384;
    ssl_prefer_server_ciphers off;
    
    # 启用HSTS
    add_header Strict-Transport-Security "max-age=31536000" always;
    
    # 反向代理配置
    location / {
        # 设置代理头部信息
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        
        # 设置代理目标
        # 例如：将请求转发到本地8848端口
        # 这里是配置的重点，你需要把这里修改成你网站所使用的端口
        # 这样请求就会被代理到你所设置的端口
        proxy_pass http://127.0.0.1:8848;
        
        # 超时设置
        proxy_connect_timeout 60s;
        proxy_send_timeout 60s;
        proxy_read_timeout 60s;
        
        # 缓冲区设置
        proxy_buffer_size 4k;
        proxy_buffers 4 32k;
        proxy_busy_buffers_size 64k;
    }
    
    # 性能优化配置
    # 开启gzip压缩 (可选)
    # Gzip是一种常用的网页压缩技术，它可以显著减小传输数据的大小，加快网站加载速度。
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;
    gzip_min_length 1000;
    gzip_comp_level 6;
    
    # SSL会话缓存
    ssl_session_cache shared:SSL:10m;
    ssl_session_timeout 10m;
    
    # OCSP Stapling
    ssl_stapling on;
    ssl_stapling_verify on;
    resolver 8.8.8.8 8.8.4.4 valid=300s;
    resolver_timeout 5s;
    
    # 错误页面配置（可选）
    # 这个是你的网页无法访问时，会被导向的错误页面，根据需求配置
    # error_page 500 502 503 504 /50x.html;
    # location = /50x.html {
    #     root /usr/share/nginx/html;
    # }
}
```
>**提示**：确认配置正确后，使用快捷键 `Ctrl+X` 来退出编辑窗口，期间会提示你是否要保存文件，你需要按 `Y` 键确认，随后按 `Enter` 来确认保存即可。

**应用新配置**
```bash
sudo nginx -t
sudo systemctl restart nginx
```

## 9.Nginx进阶配置

**多个后端服务**

```bash
# API服务
location /api/ {
    proxy_pass http://127.0.0.1:8848/;
}

# 管理后台
location /admin/ {
    proxy_pass http://127.0.0.1:8849/;
}

# 静态文件
location /static/ {
    alias /var/www/static/;
    expires 7d;
}
```

**负载均衡配置**

```bash
# 定义上游服务器组
upstream backend {
    server 127.0.0.1:8848;
    server 127.0.0.1:8849;
    server 127.0.0.1:8850;
}

location / {
    proxy_pass http://backend;
}
```

## 10.常见问题排查

**确保 DNS 解析正确**：
- 使用 `ping 域名.com` 确保你的域名已经指向服务器 IP。

**端口必须开放**：
- 服务器的 **80 和 443 端口** 必须对外可访问。

**故障排查**：
- 查看 **Nginx 错误日志**：
    `sudo tail -f /var/log/nginx/error.log`
- 查看 **访问日志**：
    `sudo tail -f /var/log/nginx/access.log`