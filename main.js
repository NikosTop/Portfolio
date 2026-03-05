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
  if (!slider || !track) return;

  // Robust touch detection (fixes S24 mis-detection)
  const isTouch =
    (navigator.maxTouchPoints && navigator.maxTouchPoints > 0) ||
    ("ontouchstart" in window) ||
    window.matchMedia?.("(pointer: coarse)")?.matches;

  // ---------- Thumbnails ----------
  const thumbs = track.querySelectorAll(".yt[data-id]");
  thumbs.forEach((el) => {
    const id = el.getAttribute("data-id");
    if (!id) return;

    const maxres = `https://i.ytimg.com/vi/${id}/maxresdefault.jpg`;
    const hq     = `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;

    const img = new Image();
    img.onload  = () => { el.style.backgroundImage = `url(${maxres})`; };
    img.onerror = () => { el.style.backgroundImage = `url(${hq})`; };
    img.src = maxres;

    if (!el.querySelector(".play")) {
      const p = document.createElement("span");
      p.className = "play";
      el.appendChild(p);
    }
  });

  // ---------- Helpers: reset player -> thumbnail ----------
  function ensurePlayIcon(yt) {
    if (!yt.querySelector(".play")) {
      const p = document.createElement("span");
      p.className = "play";
      yt.appendChild(p);
    }
  }

  function resetYt(yt) {
    if (!yt || !yt.classList.contains("is-playing")) return;
    yt.classList.remove("is-playing");
    yt.innerHTML = "";
    ensurePlayIcon(yt);
  }

  function resetAllYt() {
    track.querySelectorAll(".yt.is-playing").forEach(resetYt);
  }

  // ---------- Reset when tap outside slider ----------
  document.addEventListener("pointerdown", (e) => {
    if (slider.contains(e.target)) return;
    resetAllYt();
  }, { passive: true });

  // ---------- Reset when scrolled away ----------
  const ioReset = new IntersectionObserver(([entry]) => {
    if (!entry.isIntersecting) resetAllYt();
  }, { threshold: 0.15 });
  ioReset.observe(slider);

  // ---------- Open video ----------
  function openVideo(yt, autoplay) {
    if (!yt || yt.classList.contains("is-playing")) return;

    const id = yt.getAttribute("data-id");
    if (!id) return;

    yt.classList.add("is-playing");
    yt.innerHTML = "";

    const iframe = document.createElement("iframe");
    iframe.allowFullscreen = true;

    iframe.setAttribute(
      "allow",
      autoplay
        ? "autoplay; encrypted-media; picture-in-picture"
        : "encrypted-media; picture-in-picture"
    );

    iframe.style.position = "absolute";
    iframe.style.inset = "0";
    iframe.style.width = "100%";
    iframe.style.height = "100%";
    iframe.style.border = "0";

    const base = `https://www.youtube.com/embed/${id}?playsinline=1&rel=0`;
    iframe.src = autoplay ? `${base}&autoplay=1` : base;

    yt.appendChild(iframe);
  }

  // ---------- TOUCH: swipe mode + hint + ghost swipe (NO desktop loop) ----------
  if (isTouch) {
    // Swipe-safe tap-to-open (tap only, not swipe)
    let startX = 0, startY = 0;
    let moved = false;
    let targetYt = null;

    track.addEventListener("touchstart", (e) => {
      const t = e.touches[0];
      const yt = e.target.closest?.(".yt[data-id]");
      if (!yt || yt.classList.contains("is-playing")) {
        targetYt = null;
        return;
      }
      startX = t.clientX;
      startY = t.clientY;
      moved = false;
      targetYt = yt;
    }, { passive: true });

    track.addEventListener("touchmove", (e) => {
      if (!targetYt) return;
      const t = e.touches[0];
      const dx = t.clientX - startX;
      const dy = t.clientY - startY;

      if (Math.abs(dx) > 10 && Math.abs(dx) > Math.abs(dy)) {
        moved = true;
        targetYt = null;
      }
    }, { passive: true });

    track.addEventListener("touchend", () => {
      if (!targetYt) return;
      if (!moved) openVideo(targetYt, false); // no autoplay on touch
      targetYt = null;
      moved = false;
    }, { passive: true });

    // --- Hint + ghost swipe (ONLY ONCE EVER) ---
   // --- Hint (ALWAYS show on each load/refresh, hide after 5s) ---
const hint = document.querySelector(".video-slider-section .slider-hint");
if (hint) {
  hint.classList.remove("is-hidden");
  hint.style.opacity = "1";

  setTimeout(() => {
    hint.classList.add("is-hidden"); // collapses completely (your CSS)
  }, 5000);
} else {
        // already seen -> keep hidden always (prevents refresh showing it again)
        hint.classList.add("is-hidden");
      }
    }

    return; // ✅ stop here on touch devices
  }

  // ---------- DESKTOP: click opens with autoplay ----------
  track.addEventListener("pointerdown", (e) => {
    const yt = e.target.closest?.(".yt[data-id]");
    if (!yt || yt.classList.contains("is-playing")) return;
    openVideo(yt, true);
  }, { passive: true });

  // ---------- DESKTOP: auto-moving loop ----------
  track.style.transition = "none";

  let step = 0;
  function measureStep() {
    const first = track.children[0];
    if (!first) return;

    const w = first.getBoundingClientRect().width;
    const cs = getComputedStyle(track);
    const gap = parseFloat(cs.gap || cs.columnGap || "0") || 0;

    step = w + gap;
  }

  let x = 0;
  let paused = false;

  const SPEED = 70;
  const MAX_DT = 0.05;

  function setX(v) {
    x = v;
    track.style.transform = `translate3d(${Math.round(x)}px,0,0)`;
  }

  let inView = true;
  const ioRun = new IntersectionObserver(([entry]) => {
    inView = entry.isIntersecting;
    if (!entry.isIntersecting) paused = true;
    else { paused = false; tick.last = 0; }
  }, { threshold: 0.15 });
  ioRun.observe(slider);

  function tick(t) {
    if (!tick.last) tick.last = t;

    let dt = (t - tick.last) / 1000;
    if (dt > MAX_DT) dt = MAX_DT;
    tick.last = t;

    if (!paused && inView && step > 0) {
      setX(x - SPEED * dt);

      const firstSlide = track.firstElementChild;
      const playingYt = firstSlide?.querySelector?.(".yt.is-playing");
      if (playingYt) resetYt(playingYt);

      while (-x >= step) {
        track.appendChild(track.firstElementChild);
        setX(x + step);
      }
    }

    requestAnimationFrame(tick);
  }

  slider.addEventListener("mouseenter", () => { paused = true; });
  slider.addEventListener("mouseleave", () => { paused = false; tick.last = 0; });

  document.addEventListener("visibilitychange", () => {
    tick.last = 0;
    paused = document.hidden ? true : false;
    if (!document.hidden) tick.last = 0;
  });

  measureStep();
  window.addEventListener("resize", measureStep, { passive: true });

  setX(0);
  requestAnimationFrame(tick);
});


