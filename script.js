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

const modal = document.getElementById("modal");
const modalBody = document.getElementById("modalBody");
const modalClose = document.querySelector(".modal-close");

const modalContent = {
  img1: "Dokumentasi Demo Robot Autonomous",
  img2: "Workshop Soldering & Elektronik",
  img3: "Riset Robot Arm Industri",
};

document.querySelectorAll(".gallery-item").forEach((item) => {
  item.addEventListener("click", () => {
    const key = item.dataset.modal;
    modalBody.textContent = modalContent[key] || "Dokumentasi";
    modal.classList.add("active");
  });
});

modalClose.addEventListener("click", () => {
  modal.classList.remove("active");
});

modal.addEventListener("click", (event) => {
  if (event.target === modal) {
    modal.classList.remove("active");
  }
});

const yearFilter = document.getElementById("yearFilter");
const levelFilter = document.getElementById("levelFilter");
const achievements = document.querySelectorAll(".achievement-card");

const filterAchievements = () => {
  const yearValue = yearFilter.value;
  const levelValue = levelFilter.value;

  achievements.forEach((card) => {
    const yearMatch = yearValue === "all" || card.dataset.year === yearValue;
    const levelMatch = levelValue === "all" || card.dataset.level === levelValue;
    card.style.display = yearMatch && levelMatch ? "flex" : "none";
  });
};

yearFilter.addEventListener("change", filterAchievements);
levelFilter.addEventListener("change", filterAchievements);

setActiveLink();
filterAchievements();
