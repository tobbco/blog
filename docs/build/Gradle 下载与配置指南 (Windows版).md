---
title: Gradle 下载与配置指南 (Windows版)
createTime: 2025/01/16 14:12:31
tags:
  - Gradle
  - 构建工具
permalink: /article/zbl95fx3/
---

本指南详细介绍如何在`windows`环境下载、安装和配置 `Gradle`，包括使用国内镜像源以加快依赖下载速度。

## 下载Gradle

从 Gradle 官方网站下载 Gradle，下载地址 [Gradle | Thank you for downloading Gradle!](https://gradle.org/next-steps/?version=8.11.1&format=all)
## 解压 Gradle

将下载的 `Gradle` 压缩包解压到您选择的目录。例如，`D:\Gradle`。`
## 配置环境变量

### Gradle bin目录

1. 新建系统变量`GRADLE_HOME` ,内容为`D:\Gradle`
2. 在Path中添加新路径，`%GRADLE_HOME%\bin`
### 用户目录

默认情况下Gradle下载的依赖包是存放在`C:\Users\<登录用户>\.gradle`下，占用大量C盘空间。
Gradle默认不支持直接配置依赖下载路径的，但是可以通过环境变量实现这一需求。
1. 新建系统环境变量`GRADLE_USER_HOME`，路径为`MAVEN`本地仓库位置，或者自定义其他目录，例如：`D:\develop\.m2\repository`。
###  安装验证

```bash
gradle -v
```

## 配置文件

默认gradle是从官方下载依赖包，速度特别慢，所以我们要修改成国内源。
配置文件路径 `D:\Gradle\init.d`,在目录下创建`init.gradle`文件，内容如下：
```groovy
allprojects {
    repositories { 
        mavenLocal() 
        maven { name "Alibaba" ; url "https://maven.aliyun.com/repository/public" } 
        maven { name "Bstek" ; url "https://nexus.bsdn.org/content/groups/public/" } 
        mavenCentral()
    }
    buildscript {
        repositories { 
            maven { name "Alibaba" ; url 'https://maven.aliyun.com/repository/public' } 
            maven { name "Bstek" ; url 'https://nexus.bsdn.org/content/groups/public/' } 
            maven { name "M2" ; url 'https://plugins.gradle.org/m2/' }
        }
    }
}
```
>`mavenLocal()` 只有在设置了 `M2_HOME` 环境变量指向您的本地 Maven 时才能正常使用。

