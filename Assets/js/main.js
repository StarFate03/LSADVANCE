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
})();
