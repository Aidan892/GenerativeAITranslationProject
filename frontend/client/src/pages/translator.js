import '../style.css';
import './main.js';

let chatHistory = [];
let latestQuestion = "";

export function loadTranslator() {
  document.querySelector('#app').innerHTML = `
    <div>
      <div class="dropdown-container">
        <select class="dropdown-menu" id="dropdown1">
          <option value="" disabled selected>Select a language...</option>
          <option value="Python">Python</option>
          <option value="Java">Java</option>
          <option value="C++">C++</option>
          <option value="JavaScript">JavaScript</option>
          <option value="CSS">CSS</option>
          <option value="Other">Other</option>
        </select>
        <select class="dropdown-menu" id="dropdown2">
          <option value="" disabled selected>Translate to...</option>
          <option value="Python">Python</option>
          <option value="Java">Java</option>
          <option value="C+=">C++</option>
          <option value="JavaScript">JavaScript</option>
          <option value="CSS">CSS</option>
          <option value="Other">Other</option>
        </select>
      </div>
      <textarea class="chat-box1" id = "chatBox1" placeholder="Insert code here..." ></textarea>
      <textarea class="chat-box2" id = "chatBox2" placeholder = "Click the Translate Button Below..."></textarea>
      <button class = "translate-button" id = "translateButton">Translate</button>
    </div>
  `;
  

  translateButton.addEventListener("click", async function() {
    const chatBox1Text = document.querySelector("#chatBox1").value;
    latestQuestion = chatBox1Text;
    // console.log("ChatBox! message: ", chatBox1Text)
    const chatBox2 = document.querySelector("#chatBox2");
    chatBox2.value = '';
    const initialLanguage = document.querySelector("#dropdown1").value;
    const translateLanguage = document.querySelector("#dropdown2").value;

    chatBox2.value = "Translating...";

    // console.log("Dropdown 1 Value:", initialLanguage);
    // console.log("Dropdown 2 Value:", translateLanguage);

    //fetching from backend
    //asyncronous method
    //https://generativeaitranslationproject.onrender.com/chat
    // local: http://localhost:5000/chat
    const response = await fetch("https://generativeaitranslationproject.onrender.com/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({message: latestQuestion, initialLanguage: initialLanguage, translateLanguage: translateLanguage, chatHistory: chatHistory}),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then(async (data) => {
        console.log("Response from backend:", data);
        // document.querySelector("#chatBox2").value = data.response;
        chatBox2.value = "";
        for(let i = 0; i< data.response.length ; i++){
          let responseString = data.response.charAt(i);
          await delay(10);
          document.querySelector("#chatBox2").value += responseString;
        }
        chatHistory.push({message:latestQuestion, answer:data.response});
        console.log("chatHistory:", chatHistory);
      })
      .catch((error) => {
        console.error("Error:", error);
        document.querySelector("#chatBox2").value = "An error occurred while translating.";
      });
    });

    async function delay(milliseconds){
      return new Promise(resolve => setTimeout(resolve, milliseconds))
    }
    
}

