---
title: MySQL 用户和数据库创建及权限管理
createTime: 2025/01/16 15:14:28
permalink: /article/hfpv5qwi/
tags:
  - Mysql
  - 权限
---
本文档介绍如何在 MySQL 数据库中创建用户、数据库，并授予用户相应的权限。 所有操作都需要使用具有管理员权限的 MySQL 用户登录。
### 1. 创建用户

首先，创建一个名为 `dev` 的用户，允许其从任何主机 (`%`) 连接到数据库服务器。 密码设置为 `dev123456`，请务必将其更改为更安全的密码。
```sql
CREATE USER 'dev'@'%' IDENTIFIED BY 'dev123456';
```
>`'dev'@'%'` 指定用户名和允许连接的主机。 `%` 表示允许从任何主机连接，为了安全起见，建议将其替换为具体的 IP 地址或主机名，例如 `'dev'@'localhost'` 只允许本地连接。 `IDENTIFIED BY` 指定用户的密码。

### 2. 创建数据库

接下来，创建一个名为 `dev_database` 的数据库。
```sql
CREATE DATABASE dev_database;
```
### 3. 授权

为用户 `dev` 授予对 `dev_database` 数据库的所有权限。
```sql
GRANT ALL PRIVILEGES ON dev_database.* TO 'dev'@'%';
```
>`GRANT ALL PRIVILEGES` 授予所有权限。 `ON dev_database.*` 指定权限作用于 `dev_database` 数据库中的所有表 (`*`)。 `TO 'dev'@'%` 指定授予权限的用户和主机。 为了安全起见，建议不要使用 `%`，而应指定具体的 IP 地址或主机名。 您可以根据需要授予更精细的权限，例如只授予 `SELECT`, `INSERT`, `UPDATE`, `DELETE` 等特定权限。

### 4. 刷新权限

最后，刷新 MySQL 服务器的权限表，使更改生效。
```sql
FLUSH PRIVILEGES;
```
> 如果不执行此步骤，新设置的权限可能不会立即生效。

### 安全建议

- **避免使用 `%`:** 为了提高安全性，请尽量避免使用 `%` 来指定允许连接的主机，而应使用具体的 IP 地址或主机名。
- **使用强密码:** 设置强密码，并定期更改密码。
- **最小权限原则:** 只授予用户执行其工作所需的最少权限。 不要授予 `ALL PRIVILEGES` 除非绝对必要。
- **定期审核权限:** 定期审核用户的权限，确保权限仍然是必要的。

通过以上步骤，您就成功创建了一个名为 `dev` 的用户，并授予其对 `dev_database` 数据库的完全访问权限。 请记住将示例密码替换为更安全的密码，并根据您的实际需求调整权限设置。