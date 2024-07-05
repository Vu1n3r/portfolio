const track = document.querySelector(".carousel__track");
const slides = Array.from(track.children);
const trackContainer = document.querySelector(".carousel__track-container")
const carousel = document.querySelector(".carousel")
const btnsnav = document.querySelector(".carousel__nav");
const btns = Array.from(btnsnav.children);
const slideWidth = slides[0].getBoundingClientRect().width;
const header = document.querySelector(".abumalik")

//initiate gsap for loading page
gsap.fromTo('.loading-page' , {opacity: 1,zIndex:10}, {
  opacity:0,
  duration:1.5,
  delay:3.5,
  zIndex:-3
})

gsap.fromTo('.logo-name', {
  y:50,
  opacity:0
}, {
  y:0,
  opacity:1
})
//arrange slides next to each other
slides.forEach((slide, index) => {
  slide.style.left = slideWidth * index + 'px';
})
const moveToSlide = (track, currentSlide, targetSlide) => {
  track.style.transform = `translateX(-${targetSlide.style.left})`
  currentSlide.classList.remove("current-slide");
  targetSlide.classList.add("current-slide");
}

// use buttons to navigate
btnsnav.addEventListener("click", e => {
  // what did you press?
  const targetButton = e.target.closest("button");//check if a button was clicked

  if (!targetButton) return;

  const currentSlide = track.querySelector(".current-slide");
  const targetIndex = btns.findIndex(btn => btn === targetButton);
  const targetSlide = slides[targetIndex];

  moveToSlide(track, currentSlide, targetSlide);
})

//code for background effects
Array.from(document.getElementsByClassName("carousel__indicator"))
  .forEach((item, index) => {
    item.onmouseover = () => {
      carousel.dataset.activeIndex = index;
    }
  })

//content container effect
trackContainer.onmousemove = e => {
  const rect = trackContainer.getBoundingClientRect(),
    x = e.clientX - rect.left,
    y = e.clientY - rect.top;

  trackContainer.style.setProperty("--mouse-x", `${x}px`);
  trackContainer.style.setProperty("--mouse-y", `${y}px`);
}

//header effect
  const letters = "QWERTYUIOPLKJHGFDSAZXCVBNM";
  const ARletters = "ضصثقفغعهخحشسيبلاتنمئءؤرلاىة";
  let interval = null;
  let useArabic = true; // Flag to toggle between English and Arabic


  header.onmouseover = (e) => {
    let iterations = 0;
    clearInterval(interval);

    // Determine which text to display based on the flag
    const targetValue = useArabic ? e.target.dataset.value2 : e.target.dataset.value;
    const lettersArray = useArabic ? ARletters : letters;

    interval = setInterval(() => {
      e.target.innerText = targetValue.split("")
        .map((letter, index) => {
          if (index < iterations) {
            return targetValue[index];
          }
          return lettersArray[Math.floor(Math.random() * lettersArray.length)];
        })
        .join("");

      if (iterations >= targetValue.length) {
        clearInterval(interval);
        e.target.innerText = targetValue; // Set the final correct text
        useArabic = !useArabic; // Toggle for the next mouseover
      }
      iterations += 1 / 2;
    }, 35);
  };



// style buttons
(function setGlowEffectRx() {
  const glowEffects = document.querySelectorAll(".glow-effect");

  glowEffects.forEach((glowEffect) => {
    const glowLines = glowEffect.querySelectorAll("rect");
    const rx = getComputedStyle(glowEffect).borderRadius;

    glowLines.forEach((line) => {
      line.setAttribute("rx", rx);
    });
  });
})();