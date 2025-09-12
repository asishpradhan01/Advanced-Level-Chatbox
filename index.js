const sendBtn = document.querySelector(".fa-paper-plane");
const chatbox = document.querySelector(".chatbox");
const input = document.querySelector(".input-box input");

let userMessage;

const createChatLi = (message, className) => {
const chatLi = document.createElement("li");
chatLi.classList.add("chat", className);
let chatContent = className === "outgoing" ? `<p>${message}</p>` : `<span class="material-symbols-outlined">robot_2</span><p>${message}</p>`;
chatLi.innerHTML = chatContent
return chatLi;

}

const generateResponse = (incomingChatLi, userMessage) => {
  const API_URL = "/api/chat";
  const messageElement = incomingChatLi.querySelector("p");

  fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ message: userMessage })
  })
    .then(res => res.json())
    .then(data => {
      messageElement.textContent = data.reply;
    })
    .catch(() => {
      messageElement.textContent = "Oops, something went wrong!";
    });
};

const handleChat = () => {
    userMessage = input.value.trim();
    if(!userMessage) return;
    chatbox.appendChild(createChatLi(userMessage, "outgoing"));

    setTimeout(() => {
        const incomingChatLi = createChatLi("Thinking...", "incoming")
       chatbox.appendChild(incomingChatLi);
       generateResponse(incomingChatLi, userMessage);
    }, 600);
}

sendBtn.addEventListener("click", handleChat);