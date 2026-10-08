/**
 * ==============================================================================
 * SANDYA K B — PORTFOLIO JAVASCRIPT
 * Features: Centralized Config, Dark Theme Toggle, Interactive Project Modals,
 * Mini AI Assistant, Contact Form Validation, Responsive Navigation & Scroll Reveal
 * ==============================================================================
 */

// ==============================================================================
// 1. CONFIGURATION: EDIT YOUR PERSONAL INFORMATION & SOCIAL LINKS HERE
// ==============================================================================
const PORTFOLIO_CONFIG = {
  name: "SANDYA K B",
  initials: "SKB",
  role: "2nd Year Computer Science and Engineering Student",
  phone: "+91 90197 15593",
  email: "kbsandya2007@gmail.com",
  github: "https://github.com/sandyaraj2007-commits",
  githubHandle: "sandyaraj2007-commits",
  linkedin: "https://www.linkedin.com/in/sandya-k-b-7a0a4a396",
  linkedinHandle: "sandya-k-b-7a0a4a396",
  resumePdf: "assets/resume.pdf",
  education: {
    college: {
      name: "Adichunchanagiri Institute of Technology",
      location: "Chikkamagaluru",
      degree: "Bachelor of Engineering in Computer Science and Engineering",
      years: "2025–2029",
      cgpa: "7.3"
    },
    puc: {
      name: "STJ Comp PU College",
      location: "Davanagere",
      grade: "12th Standard",
      year: "2025",
      cgpa: "80.33"
    },
    school: {
      name: "Navachetana Higher Primary School",
      location: "Channagiri",
      grade: "10th Standard",
      year: "2023",
      cgpa: "78.4"
    }
  },
  projects: {
    project1: {
      title: "Smart Waste Dustbin Using AI",
      category: "AI / IoT / Hardware Integration",
      duration: "3 months",
      image: "assets/project-smart-bin.jpg",
      overview: "A smart waste-management project that explores the use of sensors, Arduino, and AI-based ideas to improve waste handling, cleanliness, and civic awareness.",
      problem: "Traditional dustbins frequently overflow without notice, causing unhygienic surroundings, bad odors, and delayed manual trash collection in academic campuses and public areas.",
      solution: "Implemented an automated contactless lid opening system using ultrasonic distance detection and integrated hardware circuitry to notify and track bin capacity levels efficiently.",
      technologies: ["Python", "Arduino Uno", "Ultrasonic Sensor (HC-SR04)", "Servo Motor", "Arduino IDE", "Circuit Breadboard"],
      role: "Designed circuit schematics, programmed the Arduino micro-controller logic in Arduino C/C++, wired ultrasonic sensors and servo motors, and tested response delays.",
      impact: "Designed to help address overflowing waste, encourage contactless hygienic disposal, and foster better smart waste-management awareness.",
      learning: "Gained hands-on experience interfacing hardware sensors with microcontrollers, writing embedded C/C++ control loops, calibration of distance thresholds, and systematic hardware debugging."
    },
    project2: {
      title: "Solar Mobile Charging System",
      category: "Renewable Energy / Hardware Project",
      duration: "3 months",
      image: "assets/project-solar-charger.jpg",
      overview: "A solar-powered mobile charging project that uses renewable solar energy to provide an eco-friendly and practical emergency device charging solution.",
      problem: "Access to conventional electrical outlets is often unavailable in outdoor areas, remote spots, or during power outages, creating a need for self-sustaining energy sources for mobile devices.",
      solution: "Constructed a portable hardware unit featuring a high-efficiency solar panel, charge controller circuit, rechargeable lithium battery pack, and a regulated 5V USB output charging module.",
      technologies: ["Mini Solar Photovoltaic Panel", "Rechargeable Battery Pack", "Charge Controller Circuit", "5V USB Step-down Module", "Connecting Wires", "SPST Power Switch", "LED Status Indicator"],
      role: "Selected compatible hardware components, soldered wiring connections, measured voltage/current outputs using a digital multimeter, and assembled the prototype casing.",
      impact: "Demonstrates how renewable solar energy can be used for useful everyday applications and disaster resilience.",
      learning: "Learned fundamentals of photovoltaic energy conversion, battery charging cycles, voltage regulation, power efficiency, and hardware safety."
    }
  }
};

// ==============================================================================
// 2. DOM INITIALIZATION
// ==============================================================================
document.addEventListener("DOMContentLoaded", () => {
  initThemeToggle();
  initNavigation();
  initScrollSpy();
  initScrollAnimations();
  initProjectModals();
  initMiniAIChat();
  initContactForm();
  applyConfigDetails();
});

