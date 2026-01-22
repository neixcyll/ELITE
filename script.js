const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".nav-links");

navToggle.addEventListener("click", () => {
  navLinks.classList.toggle("open");
});

const sections = document.querySelectorAll("section");
const navItems = document.querySelectorAll(".nav-link");

const setActiveLink = () => {
  let current = "";
  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 120;
    if (window.scrollY >= sectionTop) {
      current = section.getAttribute("id");
    }
  });

  navItems.forEach((link) => {
    link.classList.toggle("active", link.getAttribute("href") === `#${current}`);
  });
};

window.addEventListener("scroll", setActiveLink);

const revealElements = document.querySelectorAll(".reveal");
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.2 }
);

revealElements.forEach((el) => revealObserver.observe(el));

const slider = document.querySelector("[data-slider]");

if (slider) {
  const slides = Array.from(slider.querySelectorAll(".slide"));
  const dots = Array.from(slider.querySelectorAll(".slider-dot"));
  const prevButton = slider.querySelector(".slider-control.prev");
  const nextButton = slider.querySelector(".slider-control.next");
  const sliderTrack = slider.querySelector(".slider-track");
  let activeIndex = 0;
  let autoPlayId = null;
  const autoPlayDelay = 3000;

  const setActiveSlide = (index) => {
    activeIndex = (index + slides.length) % slides.length;
    slides.forEach((slide, idx) => {
      slide.classList.toggle("is-active", idx === activeIndex);
    });
    dots.forEach((dot, idx) => {
      const isActive = idx === activeIndex;
      dot.classList.toggle("is-active", isActive);
      dot.setAttribute("aria-pressed", isActive ? "true" : "false");
    });
    if (sliderTrack) {
      sliderTrack.scrollTo({
        left: slides[activeIndex].offsetLeft,
        behavior: "smooth",
      });
    }
  };

const stopAutoPlay = () => {
    if (autoPlayId) {
      window.clearInterval(autoPlayId);
      autoPlayId = null;
    }
  };

  const startAutoPlay = () => {
    stopAutoPlay();
    autoPlayId = window.setInterval(() => {
      setActiveSlide(activeIndex + 1);
    }, autoPlayDelay);
  };

  prevButton.addEventListener("click", () => {
    setActiveSlide(activeIndex - 1);
    startAutoPlay();
  });

  nextButton.addEventListener("click", () => {
    setActiveSlide(activeIndex + 1);
    startAutoPlay();
  });

  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      setActiveSlide(index);
      startAutoPlay();
    });
  });
  slider.addEventListener("mouseenter", stopAutoPlay);
  slider.addEventListener("mouseleave", startAutoPlay);
  slider.addEventListener("focusin", stopAutoPlay);
  slider.addEventListener("focusout", startAutoPlay);
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      stopAutoPlay();
    } else {
      startAutoPlay();
    }
  });

  startAutoPlay();
}
setActiveLink();

// ===== CARD SHUFFLE & CLICK =====
const cards = document.querySelectorAll(".info-card");
const detailContainer = document.getElementById("detailContainer");
const detailContent = document.getElementById("detailContent");
const btnBack = document.getElementById("btnBack");
const cardStage = document.querySelector(".card-stage");

let isSwapped = false;
let swapInterval;

