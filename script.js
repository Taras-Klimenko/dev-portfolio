// Navigation
const nav = document.getElementById('nav');
const menuIcon = document.querySelector('.menu-icon');

function toggleMenu() {
  nav.classList.toggle('active');
  menuIcon.classList.toggle('active');
}

function hideMenu() {
  nav.classList.remove('active');
  menuIcon.classList.remove('active');
}

// Slideshow
let currentImageIndex = 0;
const slideshowImages = document.querySelectorAll('.slide');

function switchImage() {
  slideshowImages[currentImageIndex].classList.remove('active');
  currentImageIndex = (currentImageIndex + 1) % slideshowImages.length;
  slideshowImages[currentImageIndex].classList.add('active');
}

setInterval(switchImage, 5000);

let currentProjectImageIndex = 0;
const slideshowProjectImages = document.querySelectorAll('.project-slide');

function switchProjectImage() {
  slideshowProjectImages[currentProjectImageIndex].classList.remove('active');
  currentProjectImageIndex =
    (currentProjectImageIndex + 1) % slideshowProjectImages.length;
  slideshowProjectImages[currentProjectImageIndex].classList.add('active');
}

setInterval(switchProjectImage, 5000);

let currentProjectImageIndex2 = 0;
const slideshowProjectImages2 = document.querySelectorAll('.project-slide-2');

function switchProjectImage2() {
  slideshowProjectImages2[currentProjectImageIndex2].classList.remove('active');
  currentProjectImageIndex2 =
    (currentProjectImageIndex2 + 1) % slideshowProjectImages2.length;
  slideshowProjectImages2[currentProjectImageIndex2].classList.add('active');
}

setInterval(switchProjectImage2, 5000);

// Banner

const bannerContent = document.getElementById('bannerContent');
let messageHTML =
  '<span class="contact-message">Contact me at tarasklimenko.1989@gmail.com &nbsp;&nbsp;&nbsp; - &nbsp;&nbsp;&nbsp; Let\'s work together! &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; - </span>';
let repeatedMessage = messageHTML.repeat(10);
// Setting repeated message as a content
bannerContent.innerHTML = repeatedMessage + repeatedMessage;

// Houdini ParalleloWow Background
CSS.paintWorklet.addModule(
  'https://unpkg.com/parallelowow@0.1.5/parallelowow.js'
);

let lastScrollTop = 0;
let throttleTimeout = null;

window.addEventListener('scroll', () => {
  if (!throttleTimeout) {
    throttleTimeout = setTimeout(() => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      if (Math.abs(scrollTop - lastScrollTop) > 100) {
        lastScrollTop = scrollTop;
        // Call a function to update the background or other actions
      }
      throttleTimeout = null;
    }, 1000); // Adjust the delay as needed
  }
});
