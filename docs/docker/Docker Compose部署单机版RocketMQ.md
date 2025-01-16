---
title: Docker compose部署单机版RocketMQ
createTime: 2024/01/13 11:36:33
tags:
  - 消息队列
  - 中间件
  - MQ
  - RocketMQ
permalink: /article/ujdp6h7u/
---
## 创建工作目录

创建`E:\Docker\data\Rocketmq\config\broker.conf`文件，目录随便，后面挂载正确即可，内容如下:

```properties
"brokerIP1=127.0.0.1" 
# 所属集群名字
brokerClusterName=DefaultCluster
# 0 表示 Master，> 0 表示 Slave
brokerId=0
# 是否允许 Broker 自动创建 Topic，建议线下开启，线上关闭 ！！！这里仔细看是 false，false，false
autoCreateTopicEnable=true

# 是否允许 Broker 自动创建订阅组，建议线下开启，线上关闭
autoCreateSubscriptionGroup=true
# Broker 对外服务的监听端口
listenPort=10911

```
>简略配置
## docker-compse.yml

在`E:\Docker\data\Rocketmq`下创建 `docker-compose.yml`文件，内容如下：
```yml
version: '3.8'
services:
  namesrv:
    image: apache/rocketmq:latest
    container_name: rmqnamesrv
    ports:
      - 9876:9876
    privileged: true
    networks:
      - rocketmq
    command: sh mqnamesrv
  broker:
    image: apache/rocketmq:5.3.1
    container_name: rmqbroker
    ports:
      - 10909:10909
      - 10911:10911
      - 10912:10912
    privileged: true
    volumes:
      - E:\Docker\data\Rocketmq\config\broker.conf:/home/rocketmq/rocketmq-5.3.1/conf/broker.conf
    environment:
      - NAMESRV_ADDR=rmqnamesrv:9876
    depends_on:
      - namesrv
    networks:
      - rocketmq
    command: ["sh","mqbroker","-c","/home/rocketmq/rocketmq-5.3.1/conf/broker.conf"]
  proxy:
    image: apache/rocketmq:5.3.1
    container_name: rmqproxy
    networks:
      - rocketmq
    depends_on:
      - broker
      - namesrv
    ports:
      - 8080:8080
      - 8081:8081
    privileged: true
    restart: on-failure
    environment:
      - NAMESRV_ADDR=rmqnamesrv:9876
    command: sh mqproxy
  dashboard: # New service for the console
    image: apacherocketmq/rocketmq-dashboard:latest
    container_name: rmqdashboard
    ports:
      - 18080:8080
    privileged: true
    depends_on:
      - namesrv
    networks:
      - rocketmq
    environment:
      - JAVA_OPTS=-Drocketmq.namesrv.addr=rmqnamesrv:9876
networks:
  rocketmq:
    driver: bridge
```

## 启动

```bash
docker compose up -d
```

## 创建Topic

```bash
docker exec -it rmqbroker bash
sh mqadmin updatetopic -t TestTopic -c DefaultCluster
```

## Java客户端使用

### 引入依赖

```groovy
implementation 'org.apache.rocketmq:rocketmq-client-java:5.0.7'
```
### 发送消息

```java
import org.apache.rocketmq.client.apis.ClientConfiguration;  
import org.apache.rocketmq.client.apis.ClientConfigurationBuilder;  
import org.apache.rocketmq.client.apis.ClientException;  
import org.apache.rocketmq.client.apis.ClientServiceProvider;  
import org.apache.rocketmq.client.apis.message.Message;  
import org.apache.rocketmq.client.apis.producer.Producer;  
import org.apache.rocketmq.client.apis.producer.SendReceipt;  
import org.slf4j.Logger;  
import org.slf4j.LoggerFactory;

public class ProducerExample {  
    private static final Logger logger = LoggerFactory.getLogger(ProducerExample.class);  
  
    public static void main(String[] args) throws ClientException, IOException {  
        // 接入点地址，需要设置成Proxy的地址和端口列表，一般是xxx:8080;xxx:8081  
        // 此处为示例，实际使用时请替换为真实的 Proxy 地址和端口  
        String endpoint = "localhost:8081";  
        // 消息发送的目标Topic名称，需要提前创建。  
        String topic = "TestTopic";  
        ClientServiceProvider provider = ClientServiceProvider.loadService();  
        ClientConfigurationBuilder builder = ClientConfiguration.newBuilder().setEndpoints(endpoint);  
        ClientConfiguration configuration = builder.build();  
        // 初始化Producer时需要设置通信配置以及预绑定的Topic。  
        Producer producer = provider.newProducerBuilder()  
            .setTopics(topic)  
            .setClientConfiguration(configuration)  
            .build();  
        // 普通消息发送。  
        Message message = provider.newMessageBuilder()  
            .setTopic(topic)  
            // 设置消息索引键，可根据关键字精确查找某条消息。  
            .setKeys("messageKey")  
            // 设置消息Tag，用于消费端根据指定Tag过滤消息。  
            .setTag("messageTag")  
            // 消息体。  
            .setBody("messageBody".getBytes())  
            .build();  
        try {  
            // 发送消息，需要关注发送结果，并捕获失败等异常。  
            SendReceipt sendReceipt = producer.send(message);  
            logger.info("Send message successfully, messageId={}", sendReceipt.getMessageId());  
        } catch (ClientException e) {  
            logger.error("Failed to send message", e);  
        }  
        producer.close();  
    }  
}

```

## 停止所有服务

```bash
docker-compose down
```
## 参考文章

1. [Docker安装rocketmq、rocketmq-console - 码界Musing](https://shuaifeihao.top/2024/04/15/docker_rocketmq/)
2. [Docker Compose 部署 RocketMQ | RocketMQ](https://rocketmq.apache.org/zh/docs/quickStart/03quickstartWithDockercompose)