import{_ as s,c as a,b as e,o as i}from"./app-BAwuoiuZ.js";const l={};function t(p,n){return i(),a("div",null,n[0]||(n[0]=[e(`<h2 id="task" tabindex="-1"><a class="header-anchor" href="#task"><span>Task</span></a></h2><ol><li>Install uvx</li><li>Initialize a Python virtual environment</li><li>Install Open WebUI</li><li>Run the application</li></ol><h2 id="install" tabindex="-1"><a class="header-anchor" href="#install"><span>Install</span></a></h2><h3 id="install-uvx" tabindex="-1"><a class="header-anchor" href="#install-uvx"><span>Install uvx</span></a></h3><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line">brew <span class="token function">install</span> uv</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><h3 id="set-up-the-environment" tabindex="-1"><a class="header-anchor" href="#set-up-the-environment"><span>Set Up the Environment</span></a></h3><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token function">mkdir</span> openwebui <span class="token operator">&amp;&amp;</span> <span class="token builtin class-name">cd</span> openwebui</span>
<span class="line">uv init <span class="token parameter variable">--python</span><span class="token operator">=</span><span class="token number">3.11</span> <span class="token builtin class-name">.</span></span>
<span class="line">uv venv</span>
<span class="line"><span class="token builtin class-name">source</span> .venv/bin/activate</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="install-open-webui" tabindex="-1"><a class="header-anchor" href="#install-open-webui"><span>Install Open WebUI</span></a></h3><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line">uv pip <span class="token function">install</span> open-webui</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><h3 id="run-open-webui" tabindex="-1"><a class="header-anchor" href="#run-open-webui"><span>Run Open WebUI</span></a></h3><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line">open-webui serve</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><blockquote><p>Open WebUI is now accessible via: http://0.0.0.0:8080/.</p></blockquote><h2 id="startup-with-a-script" tabindex="-1"><a class="header-anchor" href="#startup-with-a-script"><span>Startup with a Script</span></a></h2><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token shebang important">#!/bin/bash</span></span>
<span class="line"><span class="token comment"># Function to start OpenWebUI</span></span>
<span class="line"><span class="token function-name function">startwebui</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">if</span> pgrep <span class="token parameter variable">-f</span> <span class="token string">&quot;open-webui serve&quot;</span> <span class="token operator">&gt;</span> /dev/null<span class="token punctuation">;</span> <span class="token keyword">then</span></span>
<span class="line">        <span class="token builtin class-name">echo</span> <span class="token string">&quot;OpenWebUI is already running&quot;</span></span>
<span class="line">        <span class="token builtin class-name">return</span> <span class="token number">1</span></span>
<span class="line">    <span class="token keyword">fi</span></span>
<span class="line">    <span class="token punctuation">(</span>source <span class="token string">&quot;<span class="token environment constant">$HOME</span>/openwebui/.venv/bin/activate&quot;</span> <span class="token operator">&amp;&amp;</span></span>
<span class="line">     open-webui serve <span class="token operator">&gt;</span> <span class="token string">&quot;<span class="token environment constant">$HOME</span>/logs/webui.log&quot;</span> <span class="token operator"><span class="token file-descriptor important">2</span>&gt;</span><span class="token file-descriptor important">&amp;1</span> <span class="token operator">&amp;</span><span class="token punctuation">)</span></span>
<span class="line">    <span class="token builtin class-name">echo</span> <span class="token string">&quot;OpenWebUI started. Logs at ~/logs/webui.log&quot;</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"><span class="token comment"># Function to stop OpenWebUI</span></span>
<span class="line"><span class="token function-name function">stopwebui</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token function">pkill</span> <span class="token parameter variable">-f</span> <span class="token string">&quot;open-webui serve&quot;</span></span>
<span class="line">    <span class="token builtin class-name">echo</span> <span class="token string">&quot;OpenWebUI stopped&quot;</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token function">chmod</span> +x ~/scripts/webui-control.sh</span>
<span class="line"></span>
<span class="line"><span class="token builtin class-name">source</span> ~/scripts/webui-control.sh</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,15)]))}const r=s(l,[["render",t],["__file","02.webui.html.vue"]]),o=JSON.parse('{"path":"/AI/02.webui.html","title":"WebUI Setting","lang":"zh-CN","frontmatter":{"lang":"zh-CN","title":"WebUI Setting","description":"some description"},"headers":[{"level":2,"title":"Task","slug":"task","link":"#task","children":[]},{"level":2,"title":"Install","slug":"install","link":"#install","children":[{"level":3,"title":"Install uvx","slug":"install-uvx","link":"#install-uvx","children":[]},{"level":3,"title":"Set Up the Environment","slug":"set-up-the-environment","link":"#set-up-the-environment","children":[]},{"level":3,"title":"Install Open WebUI","slug":"install-open-webui","link":"#install-open-webui","children":[]},{"level":3,"title":"Run Open WebUI","slug":"run-open-webui","link":"#run-open-webui","children":[]}]},{"level":2,"title":"Startup with a Script","slug":"startup-with-a-script","link":"#startup-with-a-script","children":[]}],"git":{"updatedTime":1739135556000},"filePathRelative":"AI/02.webui.md"}');export{r as comp,o as data};
