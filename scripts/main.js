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
  if (tagline) {
    const isFirstVisit = !localStorage.getItem("typewriterSeen");
    const text = tagline.dataset.text || tagline.textContent;
    
    if (isFirstVisit && !isMobile() && !prefersReducedMotion()) {
      // First visit: run typewriter animation
      tagline.textContent = "";
      tagline.style.visibility = "visible";
      let i = 0;
      const type = () => {
        if (i < text.length) {
          tagline.textContent += text[i++];
          setTimeout(type, 2400 / text.length);
        } else {
          tagline.classList.add("done");
          localStorage.setItem("typewriterSeen", "true");
        }
      };
      setTimeout(type, 600);
    } else {
      // Return visit or mobile/reduced motion: show text immediately without animation
      tagline.textContent = text;
      tagline.style.visibility = "visible";
      tagline.classList.add("done");
      tagline.classList.add("skip-animation");
    }
  }

  // Typewriter effect for terminal quote with syntax highlighting and staged delays
  const terminal = document.querySelector('.typewriter-terminal');
  if (terminal && !isMobile() && !prefersReducedMotion()) {
    const text = terminal.dataset.text;
    const lines = text.split('\n');
    terminal.innerHTML = '';
    terminal.style.visibility = 'visible';
    // First line: type command char by char
    const firstLine = lines[0] || '';
    const restLines = lines.slice(1);
    let i = 0;
    function typeCommandChar() {
      if (i < firstLine.length) {
        terminal.innerHTML += firstLine[i] === '$' && i === 0 ? '<span class="terminal-keyword">$</span>' : firstLine[i];
        i++;
        setTimeout(typeCommandChar, TERMINAL_CMD_CHAR_DELAY);
      } else {
        terminal.innerHTML = '<span class="terminal-keyword">' + firstLine + '</span><br>';
        typeRestLines(0);
      }
    }
    function typeRestLines(lineIdx) {
      if (lineIdx < restLines.length) {
        terminal.innerHTML += highlight(restLines[lineIdx]) + '<br>';
        setTimeout(() => typeRestLines(lineIdx + 1), TERMINAL_LINE_DELAY);
      } else {
        terminal.classList.add('done');
      }
    }
    // Highlight function from previous code
    function highlight(line) {
      return line
        .replace(/^(\$ .*)/, '<span class="terminal-keyword">$1</span>')
        .replace(/WARNING:.*/g, '<span class="terminal-warn">$&</span>')
        .replace(/ERROR:.*/g, '<span class="terminal-err">$&</span>')
        .replace(/OVERRIDE:.*/g, '<span class="terminal-success">$&</span>')
        .replace(/SUCCESS:.*/g, '<span class="terminal-success">$&</span>');
    }
    setTimeout(typeCommandChar, 400);
  } else if (terminal) {
    // Show text immediately on mobile and when motion is reduced
    const lines = (terminal.dataset.text || '').split('\n');
    function highlight(line) {
      return line
        .replace(/^(\$ .*)/, '<span class="terminal-keyword">$1</span>')
        .replace(/WARNING:.*/g, '<span class="terminal-warn">$&</span>')
        .replace(/ERROR:.*/g, '<span class="terminal-err">$&</span>')
        .replace(/OVERRIDE:.*/g, '<span class="terminal-success">$&</span>')
        .replace(/SUCCESS:.*/g, '<span class="terminal-success">$&</span>');
    }
    terminal.innerHTML = lines.map(highlight).join('<br>');
    terminal.style.visibility = 'visible';
    terminal.classList.add('done');
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

// Terminal typewriter timing constants
const TERMINAL_CMD_CHAR_DELAY = 50; // ms per character for command
const TERMINAL_LINE_DELAY = 500;    // ms per line for output
