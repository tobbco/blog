## Docker安装

使用官方脚本一键安装`docker`、`docker-compose`
`docker`官方提供了傻瓜式安装脚本，为你做好所有工作，免去了手动安装的繁琐。

```bash
curl -fsSL https://get.docker.com | bash -s docker
```

可在此命令后附带`--mirror`参数设置镜像源，以提高国内服务器下载`docker`的速度

```bash
curl -fsSL https://get.docker.com | bash -s docker --mirror Aliyun
```
> 使用阿里云镜像


## Docker 镜像加速
```bash
echo '{"registry-mirrors": ["https://docker.1ms.run"]}' | sudo tee /etc/docker/daemon.json > /dev/null
systemctl daemon-reload
systemctl restart docker
```

## Docker 资源

- Docker 官方主页: [https://www.docker.com](https://www.docker.com/)
- Docker 官方博客: [https://blog.docker.com/](https://blog.docker.com/)
- Docker 官方文档: [https://docs.docker.com/](https://docs.docker.com/)
- Docker Store: [https://store.docker.com](https://store.docker.com/)
- Docker Cloud: [https://cloud.docker.com](https://cloud.docker.com/)
- Docker Hub: [https://hub.docker.com](https://hub.docker.com/)
- Docker 的源代码仓库: [https://github.com/moby/moby](https://github.com/moby/moby)
- Docker 发布版本历史: [https://docs.docker.com/release-notes/](https://docs.docker.com/release-notes/)
- Docker 常见问题: [https://docs.docker.com/engine/faq/](https://docs.docker.com/engine/faq/)
- Docker 远端应用 API: [https://docs.docker.com/develop/sdk/](https://docs.docker.com/develop/sdk/)