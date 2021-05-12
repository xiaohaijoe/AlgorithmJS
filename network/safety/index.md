# 网络安全

## 索引

1. <a href="xss">XSS 攻击
2. <a href="csrf">CSRF 攻击

## <a name="xss">XSS 攻击

XSS 攻击全称跨站点脚本攻击（Cross Site Scripting）

XSS 是一种经常出现在 web 应用中的计算机安全漏洞，它允许恶意 web 用户将代码植入到提供给其他用户使用的页面中。比如这些代码包括 HTML 代码和客户端脚本。攻击者利用 XSS 漏洞旁路掉访问控制。

- 对所有用户提交内容进行可靠的输入验证
- 实现 session 标记
- 确认接收的内容完善的规范化

## <a name="csrf">CSRF 攻击

CSRF 攻击全称站点请求伪造攻击（Cross-Site Request Forgery）

**例子**

1. 用户 C 打开浏览器，访问受信任网站 A，输入用户名和密码请求网站 A
2. 用户信息通过验证后，网站 A 产生 cookie 信息并返回给浏览器，此时用户登录网站 A 成功
3. 用户未退出网站 A 之前，在同一个浏览器中打开一个 Tab 页访问网站 B
4. 网站 B 接收到用户请求后，返回一些攻击代码，并发出一个请求安全访问第三方网站 A

**防御方案**

1. 验证 token 值
2. 验证 Http 头 referer
3. 请求头 header 添加附加信息
