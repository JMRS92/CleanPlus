// CleanPlus Interactive JavaScript & RGPD Cookie Management
document.addEventListener('DOMContentLoaded', () => {
  
  // 1. RGPD Cookie Banner Management
  const cookieBanner = document.getElementById('cookie-banner');
  const btnAcceptAll = document.getElementById('cookie-accept-all');
  const btnReject = document.getElementById('cookie-reject');
  const btnSettings = document.getElementById('cookie-settings-btn');
  const openSettingsLink = document.getElementById('open-cookies-settings');

  const COOKIE_KEY = 'cleanplus_cookie_consent';

  const savedConsent = localStorage.getItem(COOKIE_KEY);
  if (!savedConsent) {
    cookieBanner.style.display = 'block';
  } else {
    cookieBanner.style.display = 'none';
  }

  function setConsent(type) {
    localStorage.setItem(COOKIE_KEY, JSON.stringify({
      type: type,
      timestamp: new Date().toISOString()
    }));
    cookieBanner.style.display = 'none';
  }

  if (btnAcceptAll) btnAcceptAll.addEventListener('click', () => setConsent('all'));
  if (btnReject) btnReject.addEventListener('click', () => setConsent('essential'));
  if (btnSettings) btnSettings.addEventListener('click', () => {
    setConsent('custom');
    const modalCookies = document.getElementById('modal-cookies');
    if (modalCookies) modalCookies.classList.add('active');
  });

  if (openSettingsLink) {
    openSettingsLink.addEventListener('click', (e) => {
      e.preventDefault();
      cookieBanner.style.display = 'block';
    });
  }

  // 2. Legal Modals Handler
  const legalTriggers = document.querySelectorAll('.legal-trigger');
  const modalCloses = document.querySelectorAll('.modal-close');

  legalTriggers.forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = trigger.getAttribute('data-target');
      const targetModal = document.getElementById(targetId);
      if (targetModal) {
        targetModal.classList.add('active');
      }
    });
  });

  modalCloses.forEach(closeBtn => {
    closeBtn.addEventListener('click', () => {
      const modal = closeBtn.closest('.legal-modal');
      if (modal) {
        modal.classList.remove('active');
      }
    });
  });

  window.addEventListener('click', (e) => {
    if (e.target.classList.contains('legal-modal')) {
      e.target.classList.remove('active');
    }
  });

  // 3. Interactive Reservation Form Submission
  const reservationForm = document.getElementById('reservation-form');
  const formSuccess = document.getElementById('form-success');

  if (reservationForm) {
    // Set default date to tomorrow
    const fechaInput = document.getElementById('fecha');
    if (fechaInput) {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      fechaInput.value = tomorrow.toISOString().split('T')[0];
    }

    reservationForm.addEventListener('submit', (e) => {
      e.preventDefault();

      // Show success feedback
      reservationForm.style.display = 'none';
      if (formSuccess) {
        formSuccess.classList.remove('hidden');
      }
    });
  }

});
