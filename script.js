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
      
      if (rect.top <= 100 && rect.bottom >= 100) {
        links.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
      }
    }
  });
});

// ===== INTERSECTION OBSERVER - ANIMACE PRVKŮ =====
function initAnimations() {
  const observerElements = document.querySelectorAll('[data-animate]');
  
  const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const animationType = entry.target.getAttribute('data-animate');
        entry.target.classList.add(animationType);
        
        if (entry.target.classList.contains('skill-card')) {
          const allCards = Array.from(document.querySelectorAll('.skill-card'));
          const staggerIndex = allCards.indexOf(entry.target);
          entry.target.classList.add(`animate-stagger-${(staggerIndex % 6) + 1}`);
        }
        
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);
  
  observerElements.forEach(el => observer.observe(el));
}

document.addEventListener('DOMContentLoaded', initAnimations);

// ===== VYLEPŠENÝ PORTFOLIO FILTER (STAGGER ANIMACE) =====
function initPortfolioFilter() {
  const filterButtons = document.querySelectorAll('.filter-btn');
  const portfolioCards = document.querySelectorAll('.portfolio-card');
  
  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      filterButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');
      
      const filterValue = button.getAttribute('data-filter');
      let visibleIndex = 0;

      portfolioCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');
        const shouldShow = filterValue === 'all' || cardCategory === filterValue;
        
        if (shouldShow) {
          card.style.display = 'block';
          
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'scale(1)';
          }, visibleIndex * 100);
          
          visibleIndex++;
        } else {
          card.style.opacity = '0';
          card.style.transform = 'scale(0.8)';
          
          setTimeout(() => {
            card.style.display = 'none';
          }, 300);
        }
      });
    });
  });
}

document.addEventListener('DOMContentLoaded', initPortfolioFilter);
// ===== VYLEPŠENÝ PORTFOLIO FILTER (STAGGER ANIMACE) =====
function initPortfolioFilter() {
  const filterButtons = document.querySelectorAll('.filter-btn');
  const portfolioCards = document.querySelectorAll('.portfolio-card');
  
  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      filterButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');
      
      const filterValue = button.getAttribute('data-filter');
      let visibleIndex = 0;

      portfolioCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');
        const shouldShow = filterValue === 'all' || cardCategory === filterValue;
        
        if (shouldShow) {
          card.style.display = 'block';
          
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'scale(1)';
          }, visibleIndex * 100);
          
          visibleIndex++;
        } else {
          card.style.opacity = '0';
          card.style.transform = 'scale(0.8)';
          
          setTimeout(() => {
            card.style.display = 'none';
          }, 300);
        }
      });
      const visibleCards = document.querySelectorAll(
        '.portfolio-card[style*="display: block"], .portfolio-card:not([style*="display: none"])'
      );
      document.getElementById('project-count').textContent = visibleCards.length;
    });
  });
}

document.addEventListener('DOMContentLoaded', initPortfolioFilter);

