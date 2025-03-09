import '../style.css';
import './main.js';

export function loadAboutPage() {
  document.querySelector('#app').innerHTML = `
    <div class="about-container">
      
      <p>
        Welcome to this AI-powered programming language translator! This platform helps developers convert code 
        between different programming languages while also providing explanations for algorithms and other programming queries.
      </p>

      <h2>Features:</h2>
      <ul class="about-list">
        <li>🔄 Translate code between multiple programming languages</li>
        <li>💡 Get AI-generated explanations for algorithms</li>
        <li>🤖 Ask AI programming-related questions in real-time</li>
        <li>📚 Learn new programming concepts interactively</li>
      </ul>

      <h2>Why Use This Tool?</h2>
      <p>
        Whether you're learning a new language, debugging code, or simply exploring different ways to solve problems, 
        this AI assistant provides reliable and efficient translations while also explaining complex concepts in an easy-to-understand way, allocating more time to problem solving and logical thinking!
      </p>
    </div>
  `;
}
