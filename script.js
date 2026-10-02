// PayKool Vanilla JavaScript Implementation

// State management
let currentPage = 'home';
let currentSlide = 0;
const totalSlides = 4;
let slideInterval = null;

// Page Navigation
function navigateTo(pageId, targetHash) {
  currentPage = pageId;
  window.location.hash = pageId;

  // Toggle active page views
  document.querySelectorAll('.page-view').forEach(view => {
    view.classList.remove('active');
  });

  const targetView = document.getElementById('view-' + pageId);
  if (targetView) {
    targetView.classList.add('active');
  }

  // Close menus
  closeMegaMenu();
  closeMobileMenu();

  // Scroll to hash or top
  if (targetHash) {
    setTimeout(() => {
      const el = document.getElementById(targetHash.replace('#', ''));
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 50);
  } else {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // Update nav active states
  updateNavIndicators(pageId);
}

function updateNavIndicators(pageId) {
  document.querySelectorAll('[data-nav-target]').forEach(link => {
    if (link.getAttribute('data-nav-target') === pageId) {
      link.classList.add('text-[#E83375]');
      link.classList.remove('text-[#494551]');
    } else {
      link.classList.remove('text-[#E83375]');
      link.classList.add('text-[#494551]');
    }
  });
}

// Mega Menu
function toggleMegaMenu() {
  const menu = document.getElementById('mega-menu-dropdown');
  if (menu) menu.classList.toggle('hidden');
}

function closeMegaMenu() {
  const menu = document.getElementById('mega-menu-dropdown');
  if (menu) menu.classList.add('hidden');
}

// Mobile Menu
function toggleMobileMenu() {
  const drawer = document.getElementById('mobile-drawer');
  if (drawer) drawer.classList.toggle('hidden');
}

function closeMobileMenu() {
  const drawer = document.getElementById('mobile-drawer');
  if (drawer) drawer.classList.add('hidden');
}

// Application Modal
function openApplyModal(cardType) {
  const modal = document.getElementById('application-modal');
  if (modal) {
    modal.classList.remove('hidden');
    selectModalCard(cardType === 'prop' ? 'prop' : 'platinum');
    document.getElementById('modal-step-form')?.classList.remove('hidden');
    document.getElementById('modal-step-success')?.classList.add('hidden');
  }
}

function closeApplyModal() {
  const modal = document.getElementById('application-modal');
  if (modal) modal.classList.add('hidden');
}

function selectModalCard(cardType) {
  const btnPlat = document.getElementById('modal-card-btn-plat');
  const btnProp = document.getElementById('modal-card-btn-prop');
  const promoInput = document.getElementById('modal-promo-code');

  if (cardType === 'prop') {
    btnProp?.classList.add('border-[#DFC28D]', 'bg-[#DFC28D]/10');
    btnProp?.classList.remove('border-[#ece4ff]', 'bg-white');
    btnPlat?.classList.remove('border-[#E83375]', 'bg-[#E83375]/10');
    btnPlat?.classList.add('border-[#ece4ff]', 'bg-white');
    if (promoInput) promoInput.value = 'PROP88';
  } else {
    btnPlat?.classList.add('border-[#E83375]', 'bg-[#E83375]/10');
    btnPlat?.classList.remove('border-[#ece4ff]', 'bg-white');
    btnProp?.classList.remove('border-[#DFC28D]', 'bg-[#DFC28D]/10');
    btnProp?.classList.add('border-[#ece4ff]', 'bg-white');
    if (promoInput) promoInput.value = 'TK';
  }
}

function handleApplySubmit(e) {
  e.preventDefault();
  const submitBtn = document.getElementById('modal-submit-btn');
  if (submitBtn) {
    submitBtn.innerHTML = '<span class="material-symbols-outlined animate-spin text-[18px]">progress_activity</span> 處理中...';
    submitBtn.disabled = true;
  }

  setTimeout(() => {
    document.getElementById('modal-step-form')?.classList.add('hidden');
    document.getElementById('modal-step-success')?.classList.remove('hidden');
    if (submitBtn) {
      submitBtn.innerHTML = '即時遞交申請';
      submitBtn.disabled = false;
    }
  }, 1000);
}

// Copy Code Helper
function copyPromoCode(code, btnElement) {
  navigator.clipboard.writeText(code).then(() => {
    if (btnElement) {
      const origText = btnElement.innerHTML;
      btnElement.innerHTML = '<span class="material-symbols-outlined text-[15px]">check</span> 已複製';
      setTimeout(() => {
        btnElement.innerHTML = origText;
      }, 2000);
    }
  });
}

// Home Carousel
function setCarouselSlide(index) {
  currentSlide = (index + totalSlides) % totalSlides;
  document.querySelectorAll('.carousel-slide').forEach((slide, idx) => {
    if (idx === currentSlide) {
      slide.classList.remove('opacity-0', 'pointer-events-none');
      slide.classList.add('opacity-100', 'z-10');
    } else {
      slide.classList.add('opacity-0', 'pointer-events-none');
      slide.classList.remove('opacity-100', 'z-10');
    }
  });

  document.querySelectorAll('.carousel-tab-btn').forEach((btn, idx) => {
    if (idx === currentSlide) {
      btn.classList.add('bg-[#f2ebff]', 'border-[#E83375]');
    } else {
      btn.classList.remove('bg-[#f2ebff]', 'border-[#E83375]');
    }
  });
}

function prevCarouselSlide() {
  setCarouselSlide(currentSlide - 1);
}

function nextCarouselSlide() {
  setCarouselSlide(currentSlide + 1);
}

// Repayment Calculators
let homeCalcTenor = 3;
function updateHomeCalculator() {
  const amountInput = document.getElementById('home-calc-amount');
  const amountDisplay = document.getElementById('home-calc-amount-display');
  const monthlyDisplay = document.getElementById('home-calc-monthly');
  const feeDisplay = document.getElementById('home-calc-fee');
  const totalDisplay = document.getElementById('home-calc-total');
  const feeSavedBadge = document.getElementById('home-calc-saved-fee');

  if (!amountInput) return;
  const amount = parseInt(amountInput.value, 10);
  if (amountDisplay) amountDisplay.textContent = 'HK$ ' + amount.toLocaleString();

  const rates = { 3: 0.018, 4: 0.024, 5: 0.03 };
  const rate = rates[homeCalcTenor] || 0.018;

  // First $5,000 waived
  const feeable = Math.max(0, amount - 5000);
  const fee = Math.round(feeable * rate);
  const monthly = Math.round((amount + fee) / homeCalcTenor);
  const total = amount + fee;
  const saved = Math.round(Math.min(amount, 5000) * rate);

  if (monthlyDisplay) monthlyDisplay.textContent = 'HK$ ' + monthly.toLocaleString();
  if (feeDisplay) feeDisplay.textContent = 'HK$ ' + fee.toLocaleString();
  if (totalDisplay) totalDisplay.textContent = 'HK$ ' + total.toLocaleString();
  if (feeSavedBadge) feeSavedBadge.textContent = '首 $5,000 豁免省下 HK$ ' + saved;
}

function setHomeCalcTenor(t) {
  homeCalcTenor = t;
  document.querySelectorAll('.home-calc-tenor-btn').forEach(btn => {
    const val = parseInt(btn.getAttribute('data-tenor'), 10);
    if (val === t) {
      btn.classList.add('border-[#E83375]', 'bg-[#E83375]/10', 'text-[#E83375]');
      btn.classList.remove('border-[#ece4ff]', 'bg-[#fdf8ff]', 'text-[#494551]');
    } else {
      btn.classList.remove('border-[#E83375]', 'bg-[#E83375]/10', 'text-[#E83375]');
      btn.classList.add('border-[#ece4ff]', 'bg-[#fdf8ff]', 'text-[#494551]');
    }
  });
  updateHomeCalculator();
}

function setHomeCalcAmount(val) {
  const input = document.getElementById('home-calc-amount');
  if (input) {
    input.value = val;
    updateHomeCalculator();
  }
}

// Cash Advance Calculator
let cashAdvanceTenor = 12;
function updateCashAdvanceCalc() {
  const amountInput = document.getElementById('cash-advance-amount');
  const amountDisplay = document.getElementById('cash-advance-amount-display');
  const monthlyDisplay = document.getElementById('cash-advance-monthly');
  const feeDisplay = document.getElementById('cash-advance-fee');
  const totalDisplay = document.getElementById('cash-advance-total');

  if (!amountInput) return;
  const amount = parseInt(amountInput.value, 10);
  if (amountDisplay) amountDisplay.textContent = 'HK$ ' + amount.toLocaleString();

  // Low rate 0.17%
  const rate = 0.0017;
  const monthlyFee = Math.round(amount * rate);
  const monthlyPrincipal = Math.round(amount / cashAdvanceTenor);
  const monthly = monthlyPrincipal + monthlyFee;
  const totalFee = monthlyFee * cashAdvanceTenor;
  const total = amount + totalFee;

  if (monthlyDisplay) monthlyDisplay.textContent = 'HK$ ' + monthly.toLocaleString();
  if (feeDisplay) feeDisplay.textContent = 'HK$ ' + monthlyFee.toLocaleString();
  if (totalDisplay) totalDisplay.textContent = 'HK$ ' + total.toLocaleString();
}

function setCashAdvanceTenor(t) {
  cashAdvanceTenor = t;
  document.querySelectorAll('.cash-advance-tenor-btn').forEach(btn => {
    const val = parseInt(btn.getAttribute('data-tenor'), 10);
    if (val === t) {
      btn.classList.add('border-[#00AAEE]', 'bg-[#00AAEE]/10', 'text-[#00AAEE]');
      btn.classList.remove('border-[#ece4ff]', 'bg-white', 'text-[#494551]');
    } else {
      btn.classList.remove('border-[#00AAEE]', 'bg-[#00AAEE]/10', 'text-[#00AAEE]');
      btn.classList.add('border-[#ece4ff]', 'bg-white', 'text-[#494551]');
    }
  });
  updateCashAdvanceCalc();
}

function setCashAdvanceAmount(val) {
  const input = document.getElementById('cash-advance-amount');
  if (input) {
    input.value = val;
    updateCashAdvanceCalc();
  }
}

// Prop Card Loan Simulator
let propTenor = 36;
function updatePropCalc() {
  const amountInput = document.getElementById('prop-amount-input');
  const amountDisplay = document.getElementById('prop-amount-display');
  const monthlyDisplay = document.getElementById('prop-calc-monthly');
  const feeDisplay = document.getElementById('prop-calc-fee');
  const totalDisplay = document.getElementById('prop-calc-total');

  if (!amountInput) return;
  const amount = parseInt(amountInput.value, 10);
  if (amountDisplay) amountDisplay.textContent = 'HK$ ' + amount.toLocaleString();

  const rates = { 12: 0.0012, 24: 0.0013, 36: 0.0014, 48: 0.0015, 60: 0.0016 };
  const rate = rates[propTenor] || 0.0014;
  const monthlyFee = Math.round(amount * rate);
  const monthlyPrincipal = Math.round(amount / propTenor);
  const monthly = monthlyPrincipal + monthlyFee;
  const totalFee = monthlyFee * propTenor;
  const total = amount + totalFee;

  if (monthlyDisplay) monthlyDisplay.textContent = 'HK$ ' + monthly.toLocaleString();
  if (feeDisplay) feeDisplay.textContent = 'HK$ ' + monthlyFee.toLocaleString();
  if (totalDisplay) totalDisplay.textContent = 'HK$ ' + total.toLocaleString();
}

function setPropTenor(t) {
  propTenor = t;
  document.querySelectorAll('.prop-tenor-btn').forEach(btn => {
    const val = parseInt(btn.getAttribute('data-tenor'), 10);
    if (val === t) {
      btn.classList.add('border-[#DFC28D]', 'bg-[#DFC28D]/15', 'text-[#FCE3CB]');
      btn.classList.remove('border-white/10', 'bg-[#161224]', 'text-slate-400');
    } else {
      btn.classList.remove('border-[#DFC28D]', 'bg-[#DFC28D]/15', 'text-[#FCE3CB]');
      btn.classList.add('border-white/10', 'bg-[#161224]', 'text-slate-400');
    }
  });
  updatePropCalc();
}

function setPropAmount(val) {
  const input = document.getElementById('prop-amount-input');
  if (input) {
    input.value = val;
    updatePropCalc();
  }
}

// WhatsApp Widget Toggle
function toggleWhatsAppPopup() {
  const popup = document.getElementById('whatsapp-popup');
  if (popup) popup.classList.toggle('hidden');
}

// FAQ Accordions
function toggleFaqItem(btn) {
  const content = btn.nextElementSibling;
  const icon = btn.querySelector('.faq-icon');
  if (content) {
    content.classList.toggle('hidden');
  }
  if (icon) {
    icon.classList.toggle('rotate-180');
  }
}

// Promotions Category Filter
function filterPromotions(category) {
  document.querySelectorAll('.promo-card-item').forEach(card => {
    const cardCat = card.getAttribute('data-category');
    if (category === 'all' || cardCat === category) {
      card.style.display = 'flex';
    } else {
      card.style.display = 'none';
    }
  });

  document.querySelectorAll('.promo-filter-btn').forEach(btn => {
    if (btn.getAttribute('data-cat') === category) {
      btn.classList.add('bg-[#E83375]', 'text-white');
      btn.classList.remove('bg-white', 'text-[#494551]');
    } else {
      btn.classList.remove('bg-[#E83375]', 'text-white');
      btn.classList.add('bg-white', 'text-[#494551]');
    }
  });
}

// Initial Boot
document.addEventListener('DOMContentLoaded', () => {
  // Listen for hash changes
  const hash = window.location.hash.replace('#', '');
  if (['home', 'cash-advance', 'promotions', 'tu-report', 'compare', 'visa-platinum', 'prop-card'].includes(hash)) {
    navigateTo(hash);
  } else {
    navigateTo('home');
  }

  // Close mega menu on outside click
  document.addEventListener('click', (e) => {
    const megaMenu = document.getElementById('mega-menu-container');
    if (megaMenu && !megaMenu.contains(e.target)) {
      closeMegaMenu();
    }
  });

  // Init Carousel Auto-rotation
  slideInterval = setInterval(nextCarouselSlide, 6000);

  // Init Calculators
  updateHomeCalculator();
  updateCashAdvanceCalc();
  updatePropCalc();
});
