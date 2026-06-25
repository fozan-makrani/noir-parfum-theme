/**
 * Noir Parfum — Sticky Add-to-Cart Bar
 * Watches the main ATC button; slides the bar in when it leaves the viewport.
 * Syncs with Dawn's native variant selector and submits the real product form.
 */

(function () {
  const stickyBar = document.getElementById("sticky-atc");
  const stickyBtn = document.getElementById("sticky-atc-btn");

  if (!stickyBar) return;

  // find the original ATC button on the page
  const originalBtn = document.querySelector('[name="add"]');

  if (!originalBtn) return;

  // show sticky bar when original button scrolls out of view
  const observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) {
          stickyBar.classList.add("is-visible");
          stickyBar.setAttribute("aria-hidden", "false");
        } else {
          stickyBar.classList.remove("is-visible");
          stickyBar.setAttribute("aria-hidden", "true");
        }
      });
    },
    { threshold: 0, rootMargin: "0px 0px -100px 0px" },
  );

  observer.observe(originalBtn);

  // clicking sticky button triggers the original ATC button
  stickyBtn.addEventListener("click", function () {
    originalBtn.click();

    // brief visual feedback
    stickyBtn.textContent = "Added!";
    stickyBtn.style.background = "#1a5c1a";
    stickyBtn.style.color = "#f5f0e8";

    setTimeout(function () {
      stickyBtn.textContent = "Add to Cart";
      stickyBtn.style.background = "#c9a84c";
      stickyBtn.style.color = "#0a0a0a";
    }, 1500);
  });
})();