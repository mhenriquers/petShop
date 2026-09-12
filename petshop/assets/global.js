/* ============================================================
   JOFA — Atelier Digital de Acessórios Premium para Pets
   global.js — Comportamento global do tema
   ============================================================ */

(function () {
  "use strict";

  /**
   * Inicialização global do tema.
   */
  console.log("[JOFA] Tema carregado.");

  /**
   * Toggle da busca no mobile.
   * Ao tocar o ícone de busca, o campo de input aparece/desaparece.
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
})();