const cafe_name = "Ballydehob Repair Café";

// Detect mobile device and motion preferences
const isMobile = () => /iPhone|iPad|Android|webOS|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth <= 768;
const prefersReducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// Inject cafe name wherever .cafe-name class exists
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".cafe-name").forEach(el => {
    el.textContent = cafe_name;
  });

  // Typewriter effect for hero tagline (disabled on mobile and when motion is reduced)
  const tagline = document.querySelector(".typewriter");
  if (tagline && !isMobile() && !prefersReducedMotion()) {
    const text = tagline.dataset.text || tagline.textContent;
    tagline.textContent = "";
    tagline.style.visibility = "visible";
    let i = 0;
    const type = () => {
      if (i < text.length) {
        tagline.textContent += text[i++];
        setTimeout(type, 2400 / text.length);
      } else {
        tagline.classList.add("done");
      }
    };
    setTimeout(type, 600);
  } else if (tagline) {
    // Show text immediately on mobile and when motion is reduced
    tagline.style.visibility = "visible";
    tagline.classList.add("done");
  }

  // Glitch effect on logo (disabled on mobile and when motion is reduced)
  const logo = document.querySelector(".logo-glitch");
  if (logo && !isMobile() && !prefersReducedMotion()) {
    const glitchInterval = setInterval(() => {
      if (Math.random() > 0.85) {
        logo.classList.add("glitching");
        setTimeout(() => logo.classList.remove("glitching"), 150);
      }
    }, 2000);
    
    // Clean up interval on page unload
    window.addEventListener("beforeunload", () => clearInterval(glitchInterval));
  }

  // Scanline flicker (reduce frequency on mobile)
  const scanlines = document.querySelector(".scanlines");
  if (scanlines && !prefersReducedMotion()) {
    const flickerInterval = setInterval(() => {
      const threshold = isMobile() ? 0.95 : 0.92; // Less flicker on mobile
      if (Math.random() > threshold) {
        scanlines.style.opacity = "0.08";
        setTimeout(() => scanlines.style.opacity = "0.04", 80);
      }
    }, isMobile() ? 3000 : 1500); // Slower on mobile
    
    // Clean up interval on page unload
    window.addEventListener("beforeunload", () => clearInterval(flickerInterval));
  }

  // Prevent pinch-zoom on iPhone while allowing user zoom
  let lastTouchEnd = 0;
  document.addEventListener("touchend", (e) => {
    const now = Date.now();
    if (now - lastTouchEnd <= 300) {
      e.preventDefault();
    }
    lastTouchEnd = now;
  }, false);

  // Improve focus management for keyboard navigation
  document.addEventListener("keydown", (e) => {
    if (e.key === "Tab") {
      document.body.classList.add("keyboard-nav");
    }
  });

  document.addEventListener("mousedown", () => {
    document.body.classList.remove("keyboard-nav");
  });
});
