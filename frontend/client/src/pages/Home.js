import '../style.css';
import './main.js';
import { loadTranslator } from './translator.js';

export function loadHomePage() {
  document.querySelector('#app').innerHTML = `
    <div class="welcome-header-container">
      <h1 class="welcome-header">Welcome to TranslAItor!</h1>
      <button class="go-to-translator-btn" id="goToTranslatorBtn">Start Translating</button>
    </div>
  `;

  const button = document.querySelector('#goToTranslatorBtn');
  button.addEventListener('click', () => {
      loadTranslator();   
  });
}