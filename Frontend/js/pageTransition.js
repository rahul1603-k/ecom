// Page transition animation
function animatePageOut() {
  const body = document.body;
  body.style.animation = 'pageOut 0.6s ease-in forwards';
}

function animatePageIn() {
  const body = document.body;
  body.style.opacity = '0';
  body.style.transform = 'translateY(20px)';
  setTimeout(() => {
    body.style.animation = 'pageIn 0.6s ease-out forwards';
  }, 100);
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
  @keyframes pageOut {
    from {
      opacity: 1;
      transform: translateY(0);
    }
    to {
      opacity: 0;
      transform: translateY(-20px);
    }
  }

  @keyframes pageIn {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes ripple {
    from {
      transform: scale(0);
      opacity: 1;
    }
    to {
      transform: scale(4);
      opacity: 0;
    }
  }

  /* Smooth page transitions */
  body {
    transition: all 0.3s ease;
  }

  a {
    position: relative;
  }

  a::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 0;
    height: 0;
    background: rgba(255,255,255,0.3);
    border-radius: 50%;
    transform: translate(-50%, -50%);
    pointer-events: none;
  }

  a:active::before {
    animation: ripple 0.6s ease-out;
  }
`;
document.head.appendChild(style);

// Intercept all navigation links
document.addEventListener('click', (e) => {
  const link = e.target.closest('a[href]:not([href^="#"]):not([onclick])');
  
  if(link && link.href && !link.target) {
    const isExternal = link.hostname !== window.location.hostname;
    
    if(!isExternal) {
      e.preventDefault();
      animatePageOut();
      
      setTimeout(() => {
        window.location.href = link.href;
      }, 300);
    }
  }
});

// Animate page in on load
window.addEventListener('load', () => {
  animatePageIn();
});