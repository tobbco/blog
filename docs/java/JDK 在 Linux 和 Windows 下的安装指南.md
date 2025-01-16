---
title: JDK 在 Linux 和 Windows 下的安装指南
createTime: 2024/01/16 14:46:53
permalink: /article/zjch0iv5/
tags:
  - java
  - jdk安装
---
Java Development Kit (JDK) 是 Java 编程语言的软件开发工具包，包含编译器、调试器和其他必要的工具。本文将指导您如何在 Linux 和 Windows 系统上安装 JDK。 
## 一、Windows 系统下的 JDK 安装

### 下载 JDK 
从 Oracle 官网下载适合您系统的 JDK 版本 (例如，`jdk-XXX-windows-x64.exe`)。 请确保选择与您的操作系统 (64 位或 32 位) 匹配的版本。
    
### 运行安装程序

双击下载的 `.exe` 文件运行安装程序。 按照安装向导的步骤进行操作，您可以选择安装路径。 建议选择一个不包含中文和特殊字符的路径，以避免潜在的问题。
    
### 配置环境变量

安装完成后，需要配置环境变量才能在命令行及系统任意位置使用 Java 命令。

- **打开环境变量设置:** 搜索 "环境变量" 并打开 "编辑系统环境变量"。
- **新建系统变量 JAVA_HOME:** 点击 "新建"，变量名为 `JAVA_HOME`，变量值为 JDK 的安装路径 (例如，`C:\Program Files\Java\jdk-17.0.2` — 请替换为您的实际路径)。
- **编辑 Path 变量:** 找到名为 `Path` 的系统变量，点击 "编辑"。 添加两个新的变量值：`%JAVA_HOME%\bin` 和 `%JAVA_HOME%\jre\bin`。
- **应用更改:** 点击 "确定" 应用所有更改。  
### 验证安装

打开命令提示符 (cmd)，输入 `java -version` 和 `javac -version`。 如果安装成功，将会显示 Java 版本信息。

## 二、Linux 系统下的 JDK 安装

Linux 系统下的 JDK 安装方法因发行版而异。 以下是一些常见发行版的安装方法：

### 1. 使用包管理器 

大多数 Linux 发行版都提供 JDK 包，可以使用包管理器轻松安装，以OpenJDK为例。
#### Debian/Ubuntu

```bash
sudo apt update 
sudo apt install openjdk-8-jdk
```
> 安装 OpenJDK 或安装 Oracle JDK (需要添加 PPA，具体步骤请参考 Oracle 官网)
#### Centos

```bash
sudo yum install -y java-1.8.0-openjdk
```

### 2. 手动安装 (推荐)

手动安装适用于所有发行版。

#### 下载 JDK

进入 [Oracle 官方网站](http://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html "http://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html") 下载合适的 JDK 版本，准备安装。下面以 `jdk-8u151-linux-x64.tar.gz` 为例，如果您下载的是其他版本，请注意文件后缀为 `.tar.gz` 即可。

#### 解压 JDK

将下载的 `.tar.gz` 文件解压到您选择的目录 (例如，`/usr/java`)。
```bash
sudo mkdir /usr/java
sudo cd /usr/java
sudo tar -zxvf jdk-8u151-linux-x64.tar.gz 
```
#### 配置环境变量

编辑 `/etc/profile` 文件，添加环境变量，内容如下

```java
JAVA_HOME=/usr/java/jdk1.8.0_151        
JRE_HOME=/usr/java/jdk1.8.0_151/jre     
CLASS_PATH=.:$JAVA_HOME/lib/dt.jar:$JAVA_HOME/lib/tools.jar:$JRE_HOME/lib
PATH=$PATH:$JAVA_HOME/bin:$JRE_HOME/bin
export JAVA_HOME JRE_HOME CLASS_PATH PATH 
```
> 其中 `JAVA_HOME，JRE_HOME` 请根据自己的实际安装路径及 JDK 版本配置。

运行 `source /etc/profile `使更改生效。

### 3. 验证安装

打开终端，输入 `java -version`  如果安装成功，将会显示 Java 版本信息，例如：
```java
java version "1.8.0_151"
Java(TM) SE Runtime Environment (build 1.8.0_151-b12)
Java HotSpot(TM) 64-Bit Server VM (build 25.151-b12, mixed mode)
```
