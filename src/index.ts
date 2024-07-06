import { Hono } from "hono";
import { prettyJSON } from "hono/pretty-json";
import posts from "./blogs/blogs";
import auth from "./auth/auth";
import { basicAuth } from "hono/basic-auth";

const app = new Hono();
// NOTE: JSONを形成してくれるミドルウェア
// NOTE: https://hono.dev/docs/middleware/builtin/pretty-json#pretty-json-middleware
app.use("*", prettyJSON());

// index.tsxに置いておかないとpageに入れちゃう
app.use(
  '/auth/*',
  basicAuth({
    username: 'gitani',
    password: 'gitanidayo',
  })
)


// posts(blogsは、このパス以下のみを記述するからblogsでは、/postsが必要なくなる)
app.route("/posts", posts);
app.route("/auth", auth);

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

export default app;

// best practices
// https://hono.dev/docs/guides/best-practices#best-practices