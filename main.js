const mainMenu = document.querySelector('.mainMenu');
const closeMenu = document.querySelector('.closeMenu');
const openMenu = document.querySelector('.openMenu');
const menu_items = document.querySelectorAll('.mainMenu li a');




openMenu.addEventListener('click',show);
closeMenu.addEventListener('click',close);

// close menu when you click on a menu item 
menu_items.forEach(item => {
    item.addEventListener('click',function(){
        close();
    })
})

function show(){
    mainMenu.style.display = 'flex';
    mainMenu.style.top = '0';
}
function close(){
    mainMenu.style.top = '-100%';
}

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
    const topBtn = document.getElementById("topBtn");
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    const scrolledHeight = window.scrollY + windowHeight;

    if (scrolledHeight >= documentHeight) {
        topBtn.style.display = "block";
    } else {
        topBtn.style.display = "none";
    }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

document.addEventListener("DOMContentLoaded", function() {
    const undernameElement = document.querySelector('.undername');

    function fadeInUndername() {
        undernameElement.classList.add('fade-in');
    }

    setTimeout(fadeInUndername, 1000);
});

document.addEventListener("DOMContentLoaded", function() {
    const webdevElement = document.querySelector('.webdev');

    function fadeInWebdev() {
        webdevElement.classList.add('fade-in');
    }
    setTimeout(fadeInWebdev, 1000);
});

document.addEventListener("DOMContentLoaded", function() {
    const heroTextLeftLink = document.querySelector('.hero-text-left a');

    setTimeout(function() {
        heroTextLeftLink.classList.add('fade-in');
    }, 1100); 
    
    heroTextLeftLink.addEventListener('transitionend', function(event) {

        if (event.propertyName === 'transform' && event.target.classList.contains('fade-in')) {
            setTimeout(function() {
                heroTextLeftLink.classList.add('scale-back');
            }, 0); 
        }
    });
});

document.addEventListener("DOMContentLoaded", function() {
    const skillParagraphs = document.querySelectorAll('.skillspans p');

    setTimeout(function() {
        skillParagraphs[0].classList.add('fade-in');
    }, 1500); 

    skillParagraphs.forEach((paragraph, index) => {
        if (index > 0) {
            setTimeout(function() {
                paragraph.classList.add('fade-in');
            }, (index * 300) + 1000); 
        }
    });
});

// document.addEventListener("DOMContentLoaded", function() {
//     const titleElement = document.querySelector('.projects-h1');

//     window.addEventListener('scroll', function() {

//         const scrollHeight = document.documentElement.scrollHeight;
//         const clientHeight = window.innerHeight;

//         const seventyPercent = 0.05 * scrollHeight;

//         if (window.scrollY > seventyPercent) {
//             titleElement.classList.add('fade-in');
//         }
//     });
// });

// document.addEventListener("DOMContentLoaded", function() {
//     const project1Element = document.querySelector('.project1');
//     const project2Element = document.querySelector('.project2');
//     const project3Element = document.querySelector('.project3');

//     function checkFadeIn(element, delay) {
//         const scrollHeight = document.documentElement.scrollHeight;
//         const seventyPercent = 0.07 * scrollHeight;

//         if (window.scrollY > seventyPercent) {
//             setTimeout(function() {
//                 element.classList.add('fade-in');
//             }, delay);
//         }
//     }

//     window.addEventListener('scroll', function() {
//         checkFadeIn(project1Element, 0);
//         checkFadeIn(project2Element, 750);
//         checkFadeIn(project3Element, 1500); 
//     });
// });

document.addEventListener("DOMContentLoaded", function () {

  // ===== TITLE ANIMATION =====
  const title = document.querySelector(".video-title");
  if (title) {
    setTimeout(() => {
      title.classList.remove("hidden-title");
      title.classList.add("show-title");
    }, 1500);
  }

  // ===== SLIDER CORE =====
  const track = document.querySelector(".slide-track");
  const prevBtn = document.querySelector(".prev");
  const nextBtn = document.querySelector(".next");
  if (!track) return;

  let slides = Array.from(track.children);
  if (!slides.length) return;

  let slideWidth = slides[0].offsetWidth + 25;
  let index = 0;
  let currentTranslate = 0;

  // Clone slides for infinite loop (do it once)
  slides.forEach(slide => {
    const clone = slide.cloneNode(true);
    track.appendChild(clone);
  });

  slides = Array.from(track.children);
  const totalSlides = slides.length / 2;

  function updatePosition() {
    currentTranslate = -index * slideWidth;
    track.style.transform = `translateX(${currentTranslate}px)`;
  }

  function nextSlide() {
    index++;
    if (index >= totalSlides) index = 0;
    updatePosition();
  }

  function prevSlide() {
    index--;
    if (index < 0) index = totalSlides - 1;
    updatePosition();
  }

  if (prevBtn) prevBtn.addEventListener("click", prevSlide);
  if (nextBtn) nextBtn.addEventListener("click", nextSlide);

  // Keep sizing correct on resize
  window.addEventListener("resize", () => {
    // recalc width (in case responsive)
    const first = track.children[0];
    if (!first) return;

    slideWidth = first.offsetWidth + 25;

    // keep index consistent with current position
    index = Math.round(Math.abs(currentTranslate) / slideWidth) % totalSlides;
    updatePosition();
  }, { passive: true });

  // ===== Continuous auto-move (never reverses), pause on hover/touch, no catch-up =====
  let rafId = null;
  let isPaused = false;

  const SPEED = 70;     // px per second (adjust)
  const MAX_DT = 0.05;  // seconds (prevents speed jump after tab inactive)

  function loop(t) {
    if (!loop.last) loop.last = t;

    let dt = (t - loop.last) / 1000;
    if (dt > MAX_DT) dt = MAX_DT; // no catch-up
    loop.last = t;

    if (!isPaused) {
      const loopWidth = totalSlides * slideWidth;

      currentTranslate -= SPEED * dt;

      // keep translate always in [-loopWidth, 0)
      currentTranslate = -(((-currentTranslate) % loopWidth + loopWidth) % loopWidth);

      track.style.transform = `translateX(${currentTranslate}px)`;
    }

    rafId = requestAnimationFrame(loop);
  }

  function startContinuous() {
    if (rafId) cancelAnimationFrame(rafId);
    loop.last = 0;
    rafId = requestAnimationFrame(loop);
  }

  function pause() { isPaused = true; }
  function resume() { isPaused = false; }

  // Desktop hover
  track.addEventListener("mouseenter", pause);
  track.addEventListener("mouseleave", resume);

  // Mobile / touch interactions (tap video)
  track.addEventListener("pointerdown", pause, { passive: true });
  track.addEventListener("pointerup", resume, { passive: true });
  track.addEventListener("pointercancel", resume, { passive: true });
  track.addEventListener("touchstart", pause, { passive: true });
  track.addEventListener("touchend", resume, { passive: true });
  track.addEventListener("touchcancel", resume, { passive: true });

  // If iframe steals focus, pause; resume on focus back
  window.addEventListener("blur", pause);
  window.addEventListener("focus", () => { loop.last = 0; resume(); });

  // Tab switching: pause + reset time so no speed burst
  document.addEventListener("visibilitychange", () => {
    loop.last = 0;
    if (document.hidden) pause();
    else resume();
  });

  startContinuous();
});