// ==============================================================================
// 3. THEME TOGGLE (LIGHT / DARK THEME WITH LOCALSTORAGE PERSISTENCE)
// ==============================================================================
function initThemeToggle() {
  const themeToggleBtn = document.getElementById("themeToggle");
  const htmlElement = document.documentElement;

  // Retrieve saved preference or default to light theme
  const savedTheme = localStorage.getItem("portfolio-theme") || "light";
  htmlElement.setAttribute("data-theme", savedTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener("click", () => {
      const currentTheme = htmlElement.getAttribute("data-theme");
      const newTheme = currentTheme === "light" ? "dark" : "light";
      
      htmlElement.setAttribute("data-theme", newTheme);
      localStorage.setItem("portfolio-theme", newTheme);
    });
  }
}

// ==============================================================================
// 4. NAVIGATION & MOBILE HAMBURGER DRAWER
// ==============================================================================
function initNavigation() {
  const hamburgerBtn = document.getElementById("mobileMenuToggle");
  const mobileDrawer = document.getElementById("mobileDrawer");
  const mobileLinks = document.querySelectorAll(".mobile-nav-link, .mobile-drawer .btn");

  if (hamburgerBtn && mobileDrawer) {
    hamburgerBtn.addEventListener("click", () => {
      const isOpen = mobileDrawer.classList.contains("open");
      toggleMobileMenu(!isOpen);
    });

    // Close mobile drawer when clicking any nav link
    mobileLinks.forEach(link => {
      link.addEventListener("click", () => {
        toggleMobileMenu(false);
      });
    });

    // Close when clicking outside drawer inner content
    mobileDrawer.addEventListener("click", (e) => {
      if (e.target === mobileDrawer) {
        toggleMobileMenu(false);
      }
    });
  }

  function toggleMobileMenu(open) {
    if (open) {
      mobileDrawer.classList.add("open");
      mobileDrawer.setAttribute("aria-hidden", "false");
      hamburgerBtn.classList.add("active");
      hamburgerBtn.setAttribute("aria-expanded", "true");
      document.body.style.overflow = "hidden"; // prevent background scroll
    } else {
      mobileDrawer.classList.remove("open");
      mobileDrawer.setAttribute("aria-hidden", "true");
      hamburgerBtn.classList.remove("active");
      hamburgerBtn.setAttribute("aria-expanded", "false");
      document.body.style.overflow = "";
    }
  }
}