// Data Pengurus & Divisi
const cardData = {
  pengurus: {
  title: "Pengurus Inti",
  content: `
    <h2>Pengurus Inti ELITE</h2>
    
    <!-- Organizational Chart -->
    <div class="org-chart">
      
      <!-- Level 1: Pembina -->
      <div class="org-level">
        <div class="org-box top">
          <div class="org-position">Pembina</div>
          <div class="org-name">-</div>
        </div>
      </div>
      
      <!-- Level 2: Pembimbing -->
      <div class="org-level">
        <div class="org-box top">
          <div class="org-position">Pembimbing</div>
          <div class="org-name">Rezal Pramudiastama</div>
        </div>
      </div>
      
      <!-- Level 3: Ketua -->
      <div class="org-level">
        <div class="org-box top">
          <div class="org-position">Ketua</div>
          <div class="org-name">Bayu Romadhon Saputra</div>
          <div class="org-class">XII TEI</div>
        </div>
      </div>
      
      <!-- Level 4: Sekretaris & Bendahara -->
      <div class="org-level-split">
        <div class="org-column">
          <div class="org-box">
            <div class="org-position">Sekretaris</div>
            <div class="org-members">
              <div>Moch. Raihan Aufa Rizki Munir <span>(XII RPL 2)</span></div>
              <div>Abhista Nareswari Sugiyanto <span>(XI RPL 2)</span></div>
              <div>Mahmud Azzam <span>(XI TAV 2)</span></div>
              <div>Neil Sawabul Jazil <span>(XI RPL 2)</span></div>
            </div>
          </div>
        </div>
        
        <div class="org-column">
          <div class="org-box">
            <div class="org-position">Bendahara</div>
            <div class="org-members">
              <div>Berliana Fitri Aulia <span>(XI RPL 2)</span></div>
              <div>Eva Luna Putri Janur <span>(XI RPL 2)</span></div>
              <div>Muhammad Haykal Ubaidilhaq <span>(XI TEI)</span></div>
              <div>Muhammad Ibnu Ridho <span>(XI TEI)</span></div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Level 5: Inventaris & Kominfo -->
      <div class="org-level-split">
        <div class="org-column">
          <div class="org-box">
            <div class="org-position">Inventaris</div>
            <div class="org-members">
              <div>Antananda Reksadjendra D.B. <span>(XII TAV 2)</span></div>
              <div>Radittya Vitsava Darma <span>(XI RPL 2)</span></div>
              <div>Satya Novario Rizky Putranto <span>(XI RPL 2)</span></div>
              <div>Satrio Dwi Syairendra <span>(XI RPL 2)</span></div>
              <div>Wildana Wargadinata <span>(XI TEI)</span></div>
            </div>
          </div>
        </div>
        
        <div class="org-column">
          <div class="org-box">
            <div class="org-position">Kominfo</div>
            <div class="org-members">
              <div>Abelya Octaviani <span>(XII RPL 3)</span></div>
              <div>Andika Anwar Bawana <span>(XI TEI)</span></div>
              <div>Mey Adinda Luckytasari <span>(XI TAV 2)</span></div>
              <div>Tunggul Catra Wisesa <span>(XI TEI)</span></div>
            </div>
          </div>
        </div>
      </div>
      
    </div>
  `
},
  divisi: {
    title: "Divisi Riset",
    content: `
      <h2>Divisi Riset ELITE</h2>
      <ul>
        <li>
          <span class="jabatan">Robot Soccer</span>
          <ol style="margin-top: 8px; padding-left: 20px;">
            <li>Antananda Reksadjendra Dimasing Bagavagita - XII TAV 2</li>
            <li>Berliana Fitri Aulia - XI RPL 2</li>
            <li>Radittya Vitsava Darma - XI RPL 2</li>
          </ol>
        </li>
        <li>
          <span class="jabatan">Robot Sumo</span>
          <ol style="margin-top: 8px; padding-left: 20px;">
            <li>Moch. Raihan Aufa Rizki Munir - XII RPL 2</li>
            <li>Muhammad Haykal Ubaidilhaq - XI TEI</li>
            <li>Wildana Wargadinata - XI TEI</li>
          </ol>
        </li>
        <li>
          <span class="jabatan">Robot Transporter</span>
          <ol style="margin-top: 8px; padding-left: 20px;">
            <li>Bayu Romadhon Saputra - XII TEI</li>
            <li>Mey Adinda Luckytasari - XI TAV 2</li>
            <li>Tunggul Catra Wisesa - XI TEI</li>
          </ol>
        </li>
        <li>
          <span class="jabatan">Robot LTM</span>
          <ol style="margin-top: 8px; padding-left: 20px;">
            <li>Abhista Nareswari Sugiyanto - XI RPL 2</li>
            <li>Andika Anwar Bawana - XI TEI</li>
            <li>Neil Sawabul Jazil - XI RPL 2</li>
            <li>Satya Novario Rizky Putranto - XI RPL 2</li>
            <li>Satrio Dwi Syairendra - XI RPL 2</li>
          </ol>
        </li>
        <li>
          <span class="jabatan">Karya Tulis Ilmiah</span>
          <ol style="margin-top: 8px; padding-left: 20px;">
            <li>Abelya Octaviani - XII RPL 3</li>
            <li>Eva Luna Putri Janur - XI RPL 2</li>
            <li>Mahmud Azzam - XI TAV 2</li>
            <li>Muhammad Ibnu Ridho - XI TEI</li>
          </ol>
        </li>
      </ul>
    `
  }
};

