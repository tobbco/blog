import{_ as s,c as i,a,o as t}from"./app-DLwuheDP.js";const r={};function n(o,e){return t(),i("div",null,e[0]||(e[0]=[a(`<h2 id="docker安装" tabindex="-1"><a class="header-anchor" href="#docker安装"><span>Docker安装</span></a></h2><p>使用官方脚本一键安装<code>docker</code>、<code>docker-compose</code><code>docker</code>官方提供了傻瓜式安装脚本，为你做好所有工作，免去了手动安装的繁琐。</p><div class="language-bash line-numbers-mode" data-ext="bash" data-title="bash"><button class="copy" title="复制代码" data-copied="已复制"></button><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code><span class="line"><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">curl</span><span style="--shiki-light:#A65E2B;--shiki-dark:#C99076;"> -fsSL</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> https://get.docker.com</span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;"> |</span><span style="--shiki-light:#59873A;--shiki-dark:#80A665;"> bash</span><span style="--shiki-light:#A65E2B;--shiki-dark:#C99076;"> -s</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> docker</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>可在此命令后附带<code>--mirror</code>参数设置镜像源，以提高国内服务器下载<code>docker</code>的速度</p><div class="language-bash line-numbers-mode" data-ext="bash" data-title="bash"><button class="copy" title="复制代码" data-copied="已复制"></button><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code><span class="line"><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">curl</span><span style="--shiki-light:#A65E2B;--shiki-dark:#C99076;"> -fsSL</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> https://get.docker.com</span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;"> |</span><span style="--shiki-light:#59873A;--shiki-dark:#80A665;"> bash</span><span style="--shiki-light:#A65E2B;--shiki-dark:#C99076;"> -s</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> docker</span><span style="--shiki-light:#A65E2B;--shiki-dark:#C99076;"> --mirror</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> Aliyun</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><blockquote><p>使用阿里云镜像</p></blockquote><h2 id="docker-镜像加速" tabindex="-1"><a class="header-anchor" href="#docker-镜像加速"><span>Docker 镜像加速</span></a></h2><div class="language-bash line-numbers-mode" data-ext="bash" data-title="bash"><button class="copy" title="复制代码" data-copied="已复制"></button><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code><span class="line"><span style="--shiki-light:#998418;--shiki-dark:#B8A965;">echo</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77;"> &#39;</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;">{&quot;registry-mirrors&quot;: [&quot;https://docker.1ms.run&quot;]}</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77;">&#39;</span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;"> |</span><span style="--shiki-light:#59873A;--shiki-dark:#80A665;"> sudo</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> tee</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> /etc/docker/daemon.json</span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;"> &gt;</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> /dev/null</span></span>
<span class="line"><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">systemctl</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> daemon-reload</span></span>
<span class="line"><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">systemctl</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> restart</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> docker</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="docker-资源" tabindex="-1"><a class="header-anchor" href="#docker-资源"><span>Docker 资源</span></a></h2><ul><li>Docker 官方主页: <a href="https://www.docker.com/" target="_blank" rel="noopener noreferrer">https://www.docker.com</a></li><li>Docker 官方博客: <a href="https://blog.docker.com/" target="_blank" rel="noopener noreferrer">https://blog.docker.com/</a></li><li>Docker 官方文档: <a href="https://docs.docker.com/" target="_blank" rel="noopener noreferrer">https://docs.docker.com/</a></li><li>Docker Store: <a href="https://store.docker.com/" target="_blank" rel="noopener noreferrer">https://store.docker.com</a></li><li>Docker Cloud: <a href="https://cloud.docker.com/" target="_blank" rel="noopener noreferrer">https://cloud.docker.com</a></li><li>Docker Hub: <a href="https://hub.docker.com/" target="_blank" rel="noopener noreferrer">https://hub.docker.com</a></li><li>Docker 的源代码仓库: <a href="https://github.com/moby/moby" target="_blank" rel="noopener noreferrer">https://github.com/moby/moby</a></li><li>Docker 发布版本历史: <a href="https://docs.docker.com/release-notes/" target="_blank" rel="noopener noreferrer">https://docs.docker.com/release-notes/</a></li><li>Docker 常见问题: <a href="https://docs.docker.com/engine/faq/" target="_blank" rel="noopener noreferrer">https://docs.docker.com/engine/faq/</a></li><li>Docker 远端应用 API: <a href="https://docs.docker.com/develop/sdk/" target="_blank" rel="noopener noreferrer">https://docs.docker.com/develop/sdk/</a></li></ul>`,10)]))}const h=s(r,[["render",n],["__file","index.html.vue"]]),d=JSON.parse('{"path":"/article/hd4pqrj5/","title":"Linux Docker安装","lang":"zh-CN","frontmatter":{"title":"Linux Docker安装","createTime":"2025/03/17 02:45:09","permalink":"/article/hd4pqrj5/"},"headers":[],"readingTime":{"minutes":0.75,"words":226},"git":{"updatedTime":1739513825000,"contributors":[{"name":"xianchaoye","username":"xianchaoye","email":"18201082822@163.com","commits":1,"avatar":"https://avatars.githubusercontent.com/xianchaoye?v=4","url":"https://github.com/xianchaoye"}]},"filePathRelative":"preview/Linux Docker安装.md","categoryList":[{"id":"5ebeb6","sort":10003,"name":"preview"}],"bulletin":false}');export{h as comp,d as data};
