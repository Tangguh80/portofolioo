
document.addEventListener('DOMContentLoaded', function () {
    const chatbotContainer = document.getElementById('chatbotContainer');
    const closeChatbot = document.getElementById('closeChatbot');
    const openBotBtn = document.querySelector('.open-Bot');
    const chatMessages = document.getElementById('chatMessages');
    const chatInput = document.getElementById('chatInput');
    const sendMessageBtn = document.getElementById('sendMessageBtn');
    const chatContainer = document.getElementById('chatContainer');
    let scrollTimeout;

    // Fungsi untuk kunci scroll saat bot dibuka
    function handleBodyScrollLock(lock) {
        if (window.innerWidth <= 767) {
            document.body.classList.toggle('no-scroll', lock);
        }
    }

    // Fungsi update URL
    function updateUrlWithChatParam(shouldAdd) {
        const currentUrl = new URL(window.location.href);
        const searchParams = new URLSearchParams(currentUrl.search);
        if (shouldAdd) {
            searchParams.set('chat', 'open');
        } else {
            searchParams.delete('chat');
        }

        let newUrl = window.location.pathname;
        if (Array.from(searchParams).length > 0) {
            newUrl += '?' + searchParams.toString();
        }

        history.replaceState({ chat: shouldAdd ? 'open' : null }, '', newUrl);
    }

    // Fungsi membuka chatbot
    function openBot() {
        chatbotContainer.classList.remove('hide');
        chatbotContainer.classList.add('show');
        chatbotContainer.style.display = 'flex';
        openBotBtn.style.display = 'none';
        handleBodyScrollLock(true);
        updateUrlWithChatParam(true);
    }

    // Fungsi menutup chatbot
    function closeBot() {
        chatbotContainer.classList.remove('show');
        chatbotContainer.classList.add('hide');
        setTimeout(() => {
            chatbotContainer.style.display = 'none';
            openBotBtn.style.display = 'flex';
            handleBodyScrollLock(false);
            updateUrlWithChatParam(false);
        }, 400);
    }

    // Event buka/tutup
    openBotBtn.addEventListener('click', openBot);
    closeChatbot.addEventListener('click', closeBot);

    // Periksa URL saat halaman dimuat
    function checkInitialChatState() {
        const params = new URLSearchParams(window.location.search);
        if (params.get('chat') === 'open') {
            openBot();
        } else if (chatbotContainer.classList.contains('show')) {
            updateUrlWithChatParam(true);
        }
    }

    // Navigasi tombol kembali/maju browser
    window.addEventListener('popstate', function () {
        const params = new URLSearchParams(window.location.search);
        if (params.get('chat') === 'open') {
            if (!chatbotContainer.classList.contains('show')) openBot();
        } else {
            if (chatbotContainer.classList.contains('show')) closeBot();
        }
    });

    // Scroll behavior
    window.addEventListener('scroll', () => {
        if (chatbotContainer.classList.contains('show')) {
            openBotBtn.style.display = 'none';
            return;
        }

        openBotBtn.style.opacity = '0.5';
        clearTimeout(scrollTimeout);

        const scrollTop = window.scrollY;
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;

        if ((scrollTop + windowHeight) >= (documentHeight - 400)) {
            openBotBtn.style.display = 'none';
        } else {
            openBotBtn.style.display = 'flex';
        }

        scrollTimeout = setTimeout(() => {
            openBotBtn.style.opacity = '1';
        }, 200);
    });

    // Resize behavior
    window.addEventListener('resize', () => {
        if (chatbotContainer.classList.contains('show')) {
            handleBodyScrollLock(true);
        } else {
            handleBodyScrollLock(false);
        }
    });

    // Inisialisasi chat URL param
    checkInitialChatState();



    

    // ======================== Chatbot Response Logic (tidak diubah) ========================//

async function sendMessage() {
    const message = chatInput.value.trim();
    if (!message) return;

    addUserMessage(message);
    chatInput.value = '';
    showTypingIndicator();

    try {
        const response = await fetch("https://n8n-tdlnivln.ap-southeast-1.clawcloudrun.com/webhook/557eeb54-0b87-4aae-b72c-aa3e38bc41f4", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ message: message })
        });

        if (!response.ok) throw new Error("Server error");

        let botMessage = await response.text();
        
        // Parse JSON if response is JSON
        try {
            const jsonResponse = JSON.parse(botMessage);
            if (jsonResponse.message) {
                botMessage = jsonResponse.message;
            }
        } catch (e) {
            // If not JSON, keep original text
        }

// Clean up the message
botMessage = botMessage
    .replace(/<br\s*\/?>/g, '\n')                   // Convert <br> to newline
    .replace(/<\/?strong>/g, '')                    // Remove all <strong> tags
    .replace(/<\/?[^>]+(>|$)/g, '')                 // Remove any remaining HTML tags
    .replace(/\*\*(.*?)\*\*/g, '$1')                // Remove Markdown bold
    .replace(/### (.*?)\n/g, '$1:\n')               // Clean headers
    .replace(/- /g, '• ')                           // Convert dashes to bullets
    .replace(/\. /g, '.\n\n')                       // Add 2 newlines after each period
    .replace(/(\d+\.)/g, '\n$1')                    // Add newline before numbered list items
    .replace(/\n?• /g, '\n• ')                      // Force bullet point to start on new line
    .replace(/\n{3,}/g, '\n\n')                     // Limit max newlines to 2
    .trim();

        removeTypingIndicator();
        addBotMessage(botMessage);

    } catch (error) {
        console.error("Error:", error);
        removeTypingIndicator();
        addBotMessage("Maaf, terjadi kesalahan. Silakan coba lagi nanti.");
    }

    scrollToBottom();
}



