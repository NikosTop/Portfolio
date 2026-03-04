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

  // No transition for continuous move
  track.style.transition = "none";

  // --- Build thumbnails from .yt[data-id] ---
  // Your HTML must be:
  // <div class="slide"><div class="yt" data-id="VIDEO_ID"><span class="play"></span></div></div>
  const thumbs = track.querySelectorAll(".yt[data-id]");
  thumbs.forEach((el) => {
    const id = el.getAttribute("data-id");
    if (!id) return;

    // maxres first, fallback to hq (prevents "missing thumbnails" look)
    const maxres = `https://i.ytimg.com/vi/${id}/maxresdefault.jpg`;
    const hq = `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;

    const img = new Image();
    img.onload = () => { el.style.backgroundImage = `url(${maxres})`; };
    img.onerror = () => { el.style.backgroundImage = `url(${hq})`; };
    img.src = maxres;

    if (!el.querySelector(".play")) {
      const p = document.createElement("span");
      p.className = "play";
      el.appendChild(p);
    }
  });

  // --- Measure step (slide width + CSS gap) ---
  let step = 0;
  function measureStep() {
    const first = track.children[0];
    if (!first) return;
    const w = first.getBoundingClientRect().width;
    const cs = getComputedStyle(track);
    const gap = parseFloat(cs.gap || cs.columnGap || "0") || 0;
    step = w + gap;
  }

  // --- Motion state ---
  let x = 0;
  let paused = false;
  let mobileLocked = false;

  const SPEED = 70;     // px/sec
  const MAX_DT = 0.05;  // prevent catch-up burst

  function setX(v) {
    x = v;
    track.style.transform = `translate3d(${Math.round(x)}px,0,0)`;
  }

  // inView handling: pause when off-screen, resume when back (unless locked)
  let inView = true;
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

  function tick(t) {
    if (!tick.last) tick.last = t;
    let dt = (t - tick.last) / 1000;
    if (dt > MAX_DT) dt = MAX_DT;
    tick.last = t;

    if (!paused && inView && step > 0) {
      setX(x - SPEED * dt);

      // conveyor reorder (safe because we are NOT moving live iframes around)
      while (-x >= step) {
        track.appendChild(track.firstElementChild);
        setX(x + step);
      }
    }

    requestAnimationFrame(tick);
  }

  function pause(lockMobile = false) {
    paused = true;
    if (isMobile && lockMobile) mobileLocked = true;
  }

  function unlockAndResume() {
    if (isMobile) mobileLocked = false;
    paused = false;
    tick.last = 0;
  }

  // Desktop hover pause
  slider.addEventListener("mouseenter", () => { if (!isMobile) pause(false); });
  slider.addEventListener("mouseleave", () => { if (!isMobile) { paused = false; tick.last = 0; } });

  // Mobile resume ONLY on real page scroll
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

  // Pause when tab hidden; resume when back (unless locked)
  document.addEventListener("visibilitychange", () => {
    tick.last = 0;
    if (document.hidden) {
      paused = true;
    } else if (!(isMobile && mobileLocked) && inView) {
      paused = false;
      tick.last = 0;
    }
  });

  // --- Arrows + anti-spam ---
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

  // --- Tap-to-play: create iframe only when user taps a thumbnail ---
  track.addEventListener("pointerdown", (e) => {
    const yt = e.target.closest?.(".yt[data-id]");
    if (!yt || yt.classList.contains("is-playing")) return;

    pause(true);

    const id = yt.getAttribute("data-id");
    yt.classList.add("is-playing");
    yt.innerHTML = ""; // remove overlay/play icon

    const iframe = document.createElement("iframe");
    iframe.allowFullscreen = true;
    iframe.setAttribute("allow", "autoplay; encrypted-media; picture-in-picture");
    iframe.style.position = "absolute";
    iframe.style.inset = "0";
    iframe.style.width = "100%";
    iframe.style.height = "100%";
    iframe.style.border = "0";

    iframe.src = `https://www.youtube.com/embed/${id}?autoplay=1&playsinline=1&rel=0`;

    yt.appendChild(iframe);
  }, { passive: true });

  // init
  measureStep();
  window.addEventListener("resize", measureStep, { passive: true });

  setX(0);
  paused = false;
  mobileLocked = false;
  requestAnimationFrame(tick);
});
