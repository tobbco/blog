---
title: Git基础：创建仓库及关联仓库
createTime: 2023/10/16
tags:
  - git
  - 版本管理
  - 多仓库
---

## Git 全局设置:

```bash
git config --global user.name "xxxxx"
git config --global user.email "xxxxx@163.com"
```

## 创建 git 仓库:

创建本地git仓库并关联远程仓库
```bash
mkdir test
cd test
git init 
touch README.md
git add README.md
git commit -m "first commit"
git remote add origin https://gitee.com/xxxx/test.git
git push -u origin "master"
```

## 已有仓库?

```bash
cd existing_git_repo
git remote add origin https://gitee.com/xxxx/test.git
git push -u origin "master"
```