// Fungsi untuk menambahkan pesan bot dengan dukungan HTML
function addBotMessage(message) {
    const chatBody = document.querySelector('.chat-body'); // Sesuaikan dengan struktur HTML Anda
    const messageElement = document.createElement('div');
    messageElement.classList.add('message', 'bot-message'); // Tambahkan kelas CSS jika perlu
    messageElement.innerHTML = message; // Gunakan innerHTML untuk render HTML
    chatBody.appendChild(messageElement);
}

// Fungsi lainnya (contoh)
function addUserMessage(message) {
    const chatBody = document.querySelector('.chat-body');
    const messageElement = document.createElement('div');
    messageElement.classList.add('message', 'user-message');
    messageElement.textContent = message;
    chatBody.appendChild(messageElement);
}

function showTypingIndicator() {
    // Implementasi indikator mengetik
}

function removeTypingIndicator() {
    // Hapus indikator mengetik
}

function scrollToBottom() {
    const chatBody = document.querySelector('.chat-body');
    chatBody.scrollTop = chatBody.scrollHeight;
}

// Kirim pesan saat Enter ditekan
chatInput.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
        sendMessage();
    }
});



    function addUserMessage(message) {
        const messageElement = document.createElement('div');
        messageElement.classList.add('User-Answer');
        messageElement.textContent = message;
        chatMessages.appendChild(messageElement);
        scrollToBottom();
    }

    function addBotMessage(message) {
        const messageElement = document.createElement('div');
        messageElement.classList.add('Bot-Answer');
        messageElement.textContent = message;
        chatMessages.appendChild(messageElement);
        scrollToBottom();
    }

    function showTypingIndicator() {
        const typingElement = document.createElement('div');
        typingElement.classList.add('typing-indicator');
        typingElement.id = 'typingIndicator';
        typingElement.innerHTML = `
            <div class="typing-dot"></div>
            <div class="typing-dot"></div>
            <div class="typing-dot"></div>
        `;
        chatMessages.appendChild(typingElement);
        scrollToBottom();
    }

    function removeTypingIndicator() {
        const typingElement = document.getElementById('typingIndicator');
        if (typingElement) {
            typingElement.remove();
        }
    }

    function scrollToBottom() {
        chatContainer.scrollTop = chatContainer.scrollHeight;
    }

    function getBotResponse(message) {
        const lowerMessage = message.toLowerCase();

        if (lowerMessage.includes('hai') || lowerMessage.includes('halo') || lowerMessage.includes('hello')) {
            return "Halo juga! Ada yang bisa saya bantu?";
        } else if (lowerMessage.includes('pendidikan')) {
            return "Tangguh memiliki latar belakang pendidikan di bidang Teknologi Informasi.";
        } else if (lowerMessage.includes('pengalaman')) {
            return "Tangguh memiliki pengalaman kerja dan praktik di perusahaan IT.";
        } else if (lowerMessage.includes('keahlian')) {
            return "Keahlian teknis Tangguh meliputi pengembangan web, mobile, dan pengolahan data.";
        } else if (lowerMessage.includes('proyek')) {
            return "Beberapa proyek yang pernah dikerjakan termasuk sistem informasi, aplikasi mobile, dan website.";
        } else if (lowerMessage.includes('kontak')) {
            return "Anda bisa menghubungi Tangguh melalui email atau nomor telepon di bagian kontak.";
        } else {
            return "Maaf, saya tidak mengerti. Silakan tanya tentang pendidikan, pengalaman, keahlian, atau proyek.";
        }
    }

    sendMessageBtn.addEventListener('click', sendMessage);
    chatInput.addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });

    document.querySelectorAll('.Selection-user').forEach(button => {
        button.addEventListener('click', function () {
            const query = this.getAttribute('data-query');
            let message = this.textContent;
            addUserMessage(message);

            setTimeout(() => {
                showTypingIndicator();
                setTimeout(() => {
                    removeTypingIndicator();

                    let response;
                    switch (query) {
                        case 'greeting':
                            response = "Halo juga! Senang bisa berbicara dengan Anda.";
                            break;
                        case 'education':
                            response = "Tangguh memiliki latar belakang pendidikan di bidang Teknologi Informasi.";
                            break;
                        case 'experience':
                            response = "Pengalaman kerja Tangguh mencakup magang dan proyek profesional.";
                            break;
                        case 'skills':
                            response = "Keahlian teknis Tangguh mencakup pemrograman, pengembangan web, dan mobile.";
                            break;
                        case 'projects':
                            response = "Proyek Tangguh mencakup sistem informasi, aplikasi mobile, dan situs portofolio.";
                            break;
                        case 'contact':
                            response = "Hubungi Tangguh melalui email, telepon, atau LinkedIn.";
                            break;
                        default:
                            response = "Terima kasih! Ada yang lain yang ingin Anda ketahui?";
                    }

                    addBotMessage(response);
                    scrollToBottom();
                }, 1500);
            }, 500);
        });
    });
});

