import{_ as n,c as a,b as e,o as i}from"./app-hMhZGS8E.js";const l={};function t(c,s){return i(),a("div",null,s[0]||(s[0]=[e(`<h2 id="ssh" tabindex="-1"><a class="header-anchor" href="#ssh"><span>ssh</span></a></h2><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line">ssh-keygen <span class="token parameter variable">-t</span> ed25519 <span class="token parameter variable">-C</span> <span class="token string">&quot;your_email@example.com&quot;</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># legacy system</span></span>
<span class="line">ssh-keygen <span class="token parameter variable">-t</span> rsa <span class="token parameter variable">-b</span> <span class="token number">4096</span> <span class="token parameter variable">-C</span> <span class="token string">&quot;your_email@example.com&quot;</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># Start the ssh-agent in the background</span></span>
<span class="line"><span class="token builtin class-name">eval</span> <span class="token string">&quot;<span class="token variable"><span class="token variable">$(</span>ssh-agent <span class="token parameter variable">-s</span><span class="token variable">)</span></span>&quot;</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="config" tabindex="-1"><a class="header-anchor" href="#config"><span>config</span></a></h3><div class="language-Text line-numbers-mode" data-highlighter="prismjs" data-ext="Text" data-title="Text"><pre><code><span class="line">Host github.com-name1</span>
<span class="line">  AddKeysToAgent yes</span>
<span class="line">  UseKeychain yes</span>
<span class="line">  HostName github.com</span>
<span class="line">  User git</span>
<span class="line">  IdentityFile ~/.ssh/id_ed25519</span>
<span class="line"></span>
<span class="line"></span>
<span class="line">Host github.com-name2</span>
<span class="line">    HostName github.com</span>
<span class="line">    User git</span>
<span class="line">    IdentityFile ~/.ssh/ed25519_name2</span>
<span class="line"></span>
<span class="line">Host github.com</span>
<span class="line">  IgnoreUnknown UseKeychain</span>
<span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="keychain" tabindex="-1"><a class="header-anchor" href="#keychain"><span>keychain</span></a></h3><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token comment"># latest version of MacOS (12.0 Monterey)</span></span>
<span class="line">ssh-add --apple-use-keychain ~/.ssh/<span class="token punctuation">[</span>your-private-key<span class="token punctuation">]</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># MacOS older than 12.0 Monterey</span></span>
<span class="line">ssh-add <span class="token parameter variable">-K</span> ~/.ssh/<span class="token punctuation">[</span>your-private-key<span class="token punctuation">]</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="git-init" tabindex="-1"><a class="header-anchor" href="#git-init"><span>git init</span></a></h2><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token function">git</span> config  user.name <span class="token string">&quot;rhyme_yang&quot;</span></span>
<span class="line"><span class="token function">git</span> config  user.email <span class="token string">&quot;rhyme_yang@live.cn&quot;</span></span>
<span class="line"><span class="token function">git</span> config  user.password</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,8)]))}const r=n(l,[["render",t],["__file","index.html.vue"]]),d=JSON.parse('{"path":"/init/","title":"","lang":"zh-CN","frontmatter":{},"headers":[{"level":2,"title":"ssh","slug":"ssh","link":"#ssh","children":[{"level":3,"title":"config","slug":"config","link":"#config","children":[]},{"level":3,"title":"keychain","slug":"keychain","link":"#keychain","children":[]}]},{"level":2,"title":"git init","slug":"git-init","link":"#git-init","children":[]}],"git":{"updatedTime":1737754202000},"filePathRelative":"init/readme.md"}');export{r as comp,d as data};
