const express = require("express");
const { PrismaClient } = require("@prisma/client");

const app = express();
const prisma = new PrismaClient();

app.use(express.json());
app.use(express.static("public"));

// メッセージを保存するAPI
app.post("/api/messages", async (req, res) => {
  const { name, content } = req.body;

  // ★ここでデータベースに保存（永続化！）
  const message = await prisma.message.create({
    data: { name, content },
  });

  console.log("[SERVER] メッセージをDBに保存:", message);
  res.json({ success: true, message });
});

// メッセージ一覧を取得するAPI
app.get("/api/messages", async (req, res) => {
  const messages = await prisma.message.findMany({
    orderBy: { createdAt: "desc" }, // 新しい順
  });

  console.log("[SERVER] DBからメッセージ取得:", messages.length, "件");
  res.json(messages);
});

app.listen(3000, () => {
  console.log("[SERVER] http://localhost:3000 で起動中");
});
