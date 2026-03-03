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

    setTimeout(() => {
        title.classList.remove("hidden-title");
        title.classList.add("show-title");
    }, 1500);

    // ===== SLIDER CORE =====
    const track = document.querySelector(".slide-track");
    const prevBtn = document.querySelector(".prev");
    const nextBtn = document.querySelector(".next");

    let slides = Array.from(track.children);
    let slideWidth = slides[0].offsetWidth + 25;
    let index = 0;
    let autoScroll;
    let currentTranslate = 0;

    // Clone slides for infinite loop
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

    prevBtn.addEventListener("click", prevSlide);
    nextBtn.addEventListener("click", nextSlide);

    let rafId = null;
let isPaused = false;

// speed in pixels per frame-ish (we'll use time-based)
const SPEED = 28; // px per second (try 18–40)

function loop(t) {
  if (!loop.last) loop.last = t;
  const dt = (t - loop.last) / 1000; // seconds
  loop.last = t;

  if (!isPaused) {
    currentTranslate -= SPEED * dt;

    // when we've moved one full "set" of slides, wrap smoothly
    const loopWidth = totalSlides * slideWidth; // width of original set
    if (-currentTranslate >= loopWidth) {
      currentTranslate += loopWidth; // wrap back
    }
    if (currentTranslate > 0) {
      currentTranslate -= loopWidth;
    }

    track.style.transform = `translateX(${currentTranslate}px)`;
  }

  rafId = requestAnimationFrame(loop);
}

function startContinuous() {
  if (rafId) cancelAnimationFrame(rafId);
  loop.last = 0;
  rafId = requestAnimationFrame(loop);
}

track.addEventListener("mouseenter", () => { isPaused = true; });
track.addEventListener("mouseleave", () => { isPaused = false; });

startContinuous();
    
});

