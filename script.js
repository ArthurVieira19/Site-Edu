(function () {
  "use strict";

  var WA_NUMBER = "5511959841512";

  // ---------- Monta os links do WhatsApp com a mensagem pré-preenchida ----------
  function buildWhatsappLinks() {
    var links = document.querySelectorAll("[data-wa]");
    links.forEach(function (link) {
      var msg = link.getAttribute("data-wa-msg") || "";
      var url = "https://wa.me/" + WA_NUMBER;
      if (msg) url += "?text=" + encodeURIComponent(msg);
      link.setAttribute("href", url);
      link.setAttribute("target", "_blank");
      link.setAttribute("rel", "noopener");
    });
  }

  // ---------- Header: fundo sólido ao rolar ----------
  function initHeaderScroll() {
    var header = document.querySelector(".site-header");
    if (!header) return;
    function update() {
      if (window.scrollY > 24) header.classList.add("is-scrolled");
      else header.classList.remove("is-scrolled");
    }
    update();
    window.addEventListener("scroll", update, { passive: true });
  }

  // ---------- Menu mobile ----------
  function initMobileNav() {
    var toggle = document.getElementById("navToggle");
    var nav = document.getElementById("mainNav");
    if (!toggle || !nav) return;

    toggle.addEventListener("click", function () {
      var isOpen = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(isOpen));
    });

    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        nav.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  // ---------- Animação de entrada ao rolar ----------
  function initReveal() {
    var items = document.querySelectorAll(".reveal");
    if (!items.length) return;

    if (!("IntersectionObserver" in window)) {
      items.forEach(function (el) { el.classList.add("is-visible"); });
      return;
    }

    var observer = new IntersectionObserver(
      function (entries, obs) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );

    items.forEach(function (el) { observer.observe(el); });
  }

  // ---------- Ano do rodapé ----------
  function setYear() {
    var el = document.getElementById("year");
    if (el) el.textContent = new Date().getFullYear();
  }

  document.addEventListener("DOMContentLoaded", function () {
    buildWhatsappLinks();
    initHeaderScroll();
    initMobileNav();
    initReveal();
    setYear();
  });
})();
