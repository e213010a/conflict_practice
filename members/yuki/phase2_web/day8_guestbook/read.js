// メッセージ一覧を取得するAPI
app.get("/api/messages", async (req, res) => {
  // ★データベースから全件取得
  const messages = await prisma.message.findMany({
    orderBy: { createdAt: "desc" }, // 新しい順
  });

  console.log("[SERVER] DBからメッセージ取得:", messages.length, "件");
  res.json(messages);
});
