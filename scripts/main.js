const cafe_name = "Ballydehob Repair Café";

// Inject cafe name wherever .cafe-name class exists
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".cafe-name").forEach(el => {
    el.textContent = cafe_name;
  });

  // Typewriter effect for hero tagline
  const tagline = document.querySelector(".typewriter");
  if (tagline) {
    const text = tagline.dataset.text || tagline.textContent;
    tagline.textContent = "";
    tagline.style.visibility = "visible";
    let i = 0;
    const type = () => {
      if (i < text.length) {
        tagline.textContent += text[i++];
        setTimeout(type, 45);
      } else {
        tagline.classList.add("done");
      }
    };
    setTimeout(type, 600);
  }

  // Glitch effect on logo
  const logo = document.querySelector(".logo-glitch");
  if (logo) {
    setInterval(() => {
      if (Math.random() > 0.85) {
        logo.classList.add("glitching");
        setTimeout(() => logo.classList.remove("glitching"), 150);
      }
    }, 2000);
  }

  // Scanline flicker
  const scanlines = document.querySelector(".scanlines");
  if (scanlines) {
    setInterval(() => {
      if (Math.random() > 0.92) {
        scanlines.style.opacity = "0.08";
        setTimeout(() => scanlines.style.opacity = "0.04", 80);
      }
    }, 1500);
  }
});
