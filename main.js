import { askModel } from "./api.js";
import { addMessage } from "./ui.js";
import { history } from "./state.js";

const input = document.getElementById("input");
const send = document.getElementById("send");
const chat = document.getElementById("chat");
const toggleTheme = document.getElementById("toggle-theme");
const resetChat = document.getElementById("reset-chat");

// Send message
send.onclick = async () => {
  const text = input.value.trim();
  if (!text) return;

  addMessage(chat, text, "user");
  input.value = "";

  history.push({ role: "user", content: text });

  const thinking = addMessage(chat, "Tenker...", "bot");

  const answer = await askModel(history);
  thinking.content.textContent = answer;

  history.push({ role: "assistant", content: answer });
};

// Toggle theme
toggleTheme.onclick = () => {
  document.body.classList.toggle("light-mode");
};

// Reset chat
resetChat.onclick = () => {
  chat.innerHTML = "";
  history.length = 1; // Keep system message
};