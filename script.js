// ===== SMOOTH SCROLL NA # ODKAZY =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// ===== ZVÝRAZNĚNÍ AKTIVNÍHO MENU PŘI SCROLLU =====
window.addEventListener('scroll', () => {
  const links = document.querySelectorAll('.nav-link');
  
  links.forEach(link => {
    const href = link.getAttribute('href');
    const section = document.querySelector(href);
    
    if (section) {
      const rect = section.getBoundingClientRect();
      
      // Pokud je sekce viditelná (top < 100px od okna)
      if (rect.top <= 100 && rect.bottom >= 100) {
        links.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
      }
    }
  });
});

// ===== INTERSECTION OBSERVER - ANIMACE PRVKŮ KDYŽ JSOU VIDITELNÉ =====

function initAnimations() {
  // Vyber všechny prvky s atributem data-animate
  const observerElements = document.querySelectorAll('[data-animate]');
  
  // Konfigurační objekt pro observer
  const observerOptions = {
    threshold: 0.2,        // Aktivuj když je 20% prvku viditelné
    rootMargin: '0px 0px -50px 0px'  // Počkat až na dolní část prvku
  };
  
  // Vytvoř Intersection Observer
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // Prvek je viditelný - přidej animační třídu
        const animationType = entry.target.getAttribute('data-animate');
        entry.target.classList.add(animationType);
        
        // Pokud je .skill-card, přidej i stagger efekt
        if (entry.target.classList.contains('skill-card')) {
          const allCards = Array.from(document.querySelectorAll('.skill-card'));
          const staggerIndex = allCards.indexOf(entry.target);
          entry.target.classList.add(`animate-stagger-${(staggerIndex % 6) + 1}`);
        }
        
        // Když je prvek animován, přestane se sledovat
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);
  
  // Sleduj všechny prvky
  observerElements.forEach(element => observer.observe(element));
}

// Spusť animace když je dokument načten
document.addEventListener('DOMContentLoaded', initAnimations);
