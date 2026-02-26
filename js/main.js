document.addEventListener("DOMContentLoaded", () => {
    // Mobile Menu Logic
    const mobileMenuBtn = document.getElementById("mobile-menu-btn");
    const mobileMenu = document.getElementById("mobile-menu");

    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener("click", () => {
            mobileMenu.classList.toggle("hidden");
        });
    }

    // Close mobile menu when clicking a link
    const mobileLinks = document.querySelectorAll("#mobile-menu a");
    mobileLinks.forEach(link => {
        link.addEventListener("click", () => {
            mobileMenu.classList.add("hidden");
        });
    });

    // Countdown Timer
    const targetDate = new Date("April 04, 2026 10:40:00").getTime();

    const daysEl = document.getElementById("days");
    const hoursEl = document.getElementById("hours");
    const minutesEl = document.getElementById("minutes");
    const secondsEl = document.getElementById("seconds");

    if (daysEl && hoursEl && minutesEl && secondsEl) {
        const updateCountdown = setInterval(() => {
            const now = new Date().getTime();
            const distance = targetDate - now;

            if (distance < 0) {
                clearInterval(updateCountdown);
                daysEl.innerText = "00";
                hoursEl.innerText = "00";
                minutesEl.innerText = "00";
                secondsEl.innerText = "00";
                return;
            }

            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            daysEl.innerText = days < 10 ? "0" + days : days;
            hoursEl.innerText = hours < 10 ? "0" + hours : hours;
            minutesEl.innerText = minutes < 10 ? "0" + minutes : minutes;
            secondsEl.innerText = seconds < 10 ? "0" + seconds : seconds;
        }, 1000);
    }



    // Guestbook Form Submission & Display
    const guestbookForm = document.getElementById("guestbook-form");
    const guestmessagesContainer = document.getElementById("guest-messages");

    const loadMessages = async () => {
        if (!guestmessagesContainer) return;
        try {
            const messages = await db.guestbook.orderBy('id').reverse().toArray();
            guestmessagesContainer.innerHTML = '';

            if (messages.length === 0) {
                guestmessagesContainer.innerHTML = '<p class="text-gray-500 italic">Be the first to leave a wish!</p>';
                return;
            }

            messages.forEach(msg => {
                const div = document.createElement('div');
                div.className = "bg-white p-4 rounded-lg shadow-sm border border-champagne";
                div.innerHTML = `
          <h4 class="font-serif font-bold text-maroon text-lg">${msg.name}</h4>
          <p class="text-gray-700 mt-2">"${msg.message}"</p>
          <span class="text-xs text-gray-400 mt-2 block">${new Date(msg.timestamp).toLocaleDateString()}</span>
        `;
                guestmessagesContainer.appendChild(div);
            });
        } catch (error) {
            console.error("Error loading messages:", error);
        }
    };

    if (guestbookForm) {
        guestbookForm.addEventListener("submit", async (e) => {
            e.preventDefault();
            const name = document.getElementById("gb-name").value;
            const message = document.getElementById("gb-message").value;

            try {
                await db.guestbook.add({
                    name: name,
                    message: message,
                    timestamp: new Date().toISOString()
                });

                guestbookForm.reset();
                loadMessages(); // reload messages
            } catch (error) {
                console.error("Error saving message:", error);
                alert("Failed to submit message. Please try again.");
            }
        });
    }

    // Initial load
    loadMessages();

    // Lazy load implementation modifier
    document.querySelectorAll('img[loading="lazy"]').forEach(img => {
        if (img.complete) {
            img.classList.add('loaded');
        } else {
            img.addEventListener('load', () => {
                img.classList.add('loaded');
            });
        }
    });
});
