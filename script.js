// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
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

// Active navigation highlighting
window.addEventListener('scroll', () => {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');
  
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (scrollY >= (sectionTop - 200)) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
});

// Fade in animation on scroll
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, observerOptions);

// Observe all sections for fade-in animation
document.querySelectorAll('.section, .skill-card, .project-card, .contact-item').forEach(el => {
  el.classList.add('fade-in');
  observer.observe(el);
});

// Mobile menu toggle (basic implementation)
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const navLinks = document.querySelector('.nav-links');

mobileMenuToggle.addEventListener('click', () => {
  navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    if (window.innerWidth <= 768) {
      navLinks.style.display = 'none';
    }
  });
});

// Enhanced navbar background on scroll
window.addEventListener('scroll', () => {
  const navbar = document.querySelector('.navbar');
  if (window.scrollY > 100) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// Enhanced fade in animation on scroll
const enhancedObserverOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -100px 0px'
};

const enhancedObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, enhancedObserverOptions);

// Observe all sections for enhanced animations
document.querySelectorAll('.section, .skill-card, .project-card, .contact-item').forEach(el => {
  el.classList.add('fade-in');
  enhancedObserver.observe(el);
});

// Add staggered animation to skill cards
document.querySelectorAll('.skill-card').forEach((card, index) => {
  card.style.animationDelay = `${index * 0.1}s`;
});

// Add staggered animation to project cards
document.querySelectorAll('.project-card').forEach((card, index) => {
  card.style.animationDelay = `${index * 0.15}s`;
});

// Add staggered animation to contact items
document.querySelectorAll('.contact-item').forEach((item, index) => {
  item.style.animationDelay = `${index * 0.1}s`;
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
  const scrolled = window.pageYOffset;
  const hero = document.querySelector('.hero');
  if (hero) {
    hero.style.transform = `translateY(${scrolled * 0.5}px)`;
  }
});

// Enhanced typing effect with cursor
function typeWriter(element, text, speed = 100) {
  let i = 0;
  element.innerHTML = '';
  const cursor = document.createElement('span');
  cursor.textContent = '|';
  cursor.style.animation = 'blink 1s infinite';
  element.appendChild(cursor);
  
  function type() {
    if (i < text.length) {
      element.insertBefore(document.createTextNode(text.charAt(i)), cursor);
      i++;
      setTimeout(type, speed);
    } else {
      setTimeout(() => {
        cursor.remove();
      }, 1000);
    }
  }
  type();
}

// Add blinking cursor animation
const cursorStyle = document.createElement('style');
cursorStyle.textContent = `
  @keyframes blink {
    0%, 50% { opacity: 1; }
    51%, 100% { opacity: 0; }
  }
`;
document.head.appendChild(cursorStyle);

// Initialize typing effect when page loads
window.addEventListener('load', () => {
  const heroTitle = document.querySelector('.hero h1');
  if (heroTitle) {
    const originalText = heroTitle.textContent;
    setTimeout(() => {
      typeWriter(heroTitle, originalText, 120);
    }, 1500);
  }
});

// Add particle system
function createParticle() {
  const particle = document.createElement('div');
  particle.style.position = 'fixed';
  particle.style.width = '4px';
  particle.style.height = '4px';
  particle.style.background = `hsl(${Math.random() * 60 + 200}, 70%, 60%)`;
  particle.style.borderRadius = '50%';
  particle.style.pointerEvents = 'none';
  particle.style.zIndex = '-1';
  particle.style.left = Math.random() * window.innerWidth + 'px';
  particle.style.top = window.innerHeight + 'px';
  particle.style.boxShadow = '0 0 10px currentColor';
  
  document.body.appendChild(particle);
  
  const animation = particle.animate([
    { 
      transform: 'translateY(0) scale(1)',
      opacity: 1
    },
    { 
      transform: `translateY(-${window.innerHeight + 100}px) scale(0)`,
      opacity: 0
    }
  ], {
    duration: Math.random() * 3000 + 2000,
    easing: 'linear'
  });
  
  animation.onfinish = () => particle.remove();
}

// Create particles periodically
setInterval(createParticle, 300);

// Add mouse trail effect
let mouseTrail = [];
document.addEventListener('mousemove', (e) => {
  const trail = document.createElement('div');
  trail.style.position = 'fixed';
  trail.style.left = e.clientX + 'px';
  trail.style.top = e.clientY + 'px';
  trail.style.width = '6px';
  trail.style.height = '6px';
  trail.style.background = 'radial-gradient(circle, rgba(255, 107, 107, 0.8) 0%, transparent 70%)';
  trail.style.borderRadius = '50%';
  trail.style.pointerEvents = 'none';
  trail.style.zIndex = '9999';
  trail.style.transform = 'translate(-50%, -50%)';
  
  document.body.appendChild(trail);
  
  const fadeOut = trail.animate([
    { opacity: 1, transform: 'translate(-50%, -50%) scale(1)' },
    { opacity: 0, transform: 'translate(-50%, -50%) scale(0)' }
  ], {
    duration: 1000,
    easing: 'ease-out'
  });
  
  fadeOut.onfinish = () => trail.remove();
});

// Add smooth reveal animation to skill tags
const skillTags = document.querySelectorAll('.skill-tag');
skillTags.forEach((tag, index) => {
  tag.style.animationDelay = `${index * 0.05}s`;
  tag.classList.add('fade-in');
  observer.observe(tag);
});

// Add hover effect to project images
document.querySelectorAll('.project-image').forEach(image => {
  image.addEventListener('mouseenter', () => {
    image.style.transform = 'scale(1.05)';
  });
  
  image.addEventListener('mouseleave', () => {
    image.style.transform = 'scale(1)';
  });
});

// Add click effect to buttons
document.querySelectorAll('.btn').forEach(button => {
  button.addEventListener('click', function(e) {
    const ripple = document.createElement('span');
    const rect = this.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;
    
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.classList.add('ripple');
    
    this.appendChild(ripple);
    
    setTimeout(() => {
      ripple.remove();
    }, 600);
  });
});

// Add CSS for ripple effect
const style = document.createElement('style');
style.textContent = `
  .btn {
    position: relative;
    overflow: hidden;
  }
  
  .ripple {
    position: absolute;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.3);
    transform: scale(0);
    animation: ripple-animation 0.6s linear;
    pointer-events: none;
  }
  
  @keyframes ripple-animation {
    to {
      transform: scale(4);
      opacity: 0;
    }
  }
`;
document.head.appendChild(style);
