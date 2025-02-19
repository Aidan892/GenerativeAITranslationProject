import '../style.css';  
import './translator.js';
import { loadTranslator } from './translator.js'; 
import { loadHomePage } from './home.js';
import { loadAboutPage } from './about.js';


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

document.addEventListener("DOMContentLoaded", function () {
  let lastScrollTop = 0;
  const navbar = document.querySelector("nav");

  window.addEventListener("scroll", function () {
      let scrollTop = window.scrollY || document.documentElement.scrollTop;

      if (scrollTop > lastScrollTop && scrollTop > 50) {
          // Scrolling down - Hide navbar
          navbar.style.top = "-120px"; 
      } else {
          // Scrolling up - Show navbar
          navbar.style.top = "0";
      }

      lastScrollTop = scrollTop;
  });
});



