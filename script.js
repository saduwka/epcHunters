let currentIndex = 0;
const stepsContainer = document.querySelector(".steps");
const infoBtn = document.querySelectorAll(".info-btn");
const steps = document.querySelectorAll(".step");
const leftArrow = document.querySelector(".slider-arrow.left");
const rightArrow = document.querySelector(".slider-arrow.right");

function updateSliderPosition() {
  const offset = -currentIndex * 100;
  if (stepsContainer) {
    stepsContainer.style.transform = `translateX(${offset}%)`;
  }
}

leftArrow?.addEventListener("click", () => {
  if (currentIndex > 0) {
    currentIndex--;
    updateSliderPosition();
  }
});

rightArrow?.addEventListener("click", () => {
  if (currentIndex < steps.length - 1) {
    currentIndex++;
    updateSliderPosition();
  }
});

const modal = document.getElementById("stepModal");
const closeBtn = document.querySelector(".modal-close");

infoBtn.forEach((step) => {
  step.addEventListener("click", () => {
    if (modal) modal.style.display = "flex";
  });
});

closeBtn?.addEventListener("click", () => {
  if (modal) modal.style.display = "none";
});

window.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.style.display = "none";
  }
});

const burgerMenu = document.querySelector(".burger-menu");
const siteNav = document.querySelector(".site-nav");

document.addEventListener("click", (e) => {
  const isClickInside = siteNav?.contains(e.target) || burgerMenu?.contains(e.target);
  const isNavOpen = siteNav?.classList.contains("open");

  if (!isClickInside && isNavOpen) {
    siteNav?.classList.remove("open");
    burgerMenu?.classList.remove("open");
  }
});

burgerMenu?.addEventListener("click", () => {
  siteNav?.classList.toggle("open");
  burgerMenu.classList.toggle("open");
});

function drawCurvedLines() {
  const stepsArray = Array.from(document.querySelectorAll(".step"));
  const svg = document.querySelector(".step-lines");

  if (!svg || stepsArray.length < 2) return;

  while (svg.firstChild) {
    svg.removeChild(svg.firstChild);
  }

  const container = document.querySelector(".steps");
  if (!container) return;

  const containerRect = container.getBoundingClientRect();

  stepsArray.forEach((step, index) => {
    if (index === stepsArray.length - 1) return;

    const current = step.querySelector(".circle");
    const next = stepsArray[index + 1].querySelector(".circle");

    if (!current || !next) return;

    const currRect = current.getBoundingClientRect();
    const nextRect = next.getBoundingClientRect();

    const x1 = currRect.left + currRect.width / 2 - containerRect.left;
    const y1 = currRect.top + currRect.height / 2 - containerRect.top;
    const x2 = nextRect.left + nextRect.width / 2 - containerRect.left;
    const y2 = nextRect.top + nextRect.height / 2 - containerRect.top;

    const dx = (x2 - x1) * 0.5;
    const dy = (y2 - y1) * 0.5;

    const cx1 = x1 + dx;
    const cy1 = y1;

    const cx2 = x2 - dx;
    const cy2 = y2;

    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute(
      "d",
      `M ${x1} ${y1} C ${cx1} ${cy1}, ${cx2} ${cy2}, ${x2} ${y2}`
    );
    path.setAttribute("stroke", "white");
    path.setAttribute("stroke-width", "2");
    path.setAttribute("fill", "none");
    path.setAttribute("stroke-dasharray", "6");

    svg.appendChild(path);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  drawCurvedLines();
});

let resizeTimeout;
window.addEventListener("resize", () => {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(() => {
    drawCurvedLines();
  }, 100);
});