// Fungsi Swap Otomatis
function startSwap() {
  swapInterval = setInterval(() => {
    isSwapped = !isSwapped;
    cards.forEach(card => {
      card.classList.toggle("swap", isSwapped);
    });
  }, 3000);
}

// Fungsi Stop Swap
function stopSwap() {
  clearInterval(swapInterval);
}

// Fungsi Tampilkan Detail
function showDetail(type) {
  stopSwap();
  
  // Animasi kartu hilang
  cards.forEach(card => card.classList.add("clicked"));
  
  setTimeout(() => {
    cardStage.style.display = "none";
    detailContent.innerHTML = cardData[type].content;
    detailContainer.classList.add("show");
  }, 600);
}

// Fungsi Kembali
function hideDetail() {
  detailContainer.classList.remove("show");
  
  setTimeout(() => {
    cardStage.style.display = "flex";
    cards.forEach(card => card.classList.remove("clicked"));
    startSwap();
  }, 500);
}

// Event Listeners
cards.forEach(card => {
  card.addEventListener("click", () => {
    const cardType = card.getAttribute("data-card");
    showDetail(cardType);
  });
});

btnBack.addEventListener("click", hideDetail);

// Start swap saat load
startSwap();

// ===== AUTO SCROLL GLOBAL (SATU SUMBER) =====
let autoScroll = null;
let resumeTimeout = null;
let isModalOpen = false;

function stopAutoScroll() {
  if (autoScroll) {
    clearInterval(autoScroll);
    autoScroll = null;
  }
}

function resumeAutoScroll() {
  clearTimeout(resumeTimeout);
  resumeTimeout = setTimeout(startAutoScroll, 4000);
}

// ===== AUTO SCROLL CAROUSEL PRESTASI =====
const scrollTrack = document.getElementById('scrollTrack');
const scrollLeft = document.getElementById('scrollLeft');
const scrollRight = document.getElementById('scrollRight');

const scrollAmount = 360;
const scrollDelay = 3000;

function startAutoScroll() {
  if (!scrollTrack) return;
  if (isModalOpen) return; // ⛔ JANGAN JALAN KALAU MODAL BUKA

  stopAutoScroll();
  autoScroll = setInterval(() => {
    scrollTrack.scrollBy({
      left: scrollAmount,
      behavior: 'smooth'
    });

    if (
      scrollTrack.scrollLeft + scrollTrack.clientWidth >=
      scrollTrack.scrollWidth - 5
    ) {
      scrollTrack.scrollTo({ left: 0, behavior: 'smooth' });
    }
  }, scrollDelay);
}

if (scrollTrack && scrollLeft && scrollRight) {

  startAutoScroll();

  scrollLeft.addEventListener('click', () => {
    stopAutoScroll();
    scrollTrack.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    resumeAutoScroll();
  });

  scrollRight.addEventListener('click', () => {
    stopAutoScroll();
    scrollTrack.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    resumeAutoScroll();
  });

  scrollTrack.addEventListener('mouseenter', stopAutoScroll);
  scrollTrack.addEventListener('mouseleave', startAutoScroll);
  scrollTrack.addEventListener('wheel', stopAutoScroll, { passive: true });
  scrollTrack.addEventListener('touchstart', stopAutoScroll, { passive: true });
}

// ===== PRESTASI MODAL =====
const prestasiCards = document.querySelectorAll(".prestasi-card");
const prestasiModal = document.getElementById("prestasiModal");
const prestasiImage = document.getElementById("prestasiImage");
const prestasiTitle = document.getElementById("prestasiTitle");
const prestasiDesc = document.getElementById("prestasiDesc");
const prestasiClose = document.getElementById("prestasiClose");

prestasiCards.forEach(card => {
  card.addEventListener("click", () => {

    // 🔒 KUNCI SCROLL & AUTO SCROLL
    document.body.classList.add("modal-open");

    prestasiImage.src = card.dataset.img;
    prestasiTitle.textContent = card.dataset.title;
    prestasiDesc.textContent = card.dataset.desc;

    prestasiModal.classList.add("show");
  });
});

prestasiClose.addEventListener("click", () => {
  prestasiModal.classList.remove("show");

  // 🔓 HIDUPKAN LAGI
  document.body.classList.remove("modal-open");
});

prestasiModal.addEventListener("click", (e) => {
  if (e.target === prestasiModal) {
    prestasiModal.classList.remove("show");
    document.body.classList.remove("modal-open");
  }
});