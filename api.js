export async function askModel(history) {
  try {
    const res = await fetch("http://127.0.0.1:11434/api/chat", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({
        model: "llama3.2:3b",
        stream: false,
        messages: history
      })
    });

    const data = await res.json();
    return data.message?.content || "Ingen svar 😅";
  } catch {
    return "Start Ollama først ⚠️";
  }
}