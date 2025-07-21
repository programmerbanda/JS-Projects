document.addEventListener("DOMContentLoaded", () => {
  // hamburger
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".navbar-center-item");
const bookBtn = document.querySelector(".navbar-right-item");
let icon = null;
if (hamburger) {
  icon = hamburger.querySelector("i");
}

  hamburger.addEventListener("click", () => {
    navMenu.classList.toggle("active");
    bookBtn.classList.toggle("active");

    if (icon.classList.contains("fa-bars")) {
      icon.classList.remove("fa-bars");
      icon.classList.add("fa-times");
      document.body.style.overflow = 'hidden';
    } else {
      icon.classList.remove("fa-times");
      icon.classList.add("fa-bars");
      document.body.style.overflow = 'auto';
    }
  });

  document.querySelectorAll(".nav-link a").forEach((link) => {
    link.addEventListener("click", () => {
      navMenu.classList.remove("active");
      bookBtn.classList.remove("active");
    });
  });
  document.addEventListener("click", (e) => {
    if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
      navMenu.classList.remove("active");
      bookBtn.classList.remove("active");
    }
  });
  // Login & Sign Up
const loginBtn = document.querySelector(".login-btn");
// const signupBtn = document.querySelector('.signup-btn');

if (loginBtn) {
  loginBtn.addEventListener("click", () => {
    window.location.href = "login.html";
  });
}

  // signupBtn.addEventListener('click', ()=> {
  //   window.location.href = "sign-up.html"
  // })

  // Modal Toggle
  const modals = document.querySelectorAll(".modal");
  const closeButtons = document.querySelectorAll(".close-btn");

  closeButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      modals.forEach((modal) => (modal.style.display = "none"));
    });
  });

  window.addEventListener("click", (e) => {
    modals.forEach((modal) => {
      if (e.target == modal) modal.style.display = "none";
    });
  });

  // Booking page navigation
  document.querySelectorAll(".book-btn").forEach((button) => {
    button.addEventListener("click", () => {
      const tourCard = button.closest(".tour-card");
      if (!tourCard) {
        console.error("No parent .tour-card found");
        return;
      }
      const titleElement = tourCard.querySelector("h3");
      if (!titleElement) {
        console.error("No <h3> found in .tour-card");
        return;
      }
      const tourName = titleElement.textContent;
      // Redirect to booking page with tour name (you can pass it via URL or session)
      window.location.href = `/HTML/booking.html?tour=${encodeURIComponent(
        tourName
      )}`;
    });
  });

  const bookButton = document.querySelector(".book-now-btn");
  if (bookButton) {
    bookButton.addEventListener("click", () => {
      window.location.href = "booking.html";
    });
  }

  const homeButton = document.querySelector(".home-button");
  if (homeButton) {
    homeButton.addEventListener("click", () => {
      window.location.href = "index.html";
    });
  }

  const companyName = document.querySelector(".company-name");
  if (companyName) {
    companyName.addEventListener("click", () => {
      window.location.href = "index.html";
    });
  }

  const toursButton = document.querySelector(".tours-button");
  if (toursButton) {
    toursButton.addEventListener("click", () => {
      window.location.href = "tours.html";
    });
  }

  const exploreButton = document.querySelector(".explore-now-btn");
  if (exploreButton) {
    exploreButton.addEventListener("click", () => {
      window.location.href = "featured.html";
    });
  }

  const destinationButton = document.querySelector(".destination-button");
  if (destinationButton) {
    destinationButton.addEventListener("click", () => {
      window.location.href = "featured.html";
    });
  }

  const aboutButton = document.querySelector(".about-button");
  if (aboutButton) {
    aboutButton.addEventListener("click", () => {
      window.location.href = "about.html";
    });
  }

