/**
 * Salone BrightPath — site interactions
 * - Mobile navigation toggle
 * - Smooth scrolling to sections (accounts for sticky header)
 * - Scroll-triggered animations
 * - Animated stat numbers when visible
 * - Contact form validation (client-side only)
 */

(function () {
  "use strict";

  // ----- Very short page loader -----
  function hidePageLoader() {
    var el = document.getElementById("page-loader");
    if (!el) return;
    el.classList.add("is-hidden");
    el.setAttribute("aria-busy", "false");
    window.setTimeout(function () {
      el.remove();
    }, 320);
  }

  window.setTimeout(hidePageLoader, 260);

  // ----- DOM references -----
  const navToggle = document.querySelector(".nav-toggle");
  const navMenu = document.querySelector(".nav-menu");
  const navLinks = document.querySelectorAll(".nav-link");
  const yearEl = document.getElementById("year");
  const contactForm = document.getElementById("contact-form");
  const animatedBlocks = document.querySelectorAll("[data-animate]");
  const statNumbers = document.querySelectorAll(".stat-number");

  // Sticky header height for scroll offset
  const header = document.querySelector(".site-header");
  function getHeaderOffset() {
    return header ? header.offsetHeight : 0;
  }

  // ----- Current year in footer -----
  if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
  }

  // ----- Mobile menu -----
  function closeMenu() {
    if (!navToggle || !navMenu) return;
    navToggle.setAttribute("aria-expanded", "false");
    navMenu.classList.remove("is-open");
    document.body.style.overflow = "";
  }

  function openMenu() {
    if (!navToggle || !navMenu) return;
    navToggle.setAttribute("aria-expanded", "true");
    navMenu.classList.add("is-open");
    document.body.style.overflow = "hidden";
  }

  if (navToggle && navMenu) {
    navToggle.addEventListener("click", function () {
      const expanded = navToggle.getAttribute("aria-expanded") === "true";
      if (expanded) {
        closeMenu();
      } else {
        openMenu();
      }
    });

    // Close menu when a link is clicked (mobile)
    navLinks.forEach(function (link) {
      link.addEventListener("click", function () {
        if (window.matchMedia("(max-width: 768px)").matches) {
          closeMenu();
        }
      });
    });

    // Close on Escape
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeMenu();
    });
  }

  // ----- Smooth scroll for in-page links -----
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener("click", function (e) {
      const id = anchor.getAttribute("href");
      if (!id || id === "#") return;

      const target = document.querySelector(id);
      if (!target) return;

      e.preventDefault();
      const top =
        target.getBoundingClientRect().top +
        window.scrollY -
        getHeaderOffset() -
        12;

      window.scrollTo({
        top: Math.max(0, top),
        behavior: "smooth",
      });
    });
  });

  // ----- Scroll animations (fade / slide in) -----
  if ("IntersectionObserver" in window && animatedBlocks.length) {
    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { root: null, rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
    );

    animatedBlocks.forEach(function (el) {
      observer.observe(el);
    });
  } else {
    // Fallback: show everything if IntersectionObserver is missing
    animatedBlocks.forEach(function (el) {
      el.classList.add("is-visible");
    });
  }

  // ----- Simple number count-up for statistics -----
  function animateValue(el, end, duration) {
    const start = 0;
    const startTime = performance.now();

    function frame(now) {
      const t = Math.min((now - startTime) / duration, 1);
      // easeOutQuad
      const eased = 1 - (1 - t) * (1 - t);
      const value = Math.floor(start + (end - start) * eased);
      el.textContent = String(value);
      if (t < 1) requestAnimationFrame(frame);
    }

    requestAnimationFrame(frame);
  }

  if ("IntersectionObserver" in window && statNumbers.length) {
    const statObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          const el = entry.target;
          const target = parseInt(el.getAttribute("data-target") || "0", 10);
          if (!isNaN(target) && target > 0) {
            animateValue(el, target, 1400);
          }
          statObserver.unobserve(el);
        });
      },
      { threshold: 0.35 }
    );

    statNumbers.forEach(function (el) {
      statObserver.observe(el);
    });
  } else {
    statNumbers.forEach(function (el) {
      const target = parseInt(el.getAttribute("data-target") || "0", 10);
      if (!isNaN(target)) el.textContent = String(target);
    });
  }

  // ----- Contact form validation -----
  function setError(fieldId, message) {
    const err = document.getElementById(fieldId + "-error");
    const input = document.getElementById(fieldId);
    if (err) err.textContent = message || "";
    if (input) input.classList.toggle("invalid", Boolean(message));
  }

  function clearErrors() {
    ["name", "email", "phone", "subject", "message"].forEach(function (id) {
      setError(id, "");
    });
  }

  function isValidEmail(value) {
    // Simple pattern — good enough for a student demo
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  }

  /** Optional phone: if filled, expect at least 8 digits (Sierra Leone / general) */
  function isValidOptionalPhone(value) {
    var trimmed = value.trim();
    if (!trimmed) return true;
    var digits = trimmed.replace(/\D/g, "");
    return digits.length >= 8;
  }

  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();
      clearErrors();

      const nameInput = document.getElementById("name");
      const emailInput = document.getElementById("email");
      const phoneInput = document.getElementById("phone");
      const subjectInput = document.getElementById("subject");
      const messageInput = document.getElementById("message");
      const successEl = document.getElementById("form-success");

      const name = nameInput ? nameInput.value.trim() : "";
      const email = emailInput ? emailInput.value.trim() : "";
      const phone = phoneInput ? phoneInput.value : "";
      const subject = subjectInput ? subjectInput.value : "";
      const message = messageInput ? messageInput.value.trim() : "";

      let valid = true;

      if (name.length < 2) {
        setError("name", "Please enter your name (at least 2 characters).");
        valid = false;
      }

      if (!email) {
        setError("email", "Please enter your email address.");
        valid = false;
      } else if (!isValidEmail(email)) {
        setError("email", "Please enter a valid email address.");
        valid = false;
      }

      if (!isValidOptionalPhone(phone)) {
        setError("phone", "If you add a phone number, use at least 8 digits (spaces and + are OK).");
        valid = false;
      }

      if (!subject) {
        setError("subject", "Please choose a topic so we can direct your message.");
        valid = false;
      }

      if (message.length < 10) {
        setError("message", "Please write a message (at least 10 characters).");
        valid = false;
      }

      if (!valid) {
        if (successEl) successEl.hidden = true;
        return;
      }

      // Demo only: no backend — show success message
      if (successEl) {
        successEl.hidden = false;
      }
      contactForm.reset();
      clearErrors();
    });
  }
})();
