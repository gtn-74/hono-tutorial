import { Hono } from "hono";
import { prettyJSON } from "hono/pretty-json";

const app = new Hono();

let blogPosts = [
  {
    id: "1",
    title: "Blog1",
    content: "Blog1",
  },
  {
    id: "2",
    title: "Blog2",
    content: "Blog2",
  },
  {
    id: "3",
    title: "Blog3",
    content: "Blog3",
  },
];
// NOTE: JSONを形成してくれるミドルウェア
// NOTE: https://hono.dev/docs/middleware/builtin/pretty-json#pretty-json-middleware
app.use("*", prettyJSON());

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

// teturなくても返る？
// app.get("/posts", (c) => {
//   return c.json({ posts: blogPosts });
// });

// teturオブジェクトから取り出す
app.get("/posts", (c) => c.json({ posts: blogPosts }));

// id取得:react-router-domとほぼ一緒の取得の仕方な気がする
app.get("/posts/:id", (c) => {
  const id = c.req.param("id");
  const post = blogPosts.find((p) => p.id === id);

  if (post) {
    return c.json(post);
  } else {
    return c.json({ message: "not found page" }, 404);
  }
});

// post
app.post("/posts", async (c) => {
  // jsonの中身の型宣言は、<{}>で囲む
  const { title, content } = await c.req.json<{
    title: string;
    content: string;
  }>();
  const newPost = { id: String(blogPosts.length + 1), title, content };
  blogPosts = [...blogPosts, newPost];
  // NOTE:returnで返すことを忘れない！
  return c.json(newPost, 201);
});

// put
app.put("/posts:id", async (c) => {
  const id = c.req.param("id");

  // 配列０を取得
  const index = blogPosts.findIndex((p) => p.id === id);

  // 配列０より小さいindexが取得された場合
  if (index === -1) {
    return c.json({ message: "post not found" }, 404);
  }

  // 適切な処理
  const { title, content } = await c.req.json();
  blogPosts[index] = { ...blogPosts[index], title, content };
  return c.json(blogPosts[index]);
});

// delete
app.delete("/posts:id", async (c) => {
  const id = c.req.param("id");

  // 配列０を取得
  const index = blogPosts.findIndex((p) => p.id === id);

  // 配列０より小さいindexが取得された場合
  if (index === -1) {
    return c.json({ message: "post not found" }, 404);
  }

  // 適切な処理
  blogPosts = blogPosts.filter((p) => p.id !== id);

  return c.json({ mesage: "blog post deleted" });
});

export default app;
