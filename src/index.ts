import { Hono } from 'hono';
import { prettyJSON } from 'hono/pretty-json';


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
app.use('*',prettyJSON())

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

// teturなくても返る？
app.get("/posts", (c) => {
  return c.json({ posts: blogPosts });
});

export default app;
