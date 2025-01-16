---
title: Gradle打包
createTime: 2025/01/16 14:33:38
permalink: /article/bcsy6b8j/
tags:
  - Gradle
  - 构建工具
---
本文介绍两种 Gradle 打包方式：一种只打包项目代码，不包含依赖；另一种使用 Shadow 插件打包项目代码及其所有依赖。

## 1. 只打包项目代码 (不包含依赖)

使用标准的 `java` 插件，可以创建一个只包含项目代码的 JAR 包。这种方法简单，但生成的 JAR 包无法独立运行，因为它缺少运行时依赖。

### build.gradle

```groovy
plugins {
    id 'java'
}

jar {
    archiveFileName = 'app.jar'
    manifest {
        attributes 'Main-Class': 'org.server.AppMain'
    }
}
```
>- `archiveFileName`: 指定打包后的 JAR 文件名。
>- `manifest`: 指定应用程序的主类，这是程序启动时执行的入口点。 
### 打包命令

```bash
gradle build
```
>运行此命令后，会在 `build/libs` 目录下生成 `herostory.jar` 文件，但此 JAR 包缺少依赖，无法直接运行。尝试运行会报错。

### 启动方式

1. **将依赖 JAR 包放置到指定目录:** 例如，创建一个名为 `libs` 的目录，并将所有依赖的 JAR 文件复制到该目录中。
2. **修改启动脚本:** 你的启动脚本 (例如，一个 shell 脚本或批处理文件) 需要包含所有依赖 JAR 包的路径。 假设你的主类是 `org.server.AppMain`，启动命令应该类似这样：
	- Linux
		```bash
		java -cp ".:libs/*" org.server.AppMain
		```
	- Windows
		```bash
		java -cp ".;libs/*" org.server.AppMain
		```
## 2. 打包项目代码及所有依赖 (包含依赖)

创建一个包含所有依赖的可独立可执行 JAR 包，需要使用 [Shadow](https://gradleup.com/shadow/getting-started/#default-java-groovy-tasks) 插件。该插件将项目代码和所有依赖项打包到一个单一的 JAR 文件中，方便部署和运行。
## build.gradle

```groovy
plugins {
    id 'java'
    id 'com.gradleup.shadow' version '9.0.0-beta4'
}

jar {
    archiveFileName = 'app.jar'
    manifest {
        attributes 'Main-Class': 'org.server.AppMain'
    }
}
```
>与之前的配置相比，这里添加了 `com.gradleup.shadow` 插件。版本号指定为 `9.0.0-beta4`，请根据需要更新到最新稳定版本。

### 打包命令

```bash
gradle shadowJar
```

## 总结

选择哪种打包方式取决于你的需求。如果你的应用程序依赖较少，并且运行环境已预先配置好依赖，则第一种方法足够。但对于大多数情况，特别是需要在不同环境部署的应用程序，强烈建议使用 Shadow 插件，因为它生成的 JAR 包是包含依赖的，方便部署和运行。