// ==============================================================================
// 5. ACTIVE NAV LINK ON SCROLL (SCROLLSPY)
// ==============================================================================
function initScrollSpy() {
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-links .nav-link");

  window.addEventListener("scroll", () => {
    let currentSectionId = "";
    const scrollPosition = window.pageYOffset + 120;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        currentSectionId = section.getAttribute("id");
      }
    });

    navLinks.forEach(link => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${currentSectionId}`) {
        link.classList.add("active");
      }
    });
  }, { passive: true });
}

// ==============================================================================
// 6. SCROLL REVEAL ANIMATIONS (INTERSECTION OBSERVER)
// ==============================================================================
function initScrollAnimations() {
  const revealElements = document.querySelectorAll(".reveal-element");

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries, observerInstance) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-revealed");
          observerInstance.unobserve(entry.target);
        }
      });
    }, {
      root: null,
      threshold: 0.1,
      rootMargin: "0px 0px -40px 0px"
    });

    revealElements.forEach(el => observer.observe(el));
  } else {
    // Fallback if IntersectionObserver is not supported
    revealElements.forEach(el => el.classList.add("is-revealed"));
  }
}

// ==============================================================================
// 7. PROJECT DETAILS INTERACTIVE MODAL
// ==============================================================================
function initProjectModals() {
  const modal = document.getElementById("projectModal");
  const modalCloseBtn = document.getElementById("modalCloseBtn");
  const openButtons = document.querySelectorAll(".open-modal-btn");

  const modalCategory = document.getElementById("modalCategory");
  const modalDuration = document.getElementById("modalDuration");
  const modalTitle = document.getElementById("modalProjectTitle");
  const modalImage = document.getElementById("modalProjectImage");
  const modalOverview = document.getElementById("modalOverview");
  const modalProblem = document.getElementById("modalProblem");
  const modalSolution = document.getElementById("modalSolution");
  const modalTechTags = document.getElementById("modalTechTags");
  const modalRole = document.getElementById("modalRole");
  const modalImpact = document.getElementById("modalImpact");
  const modalLearning = document.getElementById("modalLearning");

  openButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      const projectId = btn.getAttribute("data-project-id");
      const projectData = PORTFOLIO_CONFIG.projects[projectId];

      if (projectData && modal) {
        modalCategory.textContent = projectData.category;
        modalDuration.textContent = `Duration: ${projectData.duration}`;
        modalTitle.textContent = projectData.title;
        modalImage.src = projectData.image;
        modalImage.alt = projectData.title;
        modalOverview.textContent = projectData.overview;
        modalProblem.textContent = projectData.problem;
        modalSolution.textContent = projectData.solution;
        modalRole.textContent = projectData.role;
        modalImpact.textContent = projectData.impact;
        modalLearning.textContent = projectData.learning;

        // Populate tech tags
        modalTechTags.innerHTML = "";
        projectData.technologies.forEach(tech => {
          const pill = document.createElement("span");
          pill.className = "tech-pill";
          pill.textContent = tech;
          modalTechTags.appendChild(pill);
        });

        // Open modal
        modal.classList.add("active");
        modal.setAttribute("aria-hidden", "false");
        document.body.style.overflow = "hidden";
      }
    });
  });

  function closeModal() {
    if (modal) {
      modal.classList.remove("active");
      modal.setAttribute("aria-hidden", "true");
      document.body.style.overflow = "";
    }
  }

  if (modalCloseBtn) {
    modalCloseBtn.addEventListener("click", closeModal);
  }

  if (modal) {
    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        closeModal();
      }
    });
  }

  // Close modal on ESC key
  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal && modal.classList.contains("active")) {
      closeModal();
    }
  });
}

// ==============================================================================
// 8. MINI AI CHAT ASSISTANT
// ==============================================================================
function initMiniAIChat() {
  const chatForm = document.getElementById("chatForm");
  const chatInput = document.getElementById("chatInput");
  const chatMessages = document.getElementById("chatMessages");
  const chatChips = document.querySelectorAll(".chip-btn");

  // Predefined Knowledge Base for Student Portfolio
  const PREDEFINED_RESPONSES = [
    {
      keywords: ["skill", "skills", "technologies", "tech", "stack", "language", "languages", "c", "python"],
      response: "Sandya's skills include Java (currently learning), C (basic), Python (learning), core OOP concepts, Operating Systems basics, Basic Data Structures, Arduino IDE, hardware sensors integration, and GitHub for version control."
    },
    {
      keywords: ["project", "projects", "built", "work", "dustbin", "solar", "smart waste"],
      response: "She has built two key academic practical projects:\n1. <strong>Smart Waste Dustbin Using AI</strong> (AI/IoT prototype using Arduino Uno, Ultrasonic sensor, and Servo motor).\n2. <strong>Solar Mobile Charging System</strong> (Renewable energy device charging solution using solar panel, charge controller, and battery)."
    },
    {
      keywords: ["learning", "current", "study", "studying", "focus", "goal"],
      response: "She is currently focused on strengthening her core programming fundamentals in Java and C, understanding Object-Oriented Programming (OOPS), exploring Operating Systems & Data Structures, and building hands-on hardware/software solutions."
    },
    {
      keywords: ["education", "degree", "college", "school", "year", "btech", "engineering", "journey", "pu", "puc", "stj", "navachethana", "navachetana", "channagiri", "chikkamagaluru", "ait", "adichunchanagiri"],
      response: "She is pursuing her <strong>Bachelor of Engineering in Computer Science and Engineering (2025–2029, CGPA: 7.3)</strong> at <strong>Adichunchanagiri Institute of Technology, Chikkamagaluru</strong>. Earlier, she completed 12th Standard at <strong>STJ Comp PU College, Davanagere (Score: 80.33%)</strong> and 10th Standard at <strong>Navachetana Higher Primary School, Channagiri (Score: 78.4%)</strong>."
    },
    {
      keywords: ["contact", "email", "phone", "number", "mobile", "reach", "hire", "message", "linkedin", "github"],
      response: `You can reach out to Sandya directly:\n• Phone: <strong>${PORTFOLIO_CONFIG.phone}</strong>\n• Email: <strong>${PORTFOLIO_CONFIG.email}</strong>\n• GitHub: <strong>${PORTFOLIO_CONFIG.githubHandle}</strong>\n• LinkedIn: <strong>${PORTFOLIO_CONFIG.linkedinHandle}</strong>`
    },
    {
      keywords: ["resume", "cv", "pdf", "download", "document"],
      response: `You can view or download Sandya's official resume right from the <a href="#resume" style="color: var(--accent-gold); text-decoration: underline;">Resume Section</a> or <a href="${PORTFOLIO_CONFIG.resumePdf}" target="_blank" download style="color: var(--accent-gold); text-decoration: underline; font-weight: bold;">Download Resume PDF directly here</a>!`
    },
    {
      keywords: ["who", "about", "sandya", "introduce", "name"],
      response: "Sandya K B is a 2nd year Computer Science & Engineering student at Adichunchanagiri Institute of Technology, Java learner, and problem solver who enjoys building practical software and hardware projects."
    },
    {
      keywords: ["hackathon", "hackathons", "competition", "competitions", "contest"],
      response: "Sandya has not participated in hackathons yet, but is actively preparing and enthusiastic about joining upcoming hackathons to gain practical hands-on experience, collaborate in teams, and sharpen her technical problem-solving skills!"
    },
    {
      keywords: ["achievement", "achievements", "accomplishment", "accomplishments", "milestones"],
      response: "Sandya's key achievements include:\n• Gained practical experience through academic projects involving programming, Arduino, sensors, and hardware integration.\n• Developed project-based knowledge in waste management and renewable-energy applications.\n• Strengthened problem-solving and technical skills through hands-on project implementation and testing.\n• Continuously improving programming knowledge in Java, C, and Python through academic learning and practice."
    }
  ];

  function getBotResponse(userQuery) {
    const lowerQuery = userQuery.toLowerCase().trim();

    for (const item of PREDEFINED_RESPONSES) {
      const match = item.keywords.some(keyword => lowerQuery.includes(keyword));
      if (match) {
        return item.response;
      }
    }

    return "Thank you for asking! Sandya is a 2nd-year CSE student exploring Java, C, Python, and IoT systems. Feel free to ask about her <strong>skills</strong>, <strong>projects</strong>, <strong>education</strong>, or <strong>learning journey</strong>!";
  }

  function appendMessage(sender, htmlContent) {
    const msgDiv = document.createElement("div");
    msgDiv.className = `chat-msg ${sender === "bot" ? "bot-msg" : "user-msg"}`;
    
    const bubble = document.createElement("div");
    bubble.className = "msg-bubble";
    bubble.innerHTML = htmlContent;

    msgDiv.appendChild(bubble);
    chatMessages.appendChild(msgDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  function handleUserQuery(query) {
    if (!query || query.trim() === "") return;

    // Append User Message
    appendMessage("user", escapeHTML(query));

    // Show temporary thinking state
    const typingIndicator = document.createElement("div");
    typingIndicator.className = "chat-msg bot-msg";
    typingIndicator.id = "typingIndicator";
    typingIndicator.innerHTML = '<div class="msg-bubble">Thinking... ✍️</div>';
    chatMessages.appendChild(typingIndicator);
    chatMessages.scrollTop = chatMessages.scrollHeight;

    setTimeout(() => {
      const indicator = document.getElementById("typingIndicator");
      if (indicator) indicator.remove();

      /**
       * NOTE FOR FUTURE BACKEND / REAL AI API INTEGRATION:
       * Here you can replace getBotResponse(query) with an asynchronous fetch() call:
       * 
       * Example:
       * fetch('/api/chat', {
       *   method: 'POST',
       *   headers: { 'Content-Type': 'application/json' },
       *   body: JSON.stringify({ message: query })
       * })
       * .then(res => res.json())
       * .then(data => appendMessage("bot", data.reply));
       */
      const botReply = getBotResponse(query);
      appendMessage("bot", botReply);
    }, 450);
  }

  if (chatForm) {
    chatForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const query = chatInput.value;
      chatInput.value = "";
      handleUserQuery(query);
    });
  }

  chatChips.forEach(chip => {
    chip.addEventListener("click", () => {
      const query = chip.getAttribute("data-query");
      handleUserQuery(query);
    });
  });
}

