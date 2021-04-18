## HTTP

**索引**

1. <a href="compare">http 1.0/1.1/2.0/3.0 区别</a>
2. <a href="https">https</a>

## <a name='compare'>http 1.0/1.1/2.0/3.0 区别

<table>
    <tr>
        <th>内容</th>
        <th>1.0</th>
        <th>1.1</th>
        <th>2.0</th>
    </tr>
    <tr>
        <td>持久化</td>
        <td>不支持，每次请求都需要建立一条单独的连接，请求完成后立即断开连接</td>
        <td>支持，默认模式使用带流水线的持久连接（Connection: keep-alive），在一个TCP连接上可以传送多个HTTP请求和响应</td>
        <td>支持</td>
    </tr>
    <tr>
        <td>Host请求头</td>
        <td>❌</td>
        <td>增加Host请求头字段后，WEB浏览器可以使用主机头名来明确表示要访问服务器上的哪个WEB站点，这才实现了在一台WEB服务器上可以在同一个IP地址和端口号上使用不同的主机名来创建多个虚拟WEB站点</td>
        <td>✅</td>
    </tr>
    <tr>
        <td>Cache缓存</td>
        <td>主要使用header里的If-Modified-Since,Expires来做为缓存判断的标准</td>
        <td>引入了更多的缓存控制策略例如Entity tag，If-Unmodified-Since, If-Match, If-None-Match等更多可供选择的缓存头来控制缓存策略</td>
        <td>✅</td>
    </tr>
    <tr>
        <td>断点续传</td>
        <td>❌</td>
        <td>✅</td>
        <td>✅</td>
    </tr>
    <tr>
        <td>请求数量限制</td>
        <td>大多数浏览器对于最大TCP请求的数量为6个左右</td>
        <td>6个左右，如果请求数量较多，则会开启多个TCP请求，有可能会造成阻塞</td>
        <td>6个左右，因多路复用的原因，所以同一时间同一域名的请求只会使用1个TCP请求</td>
    </tr>
    <tr>
        <td>请求顺序</td>
        <td>串行处理，每一次请求必须要等待响应结束，才可以发起下一次请求</td>
        <td>串行处理</td>
        <td>并行处理</td>
    </tr>
    <tr>
        <td>多路复用 (Multiplexing)</td>
        <td>x</td>
        <td>x</td>
        <td>多路复用允许同时通过单一的 HTTP/2 连接发起多重的请求-响应消息。在 HTTP/1.1 协议中浏览器客户端在同一时间，针对同一域名下的请求有一定数量限制。超过限制数目的请求会被阻塞。这也是为何一些站点会有多个静态资源 CDN 域名的原因之一，拿 Twitter 为例，http://twimg.com，目的就是变相的解决浏览器针对同一域名的请求限制阻塞问题。而 HTTP/2 的多路复用(Multiplexing) 则允许同时通过单一的 HTTP/2 连接发起多重的请求-响应消息。因此 HTTP/2 可以很容易的去实现多流并行而不用依赖建立多个 TCP 连接，HTTP/2 把 HTTP 协议通信的基本单位缩小为一个一个的帧，这些帧对应着逻辑流中的消息。并行地在同一个 TCP 连接上双向交换消息。</td>
    </tr>
    <tr>
        <td>二进制分帧</td>
        <td>x</td>
        <td>x</td>
        <td>HTTP/2在 应用层(HTTP/2)和传输层(TCP or UDP)之间增加一个二进制分帧层。在不改动 HTTP/1.x 的语义、方法、状态码、URI 以及首部字段的情况下, 解决了HTTP1.1 的性能限制，改进传输性能，实现低延迟和高吞吐量。在二进制分帧层中， HTTP/2 会将所有传输的信息分割为更小的消息和帧（frame）,并对它们采用二进制格式的编码 ，其中 HTTP1.x 的首部信息会被封装到 HEADER frame，而相应的 Request Body 则封装到 DATA frame 里面。</td>
    </tr>
    <tr>
        <td>首部压缩（Header Compression）</td>
        <td>x</td>
        <td>x</td>
        <td>HTTP/1.1并不支持 HTTP 首部压缩，为此 SPDY 和 HTTP/2 应运而生， SPDY 使用的是通用的DEFLATE 算法，而 HTTP/2 则使用了专门为首部压缩而设计的 HPACK 算法。</td>
    </tr>
    <tr>
        <td>服务端推送（Server Push）</td>
        <td>x</td>
        <td>x</td>
        <td>服务端推送是一种在客户端请求之前发送数据的机制。在 HTTP/2 中，服务器可以对客户端的一个请求发送多个响应。Server Push 让 HTTP1.x 时代使用内嵌资源的优化手段变得没有意义；如果一个请求是由你的主页发起的，服务器很可能会响应主页内容、logo 以及样式表，因为它知道客户端会用到这些东西。</td>
    </tr>
</table>

## <a name='https'> https

HTTPS 在传输数据之前需要客户端（浏览器）与服务端（网站）之间进行一次握手，在握手过程中将确立双方加密传输数据的密码信息。TLS/SSL 协议不仅仅是一套加密传输的协议，TLS/SSL 中使用了非对称加密，对称加密以及 HASH 算法。握手过程的简单描述如下：

1. 浏览器将自己支持的一套加密规则发送给网站。
2. 网站从中选出一组加密算法与 HASH 算法，并将自己的身份信息以证书的形式发回给浏览器。证书里面包含了网站地址，加密公钥，以及证书的颁发机构等信息。
3. 获得网站证书之后浏览器要做以下工作：
   1. 验证证书的合法性（颁发证书的机构是否合法，证书中包含的网站地址是否与正在访问的地址一致等），如果证书受信任，则浏览器栏里面会显示一个小锁头，否则会给出证书不受信的提示。
   2. 如果证书受信任，或者是用户接受了不受信的证书，浏览器会生成一串随机数的密码，并用证书中提供的公钥加密。
   3. 使用约定好的 HASH 计算握手消息，并使用生成的随机数对消息进行加密，最后将之前生成的所有信息发送给网站。
4. 网站接收浏览器发来的数据之后要做以下的操作：
   1. 使用自己的私钥将信息解密取出密码，使用密码解密浏览器发来的握手消息，并验证 HASH 是否与浏览器发来的一致。
   2. 使用密码加密一段握手消息，发送给浏览器。
5. 浏览器解密并计算握手消息的 HASH，如果与服务端发来的 HASH 一致，此时握手过程结束，之后所有的通信数据将由之前浏览器生成的随机密码并利用对称加密算法进行加密。

默认 HTTP 的端口号为 80，HTTPS 的端口号为 443。