const contactButton = document.querySelector(".contact-button");
if (contactButton) {
  contactButton.addEventListener("click", () => {
    window.location.href = "contact.html";
  });
}

  document.querySelectorAll(".destination-card").forEach((card) => {
    card.addEventListener("click", (e) => {
      // Don't trigger if clicking on links/buttons
      if (e.target.tagName === "A" || e.target.tagName === "BUTTON") return;

      // Get all card details
      const destination = {
        image: card.querySelector("img").src,
        name: card.querySelector("h3").textContent.trim(),
        location: card.querySelector(".location a").textContent.trim(),
        rating: card.querySelector(".rating").textContent.trim(),
        price: card.querySelector(".price").textContent.trim(),
      };

      openBookingModal(destination);
    });
  });

  function openBookingModal(destination) {
    const modal = document.getElementById("booking-modal");

    modal.querySelector(".modal-content").innerHTML = `
        <span class="close-btn">×</span>
        <div class="destination-header">
            <img src="${destination.image}" alt="${destination.name}" class="destination-image">
            <div class="destination-meta">
                <h2>${destination.name}</h2>
                <p class="location"><i class="fas fa-map-marker-alt"></i> ${destination.location}</p>
                <div class="meta-row">
                    <span class="rating">${destination.rating}</span>
                    <span class="price">${destination.price}</span>
                </div>
            </div>
        </div>
        <form class="booking-form">
            <h3>Book Your Trip</h3>
            <div class="form-group">
                <label>Full Name</label>
                <input type="text" placeholder="Your name" required>
            </div>
            <div class="form-group">
                <label>Email</label>
                <input type="email" placeholder="Your email" required>
            </div>
            <div class="form-group">
                <label>Travel Date</label>
                <input type="date" required>
            </div>
            <div class="form-group">
                <label>Travelers</label>
                <input type="number" placeholder="Number of people" min="1" required>
            </div>
            <button type="submit" class="submit-btn">Confirm Booking</button>
        </form>
    `;

    // Show modal and disable scrolling
    modal.style.display = "block";
    document.body.style.overflow = "hidden";

    // Close modal and re-enable scrolling
    modal.querySelector(".close-btn").onclick = () => {
      modal.style.display = "none";
      document.body.style.overflow = "auto";
    };

    // Close modal on outside click and re-enable scrolling
const closeModal = (event) => {
  if (event.target === modal) {
    modal.style.display = "none";
    document.body.style.overflow = "auto";
  }
};
window.addEventListener("click", closeModal);
  }

  // Chat Support System
  const supportIcon = document.getElementById("supportIcon");
  const aiChatContainer = document.getElementById("aiChatContainer");
  const closeChat = document.getElementById("closeChat");
  const userInput = document.getElementById("userInput");
  const sendMessage = document.getElementById("sendMessage");
  const chatMessages = document.getElementById("chatMessages");

  // Toggle chat visibility
  supportIcon.addEventListener("click", () => {
    aiChatContainer.style.display = "flex";
    userInput.focus();
  });

  closeChat.addEventListener("click", () => {
    aiChatContainer.style.display = "none";
  });

  async function sendMessageHandler() {
    const question = userInput.value.trim();
    if (!question) return;

    addMessage(question, "user");
    userInput.value = "";

    const typingIndicator = addMessage("Typing...", "bot", true);

    try {
      const response = await getAIResponse(question);

      chatMessages.removeChild(typingIndicator);
      addMessage(response, "bot");
    } catch (error) {
      chatMessages.removeChild(typingIndicator);
      addMessage(
        "Sorry, I'm having trouble responding. Please try again later.",
        "bot"
      );
      console.error("Chat error:", error);
    }
  }

  function addMessage(text, sender, isTyping = false) {
    const messageDiv = document.createElement("div");
    messageDiv.className = `${sender}-message${isTyping ? " typing" : ""}`;
    messageDiv.innerHTML = `<p>${text}</p>`;
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
    return messageDiv;
  }

  async function getAIResponse(question) {
    const simpleResponses = {
      hello: "Hi there! How can I help with your travel plans today?",
      hi: "Hello! I'm your ExploreMore assistant. What would you like to know?",
      "best places":
        "Our top destinations are: 1. Dubai 2. Switzerland 3. Venice",
      price:
        "Our tours start from $500. Check the 'Tours' section for details!",
      contact:
        "You can reach us at info@exploremore.com or call +91 9876543210",
      name: "I'm an AI of ExploreMore Company",
      default:
        "I'm happy to help with your travel questions. What would you like to know?",
      login : 'login.html'
    };

    question = question.toLowerCase();

    if (question.includes("hello") || question.includes("hi")) {
      return simpleResponses["hello"];
    } else if (question.includes('login')){
      window.location.href = simpleResponses['login']
      return 'Redirecting you to the login page';
    } else if (question.includes("name")) {
      return simpleResponses["name"];
    } else if (question.includes("best") || question.includes("recommend")) {
      return simpleResponses["best places"];
    } else if (question.includes("price") || question.includes("cost")) {
      return simpleResponses["price"];
    } else if (
      question.includes("contact") ||
      question.includes("email") ||
      question.includes("phone")
    ) {
      return simpleResponses["contact"];
    }

    try {
      const response = await fetchOpenAIResponse(question);
      return response;
    } catch (error) {
      console.error("AI Error:", error);
      return simpleResponses["default"];
    }
  }
  async function fetchOpenAIResponse(question) {
    console.log("Would call OpenAI API with question:", question);

    return new Promise((resolve) => {
      setTimeout(() => {
        const simulatedResponses = [
          "For that destination, I recommend visiting between November and February for the best weather.",
          "That tour typically includes transportation, guided activities, and 3-star accommodation.",
          "You'll need to bring comfortable walking shoes, weather-appropriate clothing, and your passport.",
        ];
        const randomResponse =
          simulatedResponses[
            Math.floor(Math.random() * simulatedResponses.length)
          ];
        resolve(randomResponse);
      }, 1500);
    });
  }
  sendMessage.addEventListener("click", sendMessageHandler);
  userInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") sendMessageHandler();
  });
  // Animation
  const toursContainer = document.querySelector(".tours-container");
  if (!toursContainer) return;

  const originalCards = Array.from(document.querySelectorAll(".tour-card"));
  originalCards.forEach((card) => {
    const clone = card.cloneNode(true);
    clone.setAttribute("aria-hidden", "true");
    toursContainer.appendChild(clone);
  });

  if (originalCards.length > 3) {
    toursContainer.classList.add("animate");
  }

  const style = document.createElement("style");
  const duration = originalCards.length * 3;
  style.textContent = `
        @keyframes scroll {
            0% { transform: translateX(0); }
            100% { transform: translateX(calc(-280px * ${originalCards.length})); }
        }
    `;
  document.head.appendChild(style);

  // testnimonials Animation
  const testimonialsContainer = document.querySelector(
    ".testimonials-container"
  );
  if (!testimonialsContainer) return;

  const testimonials = document.querySelectorAll(".testimonial-card");
  if (testimonials.length < 2) return; // Don't animate if only one testimonial

  testimonials.forEach((testimonial) => {
    const clone = testimonial.cloneNode(true);
    clone.setAttribute("aria-hidden", "true");
    testimonialsContainer.appendChild(clone);
  });

  const cardStyle = window.getComputedStyle(testimonials[0]);
  const cardWidth =
    testimonials[0].offsetWidth +
    parseInt(cardStyle.marginRight) +
    parseInt(cardStyle.marginLeft);
  const scrollDistance = cardWidth * testimonials.length;
  const durations = testimonials.length * 4; // 4 seconds per testimonial

  const styles = document.createElement("style");
  style.textContent = `
        .testimonials-container.animate {
            animation: testimonial-scroll ${durations}s linear infinite;
        }
        @keyframes testimonial-scroll {
            0% { transform: translateX(0); }
            100% { transform: translateX(-${scrollDistance}px); }
        }
    `;
  document.head.appendChild(styles);
  testimonialsContainer.classList.add("animate");
});
const newsletterBtn = document.querySelector(".newsletter-btn");
if (newsletterBtn) {
  newsletterBtn.addEventListener("click", function (event) {
    event.preventDefault();
    const emailInput = document.querySelector(".newsletter-input");
    const messageDiv = document.querySelector("#subscriptionMessage");

    if (!emailInput || !messageDiv) {
      console.warn("Newsletter elements not found");
      return;
    }

    const email = emailInput.value.trim();
    emailInput.value = "";

    if (email.includes("@") && email.includes(".")) {
      messageDiv.textContent = `Success! You are subscribed with ${email}.`;
      messageDiv.className = "subscription-message success";
    } else {
      messageDiv.textContent = "Failure! Please enter a valid email address.";
      messageDiv.className = "subscription-message failure";
    }
    messageDiv.style.display = "block";

    setTimeout(() => {
      messageDiv.style.display = "none";
    }, 3000);
  });
}