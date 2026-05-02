/**
 * main.js — Portfolio interactive behaviors
 * - Navbar scroll shadow + active link highlighting
 * - Mobile nav toggle
 * - Contact form frontend validation
 * - Scroll-to-top button
 */

(function () {
  'use strict';

  /** Delay (ms) used to simulate an async form submission. */
  var FORM_SUBMIT_DELAY = 1200;

  /* ──────────────────────────────────────────
     Navbar
  ────────────────────────────────────────── */
  const navbar = document.getElementById('navbar');
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');
  const allNavLinks = navLinks ? navLinks.querySelectorAll('a') : [];

  // Add/remove shadow on scroll
  function onScroll() {
    if (!navbar) return;
    navbar.classList.toggle('scrolled', window.scrollY > 10);
    updateActiveLink();
    toggleScrollTop();
  }

  // Highlight nav link matching current section
  function updateActiveLink() {
    const sections = document.querySelectorAll('section[id]');
    let current = '';
    sections.forEach((sec) => {
      const top = sec.offsetTop - 90;
      if (window.scrollY >= top) current = sec.id;
    });
    allNavLinks.forEach((link) => {
      const href = link.getAttribute('href');
      link.classList.toggle('active', href === '#' + current);
    });
  }

  // Mobile nav toggle
  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      const isOpen = navLinks.classList.toggle('open');
      navToggle.classList.toggle('open', isOpen);
      navToggle.setAttribute('aria-expanded', String(isOpen));
    });

    // Close mobile nav when a link is clicked
    allNavLinks.forEach((link) => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        navToggle.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // run once on load

  /* ──────────────────────────────────────────
     Scroll-to-top button
  ────────────────────────────────────────── */
  const scrollTopBtn = document.getElementById('scrollTop');

  function toggleScrollTop() {
    if (!scrollTopBtn) return;
    scrollTopBtn.classList.toggle('visible', window.scrollY > 400);
  }

  if (scrollTopBtn) {
    scrollTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ──────────────────────────────────────────
     Contact Form Validation
  ────────────────────────────────────────── */
  const contactForm = document.getElementById('contactForm');

  if (contactForm) {
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');
    const formSuccess = document.getElementById('formSuccess');

    function getError(id) {
      return document.getElementById(id + 'Error');
    }

    function showError(input, msg) {
      input.classList.add('error');
      const err = getError(input.id);
      if (err) {
        err.textContent = msg;
        err.classList.add('visible');
      }
    }

    function clearError(input) {
      input.classList.remove('error');
      const err = getError(input.id);
      if (err) err.classList.remove('visible');
    }

    function validateEmail(value) {
      // Use a temporary input element to leverage the browser's built-in email validation
      const probe = document.createElement('input');
      probe.type = 'email';
      probe.value = value.trim();
      return probe.checkValidity();
    }

    // Real-time validation on blur
    [nameInput, emailInput, messageInput].forEach((input) => {
      if (!input) return;
      input.addEventListener('blur', () => validateField(input));
      input.addEventListener('input', () => {
        if (input.classList.contains('error')) validateField(input);
      });
    });

    function validateField(input) {
      const val = input.value.trim();
      if (input.id === 'name') {
        if (!val) {
          showError(input, '请输入您的姓名。');
          return false;
        }
        if (val.length < 2) {
          showError(input, '姓名至少需要 2 个字符。');
          return false;
        }
      }
      if (input.id === 'email') {
        if (!val) {
          showError(input, '请输入您的邮箱地址。');
          return false;
        }
        if (!validateEmail(val)) {
          showError(input, '请输入有效的邮箱地址。');
          return false;
        }
      }
      if (input.id === 'message') {
        if (!val) {
          showError(input, '请输入您的留言内容。');
          return false;
        }
        if (val.length < 10) {
          showError(input, '留言内容至少需要 10 个字符。');
          return false;
        }
      }
      clearError(input);
      return true;
    }

    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const validName = validateField(nameInput);
      const validEmail = validateField(emailInput);
      const validMsg = validateField(messageInput);

      if (!validName || !validEmail || !validMsg) return;

      // Simulate sending
      const submitBtn = contactForm.querySelector('.btn-submit');
      submitBtn.textContent = '发送中…';
      submitBtn.disabled = true;

      setTimeout(() => {
        contactForm.reset();
        submitBtn.textContent = '发送消息';
        submitBtn.disabled = false;
        if (formSuccess) {
          formSuccess.classList.add('visible');
          setTimeout(() => formSuccess.classList.remove('visible'), 5000);
        }
      }, FORM_SUBMIT_DELAY);
    });
  }
})();
