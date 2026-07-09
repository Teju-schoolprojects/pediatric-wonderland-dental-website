document.addEventListener('DOMContentLoaded', () => {

  // ==========================================
  // 1. Floating Header Scroll Effect
  // ==========================================
  const header = document.querySelector('.main-header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // ==========================================
  // 2. Mobile Navigation Toggle
  // ==========================================
  const navToggle = document.querySelector('.mobile-nav-toggle');
  const navMenu = document.querySelector('.nav-menu');
  const navLinks = document.querySelectorAll('.nav-link, .nav-cta');

  navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('open');
    const isOpen = navMenu.classList.contains('open');
    navToggle.innerHTML = isOpen ? '<i class="fa-solid fa-xmark"></i>' : '<i class="fa-solid fa-bars"></i>';
  });

  // Close mobile menu when clicking any nav link
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('open');
      navToggle.innerHTML = '<i class="fa-solid fa-bars"></i>';
    });
  });

  // ==========================================
  // 3. Journey Map Interaction
  // ==========================================
  const journeySteps = document.querySelectorAll('.journey-step');
  const stepTitle = document.getElementById('step-title');
  const stepDesc = document.getElementById('step-desc');
  const stepCard = document.getElementById('step-detail-card');
  
  const journeyData = {
    1: {
      title: "Step 1: The Magic Playroom",
      desc: "Instead of a scary waiting room, children arrive in our sunny playroom filled with soft toys, cloud mobiles, and coloring books. We let them relax, play, and get comfortable with our environment before any checkup begins.",
      icon: "assets/journey_playroom.jpg"
    },
    2: {
      title: "Step 2: The Cozy Chair",
      desc: "Our dental chairs are super-soft and sized just for kids. We show them the 'magic tools' before starting, explaining things like our magnifying mirror that looks for hidden treasure. Kids get to choose a movie to watch on our ceiling screens!",
      icon: "assets/journey_cozy_chair.jpg"
    },
    3: {
      title: "Step 3: The Sparkle Clean",
      desc: "We use a tickle-cleaning brush with sweet, kid-approved toothpaste flavors. The cleaning process is gentle and interactive, showing them how we polish away sugar bugs to make their teeth shine like stars.",
      icon: "assets/journey_sparkle_clean.jpg"
    },
    4: {
      title: "Step 4: The Treasure Chest",
      desc: "At the end of every visit, children receive a golden coin to unlock our magical Treasure Chest! They can choose a reward toy, high-five Cozy the Tooth, and leave the clinic with a proud, shining smile.",
      icon: "assets/journey_treasure_chest.jpg"
    }
  };

  journeySteps.forEach(step => {
    step.addEventListener('click', () => {
      // Remove active class from all steps
      journeySteps.forEach(s => s.classList.remove('active'));
      // Add active class to clicked step
      step.classList.add('active');

      const stepNum = step.getAttribute('data-step');
      const data = journeyData[stepNum];

      // Fade animation for card content
      stepCard.style.opacity = '0';
      stepCard.style.transform = 'translateY(10px)';

      setTimeout(() => {
        stepTitle.textContent = data.title;
        stepDesc.textContent = data.desc;
        const imgEl = stepCard.querySelector('#step-img');
        imgEl.src = data.icon;
        imgEl.alt = data.title;
        
        stepCard.style.opacity = '1';
        stepCard.style.transform = 'translateY(0)';
      }, 200);
    });
  });

  // ==========================================
  // 4. Playroom Hotspots Tooltips
  // ==========================================
  const hotspots = document.querySelectorAll('.hotspot');
  const tooltip = document.getElementById('playroom-tooltip');
  const container = document.querySelector('.playroom-interactive-container');

  hotspots.forEach(hotspot => {
    // Show tooltip on hover
    hotspot.addEventListener('mouseenter', (e) => {
      const text = hotspot.getAttribute('data-tooltip');
      tooltip.textContent = text;
      tooltip.classList.add('active');
    });

    // Hide tooltip on mouse leave
    hotspot.addEventListener('mouseleave', () => {
      tooltip.classList.remove('active');
    });

    // Make touch-friendly for mobile devices
    hotspot.addEventListener('click', (e) => {
      e.stopPropagation();
      const text = hotspot.getAttribute('data-tooltip');
      tooltip.textContent = text;
      tooltip.classList.toggle('active');
    });
  });

  // Close tooltip when clicking outside on mobile
  document.addEventListener('click', () => {
    tooltip.classList.remove('active');
  });

  // ==========================================
  // 5. Mascot Cozy Mascot Chat
  // ==========================================
  const mascotBtns = document.querySelectorAll('.mascot-btn');
  const mascotText = document.getElementById('mascot-text');
  const mascotBubble = document.getElementById('mascot-bubble');

  mascotBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const answer = btn.getAttribute('data-answer');
      
      // Animate bubble text transition
      mascotBubble.style.transform = 'scale(0.95)';
      mascotBubble.style.opacity = '0.7';

      setTimeout(() => {
        mascotText.textContent = answer;
        mascotBubble.style.transform = 'scale(1)';
        mascotBubble.style.opacity = '1';
      }, 200);
    });
  });

  // ==========================================
  // 6. Testimonials Carousel
  // ==========================================
  const track = document.getElementById('testimonials-track');
  const dots = document.querySelectorAll('.dot');
  let currentSlide = 0;

  function moveToSlide(index) {
    track.style.transform = `translateX(-${index * 100}%)`;
    dots.forEach(dot => dot.classList.remove('active'));
    dots[index].classList.add('active');
    currentSlide = index;
  }

  dots.forEach(dot => {
    dot.addEventListener('click', () => {
      const index = parseInt(dot.getAttribute('data-index'));
      moveToSlide(index);
    });
  });

  // Optional: Auto-rotate testimonials
  let testimonialInterval = setInterval(() => {
    let nextSlide = (currentSlide + 1) % dots.length;
    moveToSlide(nextSlide);
  }, 7000);

  // Stop auto-rotate when user clicks a dot
  dots.forEach(dot => {
    dot.addEventListener('click', () => {
      clearInterval(testimonialInterval);
    });
  });

  // ==========================================
  // 7. Interactive Appointment Booking Form
  // ==========================================
  const moodSlider = document.getElementById('child-mood');
  const moodLabels = document.querySelectorAll('.mood-label');
  const bookingForm = document.getElementById('booking-form');
  const successOverlay = document.getElementById('form-success-overlay');
  const successCloseBtn = document.getElementById('success-close-btn');
  const submittedPhone = document.getElementById('submitted-phone');

  // Slide handle for Child Mood
  moodSlider.addEventListener('input', (e) => {
    const value = e.target.value;
    moodLabels.forEach(label => {
      label.classList.remove('active');
      if (label.getAttribute('data-value') === value) {
        label.classList.add('active');
      }
    });
  });

  // Quick label click to change slider
  moodLabels.forEach(label => {
    label.addEventListener('click', () => {
      const val = label.getAttribute('data-value');
      moodSlider.value = val;
      moodLabels.forEach(l => l.classList.remove('active'));
      label.classList.add('active');
    });
  });

  // Form submit handler
  bookingForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const phoneVal = document.getElementById('phone').value;
    submittedPhone.textContent = phoneVal;
    
    // Display custom overlay on success
    successOverlay.classList.add('active');
  });

  // Close success window and reset form
  successCloseBtn.addEventListener('click', () => {
    successOverlay.classList.remove('active');
    bookingForm.reset();
    
    // Reset mood labels to default value (Relaxed - 3)
    moodSlider.value = 3;
    moodLabels.forEach(label => {
      label.classList.remove('active');
      if (label.getAttribute('data-value') === "3") {
        label.classList.add('active');
      }
    });
  });

  // ==========================================
  // 8. FAQ Accordion Toggle
  // ==========================================
  const faqQuestions = document.querySelectorAll('.faq-question');

  faqQuestions.forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.parentElement;
      const isActive = item.classList.contains('active');
      
      // Close other accordion tabs
      document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('active'));
      
      if (!isActive) {
        item.classList.add('active');
      }
    });
  });

});
