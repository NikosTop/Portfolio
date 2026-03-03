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
  const slider = document.querySelector(".slider");
  const track = document.querySelector(".slide-track");
  const prevBtn = document.querySelector(".prev");
  const nextBtn = document.querySelector(".next");
  if (!slider || !track) return;

  const isMobile = window.matchMedia?.("(hover: none) and (pointer: coarse)")?.matches;

  // Prevent reverse/jump animation during loop
  track.style.transition = "none";

  // Clone once for infinite feel
  const originals = Array.from(track.children);
  if (!originals.length) return;
  originals.forEach(s => track.appendChild(s.cloneNode(true)));

  // Measures (slide width + CSS gap)
  let step = 0;
  function measureStep() {
    const first = track.children[0];
    if (!first) return;

    const w = first.getBoundingClientRect().width;
    const cs = getComputedStyle(track);
    const gap = parseFloat(cs.gap || cs.columnGap || "0") || 0;

    step = w + gap;
  }

  // Continuous state
  let x = 0;
  let rafId = null;
  let paused = false;

  // Mobile: lock pause after any video interaction (resume ONLY on page scroll)
  let mobileLocked = false;

  const SPEED = 70;    // px/sec
  const MAX_DT = 0.05;

  function setX(v) {
    x = v;
    track.style.transform = `translate3d(${Math.round(x)}px,0,0)`;
  }

  // Conveyor-belt loop (no teleport wrap => no blink)
  function tick(t) {
    if (!tick.last) tick.last = t;

    let dt = (t - tick.last) / 1000;
    if (dt > MAX_DT) dt = MAX_DT;
    tick.last = t;

    if (!paused && step > 0) {
      setX(x - SPEED * dt);

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
    if (isMobile && mobileLocked) return; // only scroll unlocks on mobile
    paused = false;
  }

  // Desktop: pause on hover
  slider.addEventListener("mouseenter", () => { if (!isMobile) pause(false); });
  slider.addEventListener("mouseleave", () => { if (!isMobile) resume(); });

  // Mobile: resume ONLY on page scroll (your requirement)
  if (isMobile) {
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

  // No speed burst after tab switching
  document.addEventListener("visibilitychange", () => {
    tick.last = 0;
    if (document.hidden) paused = true;
    else if (!(isMobile && mobileLocked)) paused = false;
  });
  window.addEventListener("focus", () => { tick.last = 0; });

  // ===== Buttons (like at the start: instant one-step jump) =====
  function next() {
    if (!step) return;

    // move left by one step instantly
    pause(false);
    track.style.transition = "none";

    setX(x - step);

    // normalize DOM so the conveyor loop stays stable
    track.appendChild(track.firstElementChild);
    setX(x + step);

    // resume (unless mobile is locked)
    if (!(isMobile && mobileLocked)) resume();
  }

  function prev() {
    if (!step) return;

    pause(false);
    track.style.transition = "none";

    // bring last to front and compensate so it looks like moving right by one
    track.insertBefore(track.lastElementChild, track.firstElementChild);
    setX(x - step); // compensate to keep current visual position

    // then jump back to original x (instant)
    setX(x);

    if (!(isMobile && mobileLocked)) resume();
  }

  if (nextBtn) nextBtn.addEventListener("click", next);
  if (prevBtn) prevBtn.addEventListener("click", prev);

  // ===== ✅ YouTube API: pause on PLAYING OR PAUSED (mobile requirement) =====
  function hookYouTubePause() {
    if (!window.YT || !YT.Player) return;

    const iframes = track.querySelectorAll("iframe");
    iframes.forEach((iframe) => {
      if (iframe._ytBound) return;
      iframe._ytBound = true;

      new YT.Player(iframe, {
        events: {
          onStateChange: (e) => {
            // PLAYING = 1, PAUSED = 2
            if (e.data === YT.PlayerState.PLAYING || e.data === YT.PlayerState.PAUSED) {
              // lock pause on mobile; on desktop just pause (optional)
              pause(true);
            }
          }
        }
      });
    });
  }

  if (window.YT && YT.Player) {
    hookYouTubePause();
  } else {
    const prevReady = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = function () {
      if (typeof prevReady === "function") prevReady();
      hookYouTubePause();
    };
  }

  // init
  measureStep();
  window.addEventListener("resize", measureStep, { passive: true });

  setX(0);
  start();
});



