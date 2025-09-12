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

const generateResponse = (incomingChatLi) => {
  const API_URL = "https://advanced-chatbox.onrender.com/api/chat";
  const messageElement = incomingChatLi.querySelector("p");

  const requestOption = {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      message: userMessage
    })
  };

  fetch(API_URL, requestOption)
    .then(res => res.json())
    .then(data => {
      messageElement.textContent = data.reply;
    })
    .catch((error) => {
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
       generateResponse(incomingChatLi);
    }, 600);
}

sendBtn.addEventListener("click", handleChat);