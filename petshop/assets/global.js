/* ============================================================
   JOFA — Atelier Digital de Acessórios Premium para Pets
   global.js — Comportamento global do tema
   ============================================================ */

(function () {
  "use strict";

  console.log("[JOFA] Tema carregado.");

  /**
   * Toggle da busca no mobile.
   */
  var searchToggles = document.querySelectorAll(".header__search-toggle");

  searchToggles.forEach(function (toggle) {
    toggle.addEventListener("click", function () {
      var form = toggle.closest(".header__search");
      var isOpen = form.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");

      if (isOpen) {
        var input = form.querySelector(".header__search-input");
        if (input) input.focus();
      }
    });
  });

  /**
   * Menu mobile (drawer).
   */
  var menuToggle = document.querySelector(".header__menu-toggle");
  var nav = document.querySelector("#header-nav");
  var overlay = document.querySelector(".header__overlay");

  function closeMenu() {
    if (!nav || !menuToggle || !overlay) return;
    nav.classList.remove("is-open");
    menuToggle.classList.remove("is-active");
    overlay.classList.remove("is-visible");
    menuToggle.setAttribute("aria-expanded", "false");
  }

  function openMenu() {
    if (!nav || !menuToggle || !overlay) return;
    nav.classList.add("is-open");
    menuToggle.classList.add("is-active");
    overlay.classList.add("is-visible");
    menuToggle.setAttribute("aria-expanded", "true");
  }

  if (menuToggle) {
    menuToggle.addEventListener("click", function () {
      if (nav.classList.contains("is-open")) {
        closeMenu();
      } else {
        openMenu();
      }
    });
  }

  if (overlay) {
    overlay.addEventListener("click", closeMenu);
  }

  if (nav) {
    var navLinks = nav.querySelectorAll("a");
    navLinks.forEach(function (link) {
      link.addEventListener("click", closeMenu);
    });
  }

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") closeMenu();
  });
})();