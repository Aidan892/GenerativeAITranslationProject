import '../style.css';
import './main.js';

// const textarea = document.getElementById("chatBox1");
// const text = textarea.value;
// console.log(text);

export function loadTranslator() {
  document.querySelector('#app').innerHTML = `
    <div>
      <textarea class="chat-box1" placeholder="Insert code here..." id = "chatBox1"></textarea>
      <textarea class="chat-box2"></textarea>
      <button class = "translate-button>Translate</button>
    </div>
  `;
}
