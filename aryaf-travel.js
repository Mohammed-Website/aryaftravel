function toggleSidebar() {
    const sidebar = document.getElementById("aryaf-travel-mobile-sidebar");
    const overlay = document.getElementById("aryaf-travel-sidebar-overlay");

    if (sidebar.style.right === "0px") {
        closeSidebar();
    } else {
        sidebar.style.right = "0px"; // Show sidebar
        overlay.classList.add("active"); // Show overlay
        document.addEventListener("click", outsideClickListener); // Add event listener
        window.removeEventListener("scroll", handleScroll); // Disable scroll event
    }
}

function closeSidebar() {
    const sidebar = document.getElementById("aryaf-travel-mobile-sidebar");
    const overlay = document.getElementById("aryaf-travel-sidebar-overlay");

    sidebar.style.right = "-250px"; // Hide sidebar
    overlay.classList.remove("active"); // Hide overlay
    document.removeEventListener("click", outsideClickListener); // Remove event listener
    window.addEventListener("scroll", handleScroll); // Re-enable scroll event
}

function outsideClickListener(event) {
    const sidebar = document.getElementById("aryaf-travel-mobile-sidebar");
    
    // Check if the clicked target is outside the sidebar and the menu button
    if (!sidebar.contains(event.target) && !event.target.closest(".aryaf-travel-mobile-menu-icon")) {
        closeSidebar();
    }
}

// Scroll event handler
function handleScroll() {
    const currentScrollPosition = window.scrollY;
    const header = document.getElementById("aryaf-travel-header");

    if (currentScrollPosition > lastScrollPosition) {
        // Scrolling down
        header.classList.add("hidden");
    } else {
        // Scrolling up
        header.classList.remove("hidden");
    }

    lastScrollPosition = currentScrollPosition;
}

// Attach scroll event initially
let lastScrollPosition = 0;
window.addEventListener("scroll", handleScroll);































/* Ai bot chat functionality */
let chatbotIcon = document.getElementById("aryaf-travel-chatbot-icon");
let chatSidebar = document.getElementById("aryaf-travel-chat-sidebar");
let closeChat = document.getElementById("aryaf-travel-close-chat");
let sendBtn = document.getElementById("aryaf-travel-send-btn");
let messageBar = document.getElementById("aryaf-travel-message-bar");
let messageBox = document.querySelector(".aryaf-travel-message-box");
let chatOverlay = document.getElementById("aryaf-travel-chat-overlay");

let API_URL = "https://api.openai.com/v1/chat/completions";
let API_KEY = "sk-***76cA";

/* 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 */

// Check if the user is on a mobile device
const isMobileDevice = /Mobi|Android/i.test(navigator.userAgent);

// Open Slider if ai bot icon is clicked
chatbotIcon.addEventListener("click", () => {
    chatSidebar.classList.add("active");
    chatOverlay.classList.add("active");
});

// Close Sidebar if close slider button is clicked
closeChat.addEventListener("click", () => {
    chatSidebar.classList.remove("active");
    chatOverlay.classList.remove("active");
});

// Close Sidebar if Overlay is Clicked
chatOverlay.addEventListener("click", () => {
    chatSidebar.classList.remove("active");
    chatOverlay.classList.remove("active");
});

