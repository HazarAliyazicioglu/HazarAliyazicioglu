// Modern Portfolio JavaScript

// Sayfa başlığı değiştirme efekti
document.addEventListener('visibilitychange', function() {
    if (document.visibilityState === 'hidden') {
        document.title = 'Aradığın portföy burada :)';
    } else {
        document.title = "Hazar Aliyazıcıoğlu - Portfolio";
    }
});

// Yazı animasyonu için değişkenler
const words = ["Oyun", "ABAP", "Backend"];
let index = 0;
let charIndex = 0;
let isDeleting = false;
const writingSpeed = 100;
const deletingSpeed = 150;
const waitAfterTyping = 1000;

// Sayfa yüklendiğinde çalışacak fonksiyonlar
document.addEventListener("DOMContentLoaded", () => {
    initializeTypeEffect();
    initializeScrollEffects();
    initializeSmoothScrolling();
    initializeCardAnimations();
    initializeMobileNavigation();
    initializeVideoEffects();
});

// Mobil navigasyon işlevselliği
function initializeMobileNavigation() {
    const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
    const nav = document.querySelector('nav');
    const navLinks = document.querySelectorAll('nav a');

    if (mobileNavToggle && nav) {
        mobileNavToggle.addEventListener('click', () => {
            nav.classList.toggle('active');
            
            // Hamburger menü ikonunu değiştir
            if (nav.classList.contains('active')) {
                mobileNavToggle.textContent = '✕';
                mobileNavToggle.setAttribute('aria-label', 'Menüyü kapat');
            } else {
                mobileNavToggle.textContent = '☰';
                mobileNavToggle.setAttribute('aria-label', 'Menüyü aç');
            }
        });

        // Mobil menüde link tıklandığında menüyü kapat
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                nav.classList.remove('active');
                mobileNavToggle.textContent = '☰';
                mobileNavToggle.setAttribute('aria-label', 'Menüyü aç');
            });
        });

        // Sayfa dışına tıklandığında menüyü kapat
        document.addEventListener('click', (e) => {
            if (!nav.contains(e.target) && !mobileNavToggle.contains(e.target)) {
                nav.classList.remove('active');
                mobileNavToggle.textContent = '☰';
                mobileNavToggle.setAttribute('aria-label', 'Menüyü aç');
            }
        });

        // Ekran boyutu değiştiğinde menüyü sıfırla
        window.addEventListener('resize', () => {
            if (window.innerWidth > 768) {
                nav.classList.remove('active');
                mobileNavToggle.textContent = '☰';
                mobileNavToggle.setAttribute('aria-label', 'Menüyü aç');
            }
        });
    }
}

// Yazı animasyonu başlatma
function initializeTypeEffect() {
    const textElement = document.getElementById("changing-text");
    if (textElement) {
        textElement.textContent = words[index][0];
        // Sadece değişen kelimeler için animasyon ekle
        textElement.style.animation = 'fadeInUp 1s ease-out';
        typeEffect(textElement);
    }
}

// Yazı animasyonu fonksiyonu
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

// Scroll efektleri
function initializeScrollEffects() {
    const header = document.querySelector('header');
    let lastScrollY = window.scrollY;

    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;
        
        // Header'ı scroll'a göre şeffaf yapma
        if (currentScrollY > 100) {
            header.style.background = 'rgba(15, 15, 35, 0.98)';
        } else {
            header.style.background = 'rgba(15, 15, 35, 0.95)';
        }

        // Scroll yönüne göre header'ı gizleme/gösterme (mobilde devre dışı)
        if (window.innerWidth > 768) {
            if (currentScrollY > lastScrollY && currentScrollY > 200) {
                header.style.transform = 'translateY(-100%)';
            } else {
                header.style.transform = 'translateY(0)';
            }
        }

        lastScrollY = currentScrollY;
    });

    // Intersection Observer ile animasyonlar
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Animasyonlu elementleri gözlemleme
    const animatedElements = document.querySelectorAll('.card, .skill-category, .contact-method');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Smooth scrolling
function initializeSmoothScrolling() {
    const navLinks = document.querySelectorAll('nav a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Kart animasyonları (mobilde devre dışı)
function initializeCardAnimations() {
    const cards = document.querySelectorAll('.card');
    
    cards.forEach(card => {
        // Sadece hover destekli cihazlarda animasyon
        if (window.matchMedia('(hover: hover)').matches) {
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-10px) scale(1.02)';
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0) scale(1)';
            });
        }
    });
}

// Video hover efektleri (mobilde devre dışı)
function initializeVideoEffects() {
    const videos = document.querySelectorAll('video');
    
    videos.forEach(video => {
        // Sadece hover destekli cihazlarda animasyon
        if (window.matchMedia('(hover: hover)').matches) {
            video.addEventListener('mouseenter', () => {
                video.style.transform = 'scale(1.05)';
            });
            
            video.addEventListener('mouseleave', () => {
                video.style.transform = 'scale(1)';
            });
        }
    });
}

// Loading animasyonu
window.addEventListener('load', () => {
    document.body.style.opacity = '1';
    document.body.style.transition = 'opacity 0.5s ease';
});

// Sayfa yüklenirken body'yi gizle
document.body.style.opacity = '0';

// Touch gesture desteği
function initializeTouchGestures() {
    let startY = 0;
    let startX = 0;
    let isScrolling = false;

    document.addEventListener('touchstart', (e) => {
        startY = e.touches[0].clientY;
        startX = e.touches[0].clientX;
        isScrolling = false;
    }, { passive: true });

    document.addEventListener('touchmove', (e) => {
        if (!isScrolling) {
            const deltaY = Math.abs(e.touches[0].clientY - startY);
            const deltaX = Math.abs(e.touches[0].clientX - startX);
            
            if (deltaY > deltaX && deltaY > 10) {
                isScrolling = true;
            }
        }
    }, { passive: true });

    // Mobilde video kontrollerini iyileştir
    const videos = document.querySelectorAll('video');
    videos.forEach(video => {
        video.addEventListener('touchstart', (e) => {
            e.stopPropagation();
        }, { passive: true });
    });
}

// Touch gesture'ları başlat
document.addEventListener('DOMContentLoaded', initializeTouchGestures);
