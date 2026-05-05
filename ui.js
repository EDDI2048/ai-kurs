import { history } from "./state.js";

export function addMessage(chat, text, who, index = null) {
  const div = document.createElement("div");
  div.className = "message " + who;
  
  const msgIndex = index !== null ? index : history.length - 1;
  div.dataset.index = msgIndex;

  const content = document.createElement("div");
  content.className = "message-content";
  content.textContent = text;
  div.appendChild(content);

  const actions = document.createElement("div");
  actions.className = "message-actions";

  const copyBtn = document.createElement("button");
  copyBtn.className = "action-btn copy-btn";
  copyBtn.title = "Kopier";
  copyBtn.innerHTML = "📋";
  copyBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    navigator.clipboard.writeText(text);
    copyBtn.textContent = "✓";
    setTimeout(() => copyBtn.innerHTML = "📋", 1000);
  });

  const editBtn = document.createElement("button");
  editBtn.className = "action-btn edit-btn";
  editBtn.title = "Rediger";
  editBtn.innerHTML = "✏️";
  editBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    startEdit(div, content, who, msgIndex);
  });

  const deleteBtn = document.createElement("button");
  deleteBtn.className = "action-btn delete-btn";
  deleteBtn.title = "Slett";
  deleteBtn.innerHTML = "🗑️";
  deleteBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    deleteMessage(chat, div, msgIndex);
  });

  actions.appendChild(copyBtn);
  actions.appendChild(editBtn);
  actions.appendChild(deleteBtn);
  div.appendChild(actions);

  chat.appendChild(div);
  chat.scrollTop = chat.scrollHeight;
  return div;
}

function startEdit(div, contentDiv, who, index) {
  const currentText = contentDiv.textContent;
  const input = document.createElement("input");
  input.type = "text";
  input.className = "edit-input";
  input.value = currentText;

  contentDiv.textContent = "";
  contentDiv.appendChild(input);
  input.focus();

  const save = () => {
    const newText = input.value.trim();
    if (newText && newText !== currentText) {
      contentDiv.textContent = newText;
      if (history[index]) {
        history[index].content = newText;
      }
    } else {
      contentDiv.textContent = currentText;
    }
  };

  input.addEventListener("blur", save);
  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      input.blur();
    } else if (e.key === "Escape") {
      input.value = currentText;
      input.blur();
    }
  });
}

function deleteMessage(chat, div, index) {
  chat.removeChild(div);
  history.splice(index, 1);
  const messages = chat.querySelectorAll(".message");
  messages.forEach((msg, i) => {
    msg.dataset.index = i;
  });
}