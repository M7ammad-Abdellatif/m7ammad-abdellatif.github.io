/* =========================================================
   PORTFOLIO — Mohammad | AI & Data Science
   script.js
   ========================================================= */


// ---- 1. Sticky Navbar: add .scrolled class on scroll ----
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  if (window.scrollY > 20) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});


// ---- 2. Hamburger Menu Toggle ----
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('nav-links');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navLinks.classList.toggle('open');
});

// Close menu when a nav link is clicked (mobile UX)
navLinks.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navLinks.classList.remove('open');
  });
});


// ---- 3. Reveal on Scroll (Intersection Observer) ----
// All elements with class .reveal will fade in when they enter the viewport
const revealElements = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        // Stagger delay: each item in a group reveals slightly after the previous
        const siblings = entry.target.parentElement.querySelectorAll('.reveal');
        let delay = 0;
        siblings.forEach((el, i) => {
          if (el === entry.target) delay = i * 80;
        });

        setTimeout(() => {
          entry.target.classList.add('visible');
        }, delay);

        revealObserver.unobserve(entry.target); // Only animate once
      }
    });
  },
  {
    threshold: 0.12,      // Trigger when 12% of element is visible
    rootMargin: '0px 0px -40px 0px'  // Slightly before the bottom of viewport
  }
);

revealElements.forEach(el => revealObserver.observe(el));


// ---- 4. Smooth Active Nav Link Highlight on Scroll ----
const sections  = document.querySelectorAll('section[id]');
const navItems  = document.querySelectorAll('.nav-link');

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navItems.forEach(link => {
          link.style.color = '';
          if (link.getAttribute('href') === `#${id}`) {
            link.style.color = 'var(--accent)';
          }
        });
      }
    });
  },
  {
    rootMargin: '-40% 0px -55% 0px' // Highlights link when section is roughly centered
  }
);

sections.forEach(section => sectionObserver.observe(section));
