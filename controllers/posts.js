const posts = [
  { id: 1, name: "Yassin", role: "student" },
  { id: 2, name: "Ibrahim", role: "student" },
  { id: 3, name: "Xawa", role: "student" },
  { id: 4, name: "Ali", role: "student" },
];

export const getPosts = (req, res) => {
  res.json(posts);
};

export const getPostsInfo = (req, res) => {
  const post = posts.find((u) => u.id === Number(req.params.id));
  if (!post) return res.status(404).send("Post not found");

  res.json(post);
};
