export function loadHomePage() {
  document.querySelector('#app').innerHTML = `
    <div class="welcome-header-container">
      <h1 class="welcome-header">Welcome to Transl<span class="ai">AI</span>tor!</h1>
      <div class="button-learnmore-wrapper">
        <button class="go-to-translator-btn" id="goToTranslatorBtn">Start Translating</button>
        <div class="learn-more-container">
          <a href="#languageSupport" class="learn-more-link">
            Learn More <span class="caret">&#9660;</span>
          </a>
        </div>
      </div>
    </div>
    <div class="language-support-container" id="languageSupport">
      <h2>Supported Programming Languages</h2>
      <p>Translate code between multiple languages seamlessly!</p>
      <div class="code-example">
        <pre>
          <span class="line">// Print a message to the console - JavaScript</span>
          <span class="line">console.log('Hello, World!');</span>
          <span class="line"></span> <!-- Empty line for spacing -->
          <span class="line"># Print a message to the console - Python</span>
          <span class="line">print("Hello, World!")</span>
          <span class="line"></span> <!-- Empty line for spacing -->
        </pre>
      </div>
    </div>
  `;

  const translateBtn = document.querySelector('#goToTranslatorBtn');
  translateBtn.addEventListener('click', () => {
    loadTranslator();   
  });

  const learnMoreLink = document.querySelector('.learn-more-link');
  learnMoreLink.addEventListener('click', (e) => {
    e.preventDefault();
    document.querySelector(learnMoreLink.getAttribute('href')).scrollIntoView({ behavior: 'smooth' });
  });
}