// Send Message Function
sendBtn.onclick = function () {
    if (messageBar.value.trim() !== "") {
        let UserTypedMessage = messageBar.value.trim();
        messageBar.value = "";

        let userMessage = `
                <div class="chat message">
                    <span>${UserTypedMessage}</span>
                </div>
            `;

        let botResponse = `
                <div class="chat response">
                    <img src="مكتب-سياحي/مكتب-سياحي-بحريني.webp">
                    <span class="new">...</span>
                </div>
            `;

        messageBox.insertAdjacentHTML("beforeend", userMessage);

        setTimeout(() => {
            messageBox.insertAdjacentHTML("beforeend", botResponse);

            let requestOptions = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${API_KEY}`
                },
                body: JSON.stringify({
                    model: "gpt-3.5-turbo",
                    messages: [{ role: "user", content: UserTypedMessage }]
                })
            };

            fetch(API_URL, requestOptions)
                .then((res) => res.json())
                .then((data) => {
                    let ChatBotResponse = document.querySelector(".response .new");
                    ChatBotResponse.innerHTML = data.choices[0].message.content;
                    ChatBotResponse.classList.remove("new");
                })
                .catch(() => {
                    let ChatBotResponse = document.querySelector(".response .new");
                    ChatBotResponse.innerHTML = "الموقع مازال في وضع التجربة";
                });
        }, 100);



        document.getElementById("aryaf-travel-message-bar").style.height = "40px"; // Reset to default height;
    }
};

// Attach Send Message Function to Enter Key (for Desktop)
if (!isMobileDevice) {
    messageBar.addEventListener("keydown", (event) => {
        if (event.key === "Enter" && !event.shiftKey) {
            event.preventDefault(); // Prevent default behavior
            sendBtn.click();
        } else if (event.key === "Enter" && event.shiftKey) {
            event.preventDefault(); // Allow Shift+Enter to insert a new line
            const cursorPosition = messageBar.selectionStart;
            messageBar.value =
                messageBar.value.substring(0, cursorPosition) + "\n" + messageBar.value.substring(cursorPosition);
            messageBar.selectionStart = messageBar.selectionEnd = cursorPosition + 1; // Move cursor to the new line
            messageBar.style.height = "auto"; // Reset height to auto
            messageBar.style.height = `${messageBar.scrollHeight}px`; // Adjust height based on content
        }
    });
}

// Enable Enter for New Line Only (for Mobile)
if (isMobileDevice) {
    messageBar.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
            event.preventDefault(); // Prevent sending the message
            const cursorPosition = messageBar.selectionStart;
            messageBar.value =
                messageBar.value.substring(0, cursorPosition) + "\n" + messageBar.value.substring(cursorPosition);
            messageBar.selectionStart = messageBar.selectionEnd = cursorPosition + 1; // Move cursor to the new line
            messageBar.style.height = "auto"; // Reset height to auto
            messageBar.style.height = `${messageBar.scrollHeight}px`; // Adjust height based on content
        }
    });
}

// Adjust Textarea Height Dynamically
messageBar.addEventListener("input", function () {
    this.style.height = "auto"; // Reset height to auto
    this.style.height = `${this.scrollHeight}px`; // Set height based on scroll height
});

// Handle Dynamic Text Direction
document.querySelectorAll('.aryaf-travel-dynamic-direction-input-class').forEach(input => {
    input.addEventListener('input', function () {
        let firstChar = this.value.trim().charAt(0);

        if (firstChar) {
            // Check if the first character is Arabic
            if (firstChar.match(/[\u0600-\u06FF]/)) {
                this.style.direction = 'rtl';
            } else {
                this.style.direction = 'ltr';
            }
        }
    });
});






















scrollToWhoAreWe = function (elementIdName) {
    const targetDiv = document.getElementById(elementIdName);
    if (targetDiv) {
        const targetPosition = targetDiv.getBoundingClientRect().top + window.scrollY;
        const windowHeight = window.innerHeight;
        const scrollToPosition = targetPosition - (windowHeight / 2) + (targetDiv.clientHeight / 2);

        window.scrollTo({
            top: scrollToPosition,
            behavior: "smooth"
        });
    }
}

function scrollToMiddleOfElement(className) {
    const element = document.querySelector(`.${className}`);
    if (element) {
        const elementRect = element.getBoundingClientRect();
        const absoluteElementTop = elementRect.top + window.scrollY;
        const middlePosition = absoluteElementTop - (window.innerHeight / 2) + (elementRect.height / 2);

        window.scrollTo({
            top: middlePosition,
            behavior: 'smooth'
        });
    }
}























// Sample data array
const sectionData = [
    {
        title: 'عروض مزدوجة',
        image_1: ['عروض-مزدوجة/1.jpg', 'رحلة اليونان & تركيا | 7 أيام'],
        image_2: ['عروض-مزدوجة/2.jpg', 'رحلة النمسا & التشيك | 7 أيام'],
        image_3: ['عروض-مزدوجة/3.jpg', 'رحلة باريس & اسطنبول | 7 أيام'],
        image_4: ['عروض-مزدوجة/4.jpg', 'رحلة النمسا & هنغاريا | 7 أيام'],
    },

    {
        title: 'عروض جورجيا',
        image_1: ['جورجيا/1.jpg', 'رحلة جورجيا | 5 أيام'],
        image_2: ['جورجيا/2.jpg', 'رحلة جورجيا | الريف الجميل'],
        image_3: ['جورجيا/3.jpg', 'رحلة جورجيا | 7 أيام'],
    },

    {
        title: 'عروض تايلاند',
        image_1: ['تايلاند/1.jpg', 'رحلة تايلاند | 6 أيام'],
    },

    {
        title: 'عروض موسكو',
        image_1: ['موسكو/1.jpg', 'رحلة موسكو | 5 أيام'],
        image_2: ['موسكو/2.jpg', 'رحلة موسكو | 6 أيام'],
    },

    {
        title: 'عروض لندن',
        image_1: ['لندن/1.jpg', 'رحلة لندن | شامل التأشيرة'],
    },

    {
        title: 'عروض اسطنبول',
        image_1: ['اسطنبول/1.jpg', 'العرض الذهبي | استمتع بمغامرات الشتاء'],
        image_2: ['اسطنبول/2.jpg', 'اسطنبول | عرض الأحلام'],
    },

    {
        title: 'عروض اذربيجان',
        image_1: ['اذربيجان/1.jpg', 'رحلة اذربيجان | طيران مباشر'],
    },

    {
        title: 'عروض طرابزون',
        image_1: ['طرابزون/1.jpg', 'رحلة طرابزون | طيران مباشر'],
        image_2: ['طرابزون/2.jpg', 'رحلة طرابزون | العرض الذهبي'],
    },
];


// Function to dynamically create the section
function createScrollableCardsSection(dataArray) {
    const section = document.getElementById("aryaf-travel-scrollable-cards-section-id");

    dataArray.forEach((data) => {
        const container = document.createElement('div');
        container.className = 'scrollable-cards-container';
        container.setAttribute('title', 'مكتب سياحي بحريني - ارياف البحرين');

        // Create the title
        const title = document.createElement('h2');
        title.className = 'scrollable-section-title';
        title.innerText = data.title;
        container.appendChild(title);

        // Create the scrollable row
        const scrollableRow = document.createElement('div');
        scrollableRow.className = 'scrollable-cards-row';

        // Loop through the images and create cards
        Object.keys(data).forEach((key) => {
            if (key.startsWith('image_')) {
                const [src, text] = data[key];

                const card = document.createElement('div');
                card.className = 'scrollable-card';
                card.setAttribute('title', 'مكتب سياحي بحريني - ارياف البحرين');

                const img = document.createElement('img');
                img.src = src;
                img.alt = text + ' - مكتب سياحي بحريني - ارياف البحرين';
                img.addEventListener('click', () => openFullScreenImage(src, text)); // Pass text to full-screen function
                card.appendChild(img);

                scrollableRow.appendChild(card);
            }
        });

        container.appendChild(scrollableRow);
        section.appendChild(container);
    });
}

function openFullScreenImage(src, text) {

    // Disable document scrolling
    document.body.style.overflow = 'hidden';

    /* Create the full screen container div */
    const fullScreenDiv = document.createElement('div');
    fullScreenDiv.className = 'full-screen-container';
    fullScreenDiv.setAttribute('title', 'مكتب سياحي بحريني - ارياف البحرين');

    // Add animation class for fade-in effect
    setTimeout(() => fullScreenDiv.classList.add('visible'), 10);

    const exitButton = document.createElement('button');
    exitButton.innerText = 'عودة';
    exitButton.className = 'exit-button';
    exitButton.addEventListener('click', closeFullScreenImage);
    fullScreenDiv.appendChild(exitButton);

    const title = document.createElement('h2');
    title.innerText = text;
    title.className = 'full-screen-title';
    fullScreenDiv.appendChild(title);

    // Full-screen image
    const fullScreenImage = document.createElement('img');
    fullScreenImage.src = src;
    fullScreenImage.className = 'full-screen-image';
    fullScreenImage.setAttribute('alt', 'مكتب سياحي بحريني - ارياف البحرين');
    fullScreenDiv.appendChild(fullScreenImage);

    // WhatsApp button
    const whatsappButton = document.createElement('a');
    whatsappButton.className = 'whatsapp-button';
    whatsappButton.innerText = 'إرسال هذا العرض';
    whatsappButton.href = `https://wa.me/+97336363525?text=💎%20طلب%20حجز%20عرض%20جديد%20💎%0A%0Aسلام%20عليكم،%20حاب%20أسأل%20عن%20عرض%0A*${encodeURIComponent(text)}*%0Aوحاب%20أعرف%20تفاصيل%20أكثر%20عن%20عروضكم%20المشابهة.%0A%0A🔗%20رابط%20صورة%20العرض:%0Aaryaftravel.com/${encodeURIComponent(src)}%0A%0Aبإنتظار%20ردكم%20وشكرًا%20لكم`;
    fullScreenDiv.appendChild(whatsappButton);

    // Close on background click
    fullScreenDiv.addEventListener('click', (e) => {
        if (e.target === fullScreenDiv) closeFullScreenImage();
    });

    document.body.appendChild(fullScreenDiv);

    // Smooth close function
    function closeFullScreenImage() {
        fullScreenDiv.classList.remove('visible'); // Trigger fade-out
        setTimeout(() => fullScreenDiv.remove(), 300); // Remove element after fade-out

        document.body.style.overflow = ''; // Re-enable document scrolling
    }
}

// Call the function with the sample data
createScrollableCardsSection(sectionData);


















/* Function for import all comments from google sheet */
document.getElementById("aryaf-travel-comment-form").addEventListener("submit", async function (event) {
    event.preventDefault(); // Prevent page refresh

    let name = document.getElementById("aryaf-travel-comment-username").value.trim();
    let comment = document.getElementById("aryaf-travel-comment-text").value.trim();
    let stars = document.getElementById("aryaf-travel-comment-stars").value;


    let formData = new URLSearchParams();
    formData.append("name", name); // Match Google Apps Script keys
    formData.append("comment", comment);
    formData.append("stars", stars);

    try {
        let response = await fetch("https://script.google.com/macros/s/AKfycbyBAJQhhVA5Uhxe2rrEZ4rjB0Ttn4SrYBptwjx47VZlxtgi3dENPfmNyAmrfL-QZpdEnQ/exec", {
            method: "POST",
            body: formData,
        });

        let data = await response.text();

        if (data === "Success") {
            document.getElementById("aryaf-travel-comment-form").reset();

            await fetchReviews(); // Wait until fetchReviews() is fully executed

            showSuccessNotification(); // Now run the notification function
        }
    } catch (error) {
    }
});

// Function to Fetch and Display Reviews
function fetchReviews() {
    fetch("https://script.google.com/macros/s/AKfycbyBAJQhhVA5Uhxe2rrEZ4rjB0Ttn4SrYBptwjx47VZlxtgi3dENPfmNyAmrfL-QZpdEnQ/exec")
        .then(response => response.json())
        .then(data => {
            let aryaf_travel_clint_rate_area = document.getElementById("aryaf-travel-clint-rate-area");
            aryaf_travel_clint_rate_area.innerHTML = ""; // Clear old reviews

            data.reverse().forEach(item => { // Reverse to show newest first
                let { date, name, comment, starAmount } = item;

                // Skip any row where the comment is empty
                if (!comment.trim()) return;

                let clintRateDiv = document.createElement("div");
                clintRateDiv.classList.add("aryaf-travel-rate-div");

                clintRateDiv.innerHTML = `
                <div class="aryaf-travel-clint-rate-date-div">
                    <h3>${date}</h3>
                </div>

                <div class="aryaf-travel-clint-rate-info-div">
                    <img src="مكتب-سياحي/مكتب-سياحي.webp" alt="مكتب سياحي بحريني - ارياف البحرين" title="مكتب سياحي بحريني - ارياف البحرين">
                    <h4>${name}</h4>
                </div>

                <div class="aryaf-travel-clint-rate-comment-div">
                    <h5>${comment}</h5>
                </div>

                <div class="aryaf-travel-clint-rate-star-div">
                    ${"★".repeat(starAmount)}
                </div>
            `;

            aryaf_travel_clint_rate_area.appendChild(clintRateDiv);
            });

            // Smooth appearance with delay
            setTimeout(() => {
                aryaf_travel_clint_rate_area.classList.add("show");
            }, 100);
        })
        .catch(error => console.error("Error fetching reviews:", error));
}

// Function to Show Floating Success Notification
function showSuccessNotification() {
    let notification = document.getElementById("aryaf-travel-success-notification");
    notification.style.display = "block";

    setTimeout(() => {
        notification.style.opacity = "1";
        notification.style.transform = "translateX(-50%) translateY(0px)"; // Move slightly up
    }, 10);

    setTimeout(() => {
        notification.style.opacity = "0";
        notification.style.transform = "translateX(-50%) translateY(10px)"; // Move down slightly while fading out
        setTimeout(() => {
            notification.style.display = "none";
        }, 400);
    }, 3000);
}

// Fetch Reviews on Page Load
fetchReviews();



























/* Function to trach the first inserted letter in the inputs with the class name of "aryaf-travel-dynamic-direction-input-class" to set their direction value */
document.querySelectorAll('.aryaf-travel-dynamic-direction-input-class').forEach(input => {
    input.addEventListener('input', function () {
        let firstChar = this.value.trim().charAt(0);

        if (firstChar) {
            // Check if the first character is Arabic
            if (firstChar.match(/[\u0600-\u06FF]/)) {
                this.style.direction = 'rtl';
            } else {
                this.style.direction = 'ltr';
            }
        }
    });
});



/* Insert new click data in the google sheet */
function insertNewClick(columnName) {
    const scriptURL = "https://script.google.com/macros/s/AKfycbyU-p7z3tHF0I1K0GCmjcRG3CaG0NPkGyMPTvhlGPISxwIYrt6ueD7O2iHSza9SPOP3/exec";

    // Trim the column name before passing it
    fetch(`${scriptURL}?columnName=${encodeURIComponent(columnName.trim())}`)
        .then(response => response.text())
        .then(data => console.log("Response:", data))
        .catch(error => console.error("Error:", error));
}

/* Open WhatsApp */
openWhatsAppNumber = function () {

    insertNewClick('alseef.com');

    const whatsappNumber = "+97336363525";
    const message = encodeURIComponent('سلام عليكم ورحمة الله وبركاته'); // Optional pre-filled message
    const url = `https://wa.me/${whatsappNumber}?text=${message}`;
    window.open(url, "_blank"); // Opens in a new tab
}



