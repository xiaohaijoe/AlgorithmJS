## HTTP

**索引**

1. <a href="compare">http 1.0/1.1/2.0/3.0 区别</a>

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
        <td>请求顺序</td>
        <td></td>
        <td></td>
        <td>标准输出</td>
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
</table>
