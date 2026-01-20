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
      <ul>
        <li><span class="jabatan">Ketua:</span> Nama Ketua</li>
        <li><span class="jabatan">Wakil Ketua:</span> Nama Wakil</li>
        <li><span class="jabatan">Sekretaris:</span> Nama Sekretaris</li>
        <li><span class="jabatan">Bendahara:</span> Nama Bendahara</li>
        <li><span class="jabatan">Koordinator Divisi:</span> Nama Koordinator</li>
      </ul>
    `
  },
  divisi: {
    title: "Divisi Riset",
    content: `
      <h2>Divisi Riset ELITE</h2>
      <ul>
        <li><span class="jabatan">Divisi Soccer Robot:</span> Fokus pada pengembangan robot sepak bola</li>
        <li><span class="jabatan">Divisi Line Follower:</span> Riset robot line tracking</li>
        <li><span class="jabatan">Divisi Fire Fighting:</span> Robot pemadam kebakaran</li>
        <li><span class="jabatan">Divisi Programming:</span> Pengembangan software dan AI</li>
        <li><span class="jabatan">Divisi Elektronika:</span> Desain PCB dan hardware</li>
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


