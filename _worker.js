export default {
  async fetch(request) {
    return new Response("Hello Cloudflare!", {
      headers: { "content-type": "text/plain" },
    });
  },
};
