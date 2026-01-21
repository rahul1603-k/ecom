// Allow overriding via localStorage.API_BASE or global variable if needed
const DEFAULT_API_BASE = "https://ecom-production-6776.up.railway.app";
const OVERRIDE_API_BASE = (typeof window !== 'undefined' && (
  window.NETLIFY_API_BASE || localStorage.getItem('API_BASE')
)) || null;

window.APP_CONFIG = {
  API_BASE: OVERRIDE_API_BASE || DEFAULT_API_BASE
};

// Global animated navigation
let isNavigating = false;

function navigateTo(url) {
  if (isNavigating) return;
  isNavigating = true;
  document.body.classList.add("page-exit");
  setTimeout(() => {
    window.location.href = url;
  }, 400);
}
