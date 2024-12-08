import{_ as e,c as n,b as a,o as t}from"./app-Dw7sMlI8.js";const i={};function o(l,s){return t(),n("div",null,s[0]||(s[0]=[a(`<h2 id="mgs-block" tabindex="-1"><a class="header-anchor" href="#mgs-block"><span>mgs, block</span></a></h2><p><code>msg</code> and <code>block</code> are both global variables provided by the <strong>Ethereum Virtual Machine (EVM)</strong>. They are not explicitly defined anywhere in the code, as they are built-in objects that are available for all contracts to use. Here&#39;s what each one means:</p><ol><li>msg <ul><li><code>msg</code> is a global object that contains <strong>information about the current transaction</strong> or message that is calling the function.</li><li>Common properties of <code>msg</code>: <ul><li><code>msg.sender</code>: This refers to the <strong>address</strong> of the <strong>entity</strong> (an externally owned account or a contract) that sent the transaction or called the function. In your case, <strong>msg.sender</strong> is used to set the author of the tweet.</li><li><code>msg.value</code>: This represents the amount of Ether (in wei) sent with the transaction.</li><li><code>msg.data</code>: This contains the data sent with the transaction (i.e., the call data).</li></ul></li><li>Example:<code>author: msg.sender</code><ul><li>This assigns the Ethereum address of the sender to the author of the tweet.</li></ul></li></ul></li><li><code>block</code><ul><li><code>block</code> is another <strong>global object</strong> in Solidity that contains <strong>information about the current block</strong>.</li><li><strong>Common properties of block</strong>: <ul><li><strong>block.timestamp</strong>: This is the timestamp of the current block, in seconds since the Unix epoch (January 1, 1970). It’s used in your code to set the timestamp for when the tweet was created.</li><li><code>block.number</code>: This represents the current block number.</li><li><code>block.coinbase</code>: This is the address of the miner who mined the current block.</li></ul></li><li>Example: <code>timestamp: block.timestamp</code><ul><li>This assigns the timestamp of the current block to the timestamp property of the tweet.</li></ul></li></ul></li></ol><ul><li><strong>Summary</strong>: <ul><li><code>msg</code> gives information about the sender of the transaction (like msg.sender), and it&#39;s typically used to access the sender&#39;s address or transaction-specific data.</li><li><code>block</code> provides information about the block in which the current transaction is included (like block.timestamp).</li><li>These are pre-defined, built-in variables in Solidity and are available globally in any contract or function.</li></ul></li></ul><h2 id="address" tabindex="-1"><a class="header-anchor" href="#address"><span>address</span></a></h2><p>In Solidity, <code>address</code> is a built-in data type used to represent Ethereum addresses. <strong>An Ethereum address</strong> is a <strong>160-bit value</strong>, which can be used to <strong>identify accounts</strong> (either externally owned accounts or contracts) on the Ethereum network. These addresses are typically represented as hexadecimal strings of 40 characters (excluding the 0x prefix).</p><div class="language-solidity line-numbers-mode" data-highlighter="prismjs" data-ext="solidity" data-title="solidity"><pre><code><span class="line"><span class="token keyword">mapping</span><span class="token punctuation">(</span><span class="token builtin">address</span> <span class="token operator">=&gt;</span> Twitter<span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token punctuation">)</span> <span class="token keyword">public</span> tweets<span class="token punctuation">;</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><ul><li><code>address</code>: This is the key in the mapping. It represents an Ethereum address and is used to map a specific address (usually the address of a user) to an array of Twitter objects (which presumably contain information about tweets).</li><li><strong>Purpose</strong>: This mapping stores a list of tweets for each Ethereum address. So, for each address, there is an associated array of Twitter objects that belong to that address (likely representing tweets created by the user).</li></ul><h3 id="what-does-address-mean" tabindex="-1"><a class="header-anchor" href="#what-does-address-mean"><span>What does address mean?</span></a></h3><ul><li><strong>Ethereum Account</strong>: An address is used to refer to the Ethereum account (either user accounts or smart contracts). <strong>Each address is associated with a private key</strong>, which is used to sign transactions and prove ownership.</li><li><strong>Data Type</strong>: The address data type in Solidity is a 20-byte value that is used to represent an Ethereum address. This could be an externally owned account (EOA) or a contract address.</li><li>Example: A typical Ethereum address looks like this: <code>0x32Be343B94f860124dC4fEe278FDCBD38C102D88</code></li></ul><p>Example:</p><div class="language-solidity line-numbers-mode" data-highlighter="prismjs" data-ext="solidity" data-title="solidity"><pre><code><span class="line"><span class="token keyword">mapping</span><span class="token punctuation">(</span><span class="token builtin">address</span> <span class="token operator">=&gt;</span> Twitter<span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token punctuation">)</span> <span class="token keyword">public</span> tweets<span class="token punctuation">;</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><ul><li>This means: <ul><li>tweets is a public mapping that associates an address (likely representing a user) with an array of Twitter objects (which could be representing tweets posted by the user).</li><li>Each user (address) can have an array of Twitter objects, and by using their address, you can fetch all the tweets associated with them.</li><li>Other uses of address: <ul><li><strong>address type functions</strong>: Solidity provides several functions and utilities for working with addresses, such as: <ul><li><code>address.balance</code>: The balance of an address (in wei).</li><li><code>address.transfer</code>(amount): Used to send Ether to an address.</li><li><code>address.call()</code>: Can be used to interact with contracts at a specific address.</li></ul></li><li>Example of how it works: <ul><li>If someone (an address like 0x123...) posts a tweet, their address will be mapped to an array of Twitter objects in tweets. For example:</li></ul></li></ul></li></ul></li></ul><div class="language-solidity line-numbers-mode" data-highlighter="prismjs" data-ext="solidity" data-title="solidity"><pre><code><span class="line">tweets<span class="token punctuation">[</span><span class="token number">0x1234567890abcdef</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">]</span><span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>newTweet<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>This would store the new tweet (newTweet) in the array for the address <code>0x1234567890abcdef....</code></p><ul><li><strong>Summary</strong>: <ul><li>address is a built-in type representing Ethereum addresses, typically used to identify accounts or smart contracts.</li></ul></li></ul><p>In your code, it is used to map an Ethereum address to an array of Twitter objects, where each address corresponds to a user and their associated tweets.</p><h2 id="require" tabindex="-1"><a class="header-anchor" href="#require"><span>Require</span></a></h2><p>When the <code>require</code> condition is not satisfied in Solidity, the function execution is immediately reverted. This means that:</p><ul><li><strong>Execution stops</strong>: The remaining code in the function will not be executed.</li><li><strong>State changes are reverted</strong>: Any changes made to the blockchain state (like storing data in a variable, mapping, or array) are undone.</li><li><strong>Error message</strong>: The string message provided in the require (e.g., &quot;Tweet is too long&quot;) will be shown as the revert reason.</li></ul><h3 id="behavior-of-require" tabindex="-1"><a class="header-anchor" href="#behavior-of-require"><span>Behavior of require:</span></a></h3><p>If the condition <code>bytes(_tweet).length &lt;= MAX_TWEET_LENGTH</code> is not met, the function will immediately stop execution and revert any changes made so far.</p><p>The error message &quot;Tweet is too long&quot; will be returned as part of the revert, helping you understand why the transaction failed.</p><p><strong>Example</strong>: If the length of the tweet exceeds MAX_TWEET_LENGTH, the following will happen:</p><ul><li>The condition <code>require(bytes(_tweet).length &lt;= MAX_TWEET_LENGTH, &quot;Tweet is too long&quot;)</code> will evaluate to false.</li><li>The function execution will <strong>halt</strong>, and all <strong>state changes</strong> (like storing the new tweet) will be <strong>reverted</strong>.</li><li>The transaction will fail, and &quot;Tweet is too long&quot; will be the error message returned.</li></ul><h3 id="solidity-revert-behavior" tabindex="-1"><a class="header-anchor" href="#solidity-revert-behavior"><span>Solidity Revert Behavior:</span></a></h3><p>If the require statement is satisfied (i.e., the condition is true), execution continues with the rest of the function.</p><p>If the require fails (condition is false), the function is reverted, no state changes occur, and the error message is returned.</p><p><strong>Example Scenario</strong>: If a user tries to create a tweet with more than the allowed number of characters (e.g., more than 280 characters): The require statement will revert with the message &quot;Tweet is too long&quot;. The newTweet will not be created, and the tweets mapping will not be updated.</p><p><strong>Summary</strong>: If the require condition fails, the function exits immediately and the state changes are reverted. The specified revert message will be returned as part of the error.</p><h2 id="modifier" tabindex="-1"><a class="header-anchor" href="#modifier"><span>modifier</span></a></h2><div class="language-solidity line-numbers-mode" data-highlighter="prismjs" data-ext="solidity" data-title="solidity"><pre><code><span class="line"><span class="token keyword">modifier</span> <span class="token function">notPaused</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">require</span><span class="token punctuation">(</span><span class="token operator">!</span>paused<span class="token punctuation">,</span> <span class="token string">&quot;Contract is paused&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token keyword">_</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">function</span> <span class="token function">transfer</span><span class="token punctuation">(</span><span class="token builtin">address</span> to<span class="token punctuation">,</span> <span class="token builtin">uint</span> amount<span class="token punctuation">)</span> <span class="token keyword">public</span> notPaused <span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">require</span><span class="token punctuation">(</span>balances<span class="token punctuation">[</span>msg<span class="token punctuation">.</span>sender<span class="token punctuation">]</span> <span class="token operator">&gt;=</span> amount<span class="token punctuation">,</span> <span class="token string">&quot;Insufficient balance&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">    balances<span class="token punctuation">[</span>msg<span class="token punctuation">.</span>sender<span class="token punctuation">]</span> <span class="token operator">-=</span> amount<span class="token punctuation">;</span></span>
<span class="line">    balances<span class="token punctuation">[</span>to<span class="token punctuation">]</span> <span class="token operator">+=</span> amount<span class="token punctuation">;</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>In the code above, <code>notPaused</code> is a <strong>modifier</strong>, which is <strong>a special function in Solidity</strong> that is used to modify the behavior of other functions. Modifiers are often used for reusability, access control, and ensuring certain conditions before executing a function.</p><p>Here’s the breakdown of the relevant part of your code:</p><p>Modifier Definition:</p><div class="language-solidity line-numbers-mode" data-highlighter="prismjs" data-ext="solidity" data-title="solidity"><pre><code><span class="line"><span class="token keyword">modifier</span> <span class="token function">notPaused</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">require</span><span class="token punctuation">(</span><span class="token operator">!</span>paused<span class="token punctuation">,</span> <span class="token string">&quot;Contract is paused&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token keyword">_</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>The <code>notPaused</code> modifier checks whether a contract is paused (using the paused variable, which is presumably a boolean).</p><p>If the contract is <strong>paused</strong>, the require statement will revert the transaction with the message &quot;Contract is paused&quot;.</p><p>The underscore <code>_</code> is a placeholder that tells Solidity to execute the function that uses this modifier at that point.</p><p>How the <code>notPaused</code> Modifier Works in the transfer Function:</p><div class="language-solidity line-numbers-mode" data-highlighter="prismjs" data-ext="solidity" data-title="solidity"><pre><code><span class="line"><span class="token keyword">function</span> <span class="token function">transfer</span><span class="token punctuation">(</span><span class="token builtin">address</span> to<span class="token punctuation">,</span> <span class="token builtin">uint</span> amount<span class="token punctuation">)</span> <span class="token keyword">public</span> notPaused <span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">require</span><span class="token punctuation">(</span>balances<span class="token punctuation">[</span>msg<span class="token punctuation">.</span>sender<span class="token punctuation">]</span> <span class="token operator">&gt;=</span> amount<span class="token punctuation">,</span> <span class="token string">&quot;Insufficient balance&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line">    balances<span class="token punctuation">[</span>msg<span class="token punctuation">.</span>sender<span class="token punctuation">]</span> <span class="token operator">-=</span> amount<span class="token punctuation">;</span></span>
<span class="line">    balances<span class="token punctuation">[</span>to<span class="token punctuation">]</span> <span class="token operator">+=</span> amount<span class="token punctuation">;</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>The transfer function is marked with the public visibility modifier, meaning it can be called by anyone.</p><p>The <code>notPaused</code> modifier is placed right after public in the function signature: <code>public notPaused</code>. This means before the function executes, the notPaused modifier will check if the contract is paused.</p><p>If the contract is <code>paused</code>, the modifier will trigger the require statement inside notPaused, and the function will not proceed.</p><p>If the contract is <code>not paused</code>, the function will continue executing.</p><p>Understanding the Sequence:</p><p>Before the function body is executed, the notPaused modifier checks if the contract is paused.</p><p><strong>If paused</strong>: The function will stop, and an error message (&quot;Contract is paused&quot;) will be shown.</p><p><strong>If not paused</strong>: The function will continue executing normally, allowing the transfer of tokens between addresses.</p><p>This pattern is useful to prevent functions from being called when the contract is paused for maintenance or security reasons.</p><h2 id="public" tabindex="-1"><a class="header-anchor" href="#public"><span>public</span></a></h2><p>In Solidity, the public keyword is used to define the visibility of a variable or function. However, the behavior of public in Solidity is different from its behavior in languages like C++ or C#. Here&#39;s an explanation of how it works in Solidity, along with a comparison to C++ and C#:</p><div class="language-solidity line-numbers-mode" data-highlighter="prismjs" data-ext="solidity" data-title="solidity"><pre><code><span class="line"><span class="token keyword">contract</span> <span class="token class-name">Twitter</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token builtin">uint16</span> <span class="token keyword">public</span> MAX_TWEET_LENGTH <span class="token operator">=</span> <span class="token number">280</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>The <code>public</code> keyword in <strong>Solidity</strong> means that anyone can <strong>read</strong> the value of the variable MAX_TWEET_LENGTH from outside the contract (i.e., anyone can call a getter function to access the value of MAX_TWEET_LENGTH).</p><p><strong>Important distinction</strong>: Public variables in Solidity are automatically given a <strong>getter</strong> function. This means that you can access the value, but you cannot change it unless the contract&#39;s logic allows it. In this case, the value of MAX_TWEET_LENGTH is a state variable, and it can only be modified by a function within the contract that is explicitly designed to modify it (if such a function exists).</p><p>For modification, the contract itself defines the rules. Public variables themselves are not directly writable from outside the contract, unless a function is specifically written to allow it (e.g., via setters).</p><p>For example, the variable MAX_TWEET_LENGTH in your contract is readable by anyone, but the value cannot be changed by just anyone unless there is a function allowing it, such as:</p><div class="language-solidity line-numbers-mode" data-highlighter="prismjs" data-ext="solidity" data-title="solidity"><pre><code><span class="line"><span class="token keyword">function</span> <span class="token function">setMaxTweetLength</span><span class="token punctuation">(</span><span class="token builtin">uint16</span> newLength<span class="token punctuation">)</span> <span class="token keyword">public</span> <span class="token punctuation">{</span></span>
<span class="line">    MAX_TWEET_LENGTH <span class="token operator">=</span> newLength<span class="token punctuation">;</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Without such a setter function, no one can change the value of MAX_TWEET_LENGTH, even though it is public.</p><h3 id="in-c-and-c" tabindex="-1"><a class="header-anchor" href="#in-c-and-c"><span>In C++ and C#:</span></a></h3><p>C++:</p><p>The public access modifier in C++ is used to make class members (variables and methods) accessible from outside the class.</p><p>If a variable is public in C++, it means that anyone can directly change the value of the variable from outside the class. Example:</p><div class="language-cpp line-numbers-mode" data-highlighter="prismjs" data-ext="cpp" data-title="cpp"><pre><code><span class="line"><span class="token keyword">class</span> <span class="token class-name">Twitter</span> <span class="token punctuation">{</span></span>
<span class="line"><span class="token keyword">public</span><span class="token operator">:</span></span>
<span class="line">    <span class="token keyword">uint16_t</span> MAX_TWEET_LENGTH <span class="token operator">=</span> <span class="token number">280</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token punctuation">}</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token comment">// Outside the class</span></span>
<span class="line">Twitter twitter<span class="token punctuation">;</span></span>
<span class="line">twitter<span class="token punctuation">.</span>MAX_TWEET_LENGTH <span class="token operator">=</span> <span class="token number">300</span><span class="token punctuation">;</span> <span class="token comment">// Directly changes the value</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>C#:</p><p>In C#, the public keyword also makes the class members accessible from outside the class.</p><p>If a variable is public in C#, it means anyone can directly modify its value from outside the class. Example:</p><div class="language-csharp line-numbers-mode" data-highlighter="prismjs" data-ext="cs" data-title="cs"><pre><code><span class="line"><span class="token keyword">class</span> <span class="token class-name">Twitter</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">public</span> <span class="token class-name"><span class="token keyword">int</span></span> MAX_TWEET_LENGTH <span class="token operator">=</span> <span class="token number">280</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"><span class="token comment">// Outside the class</span></span>
<span class="line"><span class="token class-name">Twitter</span> twitter <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">Twitter</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">twitter<span class="token punctuation">.</span>MAX_TWEET_LENGTH <span class="token operator">=</span> <span class="token number">300</span><span class="token punctuation">;</span> <span class="token comment">// Directly changes the value</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>Key Differences</strong>:</p><ul><li><strong>Solidity</strong>: In Solidity, public makes a variable <strong>readable</strong> (due to the auto-generated getter function), but does not allow direct modification from outside the contract unless the contract has a function explicitly allowing it. The blockchain&#39;s state is controlled by the contract&#39;s logic, so even though a variable is public, its value can only be changed through a function defined in the contract.</li><li>C++/C#: In contrast, in C++ and C#, public allows direct access and modification of variables from any part of the program. If a variable is public, it can be changed directly without any constraints.</li></ul><h3 id="conclusion" tabindex="-1"><a class="header-anchor" href="#conclusion"><span>Conclusion:</span></a></h3><p>While public in C++ and C# allows direct access and modification of variables, in Solidity, public only exposes the variable for reading. Modification can only happen through the contract&#39;s functions, which allows for more control over how the variable is changed.</p>`,72)]))}const r=e(i,[["render",o],["__file","solidity.html.vue"]]),p=JSON.parse('{"path":"/BlockChain/solidity.html","title":"","lang":"zh-CN","frontmatter":{},"headers":[{"level":2,"title":"mgs, block","slug":"mgs-block","link":"#mgs-block","children":[]},{"level":2,"title":"address","slug":"address","link":"#address","children":[{"level":3,"title":"What does address mean?","slug":"what-does-address-mean","link":"#what-does-address-mean","children":[]}]},{"level":2,"title":"Require","slug":"require","link":"#require","children":[{"level":3,"title":"Behavior of require:","slug":"behavior-of-require","link":"#behavior-of-require","children":[]},{"level":3,"title":"Solidity Revert Behavior:","slug":"solidity-revert-behavior","link":"#solidity-revert-behavior","children":[]}]},{"level":2,"title":"modifier","slug":"modifier","link":"#modifier","children":[]},{"level":2,"title":"public","slug":"public","link":"#public","children":[{"level":3,"title":"In C++ and C#:","slug":"in-c-and-c","link":"#in-c-and-c","children":[]},{"level":3,"title":"Conclusion:","slug":"conclusion","link":"#conclusion","children":[]}]}],"git":{"updatedTime":1732662321000,"contributors":[{"name":"rhyme_yang","email":"rhyme_yang@live.cn","commits":1}]},"filePathRelative":"BlockChain/solidity.md"}');export{r as comp,p as data};