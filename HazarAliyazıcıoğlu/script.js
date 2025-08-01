

document.addEventListener('visibilitychange', function() {
    if (document.visibilityState === 'hidden') {
        document.title = 'Aradığın portföy burada :)';
    } else {
        document.title = "Hazar's Portfolio";
    }
});

const words = ["Game", "ABAP", "Backend"];
let index = 0;
let charIndex = 0;
let isDeleting = false;
const writingSpeed = 100; // Yazma hızı (ms)
const deletingSpeed = 150; // Silme hızı (ms) (yavaş silme için daha büyük bir değer)
const waitAfterTyping = 1000; // Yazdıktan sonra bekleme süresi (ms)

document.addEventListener("DOMContentLoaded", () => {
    const textElement = document.getElementById("changing-text");

    // Sayfa yüklendiğinde ilk harfi göster
    if (textElement) {
        textElement.textContent = words[index][0];
        typeEffect(textElement);
    }
});

function typeEffect(textElement) {
    let currentWord = words[index];

    if (!isDeleting) {
        textElement.textContent = currentWord.substring(0, charIndex++);
    } else {
        textElement.textContent = currentWord.substring(0, charIndex--);
    }

    if (!isDeleting && charIndex === currentWord.length + 1) {
        setTimeout(() => {
            isDeleting = true;
            typeEffect(textElement);
        }, waitAfterTyping);
        return;
    } else if (isDeleting && charIndex === -1) {
        isDeleting = false;
        index = (index + 1) % words.length;
    }

    setTimeout(() => typeEffect(textElement), isDeleting ? deletingSpeed : writingSpeed);
}
