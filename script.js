// script.js
document.addEventListener('DOMContentLoaded', function () {
    setTimeout(changeColors, 1500);

    function changeColors() {
        const textElement = document.querySelector('.about-me-text');
        const textContent = textElement.innerHTML;
        const regex = /(<[^>]+>|\s|[^<>\s])/g;

        const letters = textContent.match(regex).map(letter => {
            if (letter.match(/<[^>]+>/) || letter.match(/\s/)) {
                return letter;
            }
            return `<span class="letter">${letter}</span>`;
        }).join('');

        textElement.innerHTML = letters;

        const letterElements = document.querySelectorAll('.letter');
        letterElements.forEach((letterElement, index) => {
            setTimeout(() => {
                letterElement.style.color = '#ff6917';
            }, index * 59);
        });
    }
});

