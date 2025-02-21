---
title: Git忽略不需要提交的文件
createTime: 2025/02/19
tags:
  - git
  - gitignore
---
日常项目开发中，使用`Git`作为项目版本管理工具，有些文件或者目录是不需要进行提交的，使用`.gitignore`文件可以告诉`Git`哪些文件或文件夹应该被忽略，不被添加到版本控制中。

## 创建或编辑`.gitignore`文件

以`Gradle`项目为例，在`Gradle`项目中，为了正确忽略多层级的`build`文件夹，你需要在项目的根目录下创建或编辑`.gitignore`文件，并添加相应的规则。

- 如果项目中还没有 `.gitignore` 文件，可以在项目根目录下创建一个。
- 如果已经存在 `.gitignore` 文件，只需编辑它。
- 在 `.gitignore` 文件中添加以下内容以忽略 `.gradle`、`build` 和 IDEA 配置文件：

```.gitignore
.gradle/
build/
.idea/
*.iml
```
>保存文件。

## 已提交的忽略文件

如果之前已经将某些文件或文件夹添加到了`Git`仓库中，需要先停止跟踪这些文件。

- 使用 `git rm -r --cached .idea` 命令从暂存区删除 `.idea` 目录。
```bash
git rm -r --cached .idea
```

- 使用 `git rm -r --cached build` 命令从暂存区删除 `build` 目录。
```bash
git rm -r --cached build
```

- 使用 `git rm -r --cached .gradle` 命令从暂存区删除 `.gradle` 目录。
```bash
git rm -r --cached .gradle
```

如果有其他需要忽略的文件或目录，也可以使用类似命令删除。

## 提交`.gitignore`文件并推送

**添加 `.gitignore` 文件到暂存区**：

使用 `git add .gitignore` 命令将 `.gitignore` 文件添加到暂存区。

**提交更改**：

使用 `git commit -m "忽略 .gradle、build 和 IDEA 配置文件"` 命令提交更改。

**推送更改到远程仓库**：

使用 `git push` 命令将更改推送到远程仓库。


## 示例

```bash
# 进入项目根目录
cd /path/to/your/project

# 创建或编辑 .gitignore 文件
echo ".gradle/" >> .gitignore
echo "build/" >> .gitignore
echo ".idea/" >> .gitignore
echo "*.iml" >> .gitignore

# 从暂存区删除已提交的文件
git rm -r --cached .idea
git rm -r --cached build
git rm -r --cached .gradle

# 添加 .gitignore 文件到暂存区
git add .gitignore

# 提交更改
git commit -m "忽略 .gradle、build 和 IDEA 配置文件"

# 推送更改到远程仓库
git push origin main  # 或者使用你当前的分支名称

```