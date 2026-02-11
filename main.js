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
    const nameElement = document.querySelector('.name');
    const htmlContent = nameElement.innerHTML.trim(); // Get the HTML content inside .name

    // Clear existing content
    nameElement.innerHTML = '';

    // Split the content into tokens considering bold tags (<b>...</b>), breaks (<br>), and spaces
    const tokens = htmlContent.split(/(<b>[^<]*<\/b>|<br>|\s+)/);

    // Loop through each token
    tokens.forEach((token, index) => {
        // Preserve <br> tags and spaces
        if (token === '<br>' || token.trim().length === 0) {
            const preservedElement = document.createElement('span');
            preservedElement.innerHTML = token; // Preserve HTML entities like <br>
            nameElement.appendChild(preservedElement);
        } else if (token.startsWith('<b>') && token.endsWith('</b>')) {
            // Preserve <b>...</b> tags with bold style and bounce animation
            const boldContent = token.substring(3, token.length - 4);
            const boldElement = document.createElement('b');
            boldElement.className = 'token-wrapper'; // Apply token-wrapper class to <b> element
            boldContent.split('').forEach((char, charIndex) => {
                const span = document.createElement('span');
                span.textContent = char === ' ' ? '\u00A0' : char; // Preserve spaces with non-breaking space

                // Set animation delay
                span.style.setProperty('--delay', `${index * 0.1 + charIndex * 0.1}s`);

                // Add bounce animation to each character
                span.classList.add('bounce');

                boldElement.appendChild(span);
            });
            nameElement.appendChild(boldElement);
        } else if (token.startsWith('<b>')) {
            // Handle <b> tag at the start of token
            const boldContent = token.substring(3);
            const boldElement = document.createElement('b');
            boldElement.className = 'token-wrapper'; // Apply token-wrapper class to <b> element
            boldContent.split('').forEach((char, charIndex) => {
                const span = document.createElement('span');
                span.textContent = char === ' ' ? '\u00A0' : char; // Preserve spaces with non-breaking space

                // Set animation delay
                span.style.setProperty('--delay', `${index * 0.1 + charIndex * 0.1}s`);

                // Add bounce animation to each character
                span.classList.add('bounce');

                boldElement.appendChild(span);
            });
            nameElement.appendChild(boldElement);
        } else if (token.endsWith('</b>')) {
            // Handle </b> tag at the end of token
            const boldContent = token.substring(0, token.length - 4);
            const boldElement = document.createElement('b');
            boldElement.className = 'token-wrapper'; // Apply token-wrapper class to <b> element
            boldContent.split('').forEach((char, charIndex) => {
                const span = document.createElement('span');
                span.textContent = char === ' ' ? '\u00A0' : char; // Preserve spaces with non-breaking space

                // Set animation delay
                span.style.setProperty('--delay', `${index * 0.1 + charIndex * 0.1}s`);

                // Add bounce animation to each character
                span.classList.add('bounce');

                boldElement.appendChild(span);
            });
            nameElement.appendChild(boldElement);
        } else {
            const wrapper = document.createElement('span');
            wrapper.className = 'token-wrapper';

            token.split('').forEach((char, charIndex) => {
                const span = document.createElement('span');
                span.textContent = char === ' ' ? '\u00A0' : char; 

                span.style.setProperty('--delay', `${index * 0.1 + charIndex * 0.1}s`);

                span.classList.add('bounce');

                wrapper.appendChild(span);
            });

            nameElement.appendChild(wrapper);
        }
    });
});

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
    const title = document.querySelector(".video-title");

    setTimeout(() => {
        title.classList.remove("hidden-title");
        title.classList.add("show-title");
    }, 1500);
});

document.addEventListener("DOMContentLoaded", function () {

    const track = document.querySelector(".slide-track");
    const slides = document.querySelectorAll(".slide");
    const prevBtn = document.querySelector(".prev");
    const nextBtn = document.querySelector(".next");

    let index = 0;
    let isDragging = false;
    let startPos = 0;
    let currentTranslate = 0;
    let prevTranslate = 0;
    let animationID;
    let slideWidth = slides[0].offsetWidth + 20;

    window.addEventListener("resize", () => {
        slideWidth = slides[0].offsetWidth + 20;
        moveToSlide();
    });

    function moveToSlide() {
        currentTranslate = -index * slideWidth;
        prevTranslate = currentTranslate;
        track.style.transform = `translateX(${currentTranslate}px)`;
    }

    function nextSlide() {
        if (index < slides.length - 1) {
            index++;
        } else {
            index = 0;
        }
        moveToSlide();
    }

    function prevSlide() {
        if (index > 0) {
            index--;
        } else {
            index = slides.length - 1;
        }
        moveToSlide();
    }

    nextBtn.addEventListener("click", nextSlide);
    prevBtn.addEventListener("click", prevSlide);

    // ===== DRAG SYSTEM =====

    function getPositionX(e) {
        return e.type.includes("mouse") ? e.pageX : e.touches[0].clientX;
    }

    function dragStart(e) {
        isDragging = true;
        startPos = getPositionX(e);
        animationID = requestAnimationFrame(animation);
        track.style.transition = "none";
    }

    function dragMove(e) {
        if (!isDragging) return;
        const currentPosition = getPositionX(e);
        const diff = currentPosition - startPos;
        currentTranslate = prevTranslate + diff;
    }

    function dragEnd() {
        cancelAnimationFrame(animationID);
        isDragging = false;

        const movedBy = currentTranslate - prevTranslate;

        if (movedBy < -100 && index < slides.length - 1) index++;
        if (movedBy > 100 && index > 0) index--;

        track.style.transition = "transform 0.4s ease";
        moveToSlide();
    }

    function animation() {
        track.style.transform = `translateX(${currentTranslate}px)`;
        if (isDragging) requestAnimationFrame(animation);
    }

    track.addEventListener("mousedown", dragStart);
    track.addEventListener("mousemove", dragMove);
    track.addEventListener("mouseup", dragEnd);
    track.addEventListener("mouseleave", dragEnd);

    track.addEventListener("touchstart", dragStart);
    track.addEventListener("touchmove", dragMove);
    track.addEventListener("touchend", dragEnd);

});
