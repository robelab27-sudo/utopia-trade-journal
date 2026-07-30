// ============================================================================
// Mobile navigation. The sidebar (all page navigation) is hidden on narrow
// screens by CSS, but nothing ever replaced it — meaning mobile users had no
// way to switch pages at all. This adds a hamburger button + slide-out
// drawer, built entirely in JS so no HTML file needs to change: it finds
// the existing .sidebar element (present on every page) and wraps it with
// the toggle behavior.
// ============================================================================

function setupMobileNav() {
  const sidebar = document.querySelector('.sidebar');
  if (!sidebar) return; // pages without a sidebar (login, index) don't need this

  const toggle = document.createElement('div');
  toggle.className = 'mobile-nav-toggle';
  toggle.setAttribute('aria-label', 'Open menu');
  toggle.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 6h16M4 12h16M4 18h16"/></svg>';
  document.body.appendChild(toggle);

  const backdrop = document.createElement('div');
  backdrop.className = 'mobile-nav-backdrop';
  document.body.appendChild(backdrop);

  function openNav() {
    sidebar.classList.add('mobile-open');
    backdrop.classList.add('open');
    toggle.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6L6 18M6 6l12 12"/></svg>';
  }
  function closeNav() {
    sidebar.classList.remove('mobile-open');
    backdrop.classList.remove('open');
    toggle.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 6h16M4 12h16M4 18h16"/></svg>';
  }

  toggle.addEventListener('click', () => {
    sidebar.classList.contains('mobile-open') ? closeNav() : openNav();
  });
  backdrop.addEventListener('click', closeNav);

  // Tapping a nav link should close the drawer (the link navigation itself
  // still happens normally — this just avoids the drawer being stuck open
  // on the next page if the browser preserves scroll/DOM state momentarily).
  sidebar.querySelectorAll('a.nav-item, .sidebar-foot').forEach((item) => {
    item.addEventListener('click', closeNav);
  });

  // Closing on Escape is a small but expected accessibility nicety.
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeNav();
  });
}

setupMobileNav();
