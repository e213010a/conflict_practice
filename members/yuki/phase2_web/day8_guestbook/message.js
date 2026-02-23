// ページ読み込み時にメッセージを取得
async function loadMessages() {
  const response = await fetch("/api/messages");
  const messages = await response.json();

  const container = document.getElementById("messages");
  container.innerHTML = messages
    .map(
      (m) => `
    <div class="message">
      <strong>${m.name}</strong>
      <p>${m.content}</p>
      <small>${new Date(m.createdAt).toLocaleString()}</small>
    </div>
  `,
    )
    .join("");
}

// ページ読み込み時に実行
loadMessages();
