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

prevButton.addEventListener("click", () => {
    setActiveSlide(activeIndex - 1);
  });

  nextButton.addEventListener("click", () => {
    setActiveSlide(activeIndex + 1);
  });

  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      setActiveSlide(index);
    });
  });
}
setActiveLink();
