document.addEventListener("DOMContentLoaded", () => {
  // Modal Toggle
  const modals = document.querySelectorAll(".modal");
  const openButtons = document.querySelectorAll(
    ".login-btn, .signup-btn"
  );
  const closeButtons = document.querySelectorAll(".close-btn");

  openButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const modalId =
        button
          .getAttribute("onclick")
          ?.match(/open(\w+)Modal/)?.[1]
          .toLowerCase() || "auth";
      document.getElementById(`${modalId}-modal`).style.display = "block";
    });
  });

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
document.querySelectorAll('.book-btn').forEach(button => {
    button.addEventListener('click', () => {
        const tourName = button.closest('.tour-card').querySelector('h3').textContent;
        // Redirect to booking page with tour name (you can pass it via URL or session)
        window.location.href = `/HTML/booking.html?tour=${encodeURIComponent(tourName)}`;
    });
});

// Existing code (if any) remains...

// Destination detail navigation
document.querySelectorAll('.destination-card').forEach(card => {
    card.addEventListener('click', () => {
        const name = card.querySelector('h3').textContent;
        const location = card.querySelector('.location a').textContent;
        const image = card.querySelector('img').src;
        const rating = card.querySelector('.rating').textContent;
        const price = card.querySelector('.price').textContent;
        const description = "Discover the wonders of this amazing place with its unique culture and breathtaking views.";
        const highlights = ["Stunning landscapes", "Rich cultural heritage", "Exciting activities"];

        // Construct URL with query parameters
        const params = new URLSearchParams({
            name: encodeURIComponent(name),
            location: encodeURIComponent(location),
            image: encodeURIComponent(image),
            rating: encodeURIComponent(rating),
            price: encodeURIComponent(price),
            description: encodeURIComponent(description),
            highlights: encodeURIComponent(JSON.stringify(highlights))
        }).toString();

        window.location.href = `/HTML/destination-details.html?${params}`;
        });
    });

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
    };

    question = question.toLowerCase();

    if (question.includes("hello") || question.includes("hi")) {
      return simpleResponses["hello"];
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
});
