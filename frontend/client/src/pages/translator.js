import '../style.css';
import './main.js';

export function loadTranslator() {
  document.querySelector('#app').innerHTML = `
    <div>
      <textarea class="chat-box1" id = "chatBox1" placeholder="Insert code here..." ></textarea>
      <textarea class="chat-box2" id = "chatBox2"></textarea>
      <button class = "translate-button" id = "translateButton">Translate</button>
    </div>
  `;

  translateButton.addEventListener("click", async function() {
    const chatBox1Text = document.querySelector("#chatBox1").value;
    console.log("ChatBox! message: ", chatBox1Text)

    //fetching from backend
    //asyncronous method
    const response = await fetch("http://localhost:5000/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({message: chatBox1Text}),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Response from backend:", data);

        
        document.querySelector("#chatBox2").value = data.response;
      })
      .catch((error) => {
        console.error("Error:", error);
        document.querySelector("#chatBox2").value = "An error occurred while translating.";
      });
    });

}

