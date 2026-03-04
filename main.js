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
  // ===== (optional) TITLE ANIMATION =====
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

  // keep transforms snappy
  track.style.transition = "none";

  // ✅ no clones (iframes)
  if (!track.children.length) return;

  // Measure one step (slide width + CSS gap)
  let step = 0;
  function measureStep() {
    const first = track.children[0];
    if (!first) return;

    const w = first.getBoundingClientRect().width;
    const cs = getComputedStyle(track);
    const gap = parseFloat(cs.gap || cs.columnGap || "0") || 0;
    step = w + gap;
  }

  // Motion state
  let x = 0;
  let rafId = null;
  let paused = false;

  // Mobile: lock pause when video plays/pauses
  let mobileLocked = false;

  // In-view control
  let inView = true;

  const SPEED = 70;      // px/sec
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

  function resume() {
    if (isMobile && mobileLocked) return;
    paused = false;
    tick.last = 0;
  }

  function unlockAndResume() {
    if (isMobile) mobileLocked = false;
    paused = false;
    tick.last = 0;
  }

  // ✅ Pause when slider off-screen, resume when back (unless mobileLocked)
  const io = new IntersectionObserver(([entry]) => {
    inView = entry.isIntersecting;

    if (!entry.isIntersecting) {
      paused = true;
    } else {
      if (!(isMobile && mobileLocked)) {
        paused = false;
        tick.last = 0;
      }
    }
  }, { threshold: 0.15 });
  io.observe(slider);

  // Desktop: pause on hover, resume on leave
  slider.addEventListener("mouseenter", () => { if (!isMobile) pause(false); });
  slider.addEventListener("mouseleave", () => { if (!isMobile) resume(); });

  // Mobile: unlock/resume ONLY on real page scroll
  if (isMobile) {
    let lastY = window.scrollY;
    window.addEventListener("scroll", () => {
      const y = window.scrollY;
      if (y !== lastY && mobileLocked) {
        mobileLocked = false;
        paused = false;
        tick.last = 0;
      }
      lastY = y;
    }, { passive: true });
  }

  // ✅ Pause when tab hidden; resume when back (unless mobileLocked)
  document.addEventListener("visibilitychange", () => {
    tick.last = 0;

    if (document.hidden) {
      paused = true;
    } else {
      if (!(isMobile && mobileLocked) && inView) {
        paused = false;
        tick.last = 0;
      }
    }
  });
  window.addEventListener("focus", () => { tick.last = 0; });

  // ===== Buttons: unlock+resume + anti-spam =====
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

  // ===== YouTube API: lock on PLAYING or PAUSED (works every time) =====
  function hookYouTube() {
    if (!window.YT || !YT.Player) return;

    const iframes = track.querySelectorAll("iframe");
    iframes.forEach((iframe) => {
      if (iframe._ytBound) return;
      iframe._ytBound = true;

      new YT.Player(iframe, {
        events: {
          onStateChange: (e) => {
            if (e.data === YT.PlayerState.PLAYING || e.data === YT.PlayerState.PAUSED) {
              pause(true);
            }
          }
        }
      });
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

  // init
  measureStep();
  window.addEventListener("resize", measureStep, { passive: true });

  setX(0);
  paused = false;         // ✅ start sliding immediately
  mobileLocked = false;   // ✅
  start();
});



