// Toggle dropdown menu
function toggleMenu() {
    const dropdown = document.querySelector('.dropdown');
    dropdown.style.transform = dropdown.style.transform === 'translateY(0px)' ? 'translateY(-500px)' : 'translateY(0px)';
  }
  
  // Close dropdown menu
  function closeMenu() {
    const dropdown = document.querySelector('.dropdown');
    dropdown.style.transform = 'translateY(-500px)';
  }
  
  // Typewriter effect
  const typewriterText = document.querySelector('.typewriter-text');
  const texts = ["Data Engineer", "Big Data Enthusiast", "Cloud Specialist"];
  let index = 0;
  let charIndex = 0;
  
  function type() {
    if (charIndex < texts[index].length) {
      typewriterText.textContent += texts[index].charAt(charIndex);
      charIndex++;
      setTimeout(type, 100);
    } else {
      setTimeout(erase, 2000);
    }
  }
  
  function erase() {
    if (charIndex > 0) {
      typewriterText.textContent = texts[index].substring(0, charIndex - 1);
      charIndex--;
      setTimeout(erase, 50);
    } else {
      index = (index + 1) % texts.length;
      setTimeout(type, 500);
    }
  }
  
  document.addEventListener('DOMContentLoaded', () => {
    if (texts.length) setTimeout(type, 1000);
  });
