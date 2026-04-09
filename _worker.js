export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // 👉 首页说明
    if (url.pathname === "/") {
      return new Response(
        `KV测试已启动！

使用方法：
/set?key=xxx&value=yyy   写入数据
/get?key=xxx            读取数据`,
        { headers: { "content-type": "text/plain; charset=utf-8" } }
      );
    }

    // 👉 写入 KV
    if (url.pathname === "/set") {
      const key = url.searchParams.get("key");
      const value = url.searchParams.get("value");

      if (!key || !value) {
        return new Response("缺少 key 或 value", { status: 400 });
      }

      await env.MY_KV.put(key, value);

      return new Response(`已存入: ${key} = ${value}`);
    }

    // 👉 读取 KV
    if (url.pathname === "/get") {
      const key = url.searchParams.get("key");

      if (!key) {
        return new Response("缺少 key", { status: 400 });
      }

      const value = await env.MY_KV.get(key);

      return new Response(value || "没有这个数据");
    }

    return new Response("404", { status: 404 });
  },
};
