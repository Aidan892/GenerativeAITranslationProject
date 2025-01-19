import '../style.css';  
import './translator.js';
import { loadTranslator } from './translator.js'; 
import { loadHomePage } from './Home.js';
import { loadAboutPage } from './About.js';


document.addEventListener('DOMContentLoaded', () => {

  loadHomePage();

  //Translator
  const translatorLink = document.querySelector('#translatorLink');
  if(translatorLink){
    translatorLink.addEventListener('click', (event) => {
      event.preventDefault(); 
      loadTranslator();   
    });
  }

  //Home Page
  const homePageLink = document.querySelector('#HomePage');
  if (homePageLink) {
    homePageLink.addEventListener('click', (event) => {
      event.preventDefault();
      loadHomePage(); 
    });
  }

  const AboutPageLink = document.querySelector('#AboutPage');
  if (homePageLink) {
    AboutPageLink.addEventListener('click', (event) => {
      event.preventDefault();
      loadAboutPage(); 
    });
  }
});


