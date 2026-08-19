// =========================================
// Bijan Shrestha - Portfolio JS
// =========================================

document.addEventListener('DOMContentLoaded', function () {

  // ---- preloader ----
  // just hide it once everything is loaded, feels less jarring than nothing at all
  window.addEventListener('load', function () {
    const preloader = document.getElementById('preloader');
    setTimeout(function () {
      preloader.classList.add('hidden');
    }, 400);
  });


  // ---- sticky navbar on scroll ----
  const navbar = document.getElementById('navbar');

  function handleNavbarScroll() {
    if (window.scrollY > 20) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }
  handleNavbarScroll();
  window.addEventListener('scroll', handleNavbarScroll);


  // ---- mobile hamburger menu ----
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');
  const navOverlay = document.getElementById('navOverlay');

  function openMenu() {
    hamburger.classList.add('open');
    navLinks.classList.add('open');
    navOverlay.classList.add('show');
    hamburger.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden'; // stop background scroll while menu open
  }

  function closeMenu() {
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
    navOverlay.classList.remove('show');
    hamburger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  hamburger.addEventListener('click', function () {
    if (navLinks.classList.contains('open')) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  navOverlay.addEventListener('click', closeMenu);

  // close menu when a link is clicked (mobile)
  document.querySelectorAll('.nav-link').forEach(function (link) {
    link.addEventListener('click', closeMenu);
  });


  // ---- highlight active nav link based on scroll position ----
  const sections = document.querySelectorAll('main section[id]');
  const navLinkEls = document.querySelectorAll('.nav-link');

  function setActiveLink() {
    let current = '';
    sections.forEach(function (section) {
      const sectionTop = section.offsetTop - 120;
      if (window.scrollY >= sectionTop) {
        current = section.getAttribute('id');
      }
    });

    navLinkEls.forEach(function (link) {
      link.classList.remove('active-link');
      if (link.getAttribute('href') === '#' + current) {
        link.classList.add('active-link');
      }
    });
  }
  window.addEventListener('scroll', setActiveLink);


  // ---- typing effect for hero role text ----
  const typedTextEl = document.getElementById('typedText');
  const roles = [
    'CSIT Student',
    'Web Developer',
    'Tech Enthusiast',
    'Lifelong Learner'
  ];

  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function typeLoop() {
    const currentRole = roles[roleIndex];

    if (isDeleting) {
      charIndex--;
    } else {
      charIndex++;
    }

    typedTextEl.textContent = currentRole.substring(0, charIndex);

    let speed = isDeleting ? 40 : 90;

    if (!isDeleting && charIndex === currentRole.length) {
      speed = 1500; // pause at full word
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      speed = 300;
    }

    setTimeout(typeLoop, speed);
  }

  if (typedTextEl) {
    typeLoop();
  }


  // ---- scroll reveal using Intersection Observer ----
  const revealEls = document.querySelectorAll('.reveal, .skill-card');

  const revealObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  revealEls.forEach(function (el) {
    revealObserver.observe(el);
  });


  // ---- theme toggle (dark / light) ----
  const themeToggle = document.getElementById('themeToggle');
  const iconMoon = document.getElementById('themeIconMoon');
  const iconSun = document.getElementById('themeIconSun');

  // check if user already picked a theme before
  const savedTheme = localStorage.getItem('bs-theme');
  if (savedTheme === 'light') {
    document.documentElement.setAttribute('data-theme', 'light');
    iconMoon.style.display = 'none';
    iconSun.style.display = 'block';
  }

  themeToggle.addEventListener('click', function () {
    const isLight = document.documentElement.getAttribute('data-theme') === 'light';

    if (isLight) {
      document.documentElement.removeAttribute('data-theme');
      localStorage.setItem('bs-theme', 'dark');
      iconMoon.style.display = 'block';
      iconSun.style.display = 'none';
    } else {
      document.documentElement.setAttribute('data-theme', 'light');
      localStorage.setItem('bs-theme', 'light');
      iconMoon.style.display = 'none';
      iconSun.style.display = 'block';
    }
  });


  // ---- back to top button ----
  const backToTop = document.getElementById('backToTop');

  window.addEventListener('scroll', function () {
    if (window.scrollY > 400) {
      backToTop.classList.add('show');
    } else {
      backToTop.classList.remove('show');
    }
  });

  backToTop.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });


  // ---- contact form validation (no backend, just front-end demo) ----
  const contactForm = document.getElementById('contactForm');
  const formSuccess = document.getElementById('formSuccess');

  function showError(inputId, errorId, message) {
    const input = document.getElementById(inputId);
    const errorEl = document.getElementById(errorId);
    input.closest('.form-group').classList.add('invalid');
    errorEl.textContent = message;
  }

  function clearError(inputId, errorId) {
    const input = document.getElementById(inputId);
    const errorEl = document.getElementById(errorId);
    input.closest('.form-group').classList.remove('invalid');
    errorEl.textContent = '';
  }

  function isValidEmail(email) {
    // good enough for a front-end check, not trying to be a full RFC regex
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();

      const nameVal = document.getElementById('name').value.trim();
      const emailVal = document.getElementById('email').value.trim();
      const messageVal = document.getElementById('message').value.trim();

      let valid = true;

      if (nameVal === '') {
        showError('name', 'nameError', 'Please enter your name.');
        valid = false;
      } else {
        clearError('name', 'nameError');
      }

      if (emailVal === '') {
        showError('email', 'emailError', 'Please enter your email.');
        valid = false;
      } else if (!isValidEmail(emailVal)) {
        showError('email', 'emailError', 'That email doesn\'t look right.');
        valid = false;
      } else {
        clearError('email', 'emailError');
      }

      if (messageVal === '') {
        showError('message', 'messageError', 'Please write a short message.');
        valid = false;
      } else if (messageVal.length < 10) {
        showError('message', 'messageError', 'Message is a bit too short.');
        valid = false;
      } else {
        clearError('message', 'messageError');
      }

      if (!valid) {
        formSuccess.classList.remove('show');
        return;
      }

      // no backend hooked up, just show a success message and reset the form
      formSuccess.classList.add('show');
      contactForm.reset();

      setTimeout(function () {
        formSuccess.classList.remove('show');
      }, 5000);
    });
  }


  // ---- footer year ----
  document.getElementById('year').textContent = new Date().getFullYear();

});