// ==============================================================================
// 9. CONTACT FORM (FRONTEND VALIDATION & NOTIFICATION)
// ==============================================================================
function initContactForm() {
  const form = document.getElementById("contactForm");
  const nameInput = document.getElementById("userName");
  const emailInput = document.getElementById("userEmail");
  const messageInput = document.getElementById("userMessage");
  const submitBtn = document.getElementById("submitBtn");
  const formAlert = document.getElementById("formAlert");

  const nameFeedback = document.getElementById("nameFeedback");
  const emailFeedback = document.getElementById("emailFeedback");
  const messageFeedback = document.getElementById("messageFeedback");

  if (!form) return;

  function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    let isValid = true;

    // Name Validation
    if (!nameInput.value.trim()) {
      nameInput.classList.add("is-invalid");
      nameFeedback.textContent = "Please enter your name.";
      isValid = false;
    } else {
      nameInput.classList.remove("is-invalid");
      nameFeedback.textContent = "";
    }

    // Email Validation
    if (!emailInput.value.trim()) {
      emailInput.classList.add("is-invalid");
      emailFeedback.textContent = "Please enter your email address.";
      isValid = false;
    } else if (!validateEmail(emailInput.value.trim())) {
      emailInput.classList.add("is-invalid");
      emailFeedback.textContent = "Please enter a valid email address.";
      isValid = false;
    } else {
      emailInput.classList.remove("is-invalid");
      emailFeedback.textContent = "";
    }

    // Message Validation
    if (!messageInput.value.trim()) {
      messageInput.classList.add("is-invalid");
      messageFeedback.textContent = "Please write a message.";
      isValid = false;
    } else {
      messageInput.classList.remove("is-invalid");
      messageFeedback.textContent = "";
    }

    if (isValid) {
      submitBtn.disabled = true;
      submitBtn.querySelector("span").textContent = "Sending...";

      /**
       * NOTE FOR FUTURE EMAIL SERVICE INTEGRATION:
       * You can connect services like EmailJS, Formspree, or your own server endpoint here.
       */
      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.querySelector("span").textContent = "Send Message";
        form.reset();

        if (formAlert) {
          formAlert.classList.remove("hidden");
          setTimeout(() => {
            formAlert.classList.add("hidden");
          }, 6000);
        }
      }, 700);
    }
  });

  // Clear validation errors on input
  [nameInput, emailInput, messageInput].forEach(input => {
    input.addEventListener("input", () => {
      input.classList.remove("is-invalid");
    });
  });
}

