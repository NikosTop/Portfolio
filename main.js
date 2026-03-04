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

  // ✅ IMPORTANT: DO NOT CLONE (cloning duplicates YouTube iframes -> mobile crashes)
  const originals = Array.from(track.children);
  if (!originals.length) return;

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

  // Mobile: lock pause after video interaction (resume on scroll/swipe or arrows)
  let mobileLocked = false;

  // ✅ run only when slider is visible (saves CPU, prevents long-idle crashes)
  let inView = true;
  const io = new IntersectionObserver(
    ([entry]) => { inView = entry.isIntersecting; },
    { threshold: 0.15 }
  );
  io.observe(slider);

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

    if (!paused && inView && step > 0) {
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

  function unlockAndResume() {
    if (isMobile) mobileLocked = false;
    paused = false;
    tick.last = 0;
  }

  function resume() {
    if (isMobile && mobileLocked) return;
    paused = false;
  }

  // Desktop: pause on hover
  slider.addEventListener("mouseenter", () => { if (!isMobile) pause(false); });
  slider.addEventListener("mouseleave", () => { if (!isMobile) resume(); });

  // Mobile: unlock/resume on real scroll OR vertical swipe gesture
  if (isMobile) {
    let lastY = window.scrollY;

    const unlock = () => {
      if (!mobileLocked) return;
      mobileLocked = false;
      paused = false;
      tick.last = 0;
    };

    window.addEventListener("scroll", () => {
      const y = window.scrollY;
      if (y !== lastY) unlock();
      lastY = y;
    }, { passive: true });

    let startTouchY = null;
    document.addEventListener("touchstart", (e) => {
      startTouchY = e.touches?.[0]?.clientY ?? null;
    }, { passive: true, capture: true });

    document.addEventListener("touchmove", (e) => {
      if (!mobileLocked || startTouchY == null) return;
      const y = e.touches?.[0]?.clientY;
      if (y == null) return;
      if (Math.abs(y - startTouchY) > 18) {
        unlock();
        startTouchY = null;
      }
    }, { passive: true, capture: true });
  }

  // No speed burst after tab switching
  document.addEventListener("visibilitychange", () => {
    tick.last = 0;
    if (document.hidden) paused = true;
    else if (!(isMobile && mobileLocked)) paused = false;
  });
  window.addEventListener("focus", () => { tick.last = 0; });

  // ===== Buttons (prev/next) + spam protection (prevents crashes) =====
  let lastTap = 0;
  const TAP_COOLDOWN = 140; // ms

  function canTapNow(){
    const now = performance.now();
    if (now - lastTap < TAP_COOLDOWN) return false;
    lastTap = now;
    return true;
  }

  function next() {
    if (!step) return;
    unlockAndResume();
    track.appendChild(track.firstElementChild);
    setX(x);
  }

  function prev() {
    if (!step) return;
    unlockAndResume();
    track.insertBefore(track.lastElementChild, track.firstElementChild);
    setX(x);
  }

  function bindArrow(btn, fn){
    if (!btn) return;
    btn.addEventListener("pointerdown", (e) => {
      e.preventDefault();
      e.stopPropagation();
      if (!canTapNow()) return;
      fn();
    }, { passive: false });
  }

  // Use pointerdown only (avoid click duplicates on mobile)
  bindArrow(nextBtn, next);
  bindArrow(prevBtn, prev);

  // ===== YouTube API: pause/lock + 1-tap play on mobile (S24 fix) =====
  const players = new Map();   // iframe -> player
  const playQueue = new Set(); // iframes to play when ready

  function hookYouTube() {
    if (!window.YT || !YT.Player) return;

    const iframes = track.querySelectorAll("iframe");
    iframes.forEach((iframe) => {
      if (iframe._ytBound) return;
      iframe._ytBound = true;

      const player = new YT.Player(iframe, {
        events: {
          onReady: () => {
            players.set(iframe, player);
            if (playQueue.has(iframe)) {
              playQueue.delete(iframe);
              try { player.playVideo(); } catch (_) {}
            }
          },
          onStateChange: (e) => {
            // lock slider on PLAYING or PAUSED
            if (e.data === YT.PlayerState.PLAYING || e.data === YT.PlayerState.PAUSED) {
              pause(true);
            }
          }
        }
      });

      // store early too
      players.set(iframe, player);
    });
  }

  if (window.YT && YT.Player) {
    hookYouTube();
  } else {
    const prevReady = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = function () {
      if (typeof prevReady === "function") prevReady();
      hookYouTube();
    };
  }

  // Mobile: 1 tap on iframe should play (even on S24 Ultra)
  if (isMobile) {
    slider.addEventListener("pointerdown", (e) => {
      const iframe =
        e.target?.tagName === "IFRAME" ? e.target : e.target?.closest?.("iframe");
      if (!iframe) return;

      pause(true); // stop slider immediately

      const p = players.get(iframe);
      if (p && typeof p.playVideo === "function") {
        try { p.playVideo(); } catch (_) {}
      } else {
        playQueue.add(iframe);
      }
    }, { passive: true, capture: true });
  }

  // init
  measureStep();
  window.addEventListener("resize", measureStep, { passive: true });

  setX(0);
  start();
});





