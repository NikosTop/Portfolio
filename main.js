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

  // make sure wrapping never animates backwards
  track.style.transition = "none";

  const isMobile = window.matchMedia?.("(hover: none) and (pointer: coarse)")?.matches;

  let originals = Array.from(track.children);
  if (!originals.length) return;

  // clone ONCE
  originals.forEach(slide => track.appendChild(slide.cloneNode(true)));

  const totalSlides = originals.length;

  // measurements (REAL gap from CSS)
  let slideWidth = 0;
  let gap = 0;
  let loopWidth = 0;

  function measure() {
    const first = track.children[0];
    if (!first) return;

    const rect = first.getBoundingClientRect();
    slideWidth = rect.width;

    const cs = getComputedStyle(track);
    // gap can be "25px" or "15px" depending on media query
    gap = parseFloat(cs.gap || cs.columnGap || "0") || 0;

    loopWidth = totalSlides * (slideWidth + gap);
  }

  // Continuous state
  let currentTranslate = 0;
  let rafId = null;
  let paused = false;

  // Mobile “lock pause until page scroll”
  let mobileLockPaused = false;

  const SPEED = 70;     // px/sec
  const MAX_DT = 0.05;  // prevents “speed burst” after tab switch

  function applyTransform(x) {
    // snap to whole pixels to avoid micro-mismatch blink
    const px = Math.round(x);
    track.style.transform = `translate3d(${px}px, 0, 0)`;
  }

  function wrap() {
    // keep x in [-loopWidth, 0)
    currentTranslate = -(((-currentTranslate) % loopWidth + loopWidth) % loopWidth);
  }

  function loop(t) {
    if (!loop.last) loop.last = t;

    let dt = (t - loop.last) / 1000;
    if (dt > MAX_DT) dt = MAX_DT;
    loop.last = t;

    if (!paused) {
      currentTranslate -= SPEED * dt;
      wrap();
      applyTransform(currentTranslate);
    }

    rafId = requestAnimationFrame(loop);
  }

  function start() {
    if (rafId) cancelAnimationFrame(rafId);
    loop.last = 0;
    rafId = requestAnimationFrame(loop);
  }

  function pause(lockOnMobile = false) {
    paused = true;
    if (isMobile && lockOnMobile) mobileLockPaused = true;
  }

  function resume() {
    if (isMobile && mobileLockPaused) return;
    paused = false;
  }

  // Desktop: pause only on hover
  track.addEventListener("mouseenter", () => { if (!isMobile) pause(false); });
  track.addEventListener("mouseleave", () => { if (!isMobile) resume(); });

  // Mobile: pause+LOCK when user taps slider/video (capture helps with iframe)
  if (isMobile) {
    // capture=true to fire before iframe eats the touch
    track.addEventListener("touchstart", () => pause(true), { passive: true, capture: true });
    track.addEventListener("pointerdown", () => pause(true), { passive: true, capture: true });

    // Resume ONLY when the page scrolls (portrait + landscape)
    let lastY = window.scrollY;
    const unlockIfScrolled = () => {
      const y = window.scrollY;
      if (y !== lastY && mobileLockPaused) {
        mobileLockPaused = false;
        paused = false;
      }
      lastY = y;
    };

    window.addEventListener("scroll", unlockIfScrolled, { passive: true });
    window.addEventListener("touchmove", unlockIfScrolled, { passive: true });
  }

  // Tab switching: no catch-up
  document.addEventListener("visibilitychange", () => {
    loop.last = 0;
    if (document.hidden) paused = true;
    else if (!(isMobile && mobileLockPaused)) paused = false;
  });

  window.addEventListener("focus", () => { loop.last = 0; });

  // Buttons: nudge by 1 slide (no easing, but stable)
  function nudge(dir) {
    // dir: -1 = next (left), +1 = prev (right)
    currentTranslate += dir * (slideWidth + gap);
    wrap();
    applyTransform(currentTranslate);
  }

  if (nextBtn) nextBtn.addEventListener("click", () => nudge(-1));
  if (prevBtn) prevBtn.addEventListener("click", () => nudge(+1));

  // init
  measure();
  wrap();
  applyTransform(currentTranslate);
  start();

  window.addEventListener("resize", () => {
    measure();
    wrap();
    applyTransform(currentTranslate);
  }, { passive: true });
});



