/**
 * Built With Resilience (BWR) - Interactive Controller
 * High-performance, zero-dependency client interactions
 */

document.addEventListener('DOMContentLoaded', () => {
  initMobileNav();
  initFaqAccordion();
  initProgramTabs();
  initLeadForm();
  initScrollHeader();
  syncAriaValidation();
});

/* ==========================================================================
   1. Mobile Navigation Drawer
   ========================================================================== */
function initMobileNav() {
  const toggleBtn = document.getElementById('mobile-toggle');
  const drawer = document.getElementById('mobile-drawer');
  const links = drawer?.querySelectorAll('a');

  if (!toggleBtn || !drawer) return;

  function toggle() {
    const isOpen = drawer.classList.toggle('open');
    toggleBtn.setAttribute('aria-expanded', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  }

  toggleBtn.addEventListener('click', toggle);

  links?.forEach(link => {
    link.addEventListener('click', () => {
      drawer.classList.remove('open');
      toggleBtn.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    });
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && drawer.classList.contains('open')) {
      toggle();
    }
  });
}

/* ==========================================================================
   2. FAQ Accordion with Accessibility
   ========================================================================== */
function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const trigger = item.querySelector('.faq-trigger');
    const content = item.querySelector('.faq-content');

    trigger?.addEventListener('click', () => {
      const isExpanded = item.classList.contains('active');

      // Close all other accordions
      faqItems.forEach(otherItem => {
        if (otherItem !== item) {
          otherItem.classList.remove('active');
          otherItem.querySelector('.faq-trigger')?.setAttribute('aria-expanded', 'false');
        }
      });

      // Toggle current
      item.classList.toggle('active', !isExpanded);
      trigger.setAttribute('aria-expanded', String(!isExpanded));
    });
  });
}

/* ==========================================================================
   3. Program Filter Tabs
   ========================================================================== */
function initProgramTabs() {
  const tabBtns = document.querySelectorAll('.tab-btn');
  const programCards = document.querySelectorAll('.program-card');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter') || 'all';

      programCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          card.style.display = 'flex';
          card.style.animation = 'fadeIn 0.3s ease forwards';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* ==========================================================================
   4. High-Converting Lead Form & WhatsApp Integration
   ========================================================================== */
function initLeadForm() {
  const form = document.getElementById('bwr-lead-form');
  const toast = document.getElementById('form-toast');

  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Check validity
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    const name = document.getElementById('lead-name')?.value.trim();
    const countryCode = document.getElementById('country-code')?.value || '+91';
    const phone = document.getElementById('lead-phone')?.value.trim();
    const email = document.getElementById('lead-email')?.value.trim();
    const goal = document.getElementById('lead-goal')?.value || 'General Transformation';
    const mode = form.querySelector('input[name="coaching-mode"]:checked')?.value || 'Online 1-on-1';

    // Show toast
    if (toast) {
      toast.classList.add('show');
      setTimeout(() => toast.classList.remove('show'), 6000);
    }

    // Build pre-filled WhatsApp inquiry message
    const message = `Hello Built With Resilience Team! I would like to book a coaching strategy consultation.\n\n` +
      `*Name:* ${name}\n` +
      `*Phone:* ${countryCode} ${phone}\n` +
      `*Email:* ${email}\n` +
      `*Goal:* ${goal}\n` +
      `*Preferred Mode:* ${mode}\n\n` +
      `Looking forward to speaking with a master coach!`;

    const bwrWhatsAppNumber = '918008884655';
    const whatsappUrl = `https://api.whatsapp.com/send?phone=${bwrWhatsAppNumber}&text=${encodeURIComponent(message)}`;

    // Open WhatsApp in new tab after brief feedback delay
    setTimeout(() => {
      window.open(whatsappUrl, '_blank');
      form.reset();
    }, 1200);
  });
}

/* ==========================================================================
   5. Modern Web Guidance: Synchronize :user-invalid with aria-invalid
   ========================================================================== */
function syncAriaValidation() {
  const syncAria = (el) => {
    if (!el || !el.matches) return;
    if (el.matches('input, select, textarea')) {
      el.setAttribute('aria-invalid', el.matches(':user-invalid') ? 'true' : 'false');
    }
  };

  document.addEventListener('blur', (e) => syncAria(e.target), true);
  document.addEventListener('input', (e) => {
    if (e.target.hasAttribute && e.target.hasAttribute('aria-invalid')) {
      syncAria(e.target);
    }
  });
}

/* ==========================================================================
   6. Header Shadow on Scroll
   ========================================================================== */
function initScrollHeader() {
  const header = document.querySelector('.site-header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header?.classList.add('scrolled');
    } else {
      header?.classList.remove('scrolled');
    }
  }, { passive: true });
}

