/* L&S Advance — minimal site JS (no dependencies) */
(function () {
  "use strict";

  /* Mobile nav toggle */
  var toggle = document.getElementById("navToggle");
  var menu = document.getElementById("navMenu");

  if (toggle && menu) {
    toggle.addEventListener("click", function () {
      var open = menu.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });

    /* Close the menu after tapping a link (mobile) */
    menu.addEventListener("click", function (e) {
      if (e.target.closest("a") && menu.classList.contains("open")) {
        menu.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  /* Current year in footer */
  var yearEl = document.getElementById("year");
  if (yearEl) { yearEl.textContent = String(new Date().getFullYear()); }

  /* Enquiry form UX.
     NOTE: This only handles client-side validation + feedback. The form still
     submits to whatever `action` is set on the <form> in index.html. Until a
     real endpoint (e.g. Formspree) is wired in, submission is blocked and a
     helper message is shown so nothing is silently lost. */
  var form = document.getElementById("enquiryForm");
  var note = document.getElementById("formNote");

  if (form) {
    form.addEventListener("submit", function (e) {
      var action = form.getAttribute("action");
      var configured = action && action !== "#";

      /* Basic required-field validation (native validity API) */
      if (!form.checkValidity()) {
        e.preventDefault();
        var firstInvalid = form.querySelector(":invalid");
        if (firstInvalid) { firstInvalid.focus(); }
        setNote("Please complete the required fields (Name, Email, Message).", "err");
        return;
      }

      if (!configured) {
        /* No backend wired yet — prevent a broken submit to "#". */
        e.preventDefault();
        setNote("Form is ready but not yet connected to an email/handler. See README.md to wire it up.", "err");
        return;
      }

      /* If configured, let the browser submit normally. */
      setNote("Sending your enquiry…", "ok");
    });
  }

  function setNote(msg, kind) {
    if (!note) { return; }
    note.textContent = msg;
    note.className = "form-note " + (kind || "");
  }

  var reduceMotion = window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------------------------------------------------------------
     Auto-hide header — reveal on hover near the top edge (pointer
     devices) or on scroll-up (touch). Always shown at the very top
     of the page, while hovering the header, and on keyboard focus.
     Disabled entirely for reduced-motion users.
     --------------------------------------------------------------- */
  var header = document.querySelector(".site-header");
  if (header && !reduceMotion) {
    var canHover = window.matchMedia && window.matchMedia("(hover: hover)").matches;
    var hoveringHeader = false;
    var lastY = window.scrollY || 0;
    var TOP_ZONE = 70;   /* px from the top that reveals the header on hover */

    function show() { header.classList.remove("nav-hidden"); }
    function hide() { header.classList.add("nav-hidden"); }

    header.addEventListener("mouseenter", function () { hoveringHeader = true; show(); });
    header.addEventListener("mouseleave", function () { hoveringHeader = false; });
    header.addEventListener("focusin", show);

    function onScroll() {
      var y = window.scrollY || 0;
      var menuOpen = menu && menu.classList.contains("open");
      if (y <= 10 || hoveringHeader || menuOpen) {
        show();
      } else if (canHover) {
        hide();                     /* pointer devices reveal via hover zone */
      } else {
        if (y > lastY + 4) { hide(); }        /* scrolling down */
        else if (y < lastY - 4) { show(); }   /* scrolling up   */
      }
      lastY = y;
    }
    window.addEventListener("scroll", onScroll, { passive: true });

    if (canHover) {
      window.addEventListener("mousemove", function (e) {
        if (e.clientY <= TOP_ZONE) { show(); }
        else if ((window.scrollY || 0) > 10 && !hoveringHeader) { hide(); }
      }, { passive: true });
    }
  }

  /* ---------------------------------------------------------------
     Scroll reveal (card swipe-up) for homepage sections/cards.
     Isolated so it is easy to revert.
     --------------------------------------------------------------- */
  var revealEls = document.querySelectorAll(".reveal");
  if (revealEls.length) {
    if (reduceMotion || !("IntersectionObserver" in window)) {
      revealEls.forEach(function (el) { el.classList.add("is-visible"); });
    } else {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (en.isIntersecting) {
            en.target.classList.add("is-visible");
            io.unobserve(en.target);
          }
        });
      }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
      revealEls.forEach(function (el) { io.observe(el); });
    }
  }
})();
