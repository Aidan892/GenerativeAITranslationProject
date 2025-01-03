import './style.css';
import './main.js';


export function loadTranslator() {
    document.querySelector('#app').innerHTML = `
      <div>
        <textarea class="chat-box1" placeholder="Insert code here..."></textarea>
        <textarea class="chat-box2"></textarea>
      </div>
    `;
  }
