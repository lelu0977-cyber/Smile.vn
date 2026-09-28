// Nha khoa Bách Khoa Smile - Core Application Logic
document.addEventListener('DOMContentLoaded', () => {
  // Mobile Nav Toggle
  const mobileToggle = document.getElementById('mobileToggle');
  const navLinks = document.getElementById('navLinks');
  if (mobileToggle && navLinks) {
    mobileToggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
    });
  }

  // Booking Modal
  const bookingModal = document.getElementById('bookingModal');
  const openModalBtns = document.querySelectorAll('.btn-open-booking');
  const closeModalBtn = document.getElementById('closeModalBtn');
  const bookingForm = document.getElementById('bookingForm');

  if (bookingModal) {
    openModalBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const service = btn.getAttribute('data-service') || '';
        const serviceSelect = document.getElementById('bookingService');
        if (serviceSelect && service) {
          serviceSelect.value = service;
        }
        bookingModal.classList.add('active');
        document.body.style.overflow = 'hidden';
      });
    });

    if (closeModalBtn) {
      closeModalBtn.addEventListener('click', () => {
        bookingModal.classList.remove('active');
        document.body.style.overflow = '';
      });
    }

    bookingModal.addEventListener('click', (e) => {
      if (e.target === bookingModal) {
        bookingModal.classList.remove('active');
        document.body.style.overflow = '';
      }
    });

    if (bookingForm) {
      bookingForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('bookingName')?.value || 'Quý khách';
        const phone = document.getElementById('bookingPhone')?.value || '';
        const date = document.getElementById('bookingDate')?.value || '';
        const service = document.getElementById('bookingService')?.value || 'Khám tổng quát';

        showToast(`Cảm ơn anh/chị ${name}! Nha khoa Bách Khoa Smile đã nhận lịch hẹn vào ngày ${date}. Hotline 0976.568.283 sẽ gọi xác nhận trong 5 phút.`, 'success');
        bookingForm.reset();
        bookingModal.classList.remove('active');
        document.body.style.overflow = '';
      });
    }
  }

  // Quick Consult Form
  const quickConsultForm = document.getElementById('quickConsultForm');
  if (quickConsultForm) {
    quickConsultForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const phone = document.getElementById('quickPhone')?.value;
      if (phone) {
        showToast(`Đã ghi nhận yêu cầu tư vấn số điện thoại ${phone}. Chuyên gia Bách Khoa Smile sẽ liên hệ ngay!`, 'success');
        quickConsultForm.reset();
      }
    });
  }

  // Pricing Tabs
  const pricingTabs = document.querySelectorAll('.pricing-tab-btn');
  const pricingTables = document.querySelectorAll('.pricing-category-table');
  if (pricingTabs.length > 0) {
    pricingTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        pricingTabs.forEach(t => t.classList.remove('active'));
        pricingTables.forEach(p => p.style.display = 'none');

        tab.classList.add('active');
        const targetCategory = tab.getAttribute('data-category');
        const targetTable = document.getElementById(`pricing-${targetCategory}`);
        if (targetTable) {
          targetTable.style.display = 'block';
        }
      });
    });
  }

  // Interactive Dental Cost Calculator
  const calcForm = document.getElementById('costCalculatorForm');
  if (calcForm) {
    const serviceType = document.getElementById('calcService');
    const serviceSub = document.getElementById('calcSubtype');
    const countInput = document.getElementById('calcQuantity');
    const resultTotal = document.getElementById('calcTotalResult');
    const resultNote = document.getElementById('calcNoteResult');

    const pricingData = {
      implant: {
        'korea-biotem': { name: 'Trụ Biotem Hàn Quốc', price: 13500000 },
        'dentium-usa': { name: 'Trụ Dentium Hoa Kỳ', price: 17000000 },
        'neodent-swiss': { name: 'Trụ Neodent Thụy Sĩ (Tải lực tức thì)', price: 22000000 },
        'straumann-swiss': { name: 'Trụ Straumann Thụy Sĩ SLActive', price: 32000000 }
      },
      niengrang: {
        'mac-cai-kim-loai': { name: 'Mắc cài kim loại tự buộc', price: 28000000 },
        'mac-cai-su': { name: 'Mắc cài sứ thẩm mỹ thông minh', price: 42000000 },
        'invisalign-us': { name: 'Khay niềng trong suốt Invisalign Hoa Kỳ', price: 75000000 }
      },
      rangsu: {
        'su-titan': { name: 'Răng sứ Titan sinh học', price: 2500000 },
        'su-zirconia': { name: 'Toàn sứ Zirconia Dmax Đức', price: 4000000 },
        'su-cercon-ht': { name: 'Toàn sứ Cercon HT cao cấp', price: 6000000 },
        'veneer-emax': { name: 'Dán sứ Veneer Emax Thụy Sĩ', price: 8000000 }
      },
      nhorang: {
        'khon-ham-duoi': { name: 'Nhổ răng khôn hàm dưới sóng Piezotome', price: 2000000 },
        'khon-moc-ngam': { name: 'Nhổ răng khôn ngầm / khó Piezotome', price: 3000000 },
        'khon-ham-tren': { name: 'Nhổ răng khôn hàm trên không đau', price: 1200000 }
      }
    };

    function updateSubtypes() {
      const cat = serviceType.value;
      serviceSub.innerHTML = '';
      if (pricingData[cat]) {
        Object.keys(pricingData[cat]).forEach(key => {
          const opt = document.createElement('option');
          opt.value = key;
          opt.textContent = `${pricingData[cat][key].name} (${pricingData[cat][key].price.toLocaleString('vi-VN')} đ)`;
          serviceSub.appendChild(opt);
        });
      }
      calculateEstimate();
    }

    function calculateEstimate() {
      const cat = serviceType.value;
      const sub = serviceSub.value;
      const qty = parseInt(countInput.value, 10) || 1;

      if (pricingData[cat] && pricingData[cat][sub]) {
        const unitPrice = pricingData[cat][sub].price;
        const total = unitPrice * qty;
        resultTotal.textContent = total.toLocaleString('vi-VN') + ' VNĐ';
        resultNote.textContent = `* Đơn giá: ${unitPrice.toLocaleString('vi-VN')} đ x ${qty} đơn vị. Bao gồm chụp phim CT 3D & khám chuyên sâu miễn phí.`;
      }
    }

    if (serviceType && serviceSub && countInput) {
      serviceType.addEventListener('change', updateSubtypes);
      serviceSub.addEventListener('change', calculateEstimate);
      countInput.addEventListener('input', calculateEstimate);
      updateSubtypes();
    }
  }

  // Toast System
  function showToast(message, type = 'info') {
    let toastContainer = document.getElementById('toastContainer');
    if (!toastContainer) {
      toastContainer = document.createElement('div');
      toastContainer.id = 'toastContainer';
      toastContainer.style.position = 'fixed';
      toastContainer.style.bottom = '24px';
      toastContainer.style.left = '24px';
      toastContainer.style.zIndex = '99999';
      toastContainer.style.display = 'flex';
      toastContainer.style.flexDirection = 'column';
      toastContainer.style.gap = '10px';
      document.body.appendChild(toastContainer);
    }

    const toast = document.createElement('div');
    toast.style.background = type === 'success' ? '#065f46' : '#0f172a';
    toast.style.color = '#ffffff';
    toast.style.padding = '14px 20px';
    toast.style.borderRadius = '12px';
    toast.style.boxShadow = '0 10px 25px rgba(0,0,0,0.2)';
    toast.style.fontSize = '0.9rem';
    toast.style.maxWidth = '380px';
    toast.style.lineHeight = '1.5';
    toast.style.display = 'flex';
    toast.style.alignItems = 'center';
    toast.style.gap = '10px';
    toast.style.animation = 'fadeIn 0.3s ease forwards';
    toast.innerHTML = `<span>✓</span> <div>${message}</div>`;

    toastContainer.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transition = 'opacity 0.4s ease';
      setTimeout(() => toast.remove(), 400);
    }, 5000);
  }

  window.showToast = showToast;
});
