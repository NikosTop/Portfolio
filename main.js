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

  // Detect mobile-ish (coarse pointer / no hover)
  const isMobile = window.matchMedia?.("(hover: none) and (pointer: coarse)")?.matches;

  let slides = Array.from(track.children);
  if (!slides.length) return;

  // Ensure NO transform transitions (prevents “reverse” on wrap)
  track.style.transition = "none";

  let slideWidth = slides[0].offsetWidth + 25; // keep your spacing
  const baseCount = slides.length;

  // Clone slides ONCE for seamless loop
  for (let i = 0; i < baseCount; i++) {
    track.appendChild(slides[i].cloneNode(true));
  }

  // Recompute
  slides = Array.from(track.children);
  const totalSlides = baseCount; // original set count
  let loopWidth = totalSlides * slideWidth;

  // Continuous state
  let currentTranslate = 0;
  let rafId = null;

  // Pause logic
  let paused = false;

  // Mobile: when user taps video/slider, lock paused until PAGE scroll happens
  let mobileLockPaused = false;

  const SPEED = 70;      // px/sec
  const MAX_DT = 0.05;   // prevents “speed burst” after tab inactive

  function recalc() {
    // Recalc width responsively
    const first = track.children[0];
    if (!first) return;

    slideWidth = first.offsetWidth + 25;
    loopWidth = totalSlides * slideWidth;

    // Keep translate in range
    currentTranslate = -(((-currentTranslate) % loopWidth + loopWidth) % loopWidth);
    track.style.transform = `translateX(${currentTranslate}px)`;
  }
  window.addEventListener("resize", recalc, { passive: true });

  function loop(t) {
    if (!loop.last) loop.last = t;

    let dt = (t - loop.last) / 1000;
    if (dt > MAX_DT) dt = MAX_DT;
    loop.last = t;

    if (!paused) {
      currentTranslate -= SPEED * dt;

      // ✅ Seamless wrap, ALWAYS moving left, NEVER reversing.
      // keep translate always in [-loopWidth, 0)
      currentTranslate = -(((-currentTranslate) % loopWidth + loopWidth) % loopWidth);

      track.style.transform = `translateX(${currentTranslate}px)`;
    }

    rafId = requestAnimationFrame(loop);
  }

  function start() {
    if (rafId) cancelAnimationFrame(rafId);
    loop.last = 0;
    rafId = requestAnimationFrame(loop);
  }

  function pauseContinuous(lockOnMobile = false) {
    paused = true;
    if (isMobile && lockOnMobile) mobileLockPaused = true;
  }

  function resumeContinuous() {
    // On mobile, only resume if not locked
    if (isMobile && mobileLockPaused) return;
    paused = false;
  }

  // Desktop behavior: pause on hover only
  track.addEventListener("mouseenter", () => {
    if (!isMobile) pauseContinuous(false);
  });
  track.addEventListener("mouseleave", () => {
    if (!isMobile) resumeContinuous();
  });

  // Mobile behavior:
  // - Any tap inside the slider (including on iframe/video) => pause and LOCK
  // - It will resume ONLY when the user scrolls the PAGE
  if (isMobile) {
    track.addEventListener("touchstart", () => pauseContinuous(true), { passive: true });
    track.addEventListener("pointerdown", () => pauseContinuous(true), { passive: true });

    // ✅ Resume ONLY on page scroll (mobile)
    let scrollResumeTimer = null;
    window.addEventListener(
      "scroll",
      () => {
        if (!mobileLockPaused) return;

        // small debounce so it doesn't flicker
        clearTimeout(scrollResumeTimer);
        scrollResumeTimer = setTimeout(() => {
          mobileLockPaused = false;
          paused = false;
        }, 120);
      },
      { passive: true }
    );
  }

  // Tab switching: pause + reset time so no speed burst
  document.addEventListener("visibilitychange", () => {
    loop.last = 0;
    if (document.hidden) paused = true;
    else {
      // keep mobile lock behavior
      if (!(isMobile && mobileLockPaused)) paused = false;
    }
  });

  window.addEventListener("focus", () => {
    loop.last = 0;
  });

  // Buttons should work without fighting the continuous translate:
  // We’ll “nudge” translate by one slide (still no transition)
  function nudge(dir) {
    pauseContinuous(false); // optional: momentarily pause while clicking
    currentTranslate += dir * slideWidth; // dir = +1 (right), -1 (left) in translate space
    currentTranslate = -(((-currentTranslate) % loopWidth + loopWidth) % loopWidth);
    track.style.transform = `translateX(${currentTranslate}px)`;

    // If on mobile and it was locked by video tap, keep it locked.
    // Otherwise resume after a short moment.
    if (!(isMobile && mobileLockPaused)) {
      setTimeout(() => (paused = false), 80);
    }
  }

  if (nextBtn) nextBtn.addEventListener("click", () => nudge(-1)); // move left to next
  if (prevBtn) prevBtn.addEventListener("click", () => nudge(+1)); // move right to prev

  recalc();
  start();
});


