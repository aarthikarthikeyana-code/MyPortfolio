// Aarthi Karthikeyan Portfolio - Interactive JavaScript Engine

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Lucide Icons
  if (window.lucide) {
    window.lucide.createIcons();
  }

  // Mobile Navigation Toggle
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      const isHidden = mobileMenu.classList.contains('hidden');
      if (isHidden) {
        mobileMenu.classList.remove('hidden');
        mobileMenuBtn.setAttribute('aria-expanded', 'true');
      } else {
        mobileMenu.classList.add('hidden');
        mobileMenuBtn.setAttribute('aria-expanded', 'false');
      }
    });

    mobileNavLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
        mobileMenuBtn.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Active Navbar Link Indicator on Scroll
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  function updateActiveNavLink() {
    const scrollY = window.pageYOffset;

    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute('id');

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('text-purple-600', 'font-semibold');
          link.classList.add('text-[#77778A]');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('text-purple-600', 'font-semibold');
            link.classList.remove('text-[#77778A]');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', updateActiveNavLink, { passive: true });
  updateActiveNavLink();

  // Project Filtering
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  if (filterBtns.length > 0 && projectCards.length > 0) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const category = btn.getAttribute('data-filter');

        // Update button states
        filterBtns.forEach(b => {
          b.classList.remove('bg-purple-600', 'text-white', 'shadow-sm');
          b.classList.add('bg-white', 'text-[#77778A]', 'border', 'border-purple-100');
        });
        btn.classList.add('bg-purple-600', 'text-white', 'shadow-sm');
        btn.classList.remove('bg-white', 'text-[#77778A]', 'border', 'border-purple-100');

        // Filter cards
        projectCards.forEach(card => {
          const cardCategories = card.getAttribute('data-category').split(' ');
          if (category === 'all' || cardCategories.includes(category)) {
            card.style.display = 'grid';
            setTimeout(() => {
              card.style.opacity = '1';
              card.style.transform = 'translateY(0)';
            }, 10);
          } else {
            card.style.opacity = '0';
            card.style.transform = 'translateY(12px)';
            setTimeout(() => {
              card.style.display = 'none';
            }, 250);
          }
        });
      });
    });
  }

  // Toast Notification System
  function showToast(message, type = 'success') {
    const toast = document.getElementById('toast');
    const toastMsg = document.getElementById('toast-message');
    const toastIcon = document.getElementById('toast-icon');

    if (!toast || !toastMsg) return;

    toastMsg.textContent = message;
    if (type === 'success') {
      toast.className = 'fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-white border border-purple-200 px-5 py-3.5 rounded-2xl shadow-xl shadow-purple-500/10 text-[#171725] transition-all duration-300 transform translate-y-0 opacity-100';
      if (toastIcon) toastIcon.innerHTML = `<i data-lucide="check-circle-2" class="w-5 h-5 text-emerald-500"></i>`;
    } else {
      toast.className = 'fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-white border border-amber-200 px-5 py-3.5 rounded-2xl shadow-xl shadow-amber-500/10 text-[#171725] transition-all duration-300 transform translate-y-0 opacity-100';
      if (toastIcon) toastIcon.innerHTML = `<i data-lucide="info" class="w-5 h-5 text-purple-600"></i>`;
    }

    if (window.lucide) window.lucide.createIcons();

    setTimeout(() => {
      toast.classList.add('opacity-0', 'translate-y-4');
      setTimeout(() => {
        toast.className = 'hidden';
      }, 300);
    }, 3800);
  }

  // Copy Email to Clipboard
  const copyEmailBtns = document.querySelectorAll('.copy-email-btn');
  copyEmailBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const email = 'aarthiarunachalamk@gmail.com';
      navigator.clipboard.writeText(email).then(() => {
        showToast('Email copied to clipboard: aarthiarunachalamk@gmail.com');
      }).catch(() => {
        showToast('Email: aarthiarunachalamk@gmail.com');
      });
    });
  });

  // Contact Form Submission Handler
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('form-name')?.value;
      const submitBtn = contactForm.querySelector('button[type="submit"]');

      if (submitBtn) {
        const originalContent = submitBtn.innerHTML;
        submitBtn.innerHTML = `
          <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white inline-block" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
          </svg>
          Sending Message...
        `;
        submitBtn.disabled = true;

        setTimeout(() => {
          submitBtn.innerHTML = originalContent;
          submitBtn.disabled = false;
          contactForm.reset();
          showToast(`Thank you, ${name || 'friend'}! Your message has been received.`);
        }, 1200);
      }
    });
  }

  // Resume Modal Functionality
  const openResumeBtns = document.querySelectorAll('.open-resume-btn');
  const resumeModal = document.getElementById('resume-modal');
  const closeResumeBtn = document.getElementById('close-resume-modal');
  const resumeBackdrop = document.getElementById('resume-backdrop');

  function openResume() {
    if (resumeModal) {
      resumeModal.classList.remove('hidden');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeResume() {
    if (resumeModal) {
      resumeModal.classList.add('hidden');
      document.body.style.overflow = 'auto';
    }
  }

  openResumeBtns.forEach(btn => btn.addEventListener('click', openResume));
  if (closeResumeBtn) closeResumeBtn.addEventListener('click', closeResume);
  if (resumeBackdrop) resumeBackdrop.addEventListener('click', closeResume);

  // Close modal on Escape key
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeResume();
    }
  });

  // Download Resume Handler (Simulated Clean PDF Trigger)
  const downloadResumeBtns = document.querySelectorAll('.download-resume-action');
  downloadResumeBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      showToast('Preparing Aarthi_Karthikeyan_Resume.pdf for download...');
      setTimeout(() => {
        window.print();
      }, 600);
    });
  });

  // Back to Top button
  const backToTopBtn = document.getElementById('back-to-top');
  if (backToTopBtn) {
    window.addEventListener('scroll', () => {
      if (window.pageYOffset > 500) {
        backToTopBtn.classList.remove('opacity-0', 'pointer-events-none');
        backToTopBtn.classList.add('opacity-100', 'pointer-events-auto');
      } else {
        backToTopBtn.classList.add('opacity-0', 'pointer-events-none');
        backToTopBtn.classList.remove('opacity-100', 'pointer-events-auto');
      }
    });

    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
});

