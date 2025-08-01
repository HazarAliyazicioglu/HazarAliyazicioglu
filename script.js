// Modern Portfolio JavaScript

// Dil değiştirme sistemi
let currentLanguage = 'tr'; // Varsayılan dil Türkçe
const words = {
    tr: ["Oyun", "ABAP", "Backend"],
    en: ["Game", "ABAP", "Backend"]
};

// Sayfa başlığı değiştirme efekti
document.addEventListener('visibilitychange', function() {
    if (document.visibilityState === 'hidden') {
        if (currentLanguage === 'tr') {
            document.title = 'Aradığın portföy burada :)';
        } else {
            document.title = 'Your portfolio is here :)';
        }
    } else {
        if (currentLanguage === 'tr') {
            document.title = "Hazar Aliyazıcıoğlu - Portfolio";
        } else {
            document.title = "Hazar Aliyazıcıoğlu - Portfolio";
        }
    }
});

// Yazı animasyonu için değişkenler
let index = 0;
let charIndex = 0;
let isDeleting = false;
let typeEffectTimeout = null; // Timeout ID'si için
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
    initializeLanguageToggle();
});

// Dil değiştirme işlevselliği
function initializeLanguageToggle() {
    const languageToggle = document.getElementById('language-toggle');
    
    if (languageToggle) {
        languageToggle.addEventListener('click', () => {
            toggleLanguage();
        });
        
        // Hover efekti ekle
        languageToggle.addEventListener('mouseenter', () => {
            languageToggle.style.transform = 'scale(1.05)';
        });
        
        languageToggle.addEventListener('mouseleave', () => {
            languageToggle.style.transform = 'scale(1)';
        });
    }
}

// Dil değiştirme fonksiyonu
function toggleLanguage() {
    currentLanguage = currentLanguage === 'tr' ? 'en' : 'tr';
    
    // Tüm çevrilebilir elementleri bul ve güncelle
    const translatableElements = document.querySelectorAll('[data-tr][data-en]');
    
    translatableElements.forEach(element => {
        if (currentLanguage === 'en') {
            element.textContent = element.getAttribute('data-en');
        } else {
            element.textContent = element.getAttribute('data-tr');
        }
    });
    
    // HTML lang attribute'unu güncelle
    document.documentElement.lang = currentLanguage;
    
    // Sayfa başlığını güncelle
    if (currentLanguage === 'tr') {
        document.title = "Hazar Aliyazıcıoğlu - Portfolio";
    } else {
        document.title = "Hazar Aliyazıcıoğlu - Portfolio";
    }
    
    // Dil göstergesini güncelle
    const logo = document.querySelector('.logo');
    if (currentLanguage === 'tr') {
        logo.classList.remove('en');
    } else {
        logo.classList.add('en');
    }
    
    // Yazı animasyonunu yeniden başlat
    resetTypeEffect();
    
    // Mobil menüyü kapat (eğer açıksa)
    const nav = document.querySelector('nav');
    const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
    if (nav && nav.classList.contains('active')) {
        nav.classList.remove('active');
        mobileNavToggle.textContent = '☰';
        mobileNavToggle.setAttribute('aria-label', currentLanguage === 'tr' ? 'Menüyü aç' : 'Open menu');
    }
    
    // Mobil menü aria-label'larını güncelle
    if (mobileNavToggle) {
        mobileNavToggle.setAttribute('aria-label', currentLanguage === 'tr' ? 'Menüyü aç/kapat' : 'Open/close menu');
    }
    
    // Smooth scroll linklerinin aria-label'larını güncelle
    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === '#home') {
            link.setAttribute('aria-label', currentLanguage === 'tr' ? 'Ana sayfaya git' : 'Go to home');
        } else if (href === '#about') {
            link.setAttribute('aria-label', currentLanguage === 'tr' ? 'Hakkımda bölümüne git' : 'Go to about section');
        } else if (href === '#projects') {
            link.setAttribute('aria-label', currentLanguage === 'tr' ? 'Projeler bölümüne git' : 'Go to projects section');
        } else if (href === '#contact') {
            link.setAttribute('aria-label', currentLanguage === 'tr' ? 'İletişim bölümüne git' : 'Go to contact section');
        }
    });
    
    // Dil değiştirme animasyonu
    logo.style.transform = 'scale(1.1)';
    setTimeout(() => {
        logo.style.transform = 'scale(1)';
    }, 200);
}

// Yazı animasyonunu sıfırla
function resetTypeEffect() {
    // Önceki animasyonu durdur
    if (typeEffectTimeout) {
        clearTimeout(typeEffectTimeout);
        typeEffectTimeout = null;
    }
    
    index = 0;
    charIndex = 0;
    isDeleting = false;
    
    const textElement = document.getElementById("changing-text");
    if (textElement) {
        textElement.textContent = words[currentLanguage][index][0];
        typeEffect(textElement);
    }
}

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
                mobileNavToggle.setAttribute('aria-label', currentLanguage === 'tr' ? 'Menüyü kapat' : 'Close menu');
            } else {
                mobileNavToggle.textContent = '☰';
                mobileNavToggle.setAttribute('aria-label', currentLanguage === 'tr' ? 'Menüyü aç' : 'Open menu');
            }
        });

        // Mobil menüde link tıklandığında menüyü kapat
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                nav.classList.remove('active');
                mobileNavToggle.textContent = '☰';
                mobileNavToggle.setAttribute('aria-label', currentLanguage === 'tr' ? 'Menüyü aç' : 'Open menu');
            });
        });

        // Sayfa dışına tıklandığında menüyü kapat
        document.addEventListener('click', (e) => {
            if (!nav.contains(e.target) && !mobileNavToggle.contains(e.target)) {
                nav.classList.remove('active');
                mobileNavToggle.textContent = '☰';
                mobileNavToggle.setAttribute('aria-label', currentLanguage === 'tr' ? 'Menüyü aç' : 'Open menu');
            }
        });

        // Ekran boyutu değiştiğinde menüyü sıfırla
        window.addEventListener('resize', () => {
            if (window.innerWidth > 768) {
                nav.classList.remove('active');
                mobileNavToggle.textContent = '☰';
                mobileNavToggle.setAttribute('aria-label', currentLanguage === 'tr' ? 'Menüyü aç' : 'Open menu');
            }
        });
    }
}

// Yazı animasyonu başlatma
function initializeTypeEffect() {
    const textElement = document.getElementById("changing-text");
    if (textElement) {
        textElement.textContent = words[currentLanguage][index][0];
        // Sadece değişen kelimeler için animasyon ekle
        textElement.style.animation = 'fadeInUp 1s ease-out';
        typeEffect(textElement);
    }
}

// Yazı animasyonu fonksiyonu
function typeEffect(textElement) {
    let currentWord = words[currentLanguage][index];

    if (!isDeleting) {
        textElement.textContent = currentWord.substring(0, charIndex++);
    } else {
        textElement.textContent = currentWord.substring(0, charIndex--);
    }

    if (!isDeleting && charIndex === currentWord.length + 1) {
        typeEffectTimeout = setTimeout(() => {
            isDeleting = true;
            typeEffect(textElement);
        }, waitAfterTyping);
        return;
    } else if (isDeleting && charIndex === -1) {
        isDeleting = false;
        index = (index + 1) % words[currentLanguage].length;
    }

    typeEffectTimeout = setTimeout(() => typeEffect(textElement), isDeleting ? deletingSpeed : writingSpeed);
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
