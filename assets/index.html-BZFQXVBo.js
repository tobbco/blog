import{_ as i,c as a,a as e,o as n}from"./app-DLwuheDP.js";const l={};function t(h,s){return n(),a("div",null,s[0]||(s[0]=[e(`<p>本文介绍两种 Gradle 打包方式：一种只打包项目代码，不包含依赖；另一种使用 Shadow 插件打包项目代码及其所有依赖。</p><h2 id="_1-只打包项目代码-不包含依赖" tabindex="-1"><a class="header-anchor" href="#_1-只打包项目代码-不包含依赖"><span>1. 只打包项目代码 (不包含依赖)</span></a></h2><p>使用标准的 <code>java</code> 插件，可以创建一个只包含项目代码的 JAR 包。这种方法简单，但生成的 JAR 包无法独立运行，因为它缺少运行时依赖。</p><h3 id="build-gradle" tabindex="-1"><a class="header-anchor" href="#build-gradle"><span>build.gradle</span></a></h3><div class="language-groovy line-numbers-mode" data-ext="groovy" data-title="groovy"><button class="copy" title="复制代码" data-copied="已复制"></button><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code><span class="line"><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">plugins {</span></span>
<span class="line"><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">    id </span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77;">&#39;</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;">java</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77;">&#39;</span></span>
<span class="line"><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">}</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">jar {</span></span>
<span class="line"><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">    archiveFileName </span><span style="--shiki-light:#999999;--shiki-dark:#666666;">=</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77;"> &#39;</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;">app.jar</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77;">&#39;</span></span>
<span class="line"><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">    manifest {</span></span>
<span class="line"><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">        attributes </span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77;">&#39;</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;">Main-Class</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77;">&#39;</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">: </span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77;">&#39;</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;">org.server.AppMain</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77;">&#39;</span></span>
<span class="line"><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">    }</span></span>
<span class="line"><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote><ul><li><code>archiveFileName</code>: 指定打包后的 JAR 文件名。</li><li><code>manifest</code>: 指定应用程序的主类，这是程序启动时执行的入口点。</li></ul></blockquote><h3 id="打包命令" tabindex="-1"><a class="header-anchor" href="#打包命令"><span>打包命令</span></a></h3><div class="language-bash line-numbers-mode" data-ext="bash" data-title="bash"><button class="copy" title="复制代码" data-copied="已复制"></button><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code><span class="line"><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">gradle</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> build</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><blockquote><p>运行此命令后，会在 <code>build/libs</code> 目录下生成 <code>herostory.jar</code> 文件，但此 JAR 包缺少依赖，无法直接运行。尝试运行会报错。</p></blockquote><h3 id="启动方式" tabindex="-1"><a class="header-anchor" href="#启动方式"><span>启动方式</span></a></h3><ol><li><strong>将依赖 JAR 包放置到指定目录:</strong> 例如，创建一个名为 <code>libs</code> 的目录，并将所有依赖的 JAR 文件复制到该目录中。</li><li><strong>修改启动脚本:</strong> 你的启动脚本 (例如，一个 shell 脚本或批处理文件) 需要包含所有依赖 JAR 包的路径。 假设你的主类是 <code>org.server.AppMain</code>，启动命令应该类似这样： <ul><li>Linux<div class="language-bash line-numbers-mode" data-ext="bash" data-title="bash"><button class="copy" title="复制代码" data-copied="已复制"></button><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code><span class="line"><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">java</span><span style="--shiki-light:#A65E2B;--shiki-dark:#C99076;"> -cp</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77;"> &quot;</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;">.:libs/*</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77;">&quot;</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> org.server.AppMain</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div></li><li>Windows<div class="language-bash line-numbers-mode" data-ext="bash" data-title="bash"><button class="copy" title="复制代码" data-copied="已复制"></button><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code><span class="line"><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">java</span><span style="--shiki-light:#A65E2B;--shiki-dark:#C99076;"> -cp</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77;"> &quot;</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;">.;libs/*</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77;">&quot;</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> org.server.AppMain</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div></li></ul></li></ol><h2 id="_2-打包项目代码及所有依赖-包含依赖" tabindex="-1"><a class="header-anchor" href="#_2-打包项目代码及所有依赖-包含依赖"><span>2. 打包项目代码及所有依赖 (包含依赖)</span></a></h2><p>创建一个包含所有依赖的可独立可执行 JAR 包，需要使用 <a href="https://gradleup.com/shadow/getting-started/#default-java-groovy-tasks" target="_blank" rel="noopener noreferrer">Shadow</a> 插件。该插件将项目代码和所有依赖项打包到一个单一的 JAR 文件中，方便部署和运行。</p><h2 id="build-gradle-1" tabindex="-1"><a class="header-anchor" href="#build-gradle-1"><span>build.gradle</span></a></h2><div class="language-groovy line-numbers-mode" data-ext="groovy" data-title="groovy"><button class="copy" title="复制代码" data-copied="已复制"></button><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code><span class="line"><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">plugins {</span></span>
<span class="line"><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">    id </span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77;">&#39;</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;">java</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77;">&#39;</span></span>
<span class="line"><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">    id </span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77;">&#39;</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;">com.gradleup.shadow</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77;">&#39;</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;"> version </span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77;">&#39;</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;">9.0.0-beta4</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77;">&#39;</span></span>
<span class="line"><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">}</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">jar {</span></span>
<span class="line"><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">    archiveFileName </span><span style="--shiki-light:#999999;--shiki-dark:#666666;">=</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77;"> &#39;</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;">app.jar</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77;">&#39;</span></span>
<span class="line"><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">    manifest {</span></span>
<span class="line"><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">        attributes </span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77;">&#39;</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;">Main-Class</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77;">&#39;</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">: </span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77;">&#39;</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;">org.server.AppMain</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77;">&#39;</span></span>
<span class="line"><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">    }</span></span>
<span class="line"><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote><p>与之前的配置相比，这里添加了 <code>com.gradleup.shadow</code> 插件。版本号指定为 <code>9.0.0-beta4</code>，请根据需要更新到最新稳定版本。</p></blockquote><h3 id="打包命令-1" tabindex="-1"><a class="header-anchor" href="#打包命令-1"><span>打包命令</span></a></h3><div class="language-bash line-numbers-mode" data-ext="bash" data-title="bash"><button class="copy" title="复制代码" data-copied="已复制"></button><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code><span class="line"><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">gradle</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> shadowJar</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><h2 id="总结" tabindex="-1"><a class="header-anchor" href="#总结"><span>总结</span></a></h2><p>选择哪种打包方式取决于你的需求。如果你的应用程序依赖较少，并且运行环境已预先配置好依赖，则第一种方法足够。但对于大多数情况，特别是需要在不同环境部署的应用程序，强烈建议使用 Shadow 插件，因为它生成的 JAR 包是包含依赖的，方便部署和运行。</p>`,20)]))}const p=i(l,[["render",t],["__file","index.html.vue"]]),r=JSON.parse('{"path":"/article/bcsy6b8j/","title":"Gradle打包","lang":"zh-CN","frontmatter":{"title":"Gradle打包","createTime":"2025/01/16 14:33:38","permalink":"/article/bcsy6b8j/","tags":["Gradle","构建工具"]},"headers":[],"readingTime":{"minutes":1.96,"words":587},"git":{"updatedTime":1737015927000,"contributors":[{"name":"xianchaoye","username":"xianchaoye","email":"18201082822@163.com","commits":1,"avatar":"https://avatars.githubusercontent.com/xianchaoye?v=4","url":"https://github.com/xianchaoye"}]},"filePathRelative":"build/Gradle 打包：包含与排除依赖.md","categoryList":[{"id":"b0da27","sort":10011,"name":"build"}],"bulletin":false}');export{p as comp,r as data};
