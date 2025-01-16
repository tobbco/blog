---
title: Portainer：简化容器管理的利器
createTime: 2023/10/16 16:02:42
permalink: /article/mm85ti1v/
tags:
  - Docker
  - Portainer
  - 容器
---
Portainer 是一款轻量级、易于使用的开源容器管理用户界面 (UI)，它能够简化 Docker、Kubernetes 和其他容器编排平台的管理。 无论您是容器化应用的新手还是经验丰富的专家，Portainer 都能帮助您更有效地管理容器环境。
### 一、Portainer 的优势

Portainer 的主要优势在于其易用性和强大的功能：

- **用户友好的界面:** Portainer 提供了一个直观的 Web UI，即使没有深入的容器知识，也能轻松上手。 您可以通过图形界面管理容器、镜像、网络、卷等资源，而无需记忆复杂的命令行指令。
- **多平台支持:** Portainer 支持多种容器环境，包括 Docker、Docker Swarm、Kubernetes、Azure ACI 和更多。 这意味着您可以使用同一个界面管理不同的容器平台。
- **集中管理:** Portainer 可以连接到多个 Docker 主机或 Kubernetes 集群，实现集中管理，简化了多环境的管理复杂性。
- **安全访问控制:** Portainer 支持基于角色的访问控制 (RBAC)，您可以为不同的用户或团队分配不同的权限，确保环境安全。
- **快速部署:** Portainer 本身就是一个容器，部署非常简单快捷，几分钟内即可完成安装和配置。
- **开源免费:** Portainer 社区版 (CE) 是完全开源免费的，您可以自由地使用和定制。 此外，还提供商业版 (BE) 提供更多高级功能和支持。
### 二、Portainer 的安装和部署

Portainer 的安装非常简单，通常只需要运行一个容器即可。 以下是一个使用 Docker 部署 Portainer 的示例：

创建一个名为 `portainer_data` 的数据卷，用于存储 Portainer 的数据。
```bash
docker volume create portainer_data
```

以守护进程模式运行 Portainer 容器
```bash
docker run -d -p 8000:8000 -p 9000:9000 -v /var/run/docker.sock:/var/run/docker.sock -v portainer_data:/data portainer/portainer-ce
```
> -d：以守护进程模式运行
> -p：端口映射，宿主机端口:容器端口 
> -v：挂载卷
> 	`-v /var/run/docker.sock:/var/run/docker.sock` 将 Docker socket 挂载到容器中，允许 Portainer 访问 Docker daemon。
> 	`-v portainer_data:/data` 将数据卷挂载到容器中，用于持久化 Portainer 的数据。

部署完成后访问[Portainer](http://81.70.99.108:9000/#!/init/admin)进行初始化，设置用户名和密码。
### 三、Portainer 的主要功能

Portainer 提供了丰富的功能，包括：
- **容器管理:** 创建、启动、停止、重启、删除容器；查看容器日志和状态；管理容器资源。
- **镜像管理:** 查看、搜索、拉取、推送镜像；管理镜像仓库。
- **网络管理:** 查看和管理 Docker 网络。
- **卷管理:** 查看和管理 Docker 卷。    
- **事件日志:** 查看容器事件日志。
- **用户管理:** 管理用户和权限。
- **Kubernetes 集成:** 管理 Kubernetes 集群、命名空间、Pod、Deployment 等资源 (需要安装 Kubernetes 插件)。

### 四、总结

Portainer 是一款优秀的容器管理工具，它简化了容器的管理和监控，提高了工作效率。 其易用性和多平台支持使其成为管理容器环境的理想选择。 虽然存在一些局限性，但其优势远大于不足，值得推荐给所有容器化应用的使用者。 建议根据实际需求选择社区版或商业版