// ==============================================================================
// 10. HELPER FUNCTIONS & CONFIG APPLICATION
// ==============================================================================
function applyConfigDetails() {
  const phoneDisplay = document.getElementById("contactPhoneDisplay");
  const emailDisplay = document.getElementById("contactEmailDisplay");
  const githubDisplay = document.getElementById("contactGithubDisplay");
  const linkedinDisplay = document.getElementById("contactLinkedinDisplay");

  const footerEmail = document.getElementById("footerEmailLink");
  const footerGithub = document.getElementById("footerGithubLink");
  const footerLinkedin = document.getElementById("footerLinkedinLink");

  if (phoneDisplay) {
    phoneDisplay.textContent = PORTFOLIO_CONFIG.phone;
    phoneDisplay.href = `tel:${PORTFOLIO_CONFIG.phone.replace(/\s+/g, '')}`;
  }

  if (emailDisplay) {
    emailDisplay.textContent = PORTFOLIO_CONFIG.email;
    emailDisplay.href = `mailto:${PORTFOLIO_CONFIG.email}`;
  }

  if (githubDisplay) {
    githubDisplay.textContent = PORTFOLIO_CONFIG.githubHandle || "sandyaraj2007-commits";
    githubDisplay.href = PORTFOLIO_CONFIG.github;
  }

  if (linkedinDisplay) {
    linkedinDisplay.textContent = PORTFOLIO_CONFIG.linkedinHandle || "sandya-k-b-7a0a4a396";
    linkedinDisplay.href = PORTFOLIO_CONFIG.linkedin;
  }

  if (footerEmail) footerEmail.href = `mailto:${PORTFOLIO_CONFIG.email}`;
  if (footerGithub) footerGithub.href = PORTFOLIO_CONFIG.github;
  if (footerLinkedin) footerLinkedin.href = PORTFOLIO_CONFIG.linkedin;

  // Bind Resume PDF Download links
  const resumeDownloadBtns = document.querySelectorAll(".resume-download-btn");
  resumeDownloadBtns.forEach(btn => {
    btn.setAttribute("href", PORTFOLIO_CONFIG.resumePdf);
  });
}

function escapeHTML(str) {
  return str.replace(/[&<>'"]/g, 
    tag => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      "'": '&#39;',
      '"': '&quot;'
    }[tag] || tag)
  );
}
