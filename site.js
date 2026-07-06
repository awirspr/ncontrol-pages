(function () {
  const toggle = document.querySelector(".mobile-menu-toggle");
  const nav = document.querySelector("#site-nav");
  if (!toggle || !nav) return;

  const closeMenu = () => {
    nav.removeAttribute("data-open");
    document.body.removeAttribute("data-nav-open");
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "Open navigation");
  };

  toggle.addEventListener("click", () => {
    const open = nav.getAttribute("data-open") === "true";
    if (open) {
      closeMenu();
      return;
    }
    nav.setAttribute("data-open", "true");
    document.body.setAttribute("data-nav-open", "true");
    toggle.setAttribute("aria-expanded", "true");
    toggle.setAttribute("aria-label", "Close navigation");
  });

  nav.addEventListener("click", (event) => {
    if (event.target.closest("a")) closeMenu();
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 768) closeMenu();
  });
})();
