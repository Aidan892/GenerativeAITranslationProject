import '../style.css';  
import './translator.js';
import { loadTranslator } from './translator.js'; 


document.addEventListener('DOMContentLoaded', () => {
  const translatorLink = document.querySelector('#translatorLink');
  translatorLink.addEventListener('click', (event) => {
    event.preventDefault();  
    loadTranslator();   
  });
});

