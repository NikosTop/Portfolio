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
  const slider = document.querySelector(".slider");
  const track  = document.querySelector(".slide-track");
  const prevBtn = document.querySelector(".prev");
  const nextBtn = document.querySelector(".next");
  if (!slider || !track) return;

  const isMobile = window.matchMedia?.("(hover: none) and (pointer: coarse)")?.matches;

  track.style.transition = "none";

  // ✅ No clones (cloning iframes is a top cause of mobile crashes)
  if (!track.children.length) return;

  // Measure step = slide width + CSS gap
  let step = 0;
  function measureStep() {
    const first = track.children[0];
    if (!first) return;
    const w = first.getBoundingClientRect().width;
    const cs = getComputedStyle(track);
    const gap = parseFloat(cs.gap || cs.columnGap || "0") || 0;
    step = w + gap;
  }

// Only animate while slider is in view
let inView = true;

const io = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
    
      if (!entry.isIntersecting) {
        paused = true;
      }
    
    }, { threshold: 0.15 });
    
    io.observe(slider);

  // Motion state
  let x = 0;
  let rafId = null;
  let paused = false;
  let mobileLocked = false;

  const SPEED = 55;
  const MAX_DT = 0.05;   // prevent catch-up burst

  function setX(v) {
    x = v;
    track.style.transform = `translate3d(${Math.round(x)}px,0,0)`;
  }

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

  // Desktop hover pause
  slider.addEventListener("mouseenter", () => { if (!isMobile) pause(false); });
  slider.addEventListener("mouseleave", () => { if (!isMobile) paused = false; });

  // Mobile unlock: scroll OR vertical swipe gesture (helps S24 where iframe eats scroll)
  if (isMobile) {
    const unlock = () => {
      if (!mobileLocked) return;
      mobileLocked = false;
      paused = false;
      tick.last = 0;
    };

    let lastY = window.scrollY;
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

  // Visibility handling (no catch-up)
  document.addEventListener("visibilitychange", () => {
    tick.last = 0;
    if (document.hidden) paused = true;
  });
  window.addEventListener("focus", () => { tick.last = 0; });

  // ===== Buttons: hard anti-spam =====
  let lockedClicks = false;
  let lastTap = 0;
  const TAP_COOLDOWN = 420;

  function guardTap() {
    const now = performance.now();
    if (lockedClicks) return false;
    if (now - lastTap < TAP_COOLDOWN) return false;
    lastTap = now;
    lockedClicks = true;
    setTimeout(() => { lockedClicks = false; }, TAP_COOLDOWN);
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

  function bindArrow(btn, fn) {
    if (!btn) return;
    btn.addEventListener("pointerdown", (e) => {
      e.preventDefault();
      e.stopPropagation();
      if (!guardTap()) return;
      fn();
    }, { passive: false });
  }

  bindArrow(nextBtn, next);
  bindArrow(prevBtn, prev);

  // ===== YouTube API: lock on play/pause + ONE-TAP PLAY FIX (S24) =====
  const players = new Map();   // iframe -> player

  function setIframeInteractive(iframe, on) {
    if (!isMobile) return;
    iframe.style.pointerEvents = on ? "auto" : "none";
  }

  function hookYouTube() {
    if (!window.YT || !YT.Player) return;

    const iframes = track.querySelectorAll("iframe");
    iframes.forEach((iframe) => {
      if (iframe._ytBound) return;
      iframe._ytBound = true;

      // ensure starts non-interactive on mobile (first tap handled by page)
      setIframeInteractive(iframe, false);

      const player = new YT.Player(iframe, {
        events: {
          onReady: () => {
            players.set(iframe, player);
          },
          onStateChange: (e) => {
            if (e.data === YT.PlayerState.PLAYING || e.data === YT.PlayerState.PAUSED) {
              pause(true);
              // while user is interacting with video, allow controls
              setIframeInteractive(iframe, true);
            }

            // optional: when ended, you can disable again so next play is 1-tap
            if (e.data === YT.PlayerState.ENDED) {
              // keep locked until scroll/gesture/buttons per your rule
              setIframeInteractive(iframe, false);
            }
          }
        }
      });

      players.set(iframe, player);
    });

    // ✅ Mobile: first tap anywhere on a slide triggers play and locks slider
    if (isMobile) {
      slider.addEventListener("pointerdown", (e) => {
        const slide = e.target?.closest?.(".slide");
        if (!slide) return;

        const iframe = slide.querySelector("iframe");
        if (!iframe) return;

        // Stop slider immediately
        pause(true);

        // Start playing via API (counts as user gesture)
        const p = players.get(iframe);
        if (p && typeof p.playVideo === "function") {
          try { p.playVideo(); } catch (_) {}
        }

        // Let the user use controls after we start
        setIframeInteractive(iframe, true);

      }, { passive: true, capture: true });
    }
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

  // init
  measureStep();
  window.addEventListener("resize", measureStep, { passive: true });

  setX(0);
  start();
});







