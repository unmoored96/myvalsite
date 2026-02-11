let heartSpeed = 6;      
let targetHeartSpeed = 14; 
let heartsInterval;
let heartsSlowInterval;


const allowedNames = ["Kamila"];

function createHeart() {
  const heart = document.createElement("div");
  heart.className = "heart";
  heart.innerText = "❤";
  heart.style.left = Math.random() * 100 + "vw";
  heart.style.animationDuration = heartSpeed + "s"; // always use current speed

  document.getElementById("hearts").appendChild(heart);

  setTimeout(() => heart.remove(), 15000); // hearts live longer so slowdown is visible
}


function startHearts() {
  if (heartsInterval) return;

  heartsInterval = setInterval(createHeart, 800);
}

function stopHearts() {
  clearInterval(heartsInterval);
  heartsInterval = null;

  // also stop any existing slow-down intervals
  clearInterval(heartsSlowInterval);
}

startHearts();

const closedChest = "pics/treasure-chest.png";
const openChest = "pics/open-chest.png";

const chest = document.getElementById("chest");
const slideshow = document.getElementById("slideshow");
const fadeWhite = document.getElementById("fadeWhite");
const loveMessage = document.getElementById("loveMessage");

const messageText = "Every moment with you is a treasure. \n It would be the greatest honour to spend the rest of my life \n filling up the chest with lots more memories of \n My world,my sweet pretty wife, moj skarbie.\n Kamila🌹 \n Happy Valentine's day❤️💍";

/* Click chest */
chest.addEventListener("click",()=>{
removeDiv();
  const name = prompt("Enter your name to open the treasure:");
  if(!name) return;

  if(allowedNames.map(n=>n.toLowerCase()).includes(name.toLowerCase())){
    startSlideshow();
  } else {
    alert("This treasure is not meant for you ❤️");
  }
});

/* Slideshow */
function startSlideshow(){
  const slides = document.querySelectorAll(".slide");
stopHearts();
document.getElementById("hearts").style.display = "none";

  chest.style.display="none";
  loveMessage.textContent="";
  slideshow.style.display="block";
  document.getElementById("music").play();

  let index=0;
  slides[index].classList.add("active");

  const interval = setInterval(()=>{
    slides[index].classList.remove("active");
    index++;

    if(index >= slides.length){
      clearInterval(interval);
      cinematicEnding();
      return;
    }

    slides[index].classList.add("active");
  },3500);
}

/* Cinematic ending */
function cinematicEnding(){
  fadeWhite.style.opacity="1";

  setTimeout(()=>{
    slideshow.style.display="none";
    fadeWhite.style.opacity="0";
    returnToChest();
  },2000);
}

/* Return to chest + typing + particles */
function returnToChest(){
document.getElementById("hearts").style.display = "block";
startHearts();
slowHeartsSmoothly();


  chest.src = openChest;
  chest.style.display="block";

  typeWriter(messageText, loveMessage, 70,600);
  startParticles();
}

/* Typewriter */
function typeWriter(text, element, speed, linePause = 500) {
  let i = 0;

  function typing() {
    if (i < text.length) {
      const char = text.charAt(i);

      if (char === "\n") {
        element.innerHTML += "<br>";       // insert line break
        i++;
        setTimeout(typing, linePause);     // pause longer at line break
      } else {
        element.innerHTML += char;
        i++;
        setTimeout(typing, speed);
      }
    }
  }

  typing();
}


/* Dreamy particles */
function startParticles(){
  setInterval(()=>{
    const p = document.createElement("div");
    p.className="particle";
    p.style.left = Math.random()*100+"vw";
    p.style.bottom = "-10px";
    p.style.animationDuration = (6+Math.random()*4)+"s";
    document.body.appendChild(p);
    setTimeout(()=>p.remove(),10000);
  },300);
}
function removeDiv(){
const clickMeDiv = document.getElementById('click-me-text');
clickMeDiv.remove();



}


function slowHeartsSmoothly() {
  // only run one interval at a time
  clearInterval(heartsSlowInterval);

  heartsSlowInterval = setInterval(() => {
    if (heartSpeed < targetHeartSpeed) {
      heartSpeed += 0.2; // small step for smooth transition

      // update existing hearts
      document.querySelectorAll('.heart').forEach(heart => {
        heart.style.animationDuration = heartSpeed + "s";
      });

    } else {
      heartSpeed = targetHeartSpeed;
      clearInterval(heartsSlowInterval);
    }
  }, 100); // update every 100ms
}
