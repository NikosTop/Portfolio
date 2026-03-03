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

  const slider = document.querySelector(".slider");
  const track = document.querySelector(".slide-track");
  if (!track || !slider) return;

  const isMobile = window.matchMedia?.("(hover: none) and (pointer: coarse)")?.matches;

  // IMPORTANT: no transitions for continuous move
  track.style.transition = "none";

  // Build a loop by cloning once so there are enough slides
  // (with 8 videos, duplicating once is plenty)
  const originals = Array.from(track.children);
  if (!originals.length) return;
  originals.forEach(slide => track.appendChild(slide.cloneNode(true)));

  // Measure one "step" (slide width + CSS gap)
  let step = 0;
  function measureStep() {
    const first = track.children[0];
    if (!first) return;

    const slideW = first.getBoundingClientRect().width;
    const gap = parseFloat(getComputedStyle(track).gap || getComputedStyle(track).columnGap || "0") || 0;
    step = slideW + gap;
  }
  measureStep();
  window.addEventListener("resize", measureStep, { passive: true });

  // Continuous state
  let x = 0;
  let rafId = null;
  let paused = false;

  // Mobile: lock pause after tap (resume only when page scrolls)
  let mobileLocked = false;

  const SPEED = 70;    // px/sec
  const MAX_DT = 0.05;

  function setX(v) {
    x = v;
    // rounding removes tiny shimmer
    track.style.transform = `translate3d(${Math.round(x)}px,0,0)`;
  }

  function tick(t) {
    if (!tick.last) tick.last = t;
    let dt = (t - tick.last) / 1000;
    if (dt > MAX_DT) dt = MAX_DT;
    tick.last = t;

    if (!paused && step > 0) {
      setX(x - SPEED * dt);

      // ✅ NO TELEPORT WRAP:
      // when we've moved left by at least one step,
      // move the first slide to the end and compensate x by +step
      while (-x >= step) {
        track.appendChild(track.firstElementChild);
        setX(x + step);
      }
    }

    rafId = requestAnimationFrame(tick);
  }

  function start() {
    if (rafId) cancelAnimationFrame(rafId);
    tick.last = 0;
    rafId = requestAnimationFrame(tick);
  }

  function pause(lockOnMobile = false) {
    paused = true;
    if (isMobile && lockOnMobile) mobileLocked = true;
  }

  function resume() {
    if (isMobile && mobileLocked) return;
    paused = false;
  }

  // Desktop: pause on hover
  slider.addEventListener("mouseenter", () => { if (!isMobile) pause(false); });
  slider.addEventListener("mouseleave", () => { if (!isMobile) resume(); });

  // ✅ Mobile: pause when user taps the slider area (including iframes)
  // Use CAPTURE so it fires before the iframe eats it.
  if (isMobile) {
    slider.addEventListener("touchstart", () => pause(true), { passive: true, capture: true });
    slider.addEventListener("pointerdown", () => pause(true), { passive: true, capture: true });

    // Resume ONLY when page scrolls (or touchmove scroll)
    let lastY = window.scrollY;
    const unlockOnScroll = () => {
      const y = window.scrollY;
      if (y !== lastY && mobileLocked) {
        mobileLocked = false;
        paused = false;
      }
      lastY = y;
    };
    window.addEventListener("scroll", unlockOnScroll, { passive: true });
    window.addEventListener("touchmove", unlockOnScroll, { passive: true });
  }

  // Avoid speed burst after tab switch
  document.addEventListener("visibilitychange", () => {
    tick.last = 0;
    if (document.hidden) paused = true;
    else if (!(isMobile && mobileLocked)) paused = false;
  });
  window.addEventListener("focus", () => { tick.last = 0; });

  // Start
  setX(0);
  start();
});




