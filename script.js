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

// const bannerContent = document.getElementById('bannerContent');
// let messageHTML =
//   '<span class="contact-message">Contact me at tarasklimenko.1989@gmail.com &nbsp;&nbsp;&nbsp; - &nbsp;&nbsp;&nbsp; Let\'s work together! &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; - </span>';
// let repeatedMessage = messageHTML.repeat(10);
// // Setting repeated message as a content
// bannerContent.innerHTML = repeatedMessage + repeatedMessage;

// Houdini ParalleloWow Background
CSS.paintWorklet
  .addModule('https://unpkg.com/parallelowow@0.1.5/parallelowow.js')
  .then(() => {
    generateStaticBackground();
  });

function generateStaticBackground() {
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');

  // Set canvas dimensions (adjust as needed)
  const width = window.innerWidth;
  const height = window.innerHeight;
  canvas.width = width;
  canvas.height = height;

  // Define the custom properties
  const tileWidth = 60;
  const baseColor = '#ff5566';
  const colorStep = 0;
  const probability = 0.25;
  const strokeWeight = 0.5;

  context.strokeStyle = '#FFFFFF';
  context.lineWidth = strokeWeight;

  // Setup tile dimensions and other calculations
  const radians = (Math.PI / 180) * 39.375;
  const tileHeight = tileWidth * 0.25;
  const yTiles = Math.ceil(height / tileHeight);
  const xTiles = Math.ceil(width / tileWidth);
  const outerRadius = Math.max(width, height) * 2;

  // Helper functions
  function isValidHexColor(hex) {
    return /^#?(?:[0-9a-f]{3}){1,2}$/i.test(hex);
  }

  function hexToRgb(hex) {
    if (/^#/i.test(hex)) {
      hex = hex.replace('#', '');
    }
    if (hex.length === 3) {
      hex = `${hex[0]}${hex[0]}${hex[1]}${hex[1]}${hex[2]}${hex[2]}`;
    }
    return `rgb(${parseInt(hex.substring(0, 2), 16)}, ${parseInt(
      hex.substring(2, 4),
      16
    )}, ${parseInt(hex.substring(4, 6), 16)})`;
  }

  function adjustBrightness(colorString, amt) {
    let rgbString = isValidHexColor(colorString)
      ? hexToRgb(colorString)
      : colorString;
    rgbString = rgbString
      .replace(/rgba?\(/g, '')
      .replace(/\)/g, '')
      .replace(/\s/g, '');
    const rgbParts = rgbString.split(',').map((rgbPart, index) => {
      if (index > 2) return rgbPart;
      rgbPart = parseInt(rgbPart) + amt;
      return Math.max(0, Math.min(255, rgbPart));
    });
    return `rgb(${rgbParts.join(',')})`;
  }

  let colors = [
    baseColor,
    adjustBrightness(baseColor, -10),
    adjustBrightness(baseColor, -30),
  ];

  // Start drawing tiles
  for (let y = -1; y < yTiles; y++) {
    const yOffset = y * tileHeight;
    for (let x = -1; x < xTiles + y; x++) {
      if (Math.random() > probability) {
        const xOffset = x * tileWidth - y * tileHeight;

        // Coordinates for the parallelogram
        const upperLeftX = xOffset;
        const upperLeftY = yOffset;
        const upperRightX = xOffset + tileWidth;
        const upperRightY = yOffset;
        const lowerRightX = xOffset + (tileWidth - tileHeight);
        const lowerRightY = yOffset + tileHeight;
        const lowerLeftX = xOffset - tileHeight;
        const lowerLeftY = lowerRightY;

        // Draw right shape
        context.fillStyle = colors[1];
        context.beginPath();
        context.moveTo(upperRightX, upperRightY);
        context.lineTo(
          Math.cos(radians) * outerRadius,
          Math.sin(radians) * outerRadius
        );
        context.lineTo(lowerRightX, lowerRightY);
        context.closePath();
        context.fill();
        if (strokeWeight > 0) context.stroke();

        // Draw lower left shape
        context.fillStyle = colors[2];
        context.beginPath();
        context.moveTo(lowerRightX, lowerRightY);
        context.lineTo(
          Math.cos(radians) * outerRadius,
          Math.sin(radians) * outerRadius
        );
        context.lineTo(lowerLeftX, lowerLeftY);
        context.closePath();
        context.fill();
        if (strokeWeight > 0) context.stroke();

        // Draw parallelogram cap
        context.fillStyle = colors[0];
        context.beginPath();
        context.moveTo(upperLeftX, upperLeftY);
        context.lineTo(upperRightX, upperRightY);
        context.lineTo(lowerRightX, lowerRightY);
        context.lineTo(lowerLeftX, lowerLeftY);
        context.closePath();
        context.fill();
        if (strokeWeight > 0) context.stroke();
      }
    }
    // Slightly darken colors for next row
    colors = colors.map((colorKey) => adjustBrightness(colorKey, colorStep));
  }

  // Convert the canvas to a data URL
  const dataURL = canvas.toDataURL();

  // Set the data URL as the background image
  document.getElementById('contact').style.backgroundImage = `url(${dataURL})`;
}
